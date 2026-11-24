import { useEffect, useState } from "react"
import { Footer, Header } from "../layout"
import { categoryAssets } from "virtual:category-gallery-assets"

type Category =
  | "fashion"
  | "jewellery"
  | "beauty"
  | "lifestyle"
  | "editorial"
  | "product"
  | "campaigns"

type SourceCategory = "fashion" | "jewellery" | "beauty" | "lifestyle"

const categorySources: Record<Category, SourceCategory> = {
  fashion: "fashion",
  jewellery: "jewellery",
  beauty: "beauty",
  lifestyle: "lifestyle",
  editorial: "fashion",
  product: "jewellery",
  campaigns: "lifestyle",
}

type GalleryItem = {
  name: string
  src?: string
  video?: boolean
  automatic?: boolean
}

const heroNames: Record<Category, string> = {
  fashion: "44632",
  jewellery: "d5370",
  beauty: "592d7",
  lifestyle: "c4150",
  editorial: "118de",
  product: "IMG_0455",
  campaigns: "64F4EE33-ED62-4124-B90F-47D466AB4784_L0_001-26_8_2026, 7_03_21 AM",
}

export function CategoryPage({ category }: { category: Category }) {
  const [selected, setSelected] = useState<number | null>(null)
  const [isMobileGallery, setIsMobileGallery] = useState(() =>
    window.matchMedia("(max-width: 560px)").matches,
  )
  const title = category[0].toUpperCase() + category.slice(1)
  const sourceCategory = categorySources[category]
  const galleryLayoutCategory =
    category === "editorial" || category === "product" || category === "campaigns"
      ? "jewellery"
      : category

  const excludedFashionAssets = new Set(["a4d6e", "b2ac7", "b9e70"])
  const gallery: GalleryItem[] = categoryAssets[sourceCategory]
    .filter((asset) => !(category === "fashion" && excludedFashionAssets.has(asset.name)))
    .map((asset) => ({
      name: asset.name,
      src: asset.src,
      video: asset.video,
      automatic: true,
    }))

  const base = `/category-assets/${sourceCategory}`

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 560px)")
    const updateGalleryLayout = () => setIsMobileGallery(mediaQuery.matches)
    mediaQuery.addEventListener("change", updateGalleryLayout)
    return () => mediaQuery.removeEventListener("change", updateGalleryLayout)
  }, [])

  useEffect(() => {
    if (selected === null) return
    const closeOnKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null)
      if (event.key === "ArrowRight") setSelected((selected + 1) % gallery.length)
      if (event.key === "ArrowLeft") setSelected((selected - 1 + gallery.length) % gallery.length)
    }
    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", closeOnKey)
    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", closeOnKey)
    }
  }, [selected, gallery.length])

  const heroName = heroNames[category]
  const renderGalleryItem = (item: GalleryItem, index: number) => {
    return (
      <button
        type="button"
        className={`category-gallery__item${item.video ? " category-gallery__item--video" : ""}${item.automatic ? " category-gallery__item--auto" : ""}`}
        key={`${item.name}-${index}`}
        onClick={() => setSelected(index)}
        aria-label={`View ${title} item ${index + 1}`}
      >
        {item.video ? (
          <video src={item.src ?? `${base}/${item.name}.mp4`} autoPlay muted loop playsInline preload="metadata" />
        ) : (
          <img
            src={item.src ?? `${base}/${item.name}.webp`}
            alt=""
            loading={index > 10 ? "lazy" : "eager"}
          />
        )}
        <span>View</span>
      </button>
    )
  }

  return (
    <main className="category-page">
      <Header />
      <section className={`category-hero category-hero--${category}`}>
        {category === "fashion" ? (
          <img className="category-hero__fashion-image" src={`${base}/44632.webp`} alt="" />
        ) : (
          <img src={`${base}/${heroName}.webp`} alt="" />
        )}
        <div className="category-hero__shade" />
        <h1>{title}</h1>
      </section>

      <section className="category-content section-shell" id="work">
        <div className="category-intro">
          <p>The work.</p>
          <h2>Work that leaves<br />an impression.</h2>
        </div>
        <div className={`category-gallery category-gallery--${galleryLayoutCategory}`} aria-label={`${title} portfolio`}>
          {isMobileGallery
            ? (
                <div className="category-gallery__mobile-masonry">
                  {gallery.map((item, index) => renderGalleryItem(item, index))}
                </div>
              )
            : (
                <div className="category-gallery__block category-gallery__block--auto">
                  {gallery.map((item, index) => renderGalleryItem(item, index))}
                </div>
              )}
        </div>
      </section>

      <Footer />

      {selected !== null && (
        <div className="category-lightbox" role="dialog" aria-modal="true" aria-label={`${title} image viewer`}>
          <button className="category-lightbox__backdrop" onClick={() => setSelected(null)} aria-label="Close viewer" />
          <button className="category-lightbox__close" onClick={() => setSelected(null)}>Close</button>
          <button
            className="category-lightbox__arrow category-lightbox__arrow--previous"
            onClick={() => setSelected((selected - 1 + gallery.length) % gallery.length)}
            aria-label="Previous item"
          >
            ←
          </button>
          {gallery[selected].video ? (
            <video src={gallery[selected].src ?? `${base}/${gallery[selected].name}.mp4`} autoPlay muted loop controls />
          ) : (
            <img src={gallery[selected].src ?? `${base}/${gallery[selected].name}.webp`} alt={`${title} item ${selected + 1}`} />
          )}
          <button
            className="category-lightbox__arrow category-lightbox__arrow--next"
            onClick={() => setSelected((selected + 1) % gallery.length)}
            aria-label="Next item"
          >
            →
          </button>
          <p>{String(selected + 1).padStart(2, "0")} / {gallery.length}</p>
        </div>
      )}
    </main>
  )
}
