import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import PageWrapper from '../components/ui/page_wrapper'
import SectionHeader from '../components/ui/section_header'
import { experience, events } from '../data/experience'

export default function ExperiencePage() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language

  return (
    <PageWrapper>
      <Helmet>
        <title>Pengalaman Felix Raymond</title>
        <meta name="description" content="Pengalaman organisasi, kepanitiaan, dan event Felix Raymond — OSIS, ekstrakurikuler, dan kegiatan IT." />
        <meta property="og:title" content="Pengalaman Felix Raymond" />
        <meta property="og:description" content="Track record organisasi dan kepanitiaan Felix Raymond sejak SMP hingga SMA." />
        <meta property="og:url" content="https://lixsukagits.github.io/experience" />
      </Helmet>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 md:px-10 py-20">
        <SectionHeader label={t('experience.subtitle')} title={t('experience.title')} />

        <div className="relative mb-16">
          <div className="timeline-line" />
          <div className="space-y-10">
            {experience.map((ex, i) => (
              <motion.div
                key={ex.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative flex gap-6 pl-16"
              >
                <div
                  className="timeline-dot"
                  style={{ background: ex.current ? 'var(--primary)' : 'var(--bg)', border: '2px solid var(--border)' }}
                >
                  {ex.icon}
                </div>
                <div className="flex-1 card p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                    <div>
                      <h3 className="font-display font-bold text-xl" style={{ color: 'var(--dark)' }}>{ex.org}</h3>
                      <p className="font-semibold text-sm mt-0.5" style={{ color: 'var(--primary)' }}>
                        {lang === 'en' ? ex.roleEn : lang === 'zh' ? ex.roleZh : ex.role}
                      </p>
                    </div>
                    <div className="flex flex-col items-start sm:items-end gap-1 shrink-0">
                      {ex.current && (
                        <span className="inline-flex items-center gap-1.5 badge bg-green-50 text-green-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                          Aktif
                        </span>
                      )}
                      <span className="text-xs" style={{ color: 'var(--body-color)' }}>
                        {lang === 'en' ? ex.periodEn : ex.period}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--body-color)' }}>
                    {lang === 'en' ? ex.descEn : ex.desc}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {ex.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="card p-6">
          <h3 className="font-display font-bold text-lg mb-4" style={{ color: 'var(--dark)' }}>
            🎪 Kegiatan & Event
          </h3>
          <div className="space-y-3">
            {events.map(ev => (
              <div key={ev.title} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: 'var(--bg)' }}>
                <span className="text-xl">{ev.icon}</span>
                <div>
                  <p className="font-semibold text-sm" style={{ color: 'var(--dark)' }}>{ev.title}</p>
                  <p className="text-xs" style={{ color: 'var(--body-color)' }}>{ev.year}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}