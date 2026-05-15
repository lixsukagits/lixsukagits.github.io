import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, ArrowLeft, Compass } from 'lucide-react'
import PageWrapper from '../components/ui/page_wrapper'

// ── Floating particles ──────────────────────────────────────────
const PARTICLES = [
  { emoji: '💻', x: 12, y: 20, delay: 0,    duration: 4.2 },
  { emoji: '🏆', x: 80, y: 15, delay: 0.6,  duration: 3.8 },
  { emoji: '🎯', x: 70, y: 75, delay: 1.1,  duration: 4.5 },
  { emoji: '🇨🇳', x: 15, y: 70, delay: 0.3,  duration: 3.6 },
  { emoji: '🥇', x: 88, y: 45, delay: 0.9,  duration: 4.0 },
  { emoji: '⚡', x: 45, y: 10, delay: 1.4,  duration: 3.5 },
  { emoji: '🔌', x: 5,  y: 45, delay: 0.7,  duration: 4.3 },
  { emoji: '📸', x: 92, y: 80, delay: 1.2,  duration: 3.9 },
]

// ── Quick nav links ─────────────────────────────────────────────
const NAV_LINKS = [
  { to: '/',            label: 'Beranda',   icon: <Home size={14} /> },
  { to: '/achievement', label: 'Prestasi',  icon: <span className="text-xs">🏆</span> },
  { to: '/about',       label: 'Tentang',   icon: <span className="text-xs">👤</span> },
  { to: '/contact',     label: 'Kontak',    icon: <span className="text-xs">💬</span> },
]

export default function NotFoundPage() {
  const [glitch, setGlitch] = useState(false)

  // Trigger glitch effect randomly
  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true)
      setTimeout(() => setGlitch(false), 200)
    }, 3500)
    return () => clearInterval(interval)
  }, [])

  return (
    <PageWrapper>
      <div className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">

        {/* Floating emoji particles */}
        {PARTICLES.map((p, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl select-none pointer-events-none"
            style={{ left: `${p.x}%`, top: `${p.y}%` }}
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
          >
            <motion.span
              animate={{ opacity: [0.15, 0.4, 0.15] }}
              transition={{ duration: p.duration, repeat: Infinity, delay: p.delay }}
            >
              {p.emoji}
            </motion.span>
          </motion.div>
        ))}

        {/* Background glow blob */}
        <motion.div
          className="absolute rounded-full pointer-events-none -z-10"
          style={{
            width: 500, height: 500,
            background: 'radial-gradient(circle, rgba(55,88,249,0.08), transparent 70%)',
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Main content */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 max-w-md w-full"
        >
          {/* 404 number with glitch */}
          <div className="relative mb-4 select-none">
            <motion.h1
              className="font-display font-extrabold"
              style={{
                fontSize: 'clamp(96px, 20vw, 160px)',
                color: 'var(--primary)',
                lineHeight: 1,
                letterSpacing: '-0.04em',
                textShadow: glitch
                  ? '3px 0 #ff006680, -3px 0 #00cfff80'
                  : '0 0 40px rgba(55,88,249,0.3)',
                transform: glitch ? `translate(${Math.random() * 4 - 2}px, 0)` : 'none',
                transition: 'text-shadow 0.05s, transform 0.05s',
              }}
            >
              404
            </motion.h1>

            {/* Glitch duplicate layers */}
            {glitch && (
              <>
                <h1
                  className="font-display font-extrabold absolute inset-0 pointer-events-none"
                  style={{
                    fontSize: 'clamp(96px, 20vw, 160px)',
                    color: '#ff0066',
                    lineHeight: 1,
                    letterSpacing: '-0.04em',
                    opacity: 0.4,
                    transform: 'translate(4px, -2px)',
                    clipPath: 'inset(30% 0 50% 0)',
                  }}
                >
                  404
                </h1>
                <h1
                  className="font-display font-extrabold absolute inset-0 pointer-events-none"
                  style={{
                    fontSize: 'clamp(96px, 20vw, 160px)',
                    color: '#00cfff',
                    lineHeight: 1,
                    letterSpacing: '-0.04em',
                    opacity: 0.4,
                    transform: 'translate(-4px, 2px)',
                    clipPath: 'inset(60% 0 10% 0)',
                  }}
                >
                  404
                </h1>
              </>
            )}
          </div>

          {/* Compass icon animated */}
          <motion.div
            className="flex justify-center mb-5"
            animate={{ rotate: [0, 15, -15, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
          >
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{
                background: 'rgba(55,88,249,0.12)',
                border: '1px solid rgba(55,88,249,0.25)',
                boxShadow: '0 0 24px rgba(55,88,249,0.15)',
              }}
            >
              <Compass size={28} style={{ color: 'var(--primary)' }} />
            </div>
          </motion.div>

          {/* Text */}
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="font-display font-bold text-2xl mb-2"
            style={{ color: 'var(--dark)', letterSpacing: '0.01em' }}
          >
            Tersesat, nih?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-sm mb-8"
            style={{ color: 'var(--body-color)', lineHeight: 1.75 }}
          >
            Halaman yang kamu cari tidak ada atau sudah dipindahkan.
            <br />Yuk balik ke jalur yang benar!
          </motion.p>

          {/* Primary CTA */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-6"
          >
            <motion.div
              whileHover={{ scale: 1.04, boxShadow: '0 12px 32px rgba(55,88,249,0.35)' }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              className="inline-block"
            >
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-semibold text-white text-sm"
                style={{ background: 'var(--primary)' }}
              >
                <Home size={16} /> Kembali ke Beranda
              </Link>
            </motion.div>
          </motion.div>

          {/* Quick nav */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-xs mb-3" style={{ color: 'var(--body-color)' }}>
              Atau langsung ke:
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.55 + i * 0.07 }}
                  whileHover={{ y: -3 }}
                >
                  <Link
                    to={link.to}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors"
                    style={{
                      background: 'var(--card-bg)',
                      border: '1px solid var(--border)',
                      color: 'var(--body-color)',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = 'var(--primary)'
                      e.currentTarget.style.color = 'var(--primary)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = 'var(--border)'
                      e.currentTarget.style.color = 'var(--body-color)'
                    }}
                  >
                    {link.icon} {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Fun footer note */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="mt-10 text-xs"
            style={{ color: 'var(--body-color)', opacity: 0.5 }}
          >
            Error 404 · Felix Raymond Portfolio
          </motion.p>
        </motion.div>
      </div>
    </PageWrapper>
  )
}