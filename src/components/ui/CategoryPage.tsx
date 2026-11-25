import { useEffect, useState } from "react"
import { Footer, Header } from "../layout"
import { categoryAssets } from "virtual:category-gallery-assets"

type Category =
  | "fashion"
  | "jewellery"
  | "beauty"
  | "lifestyle"
  | "accessories"
  | "food-and-beverages"
  | "pet-care"

type SourceCategory = Category

const fallbackCategories: Partial<Record<Category, SourceCategory>> = {
  accessories: "fashion",
  "food-and-beverages": "jewellery",
  "pet-care": "lifestyle",
}

type GalleryItem = {
  name: string
  src?: string
  video?: boolean
  automatic?: boolean
}

function shuffleItems<T>(items: T[]): T[] {
  const shuffled = [...items]
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1))
    const currentItem = shuffled[index]
    shuffled[index] = shuffled[swapIndex]
    shuffled[swapIndex] = currentItem
  }
  return shuffled
}

function shuffleGalleryItems(items: GalleryItem[]): GalleryItem[] {
  const photos = shuffleItems(items.filter((item) => !item.video))
  const videos = shuffleItems(items.filter((item) => item.video))
  const videoSlots = Array.from({ length: photos.length + 1 }, () => [] as GalleryItem[])
  const slotOrder = shuffleItems(videoSlots.map((_, index) => index))

  videos.forEach((video, index) => {
    videoSlots[slotOrder[index % slotOrder.length]].push(video)
  })

  return videoSlots.flatMap((slot, index) => [
    ...shuffleItems(slot),
    ...(photos[index] ? [photos[index]] : []),
  ])
}

export function CategoryPage({
  category,
  heroImage,
}: {
  category: Category
  heroImage: string
}) {
  const [selected, setSelected] = useState<number | null>(null)
  const [isMobileGallery, setIsMobileGallery] = useState(() =>
    window.matchMedia("(max-width: 560px)").matches,
  )
  const titles: Record<Category, string> = {
    fashion: "Fashion",
    jewellery: "Jewellery",
    beauty: "Beauty",
    lifestyle: "Lifestyle",
    accessories: "Accessories",
    "food-and-beverages": "Food and Beverages",
    "pet-care": "Pet Care",
  }
  const title = titles[category]
  const hasCategoryAssets = categoryAssets[category].length > 0
  const sourceCategory = hasCategoryAssets
    ? category
    : fallbackCategories[category] ?? category
  const galleryLayoutCategory =
    category === "accessories" ||
    category === "food-and-beverages" ||
    category === "pet-care"
      ? "jewellery"
      : category

  const [gallery] = useState(() => {
    const excludedFashionAssets = new Set(["a4d6e", "echoa_white", "echoa_red"])
    const items: GalleryItem[] = categoryAssets[sourceCategory]
      .filter((asset) => !(category === "fashion" && excludedFashionAssets.has(asset.name)))
      .map((asset) => ({
        name: asset.name,
        src: asset.src,
        video: asset.video,
        automatic: true,
      }))
    return shuffleGalleryItems(items)
  })

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
      if (event.key === "ArrowLeft") {
        setSelected((selected - 1 + gallery.length) % gallery.length)
      }
    }
    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", closeOnKey)
    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", closeOnKey)
    }
  }, [selected, gallery.length])

  const renderGalleryItem = (item: GalleryItem, index: number) => {
    const className = [
      "category-gallery__item",
      item.video && "category-gallery__item--video",
      item.automatic && "category-gallery__item--auto",
    ]
      .filter(Boolean)
      .join(" ")

    return (
      <button
        type="button"
        className={className}
        key={`${item.name}-${index}`}
        onClick={() => setSelected(index)}
        aria-label={`View ${title} item ${index + 1}`}
      >
        {item.video ? (
          <video
            src={item.src ?? `${base}/${item.name}.mp4`}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
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
        <img
          className={category === "fashion" ? "category-hero__fashion-image" : undefined}
          src={heroImage}
          alt=""
        />
        <div className="category-hero__shade" />
        <h1>{title}</h1>
      </section>

      <section className="category-content section-shell" id="work">
        <div className="category-intro">
          <p>The work.</p>
          <h2>
            Work that leaves
            <br />
            an impression.
          </h2>
        </div>
        <div
          className={`category-gallery category-gallery--${galleryLayoutCategory}`}
          aria-label={`${title} portfolio`}
        >
          {isMobileGallery ? (
            <div className="category-gallery__mobile-masonry">
              {gallery.map((item, index) => renderGalleryItem(item, index))}
            </div>
          ) : (
            <div className="category-gallery__block category-gallery__block--auto">
              {gallery.map((item, index) => renderGalleryItem(item, index))}
            </div>
          )}
        </div>
      </section>

      <Footer />

      {selected !== null && (
        <div
          className="category-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${title} image viewer`}
        >
          <button
            className="category-lightbox__backdrop"
            onClick={() => setSelected(null)}
            aria-label="Close viewer"
          />
          <button
            className="category-lightbox__close"
            onClick={() => setSelected(null)}
          >
            Close
          </button>
          <button
            className="category-lightbox__arrow category-lightbox__arrow--previous"
            onClick={() => setSelected((selected - 1 + gallery.length) % gallery.length)}
            aria-label="Previous item"
          >
            ←
          </button>
          {gallery[selected].video ? (
            <video
              src={gallery[selected].src ?? `${base}/${gallery[selected].name}.mp4`}
              autoPlay
              muted
              loop
              controls
            />
          ) : (
            <img
              src={gallery[selected].src ?? `${base}/${gallery[selected].name}.webp`}
              alt={`${title} item ${selected + 1}`}
            />
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
