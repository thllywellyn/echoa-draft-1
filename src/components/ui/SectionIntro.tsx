import type { ReactNode } from "react"

export function SectionIntro({
  eyebrow,
  title,
  children,
  inverse = false,
}: {
  eyebrow: string
  title: ReactNode
  children: ReactNode
  inverse?: boolean
}) {
  return (
    <div className={`section-intro ${inverse ? "section-intro--inverse" : ""}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      <p className="description">{children}</p>
    </div>
  )
}
