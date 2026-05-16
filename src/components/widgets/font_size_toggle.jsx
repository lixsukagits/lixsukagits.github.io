import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'

const SIZES = [
  { id: 'sm', labelKey: 'font.small',  label: 'A-', scale: 0.9  },
  { id: 'md', labelKey: 'font.normal', label: 'A',  scale: 1    },
  { id: 'lg', labelKey: 'font.large',  label: 'A+', scale: 1.12 },
]

const FALLBACKS = { 'font.small': 'Kecil', 'font.normal': 'Normal', 'font.large': 'Besar' }

function applyFontSize(scale) {
  document.documentElement.style.fontSize = `${scale * 16}px`
}

export default function FontSizeToggle() {
  const { t } = useTranslation()
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
      {/* FIX: 44×44px tap target, aria-expanded, aria-haspopup */}
      <motion.button
        onClick={() => setOpen(v => !v)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label={t('font.toggle_label', 'Ubah ukuran teks')}
        aria-expanded={open}
        aria-haspopup="menu"
        style={{
          width: 44, height: 44,
          borderRadius: '50%',
          background: 'var(--card-bg)',
          border: '1.5px solid var(--border)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'var(--body-color)',
          fontSize: '0.75rem', fontWeight: 700,
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          cursor: 'pointer',
        }}
      >
        {currentSize.label}
      </motion.button>

      {/* FIX: AnimatePresence wrapper agar exit animation berjalan */}
      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            aria-label={t('font.menu_label', 'Pilihan ukuran teks')}
            initial={{ opacity: 0, scale: 0.9, y: 4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 4 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              bottom: '110%', right: 0,
              background: 'var(--card-bg)',
              border: '1px solid var(--border)',
              borderRadius: '0.75rem',
              overflow: 'hidden',
              boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
              minWidth: 110,
              zIndex: 50,
            }}
          >
            {SIZES.map(s => {
              const isActive = current === s.id
              return (
                <button
                  key={s.id}
                  role="menuitemradio"
                  aria-checked={isActive}
                  onClick={() => { setCurrent(s.id); setOpen(false) }}
                  style={{
                    width: '100%',
                    padding: '0.5rem 0.75rem',
                    minHeight: 44,
                    textAlign: 'left',
                    fontSize: '0.8rem',
                    fontWeight: isActive ? 700 : 400,
                    color: isActive ? 'var(--primary)' : 'var(--dark)',
                    background: isActive ? 'var(--primary-light)' : 'transparent',
                    border: 'none',
                    display: 'flex', alignItems: 'center', gap: 8,
                    cursor: 'pointer',
                  }}
                >
                  <span style={{ fontWeight: 700, fontSize: s.scale * 14 }} aria-hidden="true">
                    {s.label}
                  </span>
                  {/* FIX: label pakai t() dengan fallback */}
                  <span style={{ color: 'var(--body-color)', fontSize: '0.72rem' }}>
                    {t(s.labelKey, FALLBACKS[s.labelKey])}
                  </span>
                  {/* FIX: checkmark aria-hidden — state sudah dari aria-checked */}
                  {isActive && (
                    <span style={{ marginLeft: 'auto', fontSize: '0.65rem' }} aria-hidden="true">✓</span>
                  )}
                </button>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}