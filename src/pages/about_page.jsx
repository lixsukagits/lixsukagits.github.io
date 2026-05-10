import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import PageWrapper from '../components/ui/page_wrapper'
import SectionHeader from '../components/ui/section_header'
import TiltCard from '../components/ui/tilt_card'
import { profile } from '../data/profile'

const funFacts = [
  { emoji: '🏸', key: 'badminton' },
  { emoji: '🎬', key: 'film' },
  { emoji: '🇨🇳', key: 'mandarin' },
  { emoji: '🌙', key: 'nightowl' },
  { emoji: '🐍', key: 'hokkien' },
  { emoji: '📸', key: 'camera' },
]

const principles = ['principle1', 'principle2', 'principle3']

// ─── FOTO PROFIL ─────────────────────────────────────────────────
// Ganti PHOTO_HOVER_URL dengan foto lain (casual/funny) jika ada.
// Kalau belum ada, bisa pakai URL yang sama dulu.
const PHOTO_MAIN  = 'https://i.imgur.com/NY5EWPU.jpeg'
const PHOTO_HOVER = 'https://i.imgur.com/NY5EWPU.jpeg' // ← ganti dengan foto casual Felix

function ProfilePhoto() {
  const [hovered, setHovered] = useState(false)

  return (
    <TiltCard
      maxTilt={12}
      glare={true}
      scale={1.03}
      style={{ borderRadius: '1rem', width: '100%', maxWidth: 280 }}
    >
      <div
        className="relative overflow-hidden shadow-xl"
        style={{ borderRadius: '1rem', aspectRatio: '3/4', cursor: 'none' }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Foto utama */}
        <img
          src={PHOTO_MAIN}
          alt="Felix Raymond"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'opacity 0.4s ease, transform 0.4s ease',
            opacity: hovered ? 0 : 1,
            transform: hovered ? 'scale(1.05)' : 'scale(1)',
          }}
        />
        {/* Foto hover */}
        <img
          src={PHOTO_HOVER}
          alt="Felix Raymond — casual"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'opacity 0.4s ease, transform 0.4s ease',
            opacity: hovered ? 1 : 0,
            transform: hovered ? 'scale(1)' : 'scale(1.05)',
          }}
        />

        {/* Hover hint */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: hovered ? 0 : 1, y: hovered ? 6 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            position: 'absolute',
            bottom: 12,
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(4px)',
            color: '#fff',
            fontSize: '0.65rem',
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            padding: '4px 12px',
            borderRadius: 99,
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
          }}
        >
          Hover me ✨
        </motion.div>
      </div>

      {/* Badge Class of 2027 */}
      <div
        style={{
          position: 'absolute',
          bottom: -16,
          right: -16,
          padding: '6px 14px',
          borderRadius: '0.75rem',
          background: 'var(--card-bg)',
          border: '1px solid var(--border)',
          color: 'var(--primary)',
          fontSize: '0.8rem',
          fontWeight: 700,
          boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
          zIndex: 4,
          whiteSpace: 'nowrap',
        }}
      >
        Class of 2027 🎓
      </div>
    </TiltCard>
  )
}

// ─── ABOUT PAGE ──────────────────────────────────────────────────
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
        <SectionHeader label={t('about.subtitle')} title={t('about.title')} />

        {/* Bio + photo */}
        <div className="card p-6 sm:p-8 md:p-12 flex flex-col md:flex-row gap-8 items-start md:items-center mb-8">
          {/* 3D Tilt Photo */}
          <div className="w-full md:w-2/5 flex justify-center" style={{ paddingBottom: 24 }}>
            <ProfilePhoto />
          </div>

          {/* Info */}
          <div className="w-full md:w-3/5">
            <h3 className="font-display text-2xl font-bold mb-1" style={{ color: 'var(--dark)' }}>
              {profile.name}
            </h3>
            <p className="text-sm italic mb-4" style={{ color: 'var(--primary)' }}>
              {t('about.tagline')}
            </p>
            <div className="grid grid-cols-2 gap-3 text-sm">
              {[
                { label: '🎂 Lahir',      val: profile.birth.date },
                { label: '📍 Lokasi',     val: profile.location },
                { label: '🙏 Agama',      val: profile.religion },
                { label: '🏮 Suku',       val: profile.ethnicity },
                { label: '👨‍👩‍👦 Keluarga', val: profile.sibling },
                { label: '🎯 Kepribadian',val: profile.personality },
              ].map(({ label, val }) => (
                <motion.div
                  key={label}
                  className="p-3 rounded-xl"
                  style={{ background: 'var(--bg)' }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                >
                  <div className="text-xs mb-0.5" style={{ color: 'var(--body-color)' }}>{label}</div>
                  <div className="font-semibold text-xs" style={{ color: 'var(--dark)' }}>{val}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Story */}
        <div className="card p-6 sm:p-8 mb-8">
          <h3 className="font-display font-bold text-lg mb-5" style={{ color: 'var(--dark)' }}>📖 {t('about.story_title')}</h3>
          <div className="space-y-4">
            {['bio1','bio2','bio3','bio4','bio5','bio6','bio7'].map(key => (
              <p key={key} className="text-sm leading-relaxed" style={{ color: 'var(--body-color)' }}>{t(`about.${key}`)}</p>
            ))}
          </div>
        </div>

        {/* Fun Facts */}
        <div className="card p-6 mb-8">
          <h3 className="font-display font-bold text-lg mb-4" style={{ color: 'var(--dark)' }}>✨ {t('about.facts_title')}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {funFacts.map(({ emoji, key }) => (
              <motion.div key={key} className="flex items-start gap-3 p-3 rounded-xl" style={{ background: 'var(--bg)' }}
                whileHover={{ x: 4 }} transition={{ type: 'spring', stiffness: 400 }}>
                <span className="text-xl shrink-0">{emoji}</span>
                <p className="text-sm leading-snug" style={{ color: 'var(--body-color)' }}>{t(`about.fact_${key}`)}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Principles */}
        <div className="card p-6 mb-8">
          <h3 className="font-display font-bold text-lg mb-4" style={{ color: 'var(--dark)' }}>💡 {t('about.principles_title')}</h3>
          <div className="space-y-3">
            {principles.map(key => (
              <blockquote key={key} className="border-l-4 pl-4 py-1" style={{ borderColor: 'var(--primary)' }}>
                <p className="text-sm italic" style={{ color: 'var(--dark)' }}>"{t(`about.${key}`)}"</p>
              </blockquote>
            ))}
          </div>
        </div>

        {/* Languages */}
        <div className="card p-6 mb-8">
          <h3 className="font-display font-bold text-lg mb-4" style={{ color: 'var(--dark)' }}>🌐 {t('about.lang_title')}</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {profile.languages.map(lang => (
              <motion.div key={lang.name} className="text-center p-4 rounded-xl" style={{ background: 'var(--bg)' }}
                whileHover={{ y: -3 }} transition={{ type: 'spring', stiffness: 400 }}>
                <div className="text-2xl mb-1">{lang.flag}</div>
                <div className="font-semibold text-sm" style={{ color: 'var(--dark)' }}>{lang.name}</div>
                <div className="text-xs tag mt-1">{lang.level}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Hobbies */}
        <div className="card p-6 mb-8">
          <h3 className="font-display font-bold text-lg mb-4" style={{ color: 'var(--dark)' }}>🎨 {t('about.hobbies_title')}</h3>
          <div className="flex flex-wrap gap-2">
            {profile.hobbies.map(h => (
              <motion.span key={h} className="px-3 py-2 rounded-full text-sm font-medium"
                style={{ background: 'var(--primary-light)', color: 'var(--primary)' }}
                whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}>
                {h}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Goals */}
        <div className="card p-6 mb-8">
          <h3 className="font-display font-bold text-lg mb-4" style={{ color: 'var(--dark)' }}>🎯 {t('about.goals_title')}</h3>
          <div className="space-y-3">
            {[
              { icon: '📅', label: t('about.goal_short_label'),  val: profile.goals.short },
              { icon: '🎓', label: t('about.goal_long_label'),   val: profile.goals.long },
              { icon: '💼', label: t('about.goal_career_label'), val: profile.goals.career },
              { icon: '🇨🇳', label: t('about.goal_china_label'),  val: profile.goals.china_reason },
            ].map(({ icon, label, val }) => (
              <div key={label} className="flex gap-4 p-4 rounded-xl" style={{ background: 'var(--bg)' }}>
                <span className="text-xl shrink-0">{icon}</span>
                <div>
                  <div className="text-xs font-bold mb-0.5" style={{ color: 'var(--primary)' }}>{label}</div>
                  <div className="text-sm" style={{ color: 'var(--dark)' }}>{val}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quotes */}
        <div className="card p-6">
          <h3 className="font-display font-bold text-lg mb-4" style={{ color: 'var(--dark)' }}>💬 {t('about.quotes_title')}</h3>
          <div className="space-y-4">
            {profile.quotes.map((q, i) => (
              <blockquote key={i} className="border-l-4 pl-4 py-2" style={{ borderColor: 'var(--primary)' }}>
                <p className="text-sm italic mb-1" style={{ color: 'var(--dark)' }}>"{q.text}"</p>
                <cite className="text-xs" style={{ color: 'var(--body-color)' }}>— {q.source}</cite>
              </blockquote>
            ))}
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}