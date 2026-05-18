import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, Compass } from 'lucide-react'
import PageWrapper from '../components/ui/page_wrapper'

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

// FIX: NAV_LINKS label pakai nav.* keys — reuse translation yang sudah ada
const NAV_LINK_KEYS = [
  { to: '/',            navKey: 'home',        icon: <Home size={14} /> },
  { to: '/achievement', navKey: 'achievement', icon: <span className="text-xs">🏆</span> },
  { to: '/about',       navKey: 'about',       icon: <span className="text-xs">👤</span> },
  { to: '/contact',     navKey: 'contact',     icon: <span className="text-xs">💬</span> },
]

export default function NotFoundPage() {
  const { t } = useTranslation()
  const [glitch, setGlitch] = useState(false)

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

        {/* Background glow blob — decorative, tetap inline */}
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

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 max-w-md w-full"
        >
          {/* 404 glitch number — textShadow + transform kondisional, tetap inline */}
          <div className="relative mb-4 select-none">
            <motion.h1
              className="font-display font-extrabold text-[var(--primary)]"
              style={{
                fontSize: 'clamp(96px, 20vw, 160px)',
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

            {glitch && (
              <>
                <h1 className="font-display font-extrabold absolute inset-0 pointer-events-none"
                  style={{ fontSize: 'clamp(96px, 20vw, 160px)', color: '#ff0066', lineHeight: 1,
                    letterSpacing: '-0.04em', opacity: 0.4, transform: 'translate(4px, -2px)',
                    clipPath: 'inset(30% 0 50% 0)' }}>
                  404
                </h1>
                <h1 className="font-display font-extrabold absolute inset-0 pointer-events-none"
                  style={{ fontSize: 'clamp(96px, 20vw, 160px)', color: '#00cfff', lineHeight: 1,
                    letterSpacing: '-0.04em', opacity: 0.4, transform: 'translate(-4px, 2px)',
                    clipPath: 'inset(60% 0 10% 0)' }}>
                  404
                </h1>
              </>
            )}
          </div>

          {/* Compass */}
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
              <Compass size={28} className="text-[var(--primary)]" />
            </div>
          </motion.div>

          {/* FIX: hardcode text → t() + style={{ color }} → className */}
          <motion.h2
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="font-display font-bold text-2xl mb-2 text-[var(--dark)]"
            className="text-tracked-tight"
          >
            {t('not_found.title')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            className="text-sm mb-8 text-[var(--body-color)]"
            style={{ lineHeight: 1.75 }}
          >
            {t('not_found.desc')}
          </motion.p>

          {/* Primary CTA */}
          <motion.div
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }} className="mb-6"
          >
            <motion.div
              whileHover={{ scale: 1.04, boxShadow: '0 12px 32px rgba(55,88,249,0.35)' }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              className="inline-block"
            >
              {/* FIX: hardcode 'Kembali ke Beranda' → t() + style={{ background }} → className */}
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-semibold
                           text-white text-sm bg-[var(--primary)]"
              >
                <Home size={16} /> {t('not_found.cta')}
              </Link>
            </motion.div>
          </motion.div>

          {/* Quick nav */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            {/* FIX: hardcode 'Atau langsung ke:' → t() + style={{ color }} → className */}
            <p className="text-xs mb-3 text-[var(--body-color)]">{t('not_found.or')}</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {NAV_LINK_KEYS.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.55 + i * 0.07 }}
                  whileHover={{ y: -3 }}
                >
                  {/* FIX: hardcode label → t(nav.*) + style={{ background, border, color }} → className */}
                  <Link
                    to={link.to}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold
                               transition-colors bg-[var(--card-bg)] border border-[var(--border)]
                               text-[var(--body-color)] hover:border-[var(--primary)] hover:text-[var(--primary)]"
                  >
                    {link.icon} {t(`nav.${link.navKey}`)}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* FIX: hardcode error string → t() + style={{ color, opacity }} → className */}
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
            className="mt-10 text-xs text-[var(--body-color)] opacity-50"
          >
            {t('not_found.error')}
          </motion.p>
        </motion.div>
      </div>
    </PageWrapper>
  )
}