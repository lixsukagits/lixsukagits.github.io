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
import { profile } from '../data/profile'
import { achievements } from '../data/achievements'
import { projects } from '../data/projects'
import { Github, Mail, ExternalLink, ChevronDown,
         Trophy, Users, FolderGit2, ScrollText } from 'lucide-react'
import LazyImage from '../components/ui/lazy_image'

/* ─── CONSTANTS ─────────────────────────────────────────────── */
const HITS_URL =
  'https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Flixsukagits.github.io&count_bg=%233758F9&title_bg=%23637381&icon=github.svg&icon_color=%23FFFFFF&title=visitors&edge_flat=true'

const MARQUEE_ITEMS = [
  'IT Enthusiast 🔥',
  'Web Developer 💻',
  'Olimpiade Informatika 🏆',
  'Medan, Indonesia 🇮🇩',
  'Calon Mahasiswa China 🇨🇳',
  'HSK 3 Learner 学中文',
  'Badminton Player 🏸',
  'Open to Collaborate ✨',
]

const STAT_META = [
  { end: 5,  key: 'achievements', icon: <Trophy size={18} />,     color: '#f59e0b' },
  { end: 4,  key: 'experience',   icon: <Users size={18} />,      color: '#3758F9' },
  { end: 3,  key: 'projects',     icon: <FolderGit2 size={18} />, color: '#10b981' },
  { end: 8,  key: 'certificates', icon: <ScrollText size={18} />, color: '#7c3aed' },
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

/* ─── VISITOR COUNTER ───────────────────────────────────────── */
function VisitorCounter() {
  return (
    <motion.div
      variants={item}
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full"
      style={{
        background: 'var(--card-bg)',
        border: '1px solid var(--border)',
        fontSize: '0.72rem',
        color: 'var(--body-color)',
      }}
      title="Total pengunjung"
    >
      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
      <img src={HITS_URL} alt="visitor count" style={{ height: 16, borderRadius: 4 }} loading="lazy" />
    </motion.div>
  )
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
      <div
        className="mx-auto mb-3 w-10 h-10 rounded-xl flex items-center justify-center"
        style={{ background: `${color}18`, color }}
      >
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
  const blobRef = useRef(null)

  /* Parallax blob ikut mouse */
  useEffect(() => {
    const handleMove = (e) => {
      if (!blobRef.current) return
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      const x = (e.clientX / window.innerWidth  - 0.5) * 32
      const y = (e.clientY / window.innerHeight - 0.5) * 32
      blobRef.current.style.transform =
        `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`
    }
    window.addEventListener('mousemove', handleMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  const scrollToStats = () =>
    document.getElementById('stats-section')?.scrollIntoView({ behavior: 'smooth' })

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

        {/* Parallax blob utama */}
        <div
          ref={blobRef}
          className="absolute top-1/2 left-1/2 pointer-events-none -z-10"
          style={{
            width: 680, height: 680,
            borderRadius: '50%',
            background: 'radial-gradient(circle, var(--primary), transparent 68%)',
            opacity: 0.065,
            transition: 'transform 0.12s ease-out',
            transform: 'translate(-50%, -50%)',
          }}
        />
        {/* Blob aksen ungu */}
        <div
          className="absolute top-1/4 right-1/4 pointer-events-none -z-10"
          style={{
            width: 320, height: 320,
            borderRadius: '50%',
            background: 'radial-gradient(circle, #7c3aed, transparent 70%)',
            opacity: 0.04,
          }}
        />

        {/* ── Konten stagger masuk satu-satu ── */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center w-full"
          style={{ gap: 0 }}
        >
          {/* Greeting */}
          <motion.p variants={item} className="section-label mb-4 text-sm">
            {userName
              ? `Hi ${userName}, ${t('hero.greeting')}`
              : t('hero.greeting')}
          </motion.p>

          {/* Nama — Fredoka One + gradient animasi */}
          <motion.h1
            variants={item}
            className="font-hero leading-none tracking-wide mb-1"
            style={{
              fontSize: 'clamp(3.2rem, 9vw, 6rem)',
              background: 'linear-gradient(135deg, var(--primary) 0%, #7c3aed 50%, #06b6d4 100%)',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              animation: 'gradientShift 5s ease infinite',
            }}
          >
            Felix
          </motion.h1>
          <motion.h1
            variants={item}
            className="font-hero leading-none tracking-wide mb-6"
            style={{
              fontSize: 'clamp(3.2rem, 9vw, 6rem)',
              background: 'linear-gradient(135deg, #7c3aed 0%, #06b6d4 50%, var(--primary) 100%)',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              animation: 'gradientShift 5s ease infinite reverse',
            }}
          >
            Raymond
          </motion.h1>

          {/* Typing animation */}
          <motion.div
            variants={item}
            className="h-7 mb-7 font-medium text-base sm:text-lg"
            style={{ color: 'var(--body-color)' }}
          >
            <TypeAnimation
              sequence={[
                'IT Enthusiast 🔥', 2000,
                'Web Developer 💻', 2000,
                'Olimpiade Informatika 🏆', 2000,
                'Calon Mahasiswa China 🇨🇳', 2000,
              ]}
              repeat={Infinity}
              speed={52}
            />
          </motion.div>

          {/* Social icons */}
          <motion.div variants={item} className="flex gap-3 justify-center mb-7">
            <SocialLink href={profile.github} label="GitHub">
              <Github size={18} />
            </SocialLink>
            <SocialLink href={profile.instagram} label="Instagram">
              <img
                src="https://www.svgrepo.com/show/506668/instagram.svg"
                className="w-5 h-5" alt="Instagram"
              />
            </SocialLink>
            <SocialLink href={`mailto:${profile.email}`} label="Email">
              <Mail size={18} />
            </SocialLink>
          </motion.div>

          {/* CTA buttons */}
          <motion.div variants={item} className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
            <motion.a
              href={profile.whatsapp}
              target="_blank" rel="noopener noreferrer"
              className="btn-shimmer px-8 py-3 rounded-full font-semibold text-white text-sm text-center"
              style={{
                background: 'linear-gradient(135deg, var(--primary) 0%, #7c3aed 100%)',
                position: 'relative', overflow: 'hidden',
              }}
              whileHover={{ scale: 1.05, boxShadow: '0 12px 32px rgba(55,88,249,0.38)' }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
              {t('hero.cta_contact')}
            </motion.a>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
              <Link
                to="/about"
                className="block px-8 py-3 rounded-full font-semibold text-sm border-2 text-center
                           transition-colors hover:border-[var(--primary)] hover:text-[var(--primary)]"
                style={{ borderColor: 'var(--border)', color: 'var(--body-color)' }}
              >
                {t('hero.cta_portfolio')}
              </Link>
            </motion.div>
          </motion.div>

          {/* Badge row */}
          <motion.div variants={item} className="flex flex-wrap justify-center gap-2 mb-5">
            <span
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold"
              style={{ background: 'var(--primary-light)', color: 'var(--primary)' }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              {t('hero.open_to')}
            </span>
            <span
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold"
              style={{ background: '#fef9c3', color: '#854d0e' }}
            >
              🏅 Ranking 1 Seangkatan 2025
            </span>
            <span
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold"
              style={{ background: '#fee2e2', color: '#991b1b' }}
            >
              🇨🇳 HSK 3
            </span>
          </motion.div>

          {/* Visitor counter */}
          <VisitorCounter />
        </motion.div>

        {/* Scroll indicator */}
        <motion.button
          onClick={scrollToStats}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
          style={{ color: 'var(--body-color)', background: 'none', border: 'none' }}
          whileHover={{ y: 3 }}
          aria-label="Scroll ke bawah"
        >
          <span style={{ fontSize: '0.62rem', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600 }}>
            scroll
          </span>
          <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}>
            <ChevronDown size={18} />
          </motion.div>
        </motion.button>
      </section>

      {/* ── MARQUEE ──────────────────────────────────────────── */}
      <div
        className="py-3.5 overflow-hidden"
        style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}
      >
        <Marquee items={MARQUEE_ITEMS} speed={40} />
      </div>

      {/* ── STATS ────────────────────────────────────────────── */}
      <section id="stats-section" className="max-w-4xl mx-auto px-4 sm:px-6 md:px-10 py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {STAT_META.map(({ end, key, icon, color }, i) => (
            <StatCard
              key={key}
              end={end}
              labelKey={key}
              delay={i * 0.1}
              icon={icon}
              color={color}
            />
          ))}
        </div>
      </section>

      {/* ── FEATURED ACHIEVEMENTS ────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 md:px-10 pb-20">
        <SectionHeader label="What I've Achieved" title={t('achievement.title')} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {achievements.slice(0, 3).map((a, i) => (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.1, type: 'spring', stiffness: 260, damping: 22 }}
              className="card overflow-hidden"
            >
              <div className="relative h-44 overflow-hidden">
                <motion.div
                  className="w-full h-full"
                  whileHover={{ scale: 1.07 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                >
                  <LazyImage src={a.img} alt={a.title} className="object-cover" />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                <span className="absolute top-3 left-3 text-2xl drop-shadow-lg">{a.medal}</span>
                <span
                  className="absolute top-3 right-3 badge text-xs"
                  style={{ background: 'rgba(0,0,0,0.48)', color: '#fff', backdropFilter: 'blur(4px)' }}
                >
                  {a.level}
                </span>
                {/* Title overlay di bawah gambar */}
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <h3 className="font-display font-bold text-xs leading-snug text-white drop-shadow">
                    {a.title}
                  </h3>
                  <p className="text-xs mt-0.5 text-white/70">{a.date}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-8">
          <motion.div whileHover={{ x: 4 }} transition={{ type: 'spring', stiffness: 400 }}>
            <Link
              to="/achievement"
              className="inline-flex items-center gap-2 text-sm font-semibold link-underline"
              style={{ color: 'var(--primary)' }}
            >
              Lihat Semua Prestasi <ExternalLink size={14} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── FEATURED PROJECTS ────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 md:px-10 pb-28">
        <SectionHeader label="What I've Built" title="Proyek" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.1, type: 'spring', stiffness: 260, damping: 22 }}
              className="card overflow-hidden group"
            >
              <div className="h-44 overflow-hidden relative">
                <motion.div
                  className="w-full h-full"
                  whileHover={{ scale: 1.07 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                >
                  <LazyImage src={p.img} alt={p.title} className="object-cover" />
                </motion.div>
                {/* Year badge */}
                <span
                  className="absolute top-3 right-3 px-2 py-1 rounded-lg text-xs font-bold"
                  style={{ background: 'rgba(0,0,0,0.48)', color: '#fff', backdropFilter: 'blur(4px)' }}
                >
                  {p.year}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-display font-bold text-sm mb-1.5" style={{ color: 'var(--dark)' }}>
                  {p.title}
                </h3>
                <p className="text-xs mb-3 leading-relaxed" style={{ color: 'var(--body-color)' }}>
                  {p.desc}
                </p>
                <div className="flex flex-wrap gap-1">
                  {p.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </PageWrapper>
  )
}