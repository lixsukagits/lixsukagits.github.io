import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import PageWrapper from '../components/ui/page_wrapper'
import TiltCard from '../components/ui/tilt_card'
import { profile } from '../data/profile'

/* ─── STAGGER ───────────────────────────────────────────────── */
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
}
const cardItem = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 260, damping: 22 } },
}

/* ─── DATA ──────────────────────────────────────────────────── */
const funFacts = [
  { emoji: '🏸', key: 'badminton' },
  { emoji: '🎬', key: 'film' },
  { emoji: '🇨🇳', key: 'mandarin' },
  { emoji: '🌙', key: 'nightowl' },
  { emoji: '🐍', key: 'hokkien' },
  { emoji: '📸', key: 'camera' },
]

const PHOTO_MAIN  = 'https://i.imgur.com/NY5EWPU.jpeg'
const PHOTO_HOVER = 'https://i.imgur.com/NY5EWPU.jpeg'

/* ─── PROFILE PHOTO ─────────────────────────────────────────── */
function ProfilePhoto() {
  const [hovered, setHovered] = useState(false)
  return (
    <TiltCard maxTilt={12} glare scale={1.03}
      style={{ borderRadius: '1rem', width: '100%', maxWidth: 280 }}>
      <div
        className="relative overflow-hidden shadow-xl"
        style={{ borderRadius: '1rem', aspectRatio: '3/4' }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <img src={PHOTO_MAIN} alt="Felix Raymond" style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          objectFit: 'cover', transition: 'opacity 0.4s ease, transform 0.4s ease',
          opacity: hovered ? 0 : 1, transform: hovered ? 'scale(1.05)' : 'scale(1)',
        }} />
        <img src={PHOTO_HOVER} alt="Felix Raymond — casual" style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          objectFit: 'cover', transition: 'opacity 0.4s ease, transform 0.4s ease',
          opacity: hovered ? 1 : 0, transform: hovered ? 'scale(1)' : 'scale(1.05)',
        }} />
        <motion.div
          animate={{ opacity: hovered ? 0 : 1, y: hovered ? -4 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)',
            background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', color: '#fff',
            fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.1em',
            textTransform: 'uppercase', padding: '4px 12px', borderRadius: 99,
            whiteSpace: 'nowrap', pointerEvents: 'none',
          }}
        >
          Hover me ✨
        </motion.div>
      </div>
      {/* Badge */}
      <div style={{
        position: 'absolute', bottom: -16, right: -16,
        padding: '6px 14px', borderRadius: '0.75rem',
        background: 'var(--card-bg)', border: '1px solid var(--border)',
        color: 'var(--primary)', fontSize: '0.8rem', fontWeight: 700,
        boxShadow: '0 4px 16px rgba(0,0,0,0.1)', zIndex: 4, whiteSpace: 'nowrap',
      }}>
        Class of 2027 🎓
      </div>
    </TiltCard>
  )
}

/* ─── SECTION BLOCK ─────────────────────────────────────────── */
function Block({ emoji, titleKey, children }) {
  const { t } = useTranslation()
  return (
    <motion.div variants={cardItem} className="card p-6 mb-6">
      <h3 className="font-display font-bold text-base mb-4 flex items-center gap-2"
        style={{ color: 'var(--dark)' }}>
        <span>{emoji}</span>
        {t(titleKey)}
      </h3>
      {children}
    </motion.div>
  )
}

/* ─── ABOUT PAGE ────────────────────────────────────────────── */
export default function AboutPage() {
  const { t } = useTranslation()

  return (
    <PageWrapper>
      <Helmet>
        <title>Tentang Felix Raymond</title>
        <meta name="description" content="Felix Raymond Tan — IT enthusiast dari Medan, peraih 5 medali emas, calon mahasiswa China." />
        <meta property="og:title" content="Tentang Felix Raymond" />
        <meta property="og:description" content="Autobiografi Felix Raymond — siswa IT berprestasi dari Medan yang mengejar beasiswa China." />
        <meta property="og:url" content="https://lixsukagits.github.io/about" />
        <meta property="og:image" content={PHOTO_MAIN} />
      </Helmet>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 md:px-10 py-20">

        {/* Section label — konsisten dengan home & skills */}
        <div className="text-center mb-12">
          <p style={{
            fontSize: 'clamp(0.85rem, 1.5vw, 1rem)',
            fontWeight: 700, letterSpacing: '0.2em',
            textTransform: 'uppercase', color: 'var(--primary)',
          }}>
            {t('about.subtitle')}
          </p>
        </div>

        <motion.div variants={container} initial="hidden" animate="show">

          {/* ── Bio + photo ── */}
          <motion.div variants={cardItem}
            className="card p-6 sm:p-8 mb-6 flex flex-col md:flex-row gap-8 items-start md:items-center">
            <div className="w-full md:w-2/5 flex justify-center" style={{ paddingBottom: 32 }}>
              <ProfilePhoto />
            </div>
            <div className="w-full md:w-3/5">
              <h2 className="font-display text-2xl font-bold mb-0.5" style={{ color: 'var(--dark)' }}>
                {profile.name}
              </h2>
              <p className="text-sm italic mb-5" style={{ color: 'var(--primary)' }}>
                {t('about.tagline')}
              </p>
              <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 gap-2.5">
                {[
                  { label: '🎂 Lahir',       val: profile.birth.date },
                  { label: '📍 Lokasi',      val: profile.location },
                  { label: '🙏 Agama',       val: profile.religion },
                  { label: '🏮 Suku',        val: profile.ethnicity },
                  { label: '👨‍👩‍👦 Keluarga',  val: profile.sibling },
                  { label: '🎯 Kepribadian', val: profile.personality },
                ].map(({ label, val }) => (
                  <motion.div key={label}
                    className="p-3 rounded-xl"
                    style={{ background: 'var(--bg)' }}
                    whileHover={{ scale: 1.02, borderColor: 'var(--primary)' }}
                    transition={{ type: 'spring', stiffness: 400 }}>
                    <div className="text-xs mb-0.5" style={{ color: 'var(--body-color)' }}>{label}</div>
                    <div className="font-semibold text-xs" style={{ color: 'var(--dark)' }}>{val}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── Story ── */}
          <Block emoji="📖" titleKey="about.story_title">
            <div className="space-y-3">
              {['bio1','bio2','bio3','bio4','bio5','bio6','bio7'].map(key => (
                <p key={key} className="text-sm leading-relaxed" style={{ color: 'var(--body-color)' }}>
                  {t(`about.${key}`)}
                </p>
              ))}
            </div>
          </Block>

          {/* ── Fun Facts ── */}
          <Block emoji="✨" titleKey="about.facts_title">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {funFacts.map(({ emoji, key }) => (
                <motion.div key={key}
                  className="flex items-start gap-3 p-3 rounded-xl"
                  style={{ background: 'var(--bg)' }}
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 400 }}>
                  <span className="text-xl shrink-0">{emoji}</span>
                  <p className="text-sm leading-snug" style={{ color: 'var(--body-color)' }}>
                    {t(`about.fact_${key}`)}
                  </p>
                </motion.div>
              ))}
            </div>
          </Block>

          {/* ── Principles / Quotes ── */}
          <Block emoji="💡" titleKey="about.principles_title">
            <div className="space-y-3">
              {['principle1','principle2','principle3'].map((key, i) => (
                <motion.blockquote key={key}
                  className="border-l-4 pl-4 py-2 rounded-r-xl"
                  style={{ borderColor: 'var(--primary)', background: 'var(--bg)' }}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}>
                  <p className="text-sm italic" style={{ color: 'var(--dark)' }}>
                    "{t(`about.${key}`)}"
                  </p>
                </motion.blockquote>
              ))}
            </div>
          </Block>

          {/* ── Languages ── */}
          <Block emoji="🌐" titleKey="about.lang_title">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { flag: 'https://flagcdn.com/w40/id.png', name: 'Indonesia',  level: 'Native',       alt: 'ID' },
                { flag: 'https://flagcdn.com/w40/gb.png', name: 'English',    level: 'Intermediate', alt: 'GB' },
                { flag: 'https://flagcdn.com/w40/cn.png', name: '普通话',      level: 'HSK 3',        alt: 'CN' },
                { flag: null,                             name: 'Hokkien',    level: 'Daily',        alt: '🏮' },
              ].map(lang => (
                <motion.div key={lang.name}
                  className="text-center p-4 rounded-xl card"
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 400 }}>
                  <div className="flex justify-center mb-2">
                    {lang.flag
                      ? <img src={lang.flag} alt={lang.alt}
                          style={{ width: 36, height: 'auto', borderRadius: 4, boxShadow: '0 1px 4px rgba(0,0,0,0.15)' }} />
                      : <span className="text-3xl">{lang.alt}</span>
                    }
                  </div>
                  <div className="font-semibold text-xs mb-1" style={{ color: 'var(--dark)' }}>
                    {lang.name}
                  </div>
                  <span className="tag text-xs">{lang.level}</span>
                </motion.div>
              ))}
            </div>
          </Block>

          {/* ── Hobbies ── */}
          <Block emoji="🎨" titleKey="about.hobbies_title">
            <div className="flex flex-wrap gap-2">
              {profile.hobbies.map(h => (
                <motion.span key={h}
                  className="px-3 py-2 rounded-full text-sm font-medium"
                  style={{ background: 'var(--primary-light)', color: 'var(--primary)' }}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}>
                  {h}
                </motion.span>
              ))}
            </div>
          </Block>

          {/* ── Goals — timeline style ── */}
          <motion.div variants={cardItem} className="card p-6 mb-6">
            <h3 className="font-display font-bold text-base mb-5 flex items-center gap-2"
              style={{ color: 'var(--dark)' }}>
              🎯 {t('about.goals_title')}
            </h3>
            <div className="relative pl-10">
              {/* Vertical line */}
              <div className="absolute left-3 top-2 bottom-2 w-px"
                style={{ background: 'linear-gradient(to bottom, var(--primary), var(--border))' }} />
              <div className="space-y-5">
                {[
                  { icon: '📅', label: t('about.goal_short_label'),  val: profile.goals.short, color: '#3758F9' },
                  { icon: '🎓', label: t('about.goal_long_label'),   val: profile.goals.long,  color: '#7c3aed' },
                  { icon: '💼', label: t('about.goal_career_label'), val: profile.goals.career, color: '#10b981' },
                  { icon: '🇨🇳', label: t('about.goal_china_label'),  val: profile.goals.china_reason, color: '#dc2626' },
                ].map(({ icon, label, val, color }, i) => (
                  <motion.div key={label}
                    className="relative flex gap-4 items-start"
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}>
                    {/* Dot */}
                    <div className="absolute -left-6 w-4 h-4 rounded-full shrink-0 mt-1"
                      style={{ background: color, boxShadow: `0 0 0 3px var(--bg)` }}>
                    </div>
                    <div className="p-3 rounded-xl flex-1" style={{ background: 'var(--bg)' }}>
                      <p className="text-xs font-bold mb-0.5" style={{ color }}>{label}</p>
                      <p className="text-sm" style={{ color: 'var(--dark)' }}>{val}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── Quotes ── */}
          <Block emoji="💬" titleKey="about.quotes_title">
            <div className="space-y-4">
              {profile.quotes.map((q, i) => (
                <motion.blockquote key={i}
                  className="border-l-4 pl-4 py-2 rounded-r-xl"
                  style={{ borderColor: 'var(--primary)', background: 'var(--bg)' }}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12 }}>
                  <p className="text-sm italic mb-1" style={{ color: 'var(--dark)' }}>"{q.text}"</p>
                  <cite className="text-xs" style={{ color: 'var(--body-color)' }}>— {q.source}</cite>
                </motion.blockquote>
              ))}
            </div>
          </Block>

        </motion.div>
      </div>
    </PageWrapper>
  )
}