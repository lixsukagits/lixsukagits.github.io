import { useState, useRef, useEffect } from 'react'

/**
 * LazyImage — gambar dengan:
 * - Skeleton shimmer selama loading
 * - Fade-in smooth saat gambar selesai load
 * - Intersection Observer: hanya load saat masuk viewport
 *
 * Pemakaian (drop-in pengganti <img>):
 *   <LazyImage src={url} alt="..." className="w-full h-full object-cover" />
 */
export default function LazyImage({ src, alt, className = '', style = {}, wrapperClassName = '', wrapperStyle = {} }) {
  const [loaded, setLoaded] = useState(false)
  const [inView, setInView] = useState(false)
  const wrapperRef = useRef(null)

  // Intersection Observer — mulai load gambar hanya saat 100px dari viewport
  useEffect(() => {
    if (!wrapperRef.current) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect() } },
      { rootMargin: '100px' }
    )
    observer.observe(wrapperRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={wrapperRef}
      className={`img-wrapper ${loaded ? 'img-done' : ''} ${wrapperClassName}`}
      style={{ width: '100%', height: '100%', ...wrapperStyle }}
    >
      {inView && (
        <img
          src={src}
          alt={alt}
          className={`${loaded ? 'loaded' : 'loading'} ${className}`}
          style={{ width: '100%', height: '100%', display: 'block', ...style }}
          onLoad={() => setLoaded(true)}
          decoding="async"
        />
      )}
    </div>
  )
}