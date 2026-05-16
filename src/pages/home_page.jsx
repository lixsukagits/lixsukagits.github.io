import { useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import CountUp from 'react-countup'
import { Helmet } from 'react-helmet-async'
import { useUserStore } from '../store/use_user_store'
import WelcomeModal from '../components/ui/welcome_modal'
import PageWrapper from '../components/ui/page_wrapper'
import SectionHeader from '../components/ui/section_header'
import Marquee from '../components/ui/marquee'
import LazyImage from '../components/ui/lazy_image'
import RevealText from '../components/ui/reveal_text'
import { profile } from '../data/profile'
import { achievements } from '../data/achievements'
import { projects } from '../data/projects'
import { Github, Mail, ExternalLink, ChevronDown,
         Trophy, Users, FolderGit2, ScrollText, Linkedin,
         Star, Globe } from 'lucide-react'

/* ─── CONSTANTS ─────────────────────────────────────────────── */
const MARQUEE_ITEMS = [
  'IT Enthusiast 🔥', 'Web Developer 💻', 'Olimpiade Informatika 🏆',
  'Medan, Indonesia 🇮🇩', 'Calon Mahasiswa China 🇨🇳',
  'HSK 3 Learner 学中文', 'Badminton Player 🏸', 'Open to Collaborate ✨',
]

/* ─── STAGGER VARIANTS ──────────────────────────────────────── */
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
}
const item = {
  hidden: { opacity: 0, y: 22 },
  show:   { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 280, damping: 22 } },
}

/* ─── SOCIAL LINK ───────────────────────────────────────────── */
function SocialLink({ href, children, label }) {
  return (
    <motion.a
      href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
      className="w-11 h-11 rounded-xl flex items-center justify-center"
      style={{ border: '1px solid var(--border)', color: 'var(--body-color)' }}
      whileHover={{ scale: 1.15, y: -3,
        borderColor: 'var(--primary)', color: 'var(--primary)',
        boxShadow: '0 8px 20px rgba(55,88,249,0.2)' }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      {children}
    </motion.a>
  )
}

/* ─── BENTO CELLS DATA ──────────────────────────────────────── */
const BENTO_CELLS = [
  {
    id: 'medals',
    end: 5, suffix: '+',
    label: 'Medali Emas',
    sublabel: 'Olimpiade Informatika',
    icon: Trophy, color: '#f59e0b', emoji: '🏆',
    gradient: 'linear-gradient(135deg, #fef3c7, #fde68a)',
    darkGradient: 'linear-gradient(135deg, rgba(245,158,11,0.18), rgba(245,158,11,0.06))',
  },
  {
    id: 'experience',
    end: 4, suffix: '+',
    label: 'Pengalaman',
    sublabel: 'Organisasi & Kepanitiaan',
    icon: Users, color: '#3758F9', emoji: '🤝',
    gradient: 'linear-gradient(135deg, #dbeafe, #bfdbfe)',
    darkGradient: 'linear-gradient(135deg, rgba(55,88,249,0.18), rgba(55,88,249,0.06))',
  },
  {
    id: 'projects',
    end: 3, suffix: '+',
    label: 'Proyek',
    sublabel: 'Web & Software',
    icon: FolderGit2, color: '#10b981', emoji: '💻',
    gradient: 'linear-gradient(135deg, #d1fae5, #a7f3d0)',
    darkGradient: 'linear-gradient(135deg, rgba(16,185,129,0.18), rgba(16,185,129,0.06))',
  },
  {
    id: 'certificates',
    end: 8, suffix: '+',
    label: 'Sertifikat',
    sublabel: 'IT & Pelatihan Profesional',
    icon: ScrollText, color: '#7c3aed', emoji: '📜',
    gradient: 'linear-gradient(135deg, #ede9fe, #ddd6fe)',
    darkGradient: 'linear-gradient(135deg, rgba(124,58,237,0.18), rgba(124,58,237,0.06))',
  },
  {
    id: 'ranking', custom: true, wide: true,
    label: 'Ranking 1',
    sublabel: 'SMK Telkom 2 Medan — 2025',
    icon: Star, color: '#f59e0b', emoji: '🥇',
    gradient: 'linear-gradient(135deg, #fffbeb, #fef3c7)',
    darkGradient: 'linear-gradient(135deg, rgba(245,158,11,0.14), rgba(245,158,11,0.04))',
  },
  {
    id: 'hsk', custom: true, wide: true,
    label: 'HSK 3',
    sublabel: 'Mandarin · 学中文 · Target HSK 4',
    icon: Globe, color: '#dc2626', emoji: '🇨🇳',
    gradient: 'linear-gradient(135deg, #fee2e2, #fecaca)',
    darkGradient: 'linear-gradient(135deg, rgba(220,38,38,0.18), rgba(220,38,38,0.06))',
  },
]

/* ─── BENTO CELL ────────────────────────────────────────────── */
function BentoCell({ cell, isDark, delay }) {
  const Icon = cell.icon
  return (
    <motion.div
      className="card relative overflow-hidden p-5 flex flex-col justify-between"
      style={{ minHeight: 140 }}
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ delay, type: 'spring', stiffness: 240, damping: 22 }}
      whileHover={{ y: -5, boxShadow: `0 16px 40px ${cell.color}22` }}
    >
      {/* Background tint */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: isDark ? cell.darkGradient : cell.gradient,
        opacity: isDark ? 1 : 0.5,
      }} />
      {/* Decorative emoji */}
      <div aria-hidden="true" style={{
        position: 'absolute', right: -8, bottom: -8,
        fontSize: cell.wide ? '5rem' : '4rem',
        opacity: 0.06, lineHeight: 1, pointerEvents: 'none', userSelect: 'none',
      }}>
        {cell.emoji}
      </div>
      {/* Icon */}
      <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3 relative z-[1]"
        style={{ background: `${cell.color}18`, color: cell.color }}>
        <Icon size={17} />
      </div>
      {/* Content */}
      <div className="relative z-[1]">
        {cell.custom ? (
          <p className="font-display text-2xl font-extrabold leading-none mb-1"
            style={{ color: cell.color }}>
            {cell.label}
          </p>
        ) : (
          <p className="font-display text-3xl font-extrabold leading-none mb-1"
            style={{ color: cell.color }}>
            <CountUp end={cell.end} duration={2} delay={delay + 0.3}
              suffix={cell.suffix} enableScrollSpy scrollSpyOnce />
          </p>
        )}
        <p className="font-semibold text-xs mb-0.5" style={{ color: 'var(--dark)' }}>
          {cell.custom ? cell.sublabel : cell.label}
        </p>
        {!cell.custom && (
          <p className="text-xs" style={{ color: 'var(--body-color)' }}>{cell.sublabel}</p>
        )}
      </div>
    </motion.div>
  )
}

/* ─── HOME PAGE ─────────────────────────────────────────────── */
export default function HomePage() {
  const { t } = useTranslation()
  const { userName, hasVisited } = useUserStore()

  const isDark = typeof document !== 'undefined'
    && document.documentElement.getAttribute('data-theme') === 'dark'

  const blob1Ref = useRef(null)
  const blob2Ref = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const handleMove = (e) => {
      const xFrac = e.clientX / window.innerWidth  - 0.5
      const yFrac = e.clientY / window.innerHeight - 0.5
      if (blob1Ref.current)
        blob1Ref.current.style.transform =
          `translate(calc(-50% + ${xFrac * -40}px), calc(-50% + ${yFrac * -40}px))`
      if (blob2Ref.current)
        blob2Ref.current.style.transform =
          `translate(calc(-30% + ${xFrac * 25}px), calc(-30% + ${yFrac * 25}px))`
    }
    window.addEventListener('mousemove', handleMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  return (
    <PageWrapper>
      <Helmet>
        <title>Felix Raymond — Portfolio</title>
        <meta name="description" content="Portfolio pribadi Felix Raymond — IT Enthusiast, peraih 5 medali emas, calon mahasiswa China." />
      </Helmet>

      {!hasVisited && <WelcomeModal />}

      {/* ══════════════════════════════════════════════════════════
          HERO — identik 100% dengan versi lama
      ══════════════════════════════════════════════════════════ */}
      <section className="relative flex flex-col items-center justify-center text-center
                          min-h-[92vh] px-6 md:px-12 py-20 overflow-hidden">

        <div ref={blob1Ref} aria-hidden="true" style={{
          position: 'absolute', top: '50%', left: '50%',
          width: 700, height: 700, borderRadius: '50%',
          background: 'radial-gradient(circle, var(--primary), transparent 70%)',
          opacity: 0.07, transform: 'translate(-50%, -50%)',
          pointerEvents: 'none', zIndex: 0,
          transition: 'transform 0.08s ease-out', willChange: 'transform',
        }} />

        <div ref={blob2Ref} aria-hidden="true" style={{
          position: 'absolute', top: '25%', right: '20%',
          width: 320, height: 320, borderRadius: '50%',
          background: 'radial-gradient(circle, #7c3aed, transparent 70%)',
          opacity: 0.05, transform: 'translate(-30%, -30%)',
          pointerEvents: 'none', zIndex: 0,
          transition: 'transform 0.12s ease-out', willChange: 'transform',
        }} />

        <motion.div
          variants={container} initial="hidden" animate="show"
          className="relative z-[1] flex flex-col items-center w-full"
        >
          {/* Greeting */}
          <motion.p variants={item}
            className="font-semibold mb-4 text-[var(--primary)]"
            style={{ fontSize: 'clamp(1rem, 2.5vw, 1.25rem)', letterSpacing: '0.04em' }}
          >
            {userName ? `Hi ${userName}, ${t('hero.greeting')}` : t('hero.greeting')}
          </motion.p>

          {/* H1 — 2 baris gradient */}
          <motion.h1 variants={item} className="leading-none mb-6"
            style={{ fontSize: 'clamp(3.2rem, 9vw, 6rem)' }}>
            <span className="font-hero tracking-wide" style={{
              background: 'linear-gradient(135deg, var(--primary) 0%, #7c3aed 50%, #06b6d4 100%)',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              animation: 'gradientShift 5s ease infinite', display: 'block',
            }}>Felix</span>
            <span className="font-hero tracking-wide" style={{
              background: 'linear-gradient(135deg, #7c3aed 0%, #06b6d4 50%, var(--primary) 100%)',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              animation: 'gradientShift 5s ease infinite reverse', display: 'block',
            }}>Raymond</span>
          </motion.h1>

          {/* TypeAnimation */}
          <motion.div variants={item}
            className="h-7 mb-7 font-medium text-[var(--body-color)]"
            aria-live="polite" aria-atomic="true"
            style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)' }}
          >
            <TypeAnimation
              sequence={[
                'IT Enthusiast 🔥', 2000, 'Web Developer 💻', 2000,
                'Olimpiade Informatika 🏆', 2000, 'Calon Mahasiswa China 🇨🇳', 2000,
              ]}
              repeat={Infinity} speed={50}
            />
          </motion.div>

          {/* Social links */}
          <motion.div variants={item} className="flex gap-2.5 justify-center mb-7">
            <SocialLink href={profile.github} label="GitHub">
              <Github size={17} />
            </SocialLink>
            <SocialLink href={profile.instagram} label="Instagram">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </SocialLink>
            <SocialLink href={profile.linkedin !== '#' ? profile.linkedin : 'https://linkedin.com/in/felixraymond'} label="LinkedIn">
              <Linkedin size={17} />
            </SocialLink>
            {profile.discord && (
              <SocialLink href={profile.discord} label="Discord">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.04.033.05a19.906 19.906 0 0 0 5.993 3.04.077.077 0 0 0 .083-.027c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.04.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
              </SocialLink>
            )}
            <SocialLink href={`mailto:${profile.email}`} label="Email">
              <Mail size={17} />
            </SocialLink>
          </motion.div>

          {/* CTA buttons — identik versi lama, tanpa MagneticButton */}
          <motion.div variants={item} className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
            <motion.a
              href={profile.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t('hero.cta_contact')}
              className="btn-shimmer px-8 py-3 rounded-full font-semibold text-white text-sm text-center relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg, var(--primary) 0%, #7c3aed 100%)' }}
              whileHover={{ scale: 1.04, boxShadow: '0 12px 32px rgba(55,88,249,0.38)' }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
              {t('hero.cta_contact')}
            </motion.a>
            <motion.div
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
              <Link
                to="/about"
                className="block px-8 py-3 rounded-full font-semibold text-sm border-2 text-center
                           transition-colors hover:border-[var(--primary)] hover:text-[var(--primary)]
                           text-[var(--body-color)] border-[var(--border)]"
              >
                {t('hero.cta_portfolio')}
              </Link>
            </motion.div>
          </motion.div>

          {/* Badges */}
          <motion.div variants={item} className="flex flex-wrap justify-center gap-2 mb-5">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold border
                         text-[var(--primary)] border-[var(--primary)]"
              style={{ background: 'var(--card-bg)' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" aria-hidden="true" />
              {t('hero.open_to')}
            </span>
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold border
                         text-amber-800 border-amber-400 dark:text-amber-300 dark:border-amber-500"
              style={{ background: 'var(--card-bg)' }}>
              🏅 Ranking 1 — 2025
            </span>
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold border
                         text-red-800 border-red-400 dark:text-red-300 dark:border-red-400"
              style={{ background: 'var(--card-bg)' }}>
              🇨🇳 HSK 3
            </span>
          </motion.div>
        </motion.div>

        {/* Scroll arrow */}
        <motion.button
          onClick={() => document.getElementById('stats-section')?.scrollIntoView({ behavior: 'smooth' })}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}
          aria-label="Scroll ke bawah"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1
                     text-[var(--body-color)] bg-transparent border-none cursor-pointer z-[1]
                     min-w-11 min-h-11 justify-center"
          whileHover={{ y: 3 }}
        >
          <span className="text-[0.6rem] tracking-[0.12em] uppercase font-bold">Scroll</span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}>
            <ChevronDown size={18} />
          </motion.div>
        </motion.button>
      </section>

      {/* ── MARQUEE ──────────────────────────────────────────── */}
      <div className="border-y border-[var(--border)] py-3">
        <Marquee items={MARQUEE_ITEMS} speed={45} />
      </div>

      {/* ══════════════════════════════════════════════════════════
          BENTO BOX STATS
      ══════════════════════════════════════════════════════════ */}
      <section id="stats-section" className="max-w-4xl mx-auto px-4 sm:px-6 md:px-10 py-20">
        <div className="text-center mb-10">
          <RevealText
            text="Sekilas Tentang Saya"
            as="h2"
            className="font-display text-2xl md:text-3xl font-bold justify-center"
            style={{ color: 'var(--dark)' }}
          />
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-sm mt-2"
            style={{ color: 'var(--body-color)' }}
          >
            Angka-angka yang merangkum perjalanan saya sejauh ini
          </motion.p>
        </div>

        {/* Row 1: 4 cell kecil */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          {BENTO_CELLS.slice(0, 4).map((cell, i) => (
            <BentoCell key={cell.id} cell={cell} isDark={isDark} delay={i * 0.08} />
          ))}
        </div>
        {/* Row 2: 2 cell lebar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {BENTO_CELLS.slice(4).map((cell, i) => (
            <BentoCell key={cell.id} cell={cell} isDark={isDark} delay={0.32 + i * 0.08} />
          ))}
        </div>
      </section>

      {/* ── FEATURED ACHIEVEMENTS ────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 md:px-10 pb-20">
        <SectionHeader label="What I've Achieved" title={t('nav.achievement')} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {achievements.slice(0, 3).map((a, i) => (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, type: 'spring', stiffness: 260, damping: 22 }}
              className="card overflow-hidden"
            >
              <div className="relative h-44 overflow-hidden">
                <motion.div className="w-full h-full"
                  whileHover={{ scale: 1.08 }} transition={{ duration: 0.4, ease: 'easeOut' }}>
                  <LazyImage src={a.img} alt={a.title} className="object-cover" />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />
                <span className="absolute top-3 left-3 text-2xl drop-shadow-lg" aria-hidden="true">{a.medal}</span>
                <span className="absolute top-3 right-3 badge"
                  style={{ background: 'rgba(0,0,0,0.52)', color: '#fff', backdropFilter: 'blur(4px)' }}>
                  {a.level}
                </span>
              </div>
              <div className="p-4">
                <h3 className="font-display font-bold text-sm leading-snug mb-1 text-[var(--dark)]">
                  {a.title}
                </h3>
                <p className="text-xs text-[var(--body-color)]">{a.date}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-8">
          <motion.div whileHover={{ x: 4 }} transition={{ type: 'spring', stiffness: 400 }}>
            <Link to="/achievement"
              className="inline-flex items-center gap-2 text-sm font-semibold link-underline text-[var(--primary)]">
              Lihat Semua Prestasi <ExternalLink size={14} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── FEATURED PROJECTS ────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 md:px-10 pb-28">
        <SectionHeader label="What I've Built" title={t('nav.skills')} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, type: 'spring', stiffness: 260, damping: 22 }}
              className="card overflow-hidden"
            >
              <div className="h-44 overflow-hidden relative">
                <motion.div className="w-full h-full"
                  whileHover={{ scale: 1.08 }} transition={{ duration: 0.4, ease: 'easeOut' }}>
                  <LazyImage src={p.img} alt={p.title} className="object-cover" />
                </motion.div>
                <span className="absolute top-3 right-3 px-2 py-1 rounded-lg text-xs font-bold"
                  style={{ background: 'rgba(0,0,0,0.52)', color: '#fff', backdropFilter: 'blur(4px)' }}>
                  {p.year}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-display font-bold text-sm tracking-[0.1em] text-[var(--dark)] mb-2">
                  {p.title}
                </h3>
                <p className="text-xs mb-3 leading-relaxed text-[var(--body-color)]">{p.desc}</p>
                <div className="flex flex-wrap gap-1">
                  {p.tags.slice(0, 3).map(tag => <span key={tag} className="tag">{tag}</span>)}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </PageWrapper>
  )
}