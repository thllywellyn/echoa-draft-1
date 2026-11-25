
import { useEffect, useRef, useCallback } from "react"

export interface WorkItem {
  title: string
  image: string
  position: string
  href?: string
}

export function WorkGrid({ items }: { items: WorkItem[] }) {
  const carouselRef = useRef<HTMLDivElement>(null)
  const isPointerDownRef = useRef(false)
  const pauseUntilRef = useRef(0)
  const loopWidthRef = useRef(0)
  const animationFrameRef = useRef<number>(0)

  const getLoopWidth = useCallback(() => {
    const carousel = carouselRef.current
    const group = carousel?.querySelector<HTMLElement>(
      ".work-grid__group"
    )

    if (!carousel || !group) return 0

    return group.offsetWidth
  }, [])

  const normalizePosition = useCallback(() => {
    const carousel = carouselRef.current
    const width = loopWidthRef.current

    if (!carousel || width <= 0) return

    const left = carousel.scrollLeft

    // Keep the carousel inside the middle copy.
    if (left < width) {
      carousel.scrollLeft = left + width
    } else if (left >= width * 2) {
      carousel.scrollLeft = left - width
    }
  }, [])

  useEffect(() => {
    const carousel = carouselRef.current
    if (!carousel || items.length === 0) return

    let destroyed = false
    let previousTime = 0

    const updateDimensions = () => {
      const width = getLoopWidth()

      if (width <= 0) return

      loopWidthRef.current = width

      // Start at the second copy.
      carousel.scrollLeft = width
    }

    updateDimensions()

    const resizeObserver = new ResizeObserver(() => {
      updateDimensions()
    })

    resizeObserver.observe(carousel)

    const group = carousel.querySelector(".work-grid__group")
    if (group) resizeObserver.observe(group)

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    )

    if (reducedMotion.matches) {
      return () => resizeObserver.disconnect()
    }

    const hoverCapability = window.matchMedia("(hover: hover)")

    const animate = (time: number) => {
      if (destroyed) return

      if (previousTime !== 0) {
        const elapsed = Math.min(time - previousTime, 50)

        const isPaused =
          (hoverCapability.matches && carousel.matches(":hover")) ||
          carousel.parentElement?.querySelector(":focus-visible") !== null ||
          isPointerDownRef.current ||
          time < pauseUntilRef.current

        const width = loopWidthRef.current

        if (!isPaused && width > 0) {
          const speed = width / 36000

          carousel.scrollLeft += elapsed * speed

          normalizePosition()
        }
      }

      previousTime = time
      animationFrameRef.current =
        window.requestAnimationFrame(animate)
    }

    animationFrameRef.current =
      window.requestAnimationFrame(animate)

    return () => {
      destroyed = true
      resizeObserver.disconnect()
      window.cancelAnimationFrame(animationFrameRef.current)
    }
  }, [items.length, getLoopWidth, normalizePosition])

  const moveCarousel = (direction: -1 | 1) => {
    const carousel = carouselRef.current

    if (!carousel) return

    const group = carousel.querySelector<HTMLElement>(
      ".work-grid__group"
    )

    const firstCard = group?.querySelector<HTMLElement>(
      ".work-card"
    )

    const secondCard = firstCard?.nextElementSibling as
      | HTMLElement
      | null

    if (!group || !firstCard) return

    const width = loopWidthRef.current

    if (width <= 0) return

    const step = secondCard
      ? secondCard.offsetLeft - firstCard.offsetLeft
      : firstCard.offsetWidth

    const currentPosition =
      carousel.scrollLeft - width

    const nextPosition =
      width +
      currentPosition +
      direction * step

    pauseUntilRef.current = performance.now() + 1200

    carousel.scrollTo({
      left: nextPosition,
      behavior: window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches
        ? "auto"
        : "smooth",
    })
  }

  const handlePointerDown = () => {
    isPointerDownRef.current = true
  }

  const handlePointerUp = () => {
    isPointerDownRef.current = false
    pauseUntilRef.current = performance.now() + 1200
  }

  const renderItems = (duplicate: boolean) =>
    items.map((item, index) => (
      <article
        className="work-card"
        key={`${duplicate ? "duplicate" : "original"}-${item.title}-${index}`}
        aria-hidden={duplicate || undefined}
      >
        {item.href ? (
          <a
            className="work-card__link"
            href={item.href}
            aria-label={`View ${item.title} category`}
            tabIndex={duplicate ? -1 : undefined}
          >
            <img
              src={item.image}
              alt={`${item.title} concept photography`}
              style={{ objectPosition: item.position }}
              draggable={false}
              loading="lazy"
              decoding="async"
            />

            <div className="work-card__shade" />

            <div className="work-card__label">
              <span>
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3>{item.title}</h3>
            </div>
          </a>
        ) : (
          <>
            <img
              src={item.image}
              alt={`${item.title} concept photography`}
              style={{ objectPosition: item.position }}
              draggable={false}
              loading="lazy"
              decoding="async"
            />

            <div className="work-card__shade" />

            <div className="work-card__label">
              <span>
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3>{item.title}</h3>
            </div>
          </>
        )}
      </article>
    ))

  return (
    <div className="work-carousel-shell">
      <div
        className="work-carousel"
        role="region"
        aria-label="Work categories"
        ref={carouselRef}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onScroll={normalizePosition}
      >
        <div className="work-grid">
          <div className="work-grid__group" aria-hidden="true">
            {renderItems(true)}
          </div>

          <div className="work-grid__group">
            {renderItems(false)}
          </div>

          <div className="work-grid__group" aria-hidden="true">
            {renderItems(true)}
          </div>
        </div>
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
