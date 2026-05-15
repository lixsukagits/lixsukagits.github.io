import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { ChevronDown } from 'lucide-react'
import PageWrapper from '../components/ui/page_wrapper'
import { timeline } from '../data/timeline'

export default function TimelinePage() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language
  const [expanded, setExpanded] = useState(null)

  return (
    <PageWrapper>
      <Helmet>
        <title>Timeline Hidup Felix Raymond</title>
        <meta name="description" content="Perjalanan hidup Felix Raymond dari lahir hingga sekarang." />
        <meta property="og:url" content="https://lixsukagits.github.io/timeline" />
      </Helmet>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 md:px-10 py-20">

        {/* Section label */}
        <div className="text-center mb-14">
          <p style={{
            fontSize: 'clamp(0.85rem, 1.5vw, 1rem)',
            fontWeight: 700, letterSpacing: '0.2em',
            textTransform: 'uppercase', color: 'var(--primary)',
          }}>
            {t('timeline.subtitle')}
          </p>
        </div>

        {/* Timeline wrapper */}
        <div className="relative">

          {/* Vertical gradient line — posisi tepat di tengah dot (dot lebar 48px = left 24px) */}
          <div style={{
            position: 'absolute',
            left: 23,
            top: 24, bottom: 0,
            width: 2,
            background: 'linear-gradient(to bottom, var(--primary), rgba(124,58,237,0.3), transparent)',
            borderRadius: 2,
            zIndex: 0,
          }} />

          <div className="space-y-6">
            {timeline.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.06, type: 'spring', stiffness: 260, damping: 22 }}
                className="flex gap-4 items-start"
              >
                {/* Dot — fixed width, tidak overlap card */}
                <div style={{
                  width: 48, height: 48,
                  borderRadius: '50%',
                  background: item.color || 'var(--primary-light)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.2rem',
                  flexShrink: 0,
                  boxShadow: '0 0 0 3px var(--bg), 0 2px 12px rgba(55,88,249,0.18)',
                  border: '2px solid var(--border)',
                  position: 'relative',
                  zIndex: 1,
                }}>
                  {item.icon}
                </div>

                {/* Card */}
                <div
                  className="flex-1 card p-4 sm:p-5 cursor-pointer min-w-0"
                  onClick={() => setExpanded(expanded === i ? null : i)}
                  style={{ marginTop: 4 }}
                >
                  {/* Header row */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2 flex-wrap min-w-0">
                      <span
                        className="text-xs font-bold px-2.5 py-1 rounded-full shrink-0 mt-0.5"
                        style={{ background: 'var(--primary-light)', color: 'var(--primary)' }}
                      >
                        {item.year}
                      </span>
                      <h3
                        className="font-display font-bold text-sm sm:text-base leading-snug"
                        style={{ color: 'var(--dark)' }}
                      >
                        {lang === 'en' ? item.titleEn
                          : lang === 'zh' ? item.titleZh
                          : item.title}
                      </h3>
                    </div>

                    {/* Chevron — berputar saat expand */}
                    <motion.div
                      animate={{ rotate: expanded === i ? 180 : 0 }}
                      transition={{ duration: 0.22 }}
                      style={{ flexShrink: 0, marginTop: 2 }}
                    >
                      <ChevronDown size={16} style={{ color: 'var(--body-color)' }} />
                    </motion.div>
                  </div>

                  {/* Preview 1 baris saat collapsed */}
                  {expanded !== i && (
                    <p
                      className="text-xs mt-2"
                      style={{
                        color: 'var(--body-color)',
                        opacity: 0.65,
                        overflow: 'hidden',
                        display: '-webkit-box',
                        WebkitLineClamp: 1,
                        WebkitBoxOrient: 'vertical',
                      }}
                    >
                      {item.desc}
                    </p>
                  )}

                  {/* Full description saat expanded */}
                  <AnimatePresence initial={false}>
                    {expanded === i && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                        style={{ overflow: 'hidden' }}
                      >
                        <p
                          className="text-sm leading-relaxed mt-3 pt-3"
                          style={{
                            color: 'var(--body-color)',
                            borderTop: '1px solid var(--border)',
                          }}
                        >
                          {item.desc}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}

            {/* End card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex gap-4 items-start"
            >
              <div style={{
                width: 48, height: 48,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--primary), #7c3aed)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.2rem',
                flexShrink: 0,
                boxShadow: '0 0 0 3px var(--bg), 0 4px 16px rgba(55,88,249,0.3)',
                animation: 'glowPulse 2s ease infinite',
                position: 'relative', zIndex: 1,
              }}>
                🚀
              </div>
              <div
                className="flex-1 card p-4 sm:p-5"
                style={{
                  background: 'linear-gradient(135deg, var(--primary-light), var(--card-bg))',
                  marginTop: 4,
                }}
              >
                <p className="font-display font-bold text-sm" style={{ color: 'var(--primary)' }}>
                  The journey continues...
                </p>
                <p className="text-xs mt-1" style={{ color: 'var(--body-color)' }}>
                  Beasiswa China • S1 IT • Karir Global 🌏
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}