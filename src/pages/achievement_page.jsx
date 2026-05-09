import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { X } from 'lucide-react'
import PageWrapper from '../components/ui/page_wrapper'
import SectionHeader from '../components/ui/section_header'
import { achievements } from '../data/achievements'

export default function AchievementPage() {
  const { t } = useTranslation()
  const [modal, setModal] = useState(null)

  return (
    <PageWrapper>
      <Helmet><title>Prestasi Felix Raymond</title></Helmet>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-10 py-20">
        <SectionHeader label={t('achievement.subtitle')} title={t('achievement.title')} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {achievements.map((a, i) => (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="card overflow-hidden cursor-pointer"
              onClick={() => setModal(a)}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={a.img} alt={a.title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                <div className={`absolute inset-0 bg-gradient-to-t ${a.color} opacity-50`} />
                <span className="absolute top-3 left-3 text-3xl">{a.medal}</span>
                <span className="absolute top-3 right-3 badge text-white" style={{ background: 'rgba(0,0,0,0.4)' }}>
                  {a.level}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-display font-bold text-sm leading-snug mb-1" style={{ color: 'var(--dark)' }}>
                  {a.title}
                </h3>
                <p className="text-xs" style={{ color: 'var(--body-color)' }}>{a.date}</p>
                <span className="tag mt-2 inline-block">{a.category}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modal && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4"
              style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(6px)' }}
              onClick={() => setModal(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
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
                  <p className="text-white/60 text-sm mt-1">{modal.date}</p>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </PageWrapper>
  )
}