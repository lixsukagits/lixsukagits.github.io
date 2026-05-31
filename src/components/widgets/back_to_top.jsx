import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronUp } from 'lucide-react'

/**
 * back_to_top.jsx
 * Versi upgrade: progress ring SVG mengelilingi tombol,
 * muncul setelah scroll 400px, tooltip persentase saat hover.
 */

const SIZE   = 44
const STROKE = 3
const R      = (SIZE / 2) - STROKE - 1
const CIRC   = 2 * Math.PI * R

export default function BackToTop() {
  const [show,     setShow]     = useState(false)
  const [progress, setProgress] = useState(0)

  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    setProgress(docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0)
    setShow(scrollTop > 400)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  const offset = CIRC * (1 - progress)

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Kembali ke atas"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{   opacity: 0, scale: 0.7 }}
          transition={{ type: 'spring', stiffness: 300, damping: 22 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.92 }}
          style={{
            position: 'relative',
            width: SIZE, height: SIZE,
            borderRadius: '50%',
            background: 'var(--card-bg)',
            border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
            padding: 0,
          }}
        >
          {/* SVG progress ring */}
          <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}
            style={{ position: 'absolute', inset: 0, transform: 'rotate(-90deg)' }}
            aria-hidden="true">
            {/* Track */}
            <circle cx={SIZE/2} cy={SIZE/2} r={R} fill="none"
              stroke="var(--border)" strokeWidth={STROKE} />
            {/* Progress */}
            <motion.circle cx={SIZE/2} cy={SIZE/2} r={R} fill="none"
              stroke="var(--primary)" strokeWidth={STROKE} strokeLinecap="round"
              strokeDasharray={CIRC}
              animate={{ strokeDashoffset: offset }}
              transition={{ duration: 0.1, ease: 'linear' }} />
          </svg>

          {/* Icon */}
          <ChevronUp size={16} style={{ color: 'var(--primary)', position: 'relative', zIndex: 1 }} />

          {/* Percentage tooltip saat hover */}
          <motion.span
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            style={{
              position: 'absolute', top: -24, left: '50%',
              transform: 'translateX(-50%)',
              fontSize: '0.6rem', fontWeight: 700,
              color: 'var(--primary)', background: 'var(--card-bg)',
              border: '1px solid var(--border)', borderRadius: 999,
              padding: '0.1rem 0.35rem', whiteSpace: 'nowrap',
              pointerEvents: 'none',
            }}
          >
            {Math.round(progress * 100)}%
          </motion.span>
        </motion.button>
      )}
    </AnimatePresence>
  )
}