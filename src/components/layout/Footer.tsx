const ASSET_BASE = "/assets"

export function Footer() {
  return (
    <footer>
      <div className="section-shell">
        <div className="footer-grid">
          <div>
            <img
              className="footer-logo"
              src={`${ASSET_BASE}/b2ac7.png`}
              alt="Echoa"
            />
            <p className="footer-caption">
              Brand Content Company
              <br />
              91+ 81687828570
            </p>
          </div>
          <nav aria-label="Footer navigation">
            <span className="footer-heading">Page</span>
            <a href="#work">Work</a>
            <a href="#services">Services</a>
            <a href="#/about">About</a>
            <a href="#contact">Contact</a>
          </nav>
          <div className="footer-links">
            <span className="footer-heading">Social Media</span>
            <a href="mailto:hello@echoa.in">hello@echoa.in</a>
            <a
              href="https://www.instagram.com/echoa.in/"
              target="_blank"
              rel="noreferrer"
            >
              Instagram ↗
            </a>
            <a
              href="https://www.linkedin.com/company/echoa-in/"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn ↗
            </a>
            <a
              href="https://api.whatsapp.com/send/?phone=918168782857&text=Hi+ECHOA%21+I%27d+love+to+connect"
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp ↗
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 ECHOA</span>
          <span>Ideas create a ripple.</span>
        </div>
      </div>
    </footer>
  )
}
