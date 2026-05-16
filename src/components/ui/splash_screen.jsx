import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * splash_screen.jsx
 * Animasi: loading bar → nama Felix muncul → fade out → onDone()
 *
 * FIX: onDone di-capture via useRef agar timer tidak reset
 *      jika parent re-render dan kirim reference baru.
 */
export default function SplashScreen({ onDone }) {
  const [phase, setPhase] = useState(0)
  // 0 = loading bar
  // 1 = nama muncul
  // 2 = exit fade

  // Guard: capture onDone sekali, tidak jadi dependency timer
  const onDoneRef = useRef(onDone)
  useEffect(() => { onDoneRef.current = onDone }, [onDone])

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 500)
    const t2 = setTimeout(() => setPhase(2), 1800)
    const t3 = setTimeout(() => onDoneRef.current?.(), 2400)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, []) // intentionally empty — timer hanya berjalan sekali

  return (
    <AnimatePresence>
      {phase < 2 && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--bg)',
          }}
        >
          {/* Loading bar — phase 0 */}
          <AnimatePresence>
            {phase === 0 && (
              <motion.div
                key="bar"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  width: 100,
                  height: 2,
                  background: 'var(--border)',
                  borderRadius: 2,
                  overflow: 'hidden',
                }}
              >
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 0.8, ease: 'easeInOut' }}
                  style={{ height: '100%', background: 'var(--primary)', borderRadius: 2 }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Nama Felix — phase 1 */}
          <AnimatePresence>
            {phase === 1 && (
              <motion.div
                key="name"
                initial={{ opacity: 0, y: 24, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -16, scale: 1.02 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                style={{ textAlign: 'center' }}
              >
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(3rem, 10vw, 6rem)',
                  fontWeight: 900,
                  color: 'var(--dark)',
                  letterSpacing: '-0.04em',
                  lineHeight: 1,
                }}>
                  Felix<span style={{ color: 'var(--primary)' }}>.</span>
                </div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.25 }}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    letterSpacing: '0.25em',
                    textTransform: 'uppercase',
                    color: 'var(--body-color)',
                    marginTop: '0.75rem',
                  }}
                >
                  Portfolio
                </motion.p>

                {/* Dots animasi */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  style={{ display: 'flex', gap: 6, justifyContent: 'center', marginTop: '2rem' }}
                  aria-hidden="true"
                >
                  {[0, 1, 2].map(i => (
                    <motion.span
                      key={i}
                      animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 0.7, repeat: Infinity, delay: i * 0.15, ease: 'easeInOut' }}
                      style={{
                        width: 5,
                        height: 5,
                        borderRadius: '50%',
                        background: 'var(--primary)',
                        display: 'block',
                      }}
                    />
                  ))}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  )
}