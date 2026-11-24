export interface WorkItem {
  title: string
  image: string
  position: string
  href?: string
}

export function WorkGrid({ items }: { items: WorkItem[] }) {
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
    <div className="work-carousel" role="region" aria-label="Work categories">
      <div className="work-grid">
        <div className="work-grid__group">{renderItems(false)}</div>
        <div className="work-grid__group">{renderItems(true)}</div>
      </div>
    </div>
  )
}
