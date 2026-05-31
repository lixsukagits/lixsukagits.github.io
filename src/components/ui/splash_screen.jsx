import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * splash_screen.jsx
 * Animasi: loading bar → nama Felix muncul → fade out → onDone()
 * Tidak perlu i18n — "Felix." dan "Portfolio" adalah brand name, bukan UI string.
 */
export default function SplashScreen({ onDone }) {
  const [phase, setPhase] = useState(0)
  // 0 = loading bar | 1 = nama muncul | 2 = exit fade

  const onDoneRef = useRef(onDone)
  useEffect(() => { onDoneRef.current = onDone }, [onDone])

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 500)
    const t2 = setTimeout(() => setPhase(2), 1800)
    const t3 = setTimeout(() => onDoneRef.current?.(), 2400)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [])

  return (
    <AnimatePresence>
      {phase < 2 && (
        // FIX: style={{ position, inset, zIndex, display, flexDirection, alignItems,
        //      justifyContent, background }} → Tailwind
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[var(--bg)]"
        >
          {/* Loading bar — phase 0 */}
          <AnimatePresence>
            {phase === 0 && (
              // FIX: style={{ width, height, background, borderRadius, overflow }} → Tailwind
              <motion.div
                key="bar"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-[100px] h-[2px] bg-[var(--border)] rounded-sm overflow-hidden"
              >
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 0.8, ease: 'easeInOut' }}
                  className="h-full bg-[var(--primary)] rounded-sm"
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
                className="text-center"
              >
                {/* font-hero + clamp tetap inline — tidak ada Tailwind equiv */}
                <div className="font-hero text-[var(--dark)]" style={{
                  fontSize: 'clamp(3rem, 10vw, 6rem)',
                  fontWeight: 900,
                  letterSpacing: '-0.04em',
                  lineHeight: 1,
                }}>
                  Felix<span className="text-[var(--primary)]">.</span>
                </div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.25 }}
                  className="font-body section-label mt-3"
                >
                  Portfolio
                </motion.p>

                {/* Dots animasi */}
                {/* FIX: style={{ display, gap, justifyContent, marginTop }} → Tailwind */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="flex gap-1.5 justify-center mt-8"
                  aria-hidden="true"
                >
                  {[0, 1, 2].map(i => (
                    <motion.span
                      key={i}
                      animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 0.7, repeat: Infinity, delay: i * 0.15, ease: 'easeInOut' }}
                      // FIX: style={{ width, height, borderRadius, background, display }} → Tailwind
                      className="w-[5px] h-[5px] rounded-full bg-[var(--primary)] block"
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