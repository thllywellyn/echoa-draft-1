import { useEffect, useRef } from "react"

export function DeferredVideo({
  src,
  poster,
  ariaHidden,
}: {
  src: string
  poster?: string
  ariaHidden?: boolean
}) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!video.src) video.src = src
          void video.play().catch((error: unknown) => {
            if (!(error instanceof DOMException && error.name === "NotAllowedError")) {
              console.error("Unable to play portfolio video.", error)
            }
          })
        } else {
          video.pause()
        }
      },
      { rootMargin: "200px" },
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [src])

  return (
    <video
      ref={videoRef}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden={ariaHidden}
    />
  )
}
