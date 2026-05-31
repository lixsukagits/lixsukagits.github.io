import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'

/**
 * reading_progress.jsx
 * Dua komponen:
 *
 * 1. ReadingTime — estimasi waktu baca berdasarkan word count
 *    Props: text (string konten artikel)
 *
 * 2. ReadingProgress — progress bar scroll di atas modal/halaman
 *    Props: containerRef (ref ke scrollable container)
 *
 * Taruh di: src/components/ui/reading_progress.jsx
 */

/* ─── READING TIME ───────────────────────────────────────────── */
export function ReadingTime({ text = '', className = '' }) {
  const wordCount = text.trim().split(/\s+/).length
  // Rata-rata baca orang Indonesia: ~200 kata/menit
  // Mandarin: ~300 karakter/menit
  const hasChineseChars = /[\u4e00-\u9fff]/.test(text)
  const mins = hasChineseChars
    ? Math.ceil(text.replace(/[^\u4e00-\u9fff]/g, '').length / 300)
    : Math.max(1, Math.ceil(wordCount / 200))

  return (
    <span
      className={className}
      style={{ fontSize: '0.72rem', color: 'var(--body-color)',
        display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}
      title={`~${wordCount} kata`}
    >
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
        aria-hidden="true">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
      {mins} menit baca
    </span>
  )
}

/* ─── READING PROGRESS BAR ───────────────────────────────────── */
export function ReadingProgress({ containerRef }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const el = containerRef?.current
    if (!el) return

    const handler = () => {
      const { scrollTop, scrollHeight, clientHeight } = el
      const total = scrollHeight - clientHeight
      if (total <= 0) { setProgress(100); return }
      setProgress(Math.min(100, Math.round((scrollTop / total) * 100)))
    }

    el.addEventListener('scroll', handler, { passive: true })
    handler()
    return () => el.removeEventListener('scroll', handler)
  }, [containerRef])

  return (
    <div style={{
      position: 'sticky', top: 0, left: 0, right: 0,
      height: 3, background: 'var(--border)', zIndex: 10,
      borderRadius: '0 2px 2px 0',
    }}>
      <motion.div
        style={{
          height: '100%', borderRadius: '0 2px 2px 0',
          background: 'linear-gradient(90deg, var(--primary), #7c3aed)',
          transformOrigin: 'left',
        }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.1, ease: 'linear' }}
      />
      {/* Percentage pill */}
      {progress > 5 && progress < 100 && (
        <motion.span
          animate={{ left: `${progress}%` }}
          transition={{ duration: 0.1 }}
          style={{
            position: 'absolute', top: 4, transform: 'translateX(-50%)',
            fontSize: '0.55rem', fontWeight: 700,
            color: 'var(--primary)', background: 'var(--card-bg)',
            border: '1px solid var(--border)', borderRadius: 999,
            padding: '0.1rem 0.3rem', whiteSpace: 'nowrap',
            pointerEvents: 'none',
          }}
        >
          {progress}%
        </motion.span>
      )}
    </div>
  )
}

/* ─── COMBINED: Article Progress Indicator ───────────────────── */
export default function ArticleProgress({ text, containerRef }) {
  return (
    <div>
      <ReadingProgress containerRef={containerRef} />
      <div style={{ padding: '0.4rem 1.5rem', display: 'flex', alignItems: 'center',
        justifyContent: 'flex-end', borderBottom: '1px solid var(--border)' }}>
        <ReadingTime text={text} />
      </div>
    </div>
  )
}