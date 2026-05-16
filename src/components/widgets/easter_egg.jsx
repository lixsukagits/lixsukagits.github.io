import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const SECRET = 'felix'
const EMOJIS = ['🎉','✨','🔥','🏆','💻','🇨🇳','🏸','⭐','🎊','💙','🌟','🎯','🚀','💎','🦋']

/* ─── PARTICLE ───────────────────────────────────────────────── */
function Particle({ x, y, emoji, delay, rotate, scale }) {
  return (
    <motion.div
      aria-hidden="true"
      initial={{ opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 }}
      animate={{ opacity: 0, x, y, scale, rotate }}
      transition={{ duration: 1.4, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'fixed',
        left: '50%', top: '42%',
        fontSize: '1.6rem',
        pointerEvents: 'none',
        zIndex: 99999,
        userSelect: 'none',
      }}
    >
      {emoji}
    </motion.div>
  )
}

/* ─── EASTER EGG ─────────────────────────────────────────────── */
export default function EasterEgg() {
  const [buffer, setBuffer]     = useState('')
  const [show, setShow]         = useState(false)
  const [particles, setParticles] = useState([])
  const closeRef = useRef(null)

  useEffect(() => {
    const handler = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return
      const next = (buffer + e.key).slice(-SECRET.length)
      setBuffer(next)

      if (next === SECRET) {
        setBuffer('')
        // FIX: rotate & scale dihitung sekali saat spawn — bukan di animate prop
        const newParticles = Array.from({ length: 28 }, (_, i) => ({
          id: Date.now() + i,
          emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
          x: (Math.random() - 0.5) * 500,
          y: -(Math.random() * 380 + 80),
          rotate: Math.random() * 720 - 360,
          scale: Math.random() * 0.5 + 0.2,
          delay: i * 0.03,
        }))
        setParticles(newParticles)
        setShow(true)
        setTimeout(() => { setShow(false); setParticles([]) }, 4000)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [buffer])

  // Focus close button saat modal muncul
  useEffect(() => {
    if (show) setTimeout(() => closeRef.current?.focus(), 80)
  }, [show])

  const close = () => { setShow(false); setParticles([]) }

  return (
    <>
      {/* Particles */}
      <AnimatePresence>
        {particles.map(p => (
          <Particle key={p.id} x={p.x} y={p.y} emoji={p.emoji}
            delay={p.delay} rotate={p.rotate} scale={p.scale} />
        ))}
      </AnimatePresence>

      {/* Backdrop */}
      <AnimatePresence>
        {show && (
          <motion.div
            aria-hidden="true"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={close}
            style={{
              position: 'fixed', inset: 0,
              background: 'rgba(0,0,0,0.55)',
              backdropFilter: 'blur(6px)',
              zIndex: 99997,
            }}
          />
        )}
      </AnimatePresence>

      {/* Modal */}
      <AnimatePresence>
        {show && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Easter egg ditemukan"
            initial={{ opacity: 0, scale: 0.75, y: 32 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.75, y: 32 }}
            transition={{ type: 'spring', stiffness: 320, damping: 22 }}
            style={{
              position: 'fixed',
              top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 99998,
              borderRadius: '1.5rem',
              padding: '2.5rem 2rem 2rem',
              textAlign: 'center',
              maxWidth: 360,
              width: '90vw',
              overflow: 'hidden',
              /* Elegant glassmorphism card */
              background: 'var(--card-bg)',
              border: '1px solid var(--border)',
              boxShadow: '0 40px 80px rgba(0,0,0,0.25), 0 0 0 1px rgba(55,88,249,0.12)',
            }}
          >
            {/* Gradient glow top */}
            <div aria-hidden="true" style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: 4,
              background: 'linear-gradient(90deg, var(--primary), #7c3aed, #06b6d4, var(--primary))',
              backgroundSize: '200% auto',
              animation: 'gradientShift 3s linear infinite',
            }} />

            {/* Floating blob bg */}
            <div aria-hidden="true" style={{
              position: 'absolute', top: -40, right: -40,
              width: 160, height: 160, borderRadius: '50%',
              background: 'radial-gradient(circle, var(--primary), transparent 70%)',
              opacity: 0.08, pointerEvents: 'none',
            }} />

            {/* Big emoji */}
            <motion.div
              aria-hidden="true"
              animate={{ rotate: [0, -8, 8, -8, 0], scale: [1, 1.15, 1] }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{ fontSize: '3.5rem', marginBottom: '1rem', display: 'block' }}
            >
              🎉
            </motion.div>

            {/* Title */}
            <h3 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.3rem', fontWeight: 800,
              color: 'var(--dark)', marginBottom: '0.5rem',
              letterSpacing: '-0.02em',
            }}>
              Easter Egg Ditemukan!
            </h3>

            {/* Divider */}
            <div style={{
              width: 40, height: 3, borderRadius: 2, margin: '0.75rem auto',
              background: 'linear-gradient(90deg, var(--primary), #7c3aed)',
            }} aria-hidden="true" />

            {/* Message */}
            <p style={{
              fontSize: '0.875rem', color: 'var(--body-color)',
              lineHeight: 1.7, marginBottom: '0.5rem',
            }}>
              Selamat! Kamu berhasil menemukan pesan rahasia Felix 🏆
            </p>

            {/* Chinese quote */}
            <div style={{
              margin: '1rem auto',
              padding: '0.75rem 1.25rem',
              borderRadius: '0.75rem',
              background: 'var(--primary-light)',
              border: '1px solid var(--border)',
              display: 'inline-block',
            }}>
              <p style={{
                fontSize: '1.2rem', fontWeight: 800,
                color: 'var(--primary)', letterSpacing: '0.08em',
                marginBottom: '0.2rem',
              }}>
                学无止境
              </p>
              <p style={{ fontSize: '0.72rem', color: 'var(--body-color)', fontStyle: 'italic' }}>
                "Belajar tidak ada batasnya"
              </p>
            </div>

            {/* Tags */}
            <div style={{
              display: 'flex', flexWrap: 'wrap', gap: 6,
              justifyContent: 'center', margin: '1rem 0 1.5rem',
            }} aria-hidden="true">
              {['#IT Enthusiast','#Web Dev','#China 🇨🇳','#Badminton 🏸'].map(tag => (
                <span key={tag} style={{
                  fontSize: '0.68rem', fontWeight: 600,
                  padding: '0.25rem 0.6rem', borderRadius: 999,
                  background: 'var(--bg)', border: '1px solid var(--border)',
                  color: 'var(--body-color)',
                }}>
                  {tag}
                </span>
              ))}
            </div>

            {/* Close button */}
            <motion.button
              ref={closeRef}
              onClick={close}
              aria-label="Tutup easter egg"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              style={{
                padding: '0.65rem 2rem',
                borderRadius: 9999,
                background: 'linear-gradient(135deg, var(--primary), #7c3aed)',
                color: '#fff',
                fontWeight: 700, fontSize: '0.85rem',
                border: 'none', cursor: 'pointer',
                boxShadow: '0 8px 24px rgba(55,88,249,0.35)',
                minWidth: 44, minHeight: 44,
              }}
            >
              Keren! <span aria-hidden="true">✨</span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}