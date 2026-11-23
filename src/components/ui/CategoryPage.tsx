import { useEffect, useState } from "react"
import { Footer, Header } from "../layout"
import { categoryAssets } from "virtual:category-gallery-assets"

type Category = "fashion" | "jewellery" | "beauty" | "lifestyle"

type GalleryItem = {
  name: string
  area?: string
  src?: string
  position?: string
  video?: boolean
  automatic?: boolean
}

const fashionBlocks: GalleryItem[][] = [
  [
    { name: "cae9a", area: "1 / 1 / 2 / 21" },
    { name: "118de", area: "1 / 21 / 2 / 41", position: "center 35%" },
    { name: "d1197", area: "1 / 41 / 2 / 61" },
    { name: "7904d", area: "1 / 61 / 2 / 81" },
    { name: "da3c7", area: "1 / 81 / 2 / 100" },
    { name: "9b7c0", area: "2 / 1 / 3 / 29", position: "center 42%" },
    { name: "82a3a", area: "2 / 29 / 3 / 59", position: "center 32%" },
    { name: "6d8df", area: "2 / 59 / 3 / 100", position: "center 30%" },
    { name: "sitaar-and-saree", area: "1 / 100 / 3 / 131", video: true },
  ],
  [
    { name: "41d57", area: "1 / 1 / 2 / 30", position: "center 38%" },
    { name: "hargunz", area: "1 / 30 / 3 / 61", video: true },
    { name: "b1a31", area: "1 / 61 / 2 / 89" },
    { name: "0b292", area: "1 / 89 / 2 / 131", position: "center 35%" },
    { name: "34663", area: "2 / 1 / 3 / 30" },
    { name: "099d0", area: "2 / 61 / 3 / 99", position: "center 35%" },
    { name: "44632", area: "2 / 99 / 3 / 131", position: "center 22%" },
  ],
  [
    { name: "81ffc", area: "1 / 1 / 2 / 25" },
    { name: "dress", area: "1 / 25 / 3 / 56", video: true },
    { name: "877b6", area: "1 / 56 / 2 / 79" },
    { name: "7b9a0", area: "1 / 79 / 2 / 105", position: "center 35%" },
    { name: "f3bfe", area: "1 / 105 / 2 / 131" },
    { name: "572b3", area: "2 / 1 / 3 / 25" },
    { name: "cc1f2", area: "2 / 56 / 3 / 79" },
    { name: "b57c0", area: "2 / 79 / 3 / 101" },
    { name: "8ff5d", area: "2 / 101 / 3 / 131", position: "center 26%" },
  ],
  [
    { name: "saint-black", area: "1 / 1 / 3 / 32", video: true },
    { name: "44f58", area: "1 / 32 / 2 / 52" },
    { name: "f5ef3", area: "1 / 52 / 2 / 72" },
    { name: "dc220", area: "1 / 72 / 2 / 92" },
    { name: "83616", area: "1 / 92 / 2 / 112" },
    { name: "2a831", area: "1 / 112 / 2 / 131", position: "center 30%" },
    { name: "eee8f", area: "2 / 32 / 3 / 60", position: "center 35%" },
    { name: "046c5", area: "2 / 60 / 3 / 90" },
    { name: "3cf04", area: "2 / 90 / 3 / 131", position: "center 28%" },
  ],
  [
    { name: "0b8c3", area: "1 / 1 / 2 / 27", position: "center 38%" },
    { name: "42381", area: "1 / 27 / 3 / 53", position: "center 30%" },
    { name: "cb400", area: "1 / 53 / 2 / 79" },
    { name: "937ac", area: "1 / 79 / 2 / 105", position: "center 34%" },
    { name: "359f1", area: "1 / 105 / 2 / 131" },
    { name: "7d42f", area: "2 / 1 / 3 / 27" },
    { name: "07d94", area: "2 / 53 / 3 / 85", position: "center 35%" },
    { name: "c88bd", area: "2 / 85 / 3 / 131", position: "center 32%" },
  ],
]

const heroNames: Record<Category, string> = {
  fashion: "44632",
  jewellery: "d5370",
  beauty: "592d7",
  lifestyle: "c4150",
}

const otherBlocks: Record<Exclude<Category, "fashion">, GalleryItem[][]> = {
  jewellery: [[
    { name: "d5370", area: "1 / 1 / 5 / 5" },
    { name: "98fd8", area: "1 / 5 / 3 / 9" },
    { name: "39a39", area: "1 / 9 / 5 / 13" },
    { name: "b2ac7", area: "3 / 5 / 7 / 9" },
    { name: "a05f7", area: "5 / 1 / 9 / 5" },
    { name: "2a5ea", area: "5 / 9 / 9 / 13" },
    { name: "7904d", area: "7 / 5 / 10 / 9" },
  ]],
  beauty: [[
    { name: "592d7", area: "1 / 1 / 4 / 4" },
    { name: "98fd8", area: "1 / 4 / 3 / 7" },
    { name: "39a39", area: "1 / 7 / 4 / 11" },
    { name: "b2ac7", area: "3 / 4 / 7 / 7" },
    { name: "a05f7", area: "4 / 1 / 7 / 4" },
    { name: "2a5ea", area: "4 / 7 / 7 / 11" },
  ]],
  lifestyle: [[
    { name: "c4150", area: "1 / 1 / 5 / 7" },
    { name: "98fd8", area: "1 / 7 / 4 / 12" },
    { name: "39a39", area: "5 / 1 / 9 / 5" },
    { name: "b2ac7", area: "4 / 7 / 8 / 12" },
    { name: "a05f7", area: "8 / 5 / 11 / 12" },
    { name: "7904d", area: "9 / 1 / 12 / 5" },
  ]],
}

export function CategoryPage({ category }: { category: Category }) {
  const [selected, setSelected] = useState<number | null>(null)
  const [isMobileGallery, setIsMobileGallery] = useState(() =>
    window.matchMedia("(max-width: 560px)").matches,
  )
  const title = category[0].toUpperCase() + category.slice(1)

  const galleryBlocks = category === "fashion"
    ? fashionBlocks
    : otherBlocks[category]
  const placedItems = galleryBlocks.flat()
  const placedNames = new Set(placedItems.map((item) => item.name))
  const excludedFashionAssets = new Set(["a4d6e", "b2ac7", "b9e70"])
  const automaticItems: GalleryItem[] = categoryAssets[category]
    .filter((asset) =>
      !placedNames.has(asset.name) &&
      !(category === "fashion" && excludedFashionAssets.has(asset.name)),
    )
    .map((asset) => ({
      name: asset.name,
      src: asset.src,
      video: asset.video,
      automatic: true,
    }))
  const renderedBlocks = automaticItems.length > 0
    ? [...galleryBlocks, automaticItems]
    : galleryBlocks
  const gallery = [...placedItems, ...automaticItems]

  const base = `/category-assets/${category}`

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
  const mobileColumns: { item: GalleryItem; index: number }[][] = [[], []]
  const mobileColumnHeights = [0, 0]
  gallery.forEach((item, index) => {
    const estimatedHeight = item.video
      ? 16 / 9
      : item.automatic
        ? 1
        : index % 7 === 0
          ? 10 / 16
          : index % 7 === 2 || index % 7 === 5
            ? 5 / 4
            : 1
    const column = mobileColumnHeights[0] <= mobileColumnHeights[1] ? 0 : 1
    mobileColumns[column].push({ item, index })
    mobileColumnHeights[column] += estimatedHeight
  })

  const renderGalleryItem = (item: GalleryItem, index: number, mobile: boolean) => {
    const mobileShape = item.video || item.automatic
      ? ""
      : index % 7 === 0
        ? " category-gallery__item--wide"
        : index % 7 === 2 || index % 7 === 5
          ? " category-gallery__item--portrait"
          : " category-gallery__item--square"

    return (
      <button
        type="button"
        className={`category-gallery__item${item.video ? " category-gallery__item--video" : ""}${item.automatic ? " category-gallery__item--auto" : ""}${mobileShape}`}
        style={!mobile && item.area ? { gridArea: item.area } : undefined}
        key={`${item.name}-${index}`}
        onClick={() => setSelected(index)}
        aria-label={`View ${title} item ${index + 1}`}
      >
        {item.video ? (
          <video src={item.src ?? `${base}/${item.name}.mp4`} autoPlay muted loop playsInline preload="metadata" />
        ) : (
          <img
            src={item.src ?? `${base}/${item.name}.png`}
            alt=""
            style={{ objectPosition: item.position ?? "center" }}
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
          <img className="category-hero__fashion-image" src={`${base}/44632.png`} alt="" />
        ) : (
          <img src={`${base}/${heroName}.png`} alt="" />
        )}
        <div className="category-hero__shade" />
        <h1>{title}</h1>
      </section>

      <section className="category-content section-shell" id="work">
        <div className="category-intro">
          <p>The work.</p>
          <h2>Work that leaves<br />an impression.</h2>
        </div>
        <div className={`category-gallery category-gallery--${category}`} aria-label={`${title} portfolio`}>
          {isMobileGallery
            ? mobileColumns.map((column, columnIndex) => (
                <div className="category-gallery__mobile-column" key={columnIndex}>
                  {column.map(({ item, index }) => renderGalleryItem(item, index, true))}
                </div>
              ))
            : renderedBlocks.map((block, blockIndex) => {
                const blockStart = galleryBlocks
                  .slice(0, blockIndex)
                  .reduce((total, currentBlock) => total + currentBlock.length, 0)
                return (
                  <div
                    className={`category-gallery__block${blockIndex >= galleryBlocks.length ? " category-gallery__block--auto" : ""}`}
                    key={blockIndex}
                  >
                    {block.map((item, itemIndex) =>
                      renderGalleryItem(item, blockStart + itemIndex, false),
                    )}
                  </div>
                )
              })}
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
            <img src={gallery[selected].src ?? `${base}/${gallery[selected].name}.png`} alt={`${title} item ${selected + 1}`} />
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
