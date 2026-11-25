import { useState } from "react"
import { Menu, X } from "lucide-react"

const ASSET_BASE = "/assets"

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="site-header">
      <a href="#home" className="logo" aria-label="Echoa home">
        <img src={`${ASSET_BASE}/echoa_red.webp`} alt="Echoa" />
      </a>
      <button
        className="menu-button"
        type="button"
        aria-label={menuOpen ? "Close navigation" : "Open navigation"}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? (
          <X className="menu-icon" size={24} aria-hidden="true" />
        ) : (
          <Menu className="menu-icon" size={24} aria-hidden="true" />
        )}
      </button>
      <nav
        className={menuOpen ? "is-open" : ""}
        aria-label="Primary navigation"
      >
        {[
          ["Home", "#home"],
          ["Work", "#work"],
          ["Services", "#services"],
          ["About", "#/about"],
        ].map(([label, href]) => (
          <a
            key={label}
            href={href}
            onClick={() => setMenuOpen(false)}
          >
            {label}
          </a>
        ))}
        <a
          className="contact-button"
          href="#contact"
          onClick={() => setMenuOpen(false)}
        >
          Contact
        </a>
      </nav>
    </header>
  )
}
