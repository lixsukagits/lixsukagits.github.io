import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import PageWrapper from '../components/ui/page_wrapper'
import SectionHeader from '../components/ui/section_header'
import LazyImage from '../components/ui/lazy_image'
import { gallery, galleryCategories } from '../data/gallery'
import { useThemeStore } from '../store/use_theme_store'

// ── Category accent colors ──────────────────────────────────────
const catAccent = {
  'Prestasi':   { color: '#3758F9', border: 'rgba(55,88,249,0.35)',  bg: 'rgba(55,88,249,0.12)'  },
  'Pelatihan':  { color: '#7c3aed', border: 'rgba(124,58,237,0.35)', bg: 'rgba(124,58,237,0.12)' },
  'Organisasi': { color: '#0891b2', border: 'rgba(8,145,178,0.35)',  bg: 'rgba(8,145,178,0.12)'  },
  'Sekolah':    { color: '#059669', border: 'rgba(5,150,105,0.35)',  bg: 'rgba(5,150,105,0.12)'  },
  'Hobi':       { color: '#db2777', border: 'rgba(219,39,119,0.35)', bg: 'rgba(219,39,119,0.12)' },
}
const getAccent = (cat) => catAccent[cat] ?? catAccent['Prestasi']

// ── Card ────────────────────────────────────────────────────────
function GalleryCard({ item, index, onClick }) {
  const ac = getAccent(item.category)

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-24px' }}
      transition={{ delay: index * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      onClick={onClick}
      className="card overflow-hidden cursor-pointer group"
      whileHover={{ y: -6 }}
    >
      {/* Top accent border */}
      <div
        className="h-0.5 w-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, transparent, ${ac.color}, transparent)` }}
      />

      {/* Image */}
      <div className="relative aspect-square overflow-hidden" style={{ background: 'var(--bg)' }}>
        <LazyImage
          src={item.img}
          alt={item.title}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />

        {/* Hover shimmer */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{ background: `linear-gradient(135deg, rgba(255,255,255,0.07) 0%, transparent 50%, ${ac.color}15 100%)` }}
        />

        {/* Desc overlay */}
        <div className="absolute inset-0 flex flex-col justify-end p-4 pointer-events-none">
          <p
            className="text-white/90 text-xs leading-relaxed line-clamp-2 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300"
            style={{ textShadow: '0 1px 6px rgba(0,0,0,0.7)' }}
          >
            {item.desc}
          </p>
        </div>

        {/* Category badge */}
        <span
          className="absolute top-2 right-2 px-2.5 py-1 rounded-full text-xs font-bold"
          style={{ background: ac.bg, color: ac.color, backdropFilter: 'blur(8px)', border: `1px solid ${ac.border}` }}
        >
          {item.category}
        </span>

        {/* Glow dot */}
        <span
          className="absolute top-2 left-2 w-2 h-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: ac.color, boxShadow: `0 0 8px ${ac.color}` }}
        />
      </div>

      {/* Body */}
      <div className="p-4 pb-5">
        <h3
          className="font-display font-bold text-sm mb-1 group-hover:text-[var(--primary)] transition-colors duration-200"
          style={{ color: 'var(--dark)', lineHeight: 1.75, letterSpacing: '0.03em', wordSpacing: '0.05em' }}
        >
          {item.title}
        </h3>
        <span className="tag">{item.category}</span>
      </div>
    </motion.div>
  )
}

// ── Lightbox Modal ──────────────────────────────────────────────
function GalleryModal({ item, filteredList, currentIndex, onClose, onPrev, onNext, isDark }) {
  if (!item) return null
  const ac = getAccent(item.category)

  const backdropBg   = isDark ? 'rgba(8,10,18,0.92)'     : 'rgba(15,20,40,0.80)'
  const panelBg      = isDark ? 'rgba(22,27,42,0.97)'    : 'rgba(255,255,255,0.98)'
  const titleColor   = isDark ? '#f1f5f9'                 : '#212b36'
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
        style={{ background: panelBg, border: `1px solid ${ac.border}` }}
        onClick={e => e.stopPropagation()}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between px-5 py-3" style={{ borderBottom: `1px solid ${divider}` }}>
          <div className="flex items-center gap-1.5">
            {filteredList.map((_, i) => (
              <div
                key={i}
                className="rounded-full transition-all duration-300"
                style={{
                  width:  i === currentIndex ? 20 : 6,
                  height: 6,
                  background: i === currentIndex
                    ? ac.color
                    : (isDark ? 'rgba(255,255,255,0.18)' : 'rgba(0,0,0,0.13)'),
                }}
              />
            ))}
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-medium tabular-nums" style={{ color: counterColor }}>
              {currentIndex + 1} / {filteredList.length}
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

        {/* Image */}
        <div className="relative overflow-hidden" style={{ background: imgBg }}>
          <motion.img
            key={item.id}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25 }}
            src={item.img}
            alt={item.title}
            className="w-full object-contain"
            style={{ maxHeight: '55vh' }}
          />
        </div>

        {/* Info */}
        <motion.div
          key={`info-${item.id}`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.22 }}
          className="px-6 py-5"
        >
          <p
            className="font-display font-bold text-base mb-1"
            style={{ color: titleColor, lineHeight: 1.75, letterSpacing: '0.03em', wordSpacing: '0.05em' }}
          >
            {item.title}
          </p>
          {item.desc && (
            <p
              className="text-sm leading-relaxed pl-3 mt-2"
              style={{ color: descColor, borderLeft: `2px solid ${ac.color}`, lineHeight: 1.75 }}
            >
              {item.desc}
            </p>
          )}
          <div className="mt-3">
            <span
              className="px-2.5 py-1 rounded-full text-xs font-medium"
              style={{ background: ac.bg, color: ac.color, border: `1px solid ${ac.border}` }}
            >
              {item.category}
            </span>
          </div>
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
export default function GalleryPage() {
  const { t } = useTranslation()
  const { theme } = useThemeStore()
  const isDark = theme === 'dark'

  const [active, setActive]     = useState('Semua')
  const [modalIndex, setModal]  = useState(null)

  const filtered = active === 'Semua' ? gallery : gallery.filter(g => g.category === active)

  const closeModal = () => setModal(null)
  const prevModal  = () => setModal(i => (i - 1 + filtered.length) % filtered.length)
  const nextModal  = () => setModal(i => (i + 1) % filtered.length)

  useEffect(() => {
    const handler = (e) => {
      if (modalIndex === null) return
      if (e.key === 'ArrowLeft')  prevModal()
      if (e.key === 'ArrowRight') nextModal()
      if (e.key === 'Escape')     closeModal()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [modalIndex, filtered])

  return (
    <PageWrapper>
      <Helmet>
        <title>Galeri Felix Raymond</title>
        <meta name="description" content="Galeri foto Felix Raymond — momen kompetisi, kegiatan, dan perjalanan hidup." />
        <meta property="og:title" content="Galeri Felix Raymond" />
        <meta property="og:description" content="Koleksi foto dan momen penting Felix Raymond." />
        <meta property="og:url" content="https://lixsukagits.github.io/gallery" />
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-10 py-20">
        <SectionHeader label={t('gallery.subtitle')} title={t('gallery.title')} />

        {/* Filter */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {galleryCategories.map(cat => {
            const ac = cat === 'Semua' ? null : getAccent(cat)
            const isActive = active === cat
            return (
              <motion.button
                key={cat}
                onClick={() => { setActive(cat); setModal(null) }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="px-4 py-2 rounded-xl text-sm font-medium transition-all"
                style={{
                  background: isActive ? (ac?.color ?? 'var(--primary)') : 'var(--card-bg)',
                  color:      isActive ? '#fff' : 'var(--body-color)',
                  border:     `1px solid ${isActive ? (ac?.color ?? 'var(--primary)') : 'var(--border)'}`,
                  boxShadow:  isActive ? `0 4px 14px ${ac?.color ?? 'var(--primary)'}40` : 'none',
                }}
              >
                {cat}
              </motion.button>
            )
          })}
        </div>

        {/* Count */}
        <p className="text-sm text-center mb-8" style={{ color: 'var(--body-color)' }}>
          {filtered.length} foto
        </p>

        {/* Grid */}
        {filtered.length > 0 ? (
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <AnimatePresence>
              {filtered.map((item, i) => (
                <GalleryCard
                  key={item.id}
                  item={item}
                  index={i}
                  onClick={() => setModal(i)}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="text-center py-20">
            <p className="text-4xl mb-3">📷</p>
            <p style={{ color: 'var(--body-color)' }}>Tidak ada foto di kategori ini.</p>
          </div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modalIndex !== null && (
          <GalleryModal
            item={filtered[modalIndex]}
            filteredList={filtered}
            currentIndex={modalIndex}
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