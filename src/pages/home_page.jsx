import { useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import CountUp from 'react-countup'
import { useInView } from 'react-intersection-observer'
import { Helmet } from 'react-helmet-async'
import { useUserStore } from '../store/use_user_store'
import WelcomeModal from '../components/ui/welcome_modal'
import PageWrapper from '../components/ui/page_wrapper'
import SectionHeader from '../components/ui/section_header'
import Marquee from '../components/ui/marquee'
import LazyImage from '../components/ui/lazy_image'
import { profile } from '../data/profile'
import { achievements } from '../data/achievements'
import { projects } from '../data/projects'
import { Github, Mail, ExternalLink, ChevronDown,
         Trophy, Users, FolderGit2, ScrollText, Linkedin } from 'lucide-react'

/* ─── CONSTANTS ─────────────────────────────────────────────── */
const MARQUEE_ITEMS = [
  'IT Enthusiast 🔥', 'Web Developer 💻', 'Olimpiade Informatika 🏆',
  'Medan, Indonesia 🇮🇩', 'Calon Mahasiswa China 🇨🇳',
  'HSK 3 Learner 学中文', 'Badminton Player 🏸', 'Open to Collaborate ✨',
]

const STAT_META = [
  { end: 5, key: 'achievements', icon: <Trophy size={18} />,     color: '#f59e0b' },
  { end: 4, key: 'experience',   icon: <Users size={18} />,      color: '#3758F9' },
  { end: 3, key: 'projects',     icon: <FolderGit2 size={18} />, color: '#10b981' },
  { end: 8, key: 'certificates', icon: <ScrollText size={18} />, color: '#7c3aed' },
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

/* ─── STAT CARD ─────────────────────────────────────────────── */
function StatCard({ end, labelKey, delay, icon, color }) {
  const { t } = useTranslation()
  const { ref, inView } = useInView({ triggerOnce: true })
  return (
    <motion.div
      ref={ref}
      className="card glow-hover p-5 text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, type: 'spring', stiffness: 260, damping: 22 }}
      whileHover={{ y: -5 }}
    >
      <div className="mx-auto mb-3 w-10 h-10 rounded-xl flex items-center justify-center"
        style={{ background: `${color}18`, color }}>
        {icon}
      </div>
      <div className="font-display text-3xl font-extrabold" style={{ color: 'var(--primary)' }}>
        {inView ? <CountUp end={end} duration={2} delay={delay} suffix="+" /> : '0+'}
      </div>
      <div className="text-xs mt-1 font-medium" style={{ color: 'var(--body-color)' }}>
        {t(`about.stats_${labelKey}`)}
      </div>
    </motion.div>
  )
}

/* ─── SOCIAL LINK ───────────────────────────────────────────── */
function SocialLink({ href, children, label }) {
  return (
    <motion.a
      href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
      className="w-10 h-10 rounded-xl flex items-center justify-center"
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

/* ─── HOME PAGE ─────────────────────────────────────────────── */
export default function HomePage() {
  const { t } = useTranslation()
  const { userName, hasVisited } = useUserStore()

  /* Parallax 2 blob — dari Claude B, berlawanan arah */
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

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative flex flex-col items-center justify-center text-center
                          min-h-[92vh] px-6 md:px-12 py-20 overflow-hidden">

        {/* Blob 1 — besar, tengah, parallax berlawanan */}
        <div ref={blob1Ref} style={{
          position: 'absolute', top: '50%', left: '50%',
          width: 700, height: 700, borderRadius: '50%',
          background: 'radial-gradient(circle, var(--primary), transparent 70%)',
          opacity: 0.07, transform: 'translate(-50%, -50%)',
          pointerEvents: 'none', zIndex: 0,
          transition: 'transform 0.08s ease-out', willChange: 'transform',
        }} />

        {/* Blob 2 — kecil, kanan atas, parallax searah */}
        <div ref={blob2Ref} style={{
          position: 'absolute', top: '25%', right: '20%',
          width: 320, height: 320, borderRadius: '50%',
          background: 'radial-gradient(circle, #7c3aed, transparent 70%)',
          opacity: 0.05, transform: 'translate(-30%, -30%)',
          pointerEvents: 'none', zIndex: 0,
          transition: 'transform 0.12s ease-out', willChange: 'transform',
        }} />

        {/* ── Stagger content ── */}
        <motion.div
          variants={container} initial="hidden" animate="show"
          className="flex flex-col items-center w-full"
          style={{ position: 'relative', zIndex: 1 }}
        >
          {/* Greeting — lebih besar */}
          <motion.p variants={item} className="font-semibold mb-4"
            style={{ fontSize: 'clamp(1rem, 2.5vw, 1.25rem)', color: 'var(--primary)', letterSpacing: '0.04em' }}>
            {userName ? `Hi ${userName}, ${t('hero.greeting')}` : t('hero.greeting')}
          </motion.p>

          {/* Nama — Fredoka One + gradient animasi */}
          <motion.h1 variants={item} className="font-hero leading-none tracking-wide mb-1"
            style={{
              fontSize: 'clamp(3.2rem, 9vw, 6rem)',
              background: 'linear-gradient(135deg, var(--primary) 0%, #7c3aed 50%, #06b6d4 100%)',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              animation: 'gradientShift 5s ease infinite',
            }}>
            Felix
          </motion.h1>
          <motion.h1 variants={item} className="font-hero leading-none tracking-wide mb-6"
            style={{
              fontSize: 'clamp(3.2rem, 9vw, 6rem)',
              background: 'linear-gradient(135deg, #7c3aed 0%, #06b6d4 50%, var(--primary) 100%)',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              animation: 'gradientShift 5s ease infinite reverse',
            }}>
            Raymond
          </motion.h1>

          {/* Typing animation */}
          <motion.div variants={item} className="h-7 mb-7 font-medium"
            style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', color: 'var(--body-color)' }}>
            <TypeAnimation
              sequence={[
                'IT Enthusiast 🔥', 2000, 'Web Developer 💻', 2000,
                'Olimpiade Informatika 🏆', 2000, 'Calon Mahasiswa China 🇨🇳', 2000,
              ]}
              repeat={Infinity} speed={50}
            />
          </motion.div>

          {/* Social — Instagram SVG inline (putih di dark mode), + LinkedIn, Discord */}
          <motion.div variants={item} className="flex gap-2.5 justify-center mb-7">
            <SocialLink href={profile.github} label="GitHub">
              <Github size={17} />
            </SocialLink>
            {/* Instagram inline SVG — ikut currentColor, putih di dark mode */}
            <SocialLink href={profile.instagram} label="Instagram">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </SocialLink>
            {/* LinkedIn */}
            <SocialLink href={profile.linkedin !== '#' ? profile.linkedin : 'https://linkedin.com'} label="LinkedIn">
              <Linkedin size={17} />
            </SocialLink>
            {/* Discord inline SVG */}
            <SocialLink href={profile.discord || 'https://discord.com'} label="Discord">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.04.033.05a19.906 19.906 0 0 0 5.993 3.04.077.077 0 0 0 .083-.027c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.04.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
              </svg>
            </SocialLink>
            <SocialLink href={`mailto:${profile.email}`} label="Email">
              <Mail size={17} />
            </SocialLink>
          </motion.div>

          {/* CTA — gradient dari versiku, hover dari Claude B */}
          <motion.div variants={item} className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
            <motion.a
              href={profile.whatsapp} target="_blank" rel="noopener noreferrer"
              className="btn-shimmer px-8 py-3 rounded-full font-semibold text-white text-sm text-center"
              style={{ background: 'linear-gradient(135deg, var(--primary) 0%, #7c3aed 100%)',
                position: 'relative', overflow: 'hidden' }}
              whileHover={{ scale: 1.04, boxShadow: '0 12px 32px rgba(55,88,249,0.38)' }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
              {t('hero.cta_contact')}
            </motion.a>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}>
              <Link to="/about"
                className="block px-8 py-3 rounded-full font-semibold text-sm border-2 text-center
                           transition-colors hover:border-[var(--primary)] hover:text-[var(--primary)]"
                style={{ borderColor: 'var(--border)', color: 'var(--body-color)' }}>
                {t('hero.cta_portfolio')}
              </Link>
            </motion.div>
          </motion.div>

          {/* Badges — kontras, tidak nimpa */}
          <motion.div variants={item} className="flex flex-wrap justify-center gap-2 mb-5">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold border"
              style={{ background: 'var(--card-bg)', color: 'var(--primary)', borderColor: 'var(--primary)' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              {t('hero.open_to')}
            </span>
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold border"
              style={{ background: 'var(--card-bg)', color: '#92400e', borderColor: '#fbbf24' }}>
              🏅 Ranking 1 — 2025
            </span>
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold border"
              style={{ background: 'var(--card-bg)', color: '#991b1b', borderColor: '#f87171' }}>
              🇨🇳 HSK 3
            </span>
          </motion.div>
        </motion.div>

        {/* Scroll arrow — dari Claude B */}
        <motion.button
          onClick={() => document.getElementById('stats-section')?.scrollIntoView({ behavior: 'smooth' })}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}
          style={{
            position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
            color: 'var(--body-color)', background: 'none', border: 'none', cursor: 'pointer', zIndex: 1,
          }}
          whileHover={{ y: 3 }} aria-label="Scroll ke bawah"
        >
          <span style={{ fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700 }}>
            Scroll
          </span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}>
            <ChevronDown size={18} />
          </motion.div>
        </motion.button>
      </section>

      {/* ── MARQUEE ──────────────────────────────────────────── */}
      <div style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '12px 0' }}>
        <Marquee items={MARQUEE_ITEMS} speed={45} />
      </div>

      {/* ── STATS ────────────────────────────────────────────── */}
      <section id="stats-section" className="max-w-4xl mx-auto px-4 sm:px-6 md:px-10 py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {STAT_META.map(({ end, key, icon, color }, i) => (
            <StatCard key={key} end={end} labelKey={key} delay={i * 0.1} icon={icon} color={color} />
          ))}
        </div>
      </section>

      {/* ── FEATURED ACHIEVEMENTS ────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 md:px-10 pb-20">
        <div className="mb-10 text-center">
          <p style={{
            fontSize: 'clamp(0.85rem, 1.5vw, 1rem)',
            fontWeight: 700,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--primary)',
          }}>
            What I've Achieved
          </p>
        </div>
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
                {/* Overlay lebih gelap supaya teks terbaca */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />
                <span className="absolute top-3 left-3 text-2xl drop-shadow-lg">{a.medal}</span>
                <span className="absolute top-3 right-3 badge"
                  style={{ background: 'rgba(0,0,0,0.52)', color: '#fff', backdropFilter: 'blur(4px)' }}>
                  {a.level}
                </span>
              </div>
              {/* Info di bawah gambar — tidak overlay, tidak nimpa */}
              <div className="p-4">
                <h3 className="font-display font-bold text-sm leading-snug mb-1 tracking-[0.em]"
                  style={{ color: 'var(--dark)' }}>{a.title}</h3>
                <p className="text-xs" style={{ color: 'var(--body-color)' }}>{a.date}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-8">
          <motion.div whileHover={{ x: 4 }} transition={{ type: 'spring', stiffness: 400 }}>
            <Link to="/achievement"
              className="inline-flex items-center gap-2 text-sm font-semibold link-underline"
              style={{ color: 'var(--primary)' }}>
              Lihat Semua Prestasi <ExternalLink size={14} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── FEATURED PROJECTS ────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 md:px-10 pb-28">
        <div className="mb-10 text-center">
          <p style={{
            fontSize: 'clamp(0.85rem, 1.5vw, 1rem)',
            fontWeight: 700,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--primary)',
          }}>
            What I've Built
          </p>
        </div>
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
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-display font-bold text-sm tracking-[0.1em]" style={{ color: 'var(--dark)' }}>{p.title}</h3>
                </div>
                <p className="text-xs mb-3 leading-relaxed" style={{ color: 'var(--body-color)' }}>{p.desc}</p>
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