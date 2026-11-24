import { Footer, Header } from "./components/layout"
import { CategoryPage } from "./components/ui/CategoryPage"
import {
  Accordion,
  ContactForm,
  SectionIntro,
  WorkGrid,
} from "./components/ui"
import { useEffect, useState } from "react"
import AboutPage from "./pages/AboutPage"

const A = "/assets"
const categories = [
  "fashion",
  "jewellery",
  "beauty",
  "lifestyle",
  "editorial",
  "product",
  "campaigns",
] as const
type Category = (typeof categories)[number]

function isCategory(route: string): route is Category {
  return categories.some((category) => category === route)
}

const work = [
  { title: "Fashion", image: "/category-assets/fashion/44632.webp", position: "center", href: "#/fashion" },
  { title: "Jewellery", image: "/category-assets/jewellery/d5370.webp", position: "center", href: "#/jewellery" },
  { title: "Beauty", image: "/category-assets/beauty/592d7.webp", position: "center", href: "#/beauty" },
  { title: "Lifestyle", image: "/category-assets/lifestyle/c4150.webp", position: "center", href: "#/lifestyle" },
  { title: "Editorial", image: "/category-assets/fashion/118de.webp", position: "center", href: "#/editorial" },
  { title: "Product", image: "/category-assets/jewellery/IMG_0455.webp", position: "center", href: "#/product" },
  { title: "Campaigns", image: "/category-assets/lifestyle/64F4EE33-ED62-4124-B90F-47D466AB4784_L0_001-26_8_2026, 7_03_21 AM.webp", position: "center", href: "#/campaigns" },
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

export default function App() {
  const [route, setRoute] = useState(() =>
    window.location.hash.startsWith("#/")
      ? window.location.hash.slice(2).split("/")[0]
      : "",
  )

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash
      if (
        route === "about" &&
        !hash.startsWith("#/") &&
        document.getElementById(hash.slice(1))
      ) {
        return
      }

      const nextRoute = hash.startsWith("#/") ? hash.slice(2).split("/")[0] : ""
      setRoute(nextRoute)
      if (nextRoute && nextRoute !== route) window.scrollTo({ top: 0 })
    }
    window.addEventListener("hashchange", handleHashChange)
    return () => window.removeEventListener("hashchange", handleHashChange)
  }, [route])

  if (route === "about") {
    return <AboutPage />
  }

  if (isCategory(route)) {
    return <CategoryPage category={route} />
  }

  return (
    <main>
      <Header />

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
        <WorkGrid items={work} />
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

      <section className="point-of-view">
        <div className="film">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster={`${A}/film-poster.svg`}
            aria-hidden="true"
          >
            <source src={`${A}/film.mp4`} type="video/mp4" />
          </video>
          <h2 className="film__title">
            Attention is earned.
            <br />
            Recognition is built.
          </h2>
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
          <a className="text-link" href="#/about">
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
          <ContactForm />
        </div>
      </section>
      <Footer />
    </main>
  )
}
