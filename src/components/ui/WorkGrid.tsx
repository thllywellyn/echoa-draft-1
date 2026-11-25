import {
  useCallback,
  useEffect,
  useRef,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
} from "react"

export interface WorkItem {
  title: string
  image: string
  position: string
  href?: string
}

type DragState = {
  pointerId: number
  startX: number
  startOffset: number
  moved: boolean
}

export function WorkGrid({ items }: { items: WorkItem[] }) {
  const carouselRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const offsetRef = useRef(0)
  const dragRef = useRef<DragState | null>(null)
  const suppressClickUntilRef = useRef(0)

  const getLoopWidth = useCallback(() => {
    const group = carouselRef.current?.querySelector<HTMLElement>(".work-grid__group")
    return group?.getBoundingClientRect().width ?? 0
  }, [])

  const applyOffset = useCallback(
    (nextOffset: number) => {
      const track = trackRef.current
      const loopWidth = getLoopWidth()
      if (!track || loopWidth <= 0) return

      const offset = ((nextOffset % loopWidth) + loopWidth) % loopWidth
      offsetRef.current = offset
      track.style.transform = `translate3d(${-offset}px, 0, 0)`
    },
    [getLoopWidth],
  )

  useEffect(() => {
    const carousel = carouselRef.current
    if (!carousel || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return
    }

    let previousTime: number | null = null
    let frame = 0
    const animate = (time: number) => {
      const loopWidth = getLoopWidth()
      if (previousTime !== null && loopWidth > 0) {
        const elapsed = Math.min(time - previousTime, 50)
        const isPaused =
          carousel.matches(":hover") ||
          carousel.querySelector(":focus-visible") !== null ||
          dragRef.current !== null

        if (!isPaused) {
          applyOffset(offsetRef.current + (elapsed * loopWidth) / 36000)
        }
      }

      previousTime = time
      frame = window.requestAnimationFrame(animate)
    }

    frame = window.requestAnimationFrame(animate)
    return () => window.cancelAnimationFrame(frame)
  }, [applyOffset, getLoopWidth])

  const moveCarousel = (direction: -1 | 1) => {
    const carousel = carouselRef.current
    const group = carousel?.querySelector<HTMLElement>(".work-grid__group")
    const firstCard = group?.querySelector<HTMLElement>(".work-card")
    const secondCard = firstCard?.nextElementSibling
    if (!carousel || !group || !firstCard) return

    const step = secondCard instanceof HTMLElement
      ? secondCard.offsetLeft - firstCard.offsetLeft
      : firstCard.getBoundingClientRect().width
    applyOffset(offsetRef.current + direction * step)
  }

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (
      (event.pointerType === "mouse" && event.button !== 0) ||
      (event.target instanceof Element && event.target.closest("button"))
    ) {
      return
    }

    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startOffset: offsetRef.current,
      moved: false,
    }
  }

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current
    if (!drag || drag.pointerId !== event.pointerId) return

    const deltaX = event.clientX - drag.startX
    if (!drag.moved && Math.abs(deltaX) < 5) return

    drag.moved = true
    if (!event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.setPointerCapture(event.pointerId)
    }
    event.preventDefault()
    applyOffset(drag.startOffset - deltaX)
  }

  const handlePointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current
    if (!drag || drag.pointerId !== event.pointerId) return

    if (drag.moved) {
      suppressClickUntilRef.current = performance.now() + 300
    }
    dragRef.current = null
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
  }

  const handleClickCapture = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (performance.now() >= suppressClickUntilRef.current) return

    event.preventDefault()
    event.stopPropagation()
    suppressClickUntilRef.current = 0
  }

  const renderItems = (isDuplicate: boolean) =>
    items.map((item, index) => (
      <article
        className="work-card"
        key={item.title}
        aria-hidden={isDuplicate || undefined}
      >
        {item.href ? (
          <a
            className="work-card__link"
            href={item.href}
            aria-label={`View ${item.title} category`}
            tabIndex={isDuplicate ? -1 : undefined}
          >
            <img
              src={item.image}
              alt={`${item.title} concept photography`}
              style={{ objectPosition: item.position }}
            />
            <div className="work-card__shade" />
            <div className="work-card__label">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{item.title}</h3>
            </div>
          </a>
        ) : (
          <>
            <img
              src={item.image}
              alt={`${item.title} concept photography`}
              style={{ objectPosition: item.position }}
            />
            <div className="work-card__shade" />
            <div className="work-card__label">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{item.title}</h3>
            </div>
          </>
        )}
      </article>
    ))

  return (
    <div
      className="work-carousel"
      role="region"
      aria-label="Work categories"
      ref={carouselRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onClickCapture={handleClickCapture}
    >
      <div className="work-grid" ref={trackRef}>
        <div className="work-grid__group">{renderItems(false)}</div>
        <div className="work-grid__group">{renderItems(true)}</div>
      </div>
      <div className="work-carousel__controls">
        <button
          type="button"
          className="work-carousel__button"
          aria-label="Previous category"
          onClick={() => moveCarousel(-1)}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>
        <button
          type="button"
          className="work-carousel__button"
          aria-label="Next category"
          onClick={() => moveCarousel(1)}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      </div>
    </div>
  )
}
