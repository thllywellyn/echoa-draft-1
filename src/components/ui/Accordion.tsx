import { useState } from "react"
import { Plus } from "lucide-react"

export function Accordion({
  items,
  light = false,
}: {
  items: string[][]
  light?: boolean
}) {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div className={`accordion ${light ? "accordion--light" : ""}`}>
      {items.map(([title, body], index) => {
        const isOpen = open === index
        return (
          <div
            className={`accordion__item ${isOpen ? "is-open" : ""}`}
            key={title}
          >
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : index)}
            >
              <span>{title}</span>
              <Plus
                className="accordion-icon"
                size={28}
                aria-hidden="true"
              />
            </button>
            <div className="accordion__answer" aria-hidden={!isOpen}>
              <p>{body}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
