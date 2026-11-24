import { Fragment } from "react"
import { Footer, Header } from "../components/layout"
import "./AboutPage.css"

const assets = "/assets"

const stats = [
  ["04", "Categories: fashion, jewellery, beauty, lifestyle"],
  ["04", "Stages from first idea to finished asset"],
  ["02", "Founders leading every project"],
  ["01", "Belief: be remembered, not just seen"],
]

const steps = [
  ["Strategy", "Understanding the brand and building a purposeful content direction."],
  [
    "Creative direction",
    "Shaping concepts, visual language, storytelling and the overall creative approach.",
  ],
  [
    "Production",
    "Bringing ideas to life through thoughtful shoots and coordinated creative production.",
  ],
  [
    "Execution",
    "Turning finished content into ready-to-use brand assets and supporting publishing where required.",
  ],
]

const disciplines = ["Fashion", "Jewellery", "Beauty", "Lifestyle"]

function Arrow() {
  return <span aria-hidden="true">↗</span>
}

export default function AboutPage() {
  return (
    <div className="about-page">
      <Header />

      <main id="top">
        <section className="hero" aria-label="ECHOA founders">
          <img className="hero-layer hero-fashion" src={`${assets}/85bcc.png`} alt="" />
          <img className="hero-layer hero-image" src={`${assets}/43474.png`} alt="" />
          <img
            className="hero-layer hero-portrait"
            src={`${assets}/44632.png`}
            alt="Two ECHOA founders wearing pink flowers"
          />
          <div className="hero-shade" />
        </section>

        <section className="intro section-pad" id="about">
          <div className="intro-heading">
            <h1>
              We create content that
              <br />
              gives brands a presence.
            </h1>
            <p>We create content that gives brands a presence.</p>
          </div>
          <p className="intro-copy">
            ECHOA is a brand content company working with fashion, jewellery, beauty and lifestyle
            brands. We bring together strategy, creative direction and production to create
            considered content that helps brands communicate who they are, what they stand for and
            why they matter.
          </p>
        </section>

        <section className="stats section-pad" aria-label="ECHOA at a glance">
          <p className="stats-lead">
            Strategy, creative direction and production, brought together to create content for
            brands.
          </p>
          <div className="stats-grid">
            {stats.map(([number, label], index) => (
              <Fragment key={label}>
                <div className="stat">
                  <strong>{number}</strong>
                  <span>{label}</span>
                </div>
                {index < stats.length - 1 && (
                  <img className="stats-divider" src={`${assets}/cd569.svg`} alt="" />
                )}
              </Fragment>
            ))}
          </div>
        </section>

        <section className="belief section-pad">
          <p className="eyebrow light">What we believe</p>
          <h2>
            Brands deserve to be remembered, <em>not just seen.</em>
          </h2>
          <div className="belief-grid">
            <p>In a world constantly producing more content, being visible is no longer enough.</p>
            <p>
              What makes a brand stay with someone is the thought behind what it puts out: the story
              it tells, the feeling it creates and the impression it leaves behind.
            </p>
            <p className="belief-quote">
              We believe every idea has the potential to create a ripple.
            </p>
          </div>
        </section>

        <section className="process section-pad" id="services">
          <div className="section-intro">
            <p className="eyebrow">How we work</p>
            <h2>From a thought to something tangible.</h2>
            <p>
              Good content doesn't begin with a camera. It begins with understanding the brand, its
              audience and what it needs to communicate.
            </p>
          </div>
          <div className="process-grid">
            {steps.map(([title, copy], index) => (
              <article className="process-card" key={title}>
                <span className="step-number">0{index + 1}</span>
                <span className="step-title">{title}</span>
                <span className="step-copy">{copy}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="services section-pad">
          <div className="services-copy">
            <p className="eyebrow light">What we do</p>
            <h2>
              Thoughtfully built.
              <br />
              <em>Creatively delivered.</em>
            </h2>
            <p>
              We work across the content process, offering brands the creative thinking and
              production support needed to show up with clarity and consistency.
            </p>
          </div>
          <div className="discipline-list">
            {disciplines.map((discipline) => (
              <a href="mailto:hello@echoa.in" key={discipline}>
                <span>{discipline}</span>
                <Arrow />
              </a>
            ))}
          </div>
        </section>

        <section className="people section-pad" id="people">
          <div className="people-heading">
            <div>
              <p className="eyebrow">The people behind the work</p>
              <h2>
                Creative thinking,
                <br />
                <em>with a collaborative spirit.</em>
              </h2>
            </div>
            <p>
              ECHOA is founded and creatively led by Jayshree Pruthi, with a belief in bringing
              thoughtful ideas and the right creative people together. From creative collaborators
              to production specialists, we bring together the right people and resources around
              each project's needs.
            </p>
          </div>
          <div className="portrait-grid">
            <article className="portrait">
              <img src={`${assets}/430eb.png`} alt="Jayshree Pruthi" />
              <div className="portrait-caption">
                <strong>Jayshree Pruthi</strong>
                <span>Founder &amp; Creative Lead</span>
              </div>
            </article>
            <article className="portrait">
              <img src={`${assets}/07477.png`} alt="Harshita Pandey" />
              <div className="portrait-caption">
                <strong>Harshita Pandey</strong>
                <span>Co founder</span>
              </div>
            </article>
          </div>
        </section>

        <section className="cta">
          <p className="eyebrow light">Let's create something</p>
          <h2>
            Let's build something
            <br />
            <em>worth remembering.</em>
          </h2>
          <p>Have a brand, a brief or an idea in mind? We'd love to hear about it.</p>
          <a href="mailto:hello@echoa.in?subject=Starting%20a%20project">
            Start a project <Arrow />
          </a>
        </section>
      </main>

      <Footer />
    </div>
  )
}
