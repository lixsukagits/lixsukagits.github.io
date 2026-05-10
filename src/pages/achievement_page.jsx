import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import PageWrapper from '../components/ui/page_wrapper'
import SectionHeader from '../components/ui/section_header'
import LazyImage from '../components/ui/lazy_image'
import { achievements } from '../data/achievements'
import { useThemeStore } from '../store/use_theme_store'

// ── Urutkan terbaru dulu ────────────────────────────────────────
const sorted = [...achievements].reverse()

// ── Level badge config ──────────────────────────────────────────
const levelStyle = {
  'Nasional': { bg: 'rgba(55,88,249,0.18)',  color: '#3758F9', border: 'rgba(55,88,249,0.35)' },
  'Sekolah':  { bg: 'rgba(34,197,94,0.18)',  color: '#22c55e', border: 'rgba(34,197,94,0.35)' },
}
const getLevel = (a) => levelStyle[a.level] ?? levelStyle['Nasional']

// ── Card ────────────────────────────────────────────────────────
function AchievementCard({ a, index, onClick }) {
  const lvl = getLevel(a)

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-32px' }}
      transition={{ delay: index * 0.07, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      onClick={onClick}
      className="card overflow-hidden cursor-pointer group"
      whileHover={{ y: -6 }}
    >
      {/* Top accent border */}
      <div
        className="h-0.5 w-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, transparent, ${lvl.color}, transparent)` }}
      />

      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <LazyImage
          src={a.img}
          alt={a.title}
          className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />

        {/* Hover shimmer */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.07) 0%, transparent 50%, rgba(55,88,249,0.09) 100%)' }}
        />

        {/* Desc overlay */}
        <div className="absolute inset-0 flex flex-col justify-end p-4 pointer-events-none">
          <p
            className="text-white/90 text-xs leading-relaxed line-clamp-2 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300"
            style={{ textShadow: '0 1px 6px rgba(0,0,0,0.7)' }}
          >
            {a.desc}
          </p>
        </div>

        {/* Medal — card only */}
        <span className="absolute top-3 left-3 text-3xl drop-shadow-lg select-none">{a.medal}</span>

        {/* Level badge — card only */}
        <span
          className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-bold"
          style={{
            background: lvl.bg,
            color: lvl.color,
            backdropFilter: 'blur(8px)',
            border: `1px solid ${lvl.border}`,
          }}
        >
          {a.level}
        </span>
      </div>

      {/* Body — letter-spacing lebih lebar */}
      <div className="p-5 pb-6">
        <h3
          className="font-display font-bold text-sm mb-2 group-hover:text-[var(--primary)] transition-colors duration-200"
          style={{
            color: 'var(--dark)',
            lineHeight: 1.75,
            letterSpacing: '0.1em',   /* ← jarak antar huruf lebih lebar */
            wordSpacing: '0.05em',     /* ← jarak antar kata sedikit lebih lega */
          }}
        >
          {a.title}
        </h3>
        <p className="text-xs mb-3" style={{ color: 'var(--body-color)' }}>{a.date}</p>
        <div className="flex items-center gap-2">
          <span className="tag">{a.category}</span>
          <span
            className="w-1.5 h-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ background: lvl.color, boxShadow: `0 0 6px ${lvl.color}` }}
          />
        </div>
      </div>
    </motion.div>
  )
}

// ── Modal ───────────────────────────────────────────────────────
function AchievementModal({ modal, currentIndex, total, onClose, onPrev, onNext, isDark }) {
  if (!modal) return null
  const lvl = getLevel(modal)

  const backdropBg   = isDark ? 'rgba(8,10,18,0.92)'     : 'rgba(15,20,40,0.80)'
  const panelBg      = isDark ? 'rgba(22,27,42,0.97)'    : 'rgba(255,255,255,0.98)'
  const titleColor   = isDark ? '#f1f5f9'                 : '#212b36'
  const dateColor    = isDark ? 'rgba(148,163,184,0.8)'  : '#637381'
  const descColor    = isDark ? 'rgba(203,213,225,0.85)' : '#374151'
  const divider      = isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.06)'
  const btnBg        = isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.05)'
  const btnBorder    = isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.09)'
  const btnColor     = isDark ? 'rgba(255,255,255,0.65)' : '#374151'
  const counterColor = isDark ? 'rgba(255,255,255,0.4)'  : 'rgba(0,0,0,0.35)'
  const closeColor   = isDark ? 'rgba(255,255,255,0.5)'  : 'rgba(0,0,0,0.4)'
  const hintColor    = isDark ? 'rgba(255,255,255,0.22)' : 'rgba(0,0,0,0.20)'
  const imgBg        = isDark ? '#0f1117'                 : '#f0f2f5'

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      style={{ background: backdropBg, backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.90, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.90, opacity: 0, y: 20 }}
        transition={{ duration: 0.30, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl"
        style={{ background: panelBg, border: `1px solid ${lvl.border}` }}
        onClick={e => e.stopPropagation()}
      >
        {/* Top bar: dots + counter + close */}
        <div
          className="flex items-center justify-between px-5 py-3"
          style={{ borderBottom: `1px solid ${divider}` }}
        >
          <div className="flex items-center gap-1.5">
            {sorted.map((_, i) => (
              <div
                key={i}
                className="rounded-full transition-all duration-300"
                style={{
                  width:  i === currentIndex ? 20 : 6,
                  height: 6,
                  background: i === currentIndex
                    ? lvl.color
                    : (isDark ? 'rgba(255,255,255,0.18)' : 'rgba(0,0,0,0.13)'),
                }}
              />
            ))}
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-medium tabular-nums" style={{ color: counterColor }}>
              {currentIndex + 1} / {total}
            </span>
            <button
              onClick={onClose}
              className="w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
              style={{ background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)', color: closeColor }}
            >
              <X size={15} />
            </button>
          </div>
        </div>

        {/* Image — bersih, tanpa medal dan badge */}
        <div className="relative overflow-hidden" style={{ background: imgBg }}>
          <motion.img
            key={modal.id}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25 }}
            src={modal.img}
            alt={modal.title}
            className="w-full object-contain"
            style={{ maxHeight: '52vh' }}
          />
          {/* Tidak ada medal emoji, tidak ada level badge di sini */}
        </div>

        {/* Info */}
        <motion.div
          key={`desc-${modal.id}`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.22 }}
          className="px-6 py-5"
        >
          <p
            className="font-display font-bold text-base mb-1"
            style={{
              color: titleColor,
              lineHeight: 1.75,
              letterSpacing: '0.03em',
              wordSpacing: '0.05em',
            }}
          >
            {modal.title}
          </p>
          <p className="text-xs mb-3" style={{ color: dateColor }}>{modal.date}</p>
          {modal.desc && (
            <p
              className="text-sm leading-relaxed pl-3"
              style={{ color: descColor, borderLeft: `2px solid ${lvl.color}`, lineHeight: 1.75 }}
            >
              {modal.desc}
            </p>
          )}
        </motion.div>

        {/* Prev / Next */}
        <div
          className="flex items-center justify-between px-6 pb-5 pt-4"
          style={{ borderTop: `1px solid ${divider}` }}
        >
          <motion.button
            onClick={onPrev}
            whileHover={{ scale: 1.05, x: -2 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold"
            style={{ background: btnBg, border: `1px solid ${btnBorder}`, color: btnColor }}
          >
            <ChevronLeft size={15} /> Sebelumnya
          </motion.button>
          <p className="text-xs hidden sm:block" style={{ color: hintColor }}>
            ← → navigasi · Esc tutup
          </p>
          <motion.button
            onClick={onNext}
            whileHover={{ scale: 1.05, x: 2 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold"
            style={{ background: btnBg, border: `1px solid ${btnBorder}`, color: btnColor }}
          >
            Berikutnya <ChevronRight size={15} />
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ── Page ────────────────────────────────────────────────────────
export default function AchievementPage() {
  const { t } = useTranslation()
  const { theme } = useThemeStore()
  const isDark = theme === 'dark'
  const [modalIndex, setModalIndex] = useState(null)

  const closeModal = () => setModalIndex(null)
  const prevModal  = () => setModalIndex(i => (i - 1 + sorted.length) % sorted.length)
  const nextModal  = () => setModalIndex(i => (i + 1) % sorted.length)

  useEffect(() => {
    const handler = (e) => {
      if (modalIndex === null) return
      if (e.key === 'ArrowLeft')  prevModal()
      if (e.key === 'ArrowRight') nextModal()
      if (e.key === 'Escape')     closeModal()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [modalIndex])

  const stats = [
    { label: 'Total Prestasi', val: sorted.length,                                     color: '#3758F9' },
    { label: 'Nasional',       val: sorted.filter(a => a.level === 'Nasional').length,  color: '#7c3aed' },
    { label: 'Sekolah',        val: sorted.filter(a => a.level === 'Sekolah').length,   color: '#22c55e' },
  ]

  return (
    <PageWrapper>
      <Helmet>
        <title>Prestasi Felix Raymond</title>
        <meta name="description" content="Medali emas nasional — olimpiade informatika, kompetisi IT, dan berbagai prestasi akademik Felix Raymond." />
        <meta property="og:title" content="Prestasi Felix Raymond" />
        <meta property="og:description" content="Koleksi prestasi & penghargaan Felix Raymond di bidang IT dan akademik." />
        <meta property="og:url" content="https://lixsukagits.github.io/achievement" />
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-10 py-20">
        <div className="[&_.section-title]:text-4xl [&_.section-title]:sm:text-5xl [&_.section-title]:font-extrabold [&_.section-title]:mb-3">
          <SectionHeader label={t('achievement.subtitle')} title={t('achievement.title')} />
        </div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="flex flex-wrap gap-3 justify-center mb-10"
        >
          {stats.map(({ label, val, color }) => (
            <div
              key={label}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm"
              style={{ background: `${color}12`, border: `1px solid ${color}28`, color }}
            >
              <span className="font-extrabold text-base">{val}</span>
              <span className="font-normal opacity-75">{label}</span>
            </div>
          ))}
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {sorted.map((a, i) => (
            <AchievementCard
              key={a.id}
              a={a}
              index={i}
              onClick={() => setModalIndex(i)}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {modalIndex !== null && (
          <AchievementModal
            modal={sorted[modalIndex]}
            currentIndex={modalIndex}
            total={sorted.length}
            onClose={closeModal}
            onPrev={prevModal}
            onNext={nextModal}
            isDark={isDark}
          />
        )}
      </AnimatePresence>
    </PageWrapper>
  )
}