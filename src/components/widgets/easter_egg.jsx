import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * easter_egg.jsx
 * Ketik "felix" di keyboard mana saja → konfeti + pesan rahasia muncul.
 * Taruh di: src/components/widgets/easter_egg.jsx
 * Import & render di app.jsx
 */

const SECRET = 'felix'
const EMOJIS = ['🎉','✨','🔥','🏆','💻','🇨🇳','🏸','⭐','🎊','💙']

function Particle({ x, y, emoji, delay }) {
  return (
    <motion.div
      initial={{ opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 }}
      animate={{
        opacity: 0,
        x: x,
        y: y,
        scale: 0,
        rotate: Math.random() * 360,
      }}
      transition={{ duration: 1.2, delay, ease: 'easeOut' }}
      style={{
        position: 'fixed',
        left: '50%',
        top: '40%',
        fontSize: '1.5rem',
        pointerEvents: 'none',
        zIndex: 99999,
        userSelect: 'none',
      }}
    >
      {emoji}
    </motion.div>
  )
}

export default function EasterEgg() {
  const [buffer, setBuffer] = useState('')
  const [show, setShow] = useState(false)
  const [particles, setParticles] = useState([])

  useEffect(() => {
    const handler = (e) => {
      // Abaikan saat typing di input/textarea
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return

      const next = (buffer + e.key).slice(-SECRET.length)
      setBuffer(next)

      if (next === SECRET) {
        setBuffer('')
        // Spawn particles
        const newParticles = Array.from({ length: 20 }, (_, i) => ({
          id: Date.now() + i,
          emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
          x: (Math.random() - 0.5) * 400,
          y: -(Math.random() * 300 + 100),
          delay: i * 0.04,
        }))
        setParticles(newParticles)
        setShow(true)
        setTimeout(() => { setShow(false); setParticles([]) }, 3500)
      }
    }

    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [buffer])

  return (
    <>
      {/* Particles */}
      <AnimatePresence>
        {particles.map(p => (
          <Particle key={p.id} x={p.x} y={p.y} emoji={p.emoji} delay={p.delay} />
        ))}
      </AnimatePresence>

      {/* Modal pesan */}
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            style={{
              position: 'fixed',
              top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 99998,
              background: 'var(--card-bg)',
              border: '1px solid var(--border)',
              borderRadius: '1.25rem',
              padding: '2rem 2.5rem',
              textAlign: 'center',
              boxShadow: '0 32px 64px rgba(0,0,0,0.2)',
              maxWidth: 340,
              width: '90vw',
            }}
          >
            <div style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>🎉</div>
            <h3 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.25rem', fontWeight: 700,
              color: 'var(--dark)', marginBottom: '0.5rem',
            }}>
              Easter Egg ditemukan!
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--body-color)', lineHeight: 1.6 }}>
              Kamu berhasil menemukan pesan rahasia Felix! 🏆<br />
              <strong style={{ color: 'var(--primary)' }}>学无止境</strong> — Belajar tidak ada batasnya.
            </p>
            <button
              onClick={() => setShow(false)}
              style={{
                marginTop: '1.25rem',
                padding: '0.5rem 1.5rem',
                borderRadius: '9999px',
                background: 'var(--primary)',
                color: '#fff',
                fontWeight: 600,
                fontSize: '0.8rem',
                border: 'none',
              }}
            >
              Keren! ✨
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setShow(false)}
            style={{
              position: 'fixed', inset: 0,
              background: 'rgba(0,0,0,0.4)',
              backdropFilter: 'blur(4px)',
              zIndex: 99997,
            }}
          />
        )}
      </AnimatePresence>
    </>
  )
}