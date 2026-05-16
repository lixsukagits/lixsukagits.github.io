import { useState, useRef, useEffect, useCallback } from 'react'

/**
 * LazyImage — gambar dengan:
 * - Skeleton shimmer selama loading
 * - Fade-in smooth saat gambar selesai load
 * - Intersection Observer: hanya load saat masuk viewport
 * - Native loading="lazy" sebagai fallback
 * - Error state jika src gagal load
 *
 * Pemakaian (drop-in pengganti <img>):
 *   <LazyImage src={url} alt="..." className="w-full h-full object-cover" />
 */
export default function LazyImage({
  src,
  alt,
  className = '',
  style = {},
  wrapperClassName = '',
  wrapperStyle = {},
}) {
  const [loaded, setLoaded]   = useState(false)
  const [error, setError]     = useState(false)
  const [inView, setInView]   = useState(false)
  const wrapperRef            = useRef(null)

  // Intersection Observer — mulai load gambar hanya saat 100px dari viewport
  useEffect(() => {
    const el = wrapperRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { rootMargin: '100px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const handleLoad  = useCallback(() => setLoaded(true), [])
  const handleError = useCallback(() => setError(true), [])

  // Normalize alt: jika undefined/null → empty string (valid untuk dekoratif),
  // tapi tetap terima string kosong yang disengaja dari parent.
  const safeAlt = alt ?? ''

  return (
    <div
      ref={wrapperRef}
      className={`img-wrapper ${loaded ? 'img-done' : ''} ${wrapperClassName}`}
      style={{ width: '100%', height: '100%', position: 'relative', ...wrapperStyle }}
    >
      {/* Skeleton shimmer — tampil selama belum loaded & tidak error */}
      {!loaded && !error && (
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'var(--border)',
            borderRadius: 'inherit',
            animation: 'shimmer 1.4s ease-in-out infinite',
          }}
        />
      )}

      {/* Error state */}
      {error && (
        <div
          role="img"
          aria-label={safeAlt || 'Gambar tidak dapat dimuat'}
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
            background: 'var(--border)',
            borderRadius: 'inherit',
            color: 'var(--body-color)',
          }}
        >
          {/* Broken image icon — inline SVG, zero dependency */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
            aria-hidden="true">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="m3 9 5 5 4-4 5 6" />
            <line x1="3" y1="3" x2="21" y2="21" />
          </svg>
          <span style={{ fontSize: '0.7rem', opacity: 0.6 }}>Gagal memuat</span>
        </div>
      )}

      {/* Gambar asli — hanya render saat masuk viewport */}
      {inView && !error && (
        <img
          src={src}
          alt={safeAlt}
          className={`${loaded ? 'loaded' : 'loading'} ${className}`}
          style={{
            width: '100%',
            height: '100%',
            display: 'block',
            opacity: loaded ? 1 : 0,
            transition: 'opacity 0.35s ease',
            ...style,
          }}
          loading="lazy"
          decoding="async"
          onLoad={handleLoad}
          onError={handleError}
        />
      )}
    </div>
  )
}