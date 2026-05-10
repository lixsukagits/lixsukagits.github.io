import { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { Search, X, ExternalLink } from 'lucide-react'
import PageWrapper from '../components/ui/page_wrapper'
import SectionHeader from '../components/ui/section_header'
import LazyImage from '../components/ui/lazy_image'
import { certificates, certCategories } from '../data/certificates'

export default function CertificatePage() {
  const { t } = useTranslation()
  const [query, setQuery] = useState('')
  const [active, setActive] = useState('Semua')
  const [modal, setModal] = useState(null)

  const filtered = useMemo(() => {
    return certificates.filter(c => {
      const matchCat = active === 'Semua' || c.category === active
      const matchQuery = c.title.toLowerCase().includes(query.toLowerCase()) ||
        c.issuer.toLowerCase().includes(query.toLowerCase())
      return matchCat && matchQuery
    })
  }, [query, active])

  return (
    <PageWrapper>
      <Helmet>
        <title>Sertifikat Felix Raymond</title>
        <meta name="description" content="Koleksi sertifikat Felix Raymond di bidang IT, kompetisi, pelatihan, dan organisasi." />
        <meta property="og:title" content="Sertifikat Felix Raymond" />
        <meta property="og:description" content="Sertifikat & penghargaan dari berbagai kompetisi dan pelatihan IT." />
        <meta property="og:url" content="https://lixsukagits.github.io/certificate" />
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-10 py-20">
        <SectionHeader label={t('certificate.subtitle')} title={t('certificate.title')} />

        {/* Filter & Search */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--body-color)' }} />
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder={t('certificate.search_placeholder')}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm outline-none border transition-colors glow-hover"
              style={{ background: 'var(--card-bg)', borderColor: 'var(--border)', color: 'var(--dark)' }}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {certCategories.map(cat => (
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
        </div>

        <p className="text-sm mb-6" style={{ color: 'var(--body-color)' }}>
          {t('certificate.total', { count: filtered.length })}
        </p>

        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence>
            {filtered.map((cert, i) => (
              <motion.div
                key={cert.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.05 }}
                className="card overflow-hidden cursor-pointer"
                onClick={() => setModal(cert)}
                whileHover={{ y: -4 }}
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-50">
                  <LazyImage
                    src={cert.img}
                    alt={cert.title}
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <span className="absolute top-2 right-2 badge"
                    style={{ background: 'rgba(0,0,0,0.5)', color: '#fff' }}>
                    {cert.category}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-display font-bold text-sm leading-snug mb-1" style={{ color: 'var(--dark)' }}>
                    {cert.title}
                  </h3>
                  <div className="flex items-center justify-between">
                    <p className="text-xs" style={{ color: 'var(--body-color)' }}>{cert.issuer} · {cert.date}</p>
                    <ExternalLink size={13} style={{ color: 'var(--primary)' }} />
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {cert.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-4xl mb-3">🔍</p>
            <p style={{ color: 'var(--body-color)' }}>Tidak ada sertifikat yang cocok.</p>
          </div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modal && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(6px)' }}
            onClick={() => setModal(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              className="relative max-w-2xl w-full"
              onClick={e => e.stopPropagation()}
            >
              <button onClick={() => setModal(null)}
                className="absolute -top-10 right-0 text-white/70 hover:text-white transition-colors">
                <X size={28} />
              </button>
              <img src={modal.img} alt={modal.title} className="w-full rounded-2xl shadow-2xl" />
              <div className="mt-4 text-center">
                <p className="text-white font-semibold">{modal.title}</p>
                <p className="text-white/60 text-sm">{modal.issuer} · {modal.date}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageWrapper>
  )
}