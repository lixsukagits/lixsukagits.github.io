import { useRef } from 'react'

/**
 * marquee.jsx — pause on hover fix
 * Taruh di: src/components/ui/marquee.jsx
 */
export default function Marquee({ items = [], speed = 35, separator = '·' }) {
  const trackRef = useRef(null)

  // Duplikasi 3x supaya loop seamless
  const allItems = [...items, ...items, ...items]

  return (
    <div
      style={{
        overflow: 'hidden',
        width: '100%',
        maskImage: 'linear-gradient(90deg, transparent 0%, black 6%, black 94%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, black 6%, black 94%, transparent 100%)',
      }}
      // Pause saat hover wrapper — lebih reliable daripada hover track
      onMouseEnter={() => { if (trackRef.current) trackRef.current.style.animationPlayState = 'paused' }}
      onMouseLeave={() => { if (trackRef.current) trackRef.current.style.animationPlayState = 'running' }}
    >
      <div
        ref={trackRef}
        style={{
          display: 'flex',
          width: 'max-content',
          animation: `marqueeScroll ${speed}s linear infinite`,
          animationPlayState: 'running',
          willChange: 'transform',
        }}
      >
        {allItems.map((item, i) => (
          <span
            key={i}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0 1.5rem',
              fontSize: '0.75rem',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--body-color)',
              whiteSpace: 'nowrap',
              userSelect: 'none',
            }}
          >
            <span style={{ color: 'var(--primary)', fontSize: '1.1rem', lineHeight: 1 }}>{separator}</span>
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}