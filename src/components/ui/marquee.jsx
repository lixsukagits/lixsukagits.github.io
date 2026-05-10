import { useRef } from 'react'

/**
 * marquee.jsx
 * Teks berjalan horizontal — loop tanpa henti.
 * Pause saat hover.
 * Taruh di: src/components/ui/marquee.jsx
 *
 * Pemakaian:
 *   <Marquee items={['IT Enthusiast', 'Web Developer', ...]} />
 */
export default function Marquee({ items = [], speed = 35, separator = '·' }) {
  const trackRef = useRef(null)

  // Duplikasi items supaya loop seamless
  const allItems = [...items, ...items, ...items]

  return (
    <div
      className="marquee-wrapper"
      style={{
        overflow: 'hidden',
        width: '100%',
        position: 'relative',
        maskImage: 'linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)',
      }}
    >
      <div
        ref={trackRef}
        className="marquee-track"
        style={{
          display: 'flex',
          gap: '0',
          width: 'max-content',
          animation: `marqueeScroll ${speed}s linear infinite`,
        }}
        onMouseEnter={() => { if (trackRef.current) trackRef.current.style.animationPlayState = 'paused' }}
        onMouseLeave={() => { if (trackRef.current) trackRef.current.style.animationPlayState = 'running' }}
      >
        {allItems.map((item, i) => (
          <span
            key={i}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0 1.5rem',
              fontSize: '0.8rem',
              fontWeight: 600,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              color: 'var(--body-color)',
              whiteSpace: 'nowrap',
              userSelect: 'none',
            }}
          >
            <span style={{ color: 'var(--primary)', fontSize: '1rem' }}>{separator}</span>
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}