import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import PageWrapper from '../components/ui/page_wrapper'
import SectionHeader from '../components/ui/section_header'
import { timeline } from '../data/timeline'

export default function TimelinePage() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language

  return (
    <PageWrapper>
      <Helmet>
        <title>Timeline Hidup Felix Raymond</title>
        <meta name="description" content="Perjalanan hidup Felix Raymond dari lahir hingga sekarang — momen penting, pencapaian, dan milestone." />
        <meta property="og:title" content="Timeline Hidup Felix Raymond" />
        <meta property="og:description" content="Milestone dan momen penting dalam perjalanan hidup Felix Raymond." />
        <meta property="og:url" content="https://lixsukagits.github.io/timeline" />
      </Helmet>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 md:px-10 py-20">
        <SectionHeader label={t('timeline.subtitle')} title={t('timeline.title')} />

        <div className="relative">
          <div className="timeline-line" />
          <div className="space-y-10">
            {timeline.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="relative flex gap-6 pl-16"
              >
                <div
                  className="timeline-dot text-lg"
                  style={{ background: item.color, border: '2px solid var(--border)' }}
                >
                  {item.icon}
                </div>
                <div className="flex-1 card p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="tag">{item.year}</span>
                    <h3 className="font-display font-bold text-base" style={{ color: 'var(--dark)' }}>
                      {lang === 'en' ? item.titleEn : lang === 'zh' ? item.titleZh : item.title}
                    </h3>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--body-color)' }}>
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}