import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

/**
 * font_size_toggle.jsx
 * Tombol A- / A+ untuk perbesar/kecilkan semua teks.
 * Tersimpan di localStorage.
 * Taruh di: src/components/widgets/font_size_toggle.jsx
 * Import & render di app.jsx (di dalam FloatingStack atau sendiri)
 */

const SIZES = [
  { id: 'sm',  label: 'A-', scale: 0.9  },
  { id: 'md',  label: 'A',  scale: 1    }, // default
  { id: 'lg',  label: 'A+', scale: 1.12 },
]

function applyFontSize(scale) {
  document.documentElement.style.fontSize = `${scale * 16}px`
}

export default function FontSizeToggle() {
  const [current, setCurrent] = useState(() => {
    try { return localStorage.getItem('felix-fontsize') || 'md' }
    catch { return 'md' }
  })
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const size = SIZES.find(s => s.id === current) || SIZES[1]
    applyFontSize(size.scale)
    try { localStorage.setItem('felix-fontsize', current) }
    catch {}
  }, [current])

  const currentSize = SIZES.find(s => s.id === current) || SIZES[1]

  return (
    <div style={{ position: 'relative' }}>
      <motion.button
        onClick={() => setOpen(v => !v)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        title="Ukuran teks"
        aria-label="Ubah ukuran teks"
        style={{
          width: 40, height: 40,
          borderRadius: '50%',
          background: 'var(--card-bg)',
          border: '1.5px solid var(--border)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'var(--body-color)',
          fontSize: '0.75rem', fontWeight: 700,
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        }}
      >
        {currentSize.label}
      </motion.button>

      {open && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 4 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'absolute',
            bottom: '110%', right: 0,
            background: 'var(--card-bg)',
            border: '1px solid var(--border)',
            borderRadius: '0.75rem',
            overflow: 'hidden',
            boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
            minWidth: 100,
          }}
        >
          {SIZES.map(s => (
            <button
              key={s.id}
              onClick={() => { setCurrent(s.id); setOpen(false) }}
              style={{
                width: '100%',
                padding: '0.5rem 0.75rem',
                textAlign: 'left',
                fontSize: '0.8rem',
                fontWeight: current === s.id ? 700 : 400,
                color: current === s.id ? 'var(--primary)' : 'var(--dark)',
                background: current === s.id ? 'var(--primary-light)' : 'transparent',
                border: 'none',
                display: 'flex', alignItems: 'center', gap: 8,
              }}
            >
              <span style={{ fontWeight: 700, fontSize: s.scale * 14 }}>{s.label}</span>
              <span style={{ color: 'var(--body-color)', fontSize: '0.72rem' }}>
                {s.id === 'sm' ? 'Kecil' : s.id === 'md' ? 'Normal' : 'Besar'}
              </span>
              {current === s.id && <span style={{ marginLeft: 'auto', fontSize: '0.65rem' }}>✓</span>}
            </button>
          ))}
        </motion.div>
      )}
    </div>
  )
}