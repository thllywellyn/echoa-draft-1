export interface WorkItem {
  title: string
  image: string
  position: string
  href?: string
}

export function WorkGrid({ items }: { items: WorkItem[] }) {
  return (
    <div className="work-grid">
      {items.map((item, index) => (
        <article className="work-card" key={item.title}>
          {item.href ? (
            <a
              className="work-card__link"
              href={item.href}
              aria-label={`View ${item.title} category`}
            >
          <img
              src={item.image}
            alt={`${item.title} concept photography`}
            style={{ objectPosition: item.position }}
          />
          <div className="work-card__shade" />
          <div className="work-card__label">
            <span>0{index + 1}</span>
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
                <span>0{index + 1}</span>
                <h3>{item.title}</h3>
              </div>
            </>
          )}
        </article>
      ))}
    </div>
  )
}
