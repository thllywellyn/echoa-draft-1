import { Footer, Header } from "./components/layout"
import { CategoryPage } from "./components/ui/CategoryPage"
import {
  Accordion,
  ContactForm,
  SectionIntro,
  WorkGrid,
} from "./components/ui"
import { useEffect, useState } from "react"

const A = "/assets"

const work = [
  { title: "Fashion", image: "7904d.png", position: "center", href: "#/fashion" },
  { title: "Jewellery", image: "d5370.png", position: "center top", href: "#/jewellery" },
  { title: "Beauty", image: "592d7.png", position: "58% center", href: "#/beauty" },
  { title: "Lifestyle", image: "c4150.png", position: "right center", href: "#/lifestyle" },
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
  const [category, setCategory] = useState(() => window.location.hash.replace("#/", "").split("/")[0])

  useEffect(() => {
    const handleHashChange = () => {
      setCategory(window.location.hash.replace("#/", "").split("/")[0])
      window.scrollTo({ top: 0 })
    }
    window.addEventListener("hashchange", handleHashChange)
    return () => window.removeEventListener("hashchange", handleHashChange)
  }, [])

  if (["fashion", "jewellery", "beauty", "lifestyle"].includes(category)) {
    return <CategoryPage category={category as "fashion" | "jewellery" | "beauty" | "lifestyle"} />
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
          <ContactForm />
        </div>
      </section>
      <Footer />
    </main>
  )
}
