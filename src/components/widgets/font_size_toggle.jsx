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
    // FIX: style={{ position:'relative' }} → className
    <div className="relative">
      {/* FIX: style={{ width, height, borderRadius, background, border, display, alignItems,
           justifyContent, color, fontSize, fontWeight, boxShadow, cursor }} → Tailwind */}
      <motion.button
        onClick={() => setOpen(v => !v)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label={t('font.toggle_label', 'Ubah ukuran teks')}
        aria-expanded={open}
        aria-haspopup="menu"
        className="w-11 h-11 rounded-full bg-[var(--card-bg)] border border-[var(--border)]
                   flex items-center justify-center text-[var(--body-color)]
                   text-[0.75rem] font-bold shadow-[0_4px_12px_rgba(0,0,0,0.08)] cursor-pointer
                   border-[1.5px]"
      >
        {currentSize.label}
      </motion.button>

      <AnimatePresence>
        {open && (
          // FIX: style={{ position, bottom, right, background, border, borderRadius, overflow,
          //      boxShadow, minWidth, zIndex }} → Tailwind
          <motion.div
            role="menu"
            aria-label={t('font.menu_label', 'Pilihan ukuran teks')}
            initial={{ opacity: 0, scale: 0.9, y: 4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 4 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute bottom-[110%] right-0 bg-[var(--card-bg)] border border-[var(--border)]
                       rounded-xl overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.12)]
                       min-w-[110px] z-50"
          >
            {SIZES.map(s => {
              const isActive = current === s.id
              return (
                // FIX: style={{ width, padding, minHeight, textAlign, fontSize, fontWeight,
                //      color, background, border, display, alignItems, gap, cursor }} → Tailwind
                <button
                  key={s.id}
                  role="menuitemradio"
                  aria-checked={isActive}
                  onClick={() => { setCurrent(s.id); setOpen(false) }}
                  className={`w-full px-3 py-2 min-h-11 text-left text-[0.8rem] border-none
                              flex items-center gap-2 cursor-pointer transition-colors
                              ${isActive
                                ? 'font-bold text-[var(--primary)] bg-[var(--primary-light)]'
                                : 'font-normal text-[var(--dark)] bg-transparent'
                              }`}
                >
                  {/* font size pada span ini tetap inline — nilai dinamis dari data */}
                  <span className="font-bold" style={{ fontSize: s.scale * 14 }} aria-hidden="true">
                    {s.label}
                  </span>
                  <span className="text-[0.72rem] text-[var(--body-color)]">
                    {t(s.labelKey, FALLBACKS[s.labelKey])}
                  </span>
                  {isActive && (
                    <span className="ml-auto text-[0.65rem]" aria-hidden="true">✓</span>
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