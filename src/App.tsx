import { useState } from "react"
import type { FormEvent } from "react"

const A = "/assets"

const work = [
  { title: "Fashion", image: "7904d.png", position: "center" },
  { title: "Jewellery", image: "d5370.png", position: "center top" },
  { title: "Beauty", image: "592d7.png", position: "58% center" },
  { title: "Lifestyle", image: "c4150.png", position: "right center" },
]

const capabilities = [
  ["Strategy", "Positioning, content systems and clear creative foundations."],
  [
    "Creative Direction",
    "Distinct visual worlds that make every touchpoint feel connected.",
  ],
  [
    "Production",
    "End-to-end stills and moving-image production, managed with care.",
  ],
  [
    "Execution",
    "Consistent delivery across the channels where your brand lives.",
  ],
]

const services = [
  [
    "Content Planning",
    "A considered monthly plan built around your brand, audience and ambitions.",
  ],
  [
    "Creative Direction",
    "Campaign concepts and visual direction that give every idea a clear point of view.",
  ],
  [
    "Content Production",
    "Photography and video production, from pre-production through final delivery.",
  ],
  [
    "Content Execution",
    "Publishing-ready content shaped for each channel and moment.",
  ],
]

function Accordion({
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
              <img src={`${A}/${light ? "cae3f.svg" : "a2430.svg"}`} alt="" />
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

function SectionIntro({
  eyebrow,
  title,
  children,
  inverse = false,
}: {
  eyebrow: string
  title: React.ReactNode
  children: React.ReactNode
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

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  function submitContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const subject = encodeURIComponent(
      `Project enquiry from ${form.get("name")} — ${form.get("company")}`,
    )
    const body = encodeURIComponent(
      `Name: ${form.get("name")}\nBrand / Company: ${form.get("company")}\nMobile: ${form.get("mobile")}\nEmail: ${form.get("email")}\nProject type: ${form.get("type")}\n\n${form.get("message")}`,
    )
    window.location.href = `mailto:hello@echoa.in?subject=${subject}&body=${body}`
  }

  return (
    <main>
      <header className="site-header">
        <a href="#home" className="logo" aria-label="Echoa home">
          <img src={`${A}/b9e70.png`} alt="Echoa" />
        </a>
        <button
          className="menu-button"
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <img src={`${A}/fb9db.svg`} alt="" />
        </button>
        <nav
          className={menuOpen ? "is-open" : ""}
          aria-label="Primary navigation"
        >
          {[
            ["Home", "home"],
            ["Work", "work"],
            ["Services", "services"],
            ["About", "about"],
          ].map(([label, id]) => (
            <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>
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

      <section className="hero" id="home">
        <img className="hero-ripple" src={`${A}/0bf8e.png`} alt="" />
        <div className="section-shell hero-content">
          <a href="#home" className="logo" aria-label="Echoa home">
            <img src={`${A}/b9e70.png`} alt="Echoa" />
          </a>
          <h1>
            Brands deserve to
            <br />
            be <em>remembered,</em>
            <br />
            not just seen.
          </h1>
          <p className="hero-lead">
            We plan and produce content for brands
            <br />
            worth remembering.
          </p>
          <p className="hero-meta">Strategy | Creative Direction | Production | Execution.</p>
          <a className="hero__button" href="#contact">
            Start a Project
          </a>
        </div>
      </section>

      <section className="work section-shell" id="work">
        <SectionIntro
          eyebrow="The work."
          title={
            <>
              Work that leaves
              <br />
              an impression.
            </>
          }
        >
          A selection of visual worlds shaped with intention. Imagery shown is
          concept work pending approved client assets.
        </SectionIntro>
        <div className="work-grid">
          {work.map((item, index) => (
            <article className="work-card" key={item.title}>
              <img
                src={`${A}/${item.image}`}
                alt={`${item.title} concept photography`}
                style={{ objectPosition: item.position }}
              />
              <div className="work-card__shade" />
              <div className="work-card__label">
                <span>0{index + 1}</span>
                <h3>{item.title}</h3>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="capabilities">
        <div className="section-shell split">
          <SectionIntro
            inverse
            eyebrow="Our capabilities"
            title={
              <>
                From the first thought
                <br />
                to the final frame.
              </>
            }
          >
            Strategy, creative direction, production and execution connected
            through one intentional content system.
          </SectionIntro>
          <Accordion items={capabilities} light />
        </div>
      </section>

      <section className="point-of-view section-shell">
        <div className="desktop-only">
          <SectionIntro
            eyebrow="Our point of view"
            title={
              <>
                Attention is earned.
                <br />
                Recognition is built.
              </>
            }
          >
            Content is everywhere, but only thoughtful ideas leave a lasting
            impression.
            <br />
            We create with purpose, helping brands become memorable.
          </SectionIntro>
        </div>
        <div className="mobile-only">
          <SectionIntro
            eyebrow="The work."
            title={
              <>
                Work that leaves
                <br />
                an impression.
              </>
            }
          >
            A selection of visual worlds shaped with intention. Imagery shown is
            concept work pending approved client assets.
          </SectionIntro>
        </div>
        <div className="film">
          <video
            autoPlay
            controls
            loop
            muted
            playsInline
            preload="metadata"
            poster={`${A}/film-poster.svg`}
            width={1920}
            height={1080}
            aria-label="Echoa showreel"
          >
            <source src={`${A}/film.mp4`} type="video/mp4" />
            Your browser does not support HTML video.
          </video>
        </div>
      </section>

      <section className="belief section-shell">
        <SectionIntro
          eyebrow="Our belief"
          title={
            <>
              Content should build,
              <br />
              not simply fill.
            </>
          }
        >
          We believe every piece of content should contribute to a brand&apos;s
          identity, recognition and lasting impression.
        </SectionIntro>
        <img src={`${A}/2a5ea.png`} alt="" />
      </section>

      <section className="about section-shell" id="about">
        <div className="about__image">
          <img
            src={`${A}/a05f7.png`}
            alt="Fashion editorial concept portrait"
          />
          <span>Studio / ECHOA</span>
        </div>
        <div className="about__copy">
          <p className="eyebrow">About the ECHOA</p>
          <h2>We create content that gives brands a presence.</h2>
          <p className="description">
            ECHOA is a brand content company working with fashion, jewellery,
            beauty and lifestyle brands.
            <br />
            We bring together strategy, creative direction and production to
            create considered content that helps brands communicate who they
            are, what they stand for and why they matter.
          </p>
          <a className="text-link" href="#services">
            About us <span>↗</span>
          </a>
        </div>
      </section>

      <section className="services section-shell split" id="services">
        <SectionIntro
          eyebrow="Our services"
          title={
            <>
              What we can do
              <br />
              for your Brand?
            </>
          }
        >
          From monthly planning and creative direction to production and
          publishing, I stay involved in shaping your content from one month to
          the next.
        </SectionIntro>
        <Accordion items={services} />
      </section>

      <section className="contact" id="contact">
        <div className="section-shell contact__inner">
          <div>
            <SectionIntro
              inverse
              eyebrow="Let's work together"
              title={
                <>
                  Let&apos;s create something
                  <br />
                  worth remembering.
                </>
              }
            >
              <span className="desktop-only">
                Have a project in mind? Let&apos;s talk about it.
              </span>
              <span className="mobile-only">
                Tell us a little about your brand and what you’re looking to
                create. We’ll be in touch to explore how we can work together.
              </span>
            </SectionIntro>
            <button className="submit-link" type="submit" form="contact-form">
              Start a Conversation
            </button>
          </div>
          <form id="contact-form" onSubmit={submitContact}>
            <input name="name" placeholder="Name*" aria-label="Name" required />
            <input
              name="company"
              placeholder="Brand / Company*"
              aria-label="Brand or company"
              required
            />
            <input
              name="mobile"
              placeholder="Mobile number*"
              aria-label="Mobile number"
              required
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              aria-label="Email"
            />
            <textarea
              name="message"
              placeholder="Message"
              aria-label="Message"
              rows={1}
            />
            <select
              name="type"
              aria-label="Project type"
              defaultValue=""
              required
            >
              <option value="" disabled>
                Project Type*
              </option>
              <option>Content Planning</option>
              <option>Creative Direction</option>
              <option>Content Production</option>
              <option>Content Execution</option>
            </select>
            <p>
              Submitting opens a pre-filled email. No information is stored.
            </p>
          </form>
        </div>
      </section>

      <footer>
        <div className="section-shell">
          <div className="footer-grid">
            <div>
              <img className="footer-logo" src={`${A}/b2ac7.png`} alt="Echoa" />
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
              <a href="#about">About</a>
              <a href="#contact">Contact</a>
            </nav>
            <div className="footer-links">
              <span className="footer-heading">Social Media</span>
              <a href="mailto:hello@echoa.in">hello@echoa.in</a>
              <a href="https://www.instagram.com/echoa.in/" target="_blank" rel="noreferrer">
                Instagram ↗
              </a>
              <a href="https://www.linkedin.com/company/echoa-in/" target="_blank" rel="noreferrer">
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
    </main>
  )
}
