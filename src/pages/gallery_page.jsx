import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import PageWrapper from '../components/ui/page_wrapper'
import SectionHeader from '../components/ui/section_header'
import LazyImage from '../components/ui/lazy_image'
import { gallery, galleryCategories } from '../data/gallery'

export default function GalleryPage() {
  const { t } = useTranslation()
  const [active, setActive] = useState('Semua')
  const [lightbox, setLightbox] = useState(null)

  const filtered = active === 'Semua' ? gallery : gallery.filter(g => g.category === active)

  const prev = () => setLightbox(i => (i - 1 + filtered.length) % filtered.length)
  const next = () => setLightbox(i => (i + 1) % filtered.length)

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

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {galleryCategories.map(cat => (
            <motion.button
              key={cat}
              onClick={() => setActive(cat)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="px-4 py-2 rounded-xl text-sm font-medium transition-all"
              style={{
                background: active === cat ? 'var(--primary)' : 'var(--card-bg)',
                color: active === cat ? '#fff' : 'var(--body-color)',
                border: `1px solid ${active === cat ? 'var(--primary)' : 'var(--border)'}`,
              }}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <AnimatePresence>
            {filtered.map((item, i) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="relative group overflow-hidden rounded-2xl cursor-pointer aspect-square"
                onClick={() => setLightbox(i)}
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <LazyImage
                  src={item.img}
                  alt={item.title}
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-end p-4">
                  <p className="text-white text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {item.title}
                  </p>
                </div>
                <span className="absolute top-2 right-2 badge opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: 'rgba(0,0,0,0.5)', color: '#fff' }}>
                  {item.category}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center"
            style={{ background: 'rgba(0,0,0,0.92)' }}
            onClick={() => setLightbox(null)}
          >
            <button onClick={() => setLightbox(null)}
              className="absolute top-5 right-5 text-white/70 hover:text-white z-10">
              <X size={28} />
            </button>
            <motion.button
              onClick={e => { e.stopPropagation(); prev() }}
              className="absolute left-4 text-white/70 hover:text-white z-10 p-2"
              whileHover={{ scale: 1.15, x: -2 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft size={36} />
            </motion.button>
            <motion.img
              key={lightbox}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              src={filtered[lightbox]?.img}
              alt={filtered[lightbox]?.title}
              className="max-w-3xl w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl"
              onClick={e => e.stopPropagation()}
            />
            <motion.button
              onClick={e => { e.stopPropagation(); next() }}
              className="absolute right-4 text-white/70 hover:text-white z-10 p-2"
              whileHover={{ scale: 1.15, x: 2 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight size={36} />
            </motion.button>
            <div className="absolute bottom-5 text-white/60 text-sm">
              {filtered[lightbox]?.title} · {lightbox + 1}/{filtered.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageWrapper>
  )
}