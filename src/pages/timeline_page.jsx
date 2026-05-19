import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { ChevronDown } from 'lucide-react'
import PageWrapper from '../components/ui/page_wrapper'
import SectionHeader from '../components/ui/section_header'
import { timeline } from '../data/timeline'

export default function TimelinePage() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language
  const [expanded, setExpanded] = useState(null)

  const toggle = (i) => setExpanded(prev => prev === i ? null : i)

  return (
    <PageWrapper>
      <Helmet>
        <title>Timeline Hidup Felix Raymond</title>
        <meta name="description" content="Perjalanan hidup Felix Raymond dari lahir hingga sekarang." />
        <meta property="og:url" content="https://lixsukagits.github.io/timeline" />
      </Helmet>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 md:px-10 py-20">

        <SectionHeader label={t('timeline.subtitle')} title={t('nav.timeline')} />

        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute top-6 bottom-0 w-0.5 rounded-sm z-0"
            style={{ left: 23, background: 'linear-gradient(to bottom, var(--primary), rgba(124,58,237,0.3), transparent)' }}
          />

          <div className="space-y-6">
            {timeline.map((item, i) => {
              const isExpanded = expanded === i
              // FIX: title & desc multilang
              const title = lang === 'en' ? item.titleEn : lang === 'zh' ? item.titleZh : item.title
              const desc  = lang === 'en' ? (item.descEn ?? item.desc)
                          : lang === 'zh' ? (item.descZh ?? item.desc)
                          : item.desc

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ delay: i * 0.06, type: 'spring', stiffness: 260, damping: 22 }}
                  className="flex gap-4 items-start"
                >
                  <div
                    aria-hidden="true"
                    className="w-12 h-12 rounded-full flex items-center justify-center
                               text-xl shrink-0 relative z-[1] border-2 border-[var(--border)]"
                    style={{ background: item.color || 'var(--primary-light)',
                             boxShadow: '0 0 0 3px var(--bg), 0 2px 12px rgba(55,88,249,0.18)' }}
                  >
                    {item.icon}
                  </div>

                  <button
                    type="button"
                    className="flex-1 card p-4 sm:p-5 min-w-0 text-left w-full mt-1 cursor-pointer bg-transparent"
                    onClick={() => toggle(i)}
                    aria-expanded={isExpanded}
                    aria-controls={`timeline-detail-${i}`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-start gap-2 flex-wrap min-w-0">
                        <span className="text-xs font-bold px-2.5 py-1 rounded-full shrink-0 mt-0.5
                                         bg-[var(--primary-light)] text-[var(--primary)]">
                          {item.year}
                        </span>
                        <h3 className="font-display font-bold text-sm sm:text-base leading-snug text-[var(--dark)]">
                          {title}
                        </h3>
                      </div>
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.22 }}
                        className="shrink-0 mt-0.5" aria-hidden="true"
                      >
                        <ChevronDown size={16} className="text-[var(--body-color)]" />
                      </motion.div>
                    </div>

                    {!isExpanded && (
                      <p
                        className="text-xs mt-2 text-[var(--body-color)] opacity-65"
                        style={{ overflow: 'hidden', display: '-webkit-box',
                                 WebkitLineClamp: 1, WebkitBoxOrient: 'vertical' }}
                      >
                        {desc}
                      </p>
                    )}

                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          id={`timeline-detail-${i}`}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25, ease: 'easeOut' }}
                          className="overflow-hidden"
                        >
                          <p className="text-sm leading-relaxed mt-3 pt-3 text-[var(--body-color)] border-t border-[var(--border)]">
                            {desc}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                </motion.div>
              )
            })}

            {/* End card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: 0.1 }}
              className="flex gap-4 items-start"
            >
              <motion.div
                aria-hidden="true"
                animate={{ boxShadow: [
                  '0 0 0 3px var(--bg), 0 4px 16px rgba(55,88,249,0.3)',
                  '0 0 0 3px var(--bg), 0 4px 24px rgba(55,88,249,0.6)',
                  '0 0 0 3px var(--bg), 0 4px 16px rgba(55,88,249,0.3)',
                ]}}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="w-12 h-12 rounded-full flex items-center justify-center text-xl shrink-0 relative z-[1]"
                style={{ background: 'linear-gradient(135deg, var(--primary), #7c3aed)' }}
              >
                🚀
              </motion.div>
              <div className="flex-1 card p-4 sm:p-5 mt-1"
                style={{ background: 'linear-gradient(135deg, var(--primary-light), var(--card-bg))' }}>
                <p className="font-display font-bold text-sm text-[var(--primary)]">The journey continues...</p>
                <p className="text-xs mt-1 text-[var(--body-color)]">Beasiswa China • S1 IT • Karir Global 🌏</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}