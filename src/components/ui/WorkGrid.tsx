import { useEffect, useRef } from "react"

export interface WorkItem {
  title: string
  image: string
  position: string
  href?: string
}

export function WorkGrid({ items }: { items: WorkItem[] }) {
  const carouselRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const carousel = carouselRef.current
    const group = carousel?.querySelector<HTMLElement>(".work-grid__group")
    if (!carousel || !group || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return
    }

    let previousTime = performance.now()
    const interval = window.setInterval(() => {
      const time = performance.now()
      const elapsed = time - previousTime
      previousTime = time

      const isKeyboardFocused = carousel.querySelector(":focus-visible") !== null
      if (!carousel.matches(":hover") && !isKeyboardFocused) {
        const loopWidth = group.getBoundingClientRect().width
        if (loopWidth > 0) {
          const nextScrollLeft = carousel.scrollLeft + (elapsed * loopWidth) / 36000
          carousel.scrollLeft = nextScrollLeft >= loopWidth
            ? nextScrollLeft % loopWidth
            : nextScrollLeft
        }
      }
    }, 16)

    return () => window.clearInterval(interval)
  }, [])

  const moveCarousel = (direction: -1 | 1) => {
    const carousel = carouselRef.current
    const group = carousel?.querySelector<HTMLElement>(".work-grid__group")
    const firstCard = group?.querySelector<HTMLElement>(".work-card")
    const secondCard = firstCard?.nextElementSibling
    if (!carousel || !group || !firstCard) return

    const loopWidth = group.getBoundingClientRect().width
    const step = secondCard instanceof HTMLElement
      ? secondCard.offsetLeft - firstCard.offsetLeft
      : firstCard.getBoundingClientRect().width
    let nextPosition = carousel.scrollLeft + direction * step

    if (nextPosition >= loopWidth) nextPosition -= loopWidth
    if (nextPosition < 0) nextPosition += loopWidth

    carousel.scrollTo({
      left: nextPosition,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    })
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
    >
      <div className="work-grid">
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
