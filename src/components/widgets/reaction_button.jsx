import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * ReactionButton — floating like button di pojok kanan bawah
 * - Data disimpan di localStorage per halaman
 * - Animasi confetti particles saat diklik
 * - Auto-hide saat scroll ke bawah, muncul lagi saat scroll ke atas
 */

const REACTIONS = [
  { emoji: '❤️', label: 'Love' },
  { emoji: '🔥', label: 'Fire' },
  { emoji: '👏', label: 'Clap' },
  { emoji: '🤩', label: 'Wow' },
]

function Particle({ x, y, emoji }) {
  return (
    <motion.span
      initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      animate={{ opacity: 0, x: x, y: y, scale: 0.5 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      style={{
        position: 'absolute',
        fontSize: 18,
        pointerEvents: 'none',
        userSelect: 'none',
        bottom: 0, right: 0,
        zIndex: 10,
      }}
    >
      {emoji}
    </motion.span>
  )
}

export default function ReactionButton() {
  const { pathname } = useLocation()
  const storageKey = `felix-reactions-${pathname}`

  const [counts, setCounts] = useState(() => {
    try {
      const saved = localStorage.getItem(storageKey)
      return saved ? JSON.parse(saved) : REACTIONS.reduce((acc, r) => ({ ...acc, [r.label]: 0 }), {})
    } catch { return REACTIONS.reduce((acc, r) => ({ ...acc, [r.label]: 0 }), {}) }
  })
  const [myReaction, setMyReaction] = useState(() => {
    try { return localStorage.getItem(`${storageKey}-mine`) || null }
    catch { return null }
  })
  const [open, setOpen] = useState(false)
  const [particles, setParticles] = useState([])
  const [visible, setVisible] = useState(true)
  const lastScrollY = useState(0)

  // Sync counts ke localStorage tiap berubah
  useEffect(() => {
    try { localStorage.setItem(storageKey, JSON.stringify(counts)) }
    catch {}
  }, [counts, storageKey])

  // Reset state saat pindah halaman
  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey)
      setCounts(saved ? JSON.parse(saved) : REACTIONS.reduce((acc, r) => ({ ...acc, [r.label]: 0 }), {}))
      setMyReaction(localStorage.getItem(`${storageKey}-mine`) || null)
    } catch {}
    setOpen(false)
  }, [pathname])

  // Hide saat scroll down, show saat scroll up
  useEffect(() => {
    let last = window.scrollY
    const onScroll = () => {
      const cur = window.scrollY
      setVisible(cur < last || cur < 80)
      last = cur
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleReact = (reaction) => {
    const isUndo = myReaction === reaction.label

    setCounts(prev => {
      const next = { ...prev }
      if (isUndo) {
        next[reaction.label] = Math.max(0, next[reaction.label] - 1)
      } else {
        if (myReaction) next[myReaction] = Math.max(0, next[myReaction] - 1)
        next[reaction.label] = (next[reaction.label] || 0) + 1
      }
      return next
    })

    const newReaction = isUndo ? null : reaction.label
    setMyReaction(newReaction)
    try { localStorage.setItem(`${storageKey}-mine`, newReaction || '') }
    catch {}

    if (!isUndo) {
      // Spawn particles
      const newParticles = Array.from({ length: 5 }, (_, i) => ({
        id: Date.now() + i,
        emoji: reaction.emoji,
        x: (Math.random() - 0.5) * 80,
        y: -(40 + Math.random() * 60),
      }))
      setParticles(prev => [...prev, ...newParticles])
      setTimeout(() => {
        setParticles(prev => prev.filter(p => !newParticles.find(n => n.id === p.id)))
      }, 800)
    }

    setOpen(false)
  }

  const totalReactions = Object.values(counts).reduce((a, b) => a + b, 0)
  const dominantReaction = REACTIONS.reduce((a, b) => counts[a.label] >= counts[b.label] ? a : b)

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '5rem',
        right: '1.25rem',
        zIndex: 90,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
      }}
    >
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            style={{
              background: 'var(--card-bg)',
              border: '1px solid var(--border)',
              borderRadius: '1rem',
              padding: '0.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
              boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
            }}
          >
            {REACTIONS.map((r, i) => (
              <motion.button
                key={r.label}
                onClick={() => handleReact(r)}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '6px 10px',
                  borderRadius: 10,
                  background: myReaction === r.label ? 'var(--primary-light)' : 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: 20,
                  transition: 'background 0.15s',
                }}
                title={r.label}
              >
                <span>{r.emoji}</span>
                <span style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: myReaction === r.label ? 'var(--primary)' : 'var(--body-color)',
                  minWidth: 16,
                  textAlign: 'right',
                }}>
                  {counts[r.label] || 0}
                </span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main button */}
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            style={{ position: 'relative' }}
          >
            {/* Particles */}
            <AnimatePresence>
              {particles.map(p => (
                <Particle key={p.id} x={p.x} y={p.y} emoji={p.emoji} />
              ))}
            </AnimatePresence>

            <motion.button
              onClick={() => setOpen(v => !v)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              style={{
                width: 52,
                height: 52,
                borderRadius: '50%',
                background: myReaction ? 'var(--primary)' : 'var(--card-bg)',
                border: `1.5px solid ${myReaction ? 'var(--primary)' : 'var(--border)'}`,
                boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 0,
                position: 'relative',
                overflow: 'visible',
              }}
              aria-label="React to this page"
            >
              <span style={{ fontSize: 20, lineHeight: 1 }}>
                {myReaction ? dominantReaction.emoji : '🩶'}
              </span>
              {totalReactions > 0 && (
                <span style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: myReaction ? '#fff' : 'var(--primary)',
                  lineHeight: 1,
                  marginTop: 1,
                }}>
                  {totalReactions}
                </span>
              )}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}