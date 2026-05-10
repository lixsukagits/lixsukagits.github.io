import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { MapPin } from 'lucide-react'
import PageWrapper from '../components/ui/page_wrapper'
import SectionHeader from '../components/ui/section_header'
import { education } from '../data/education'

export default function EducationPage() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language

  return (
    <PageWrapper>
      <Helmet>
        <title>Pendidikan Felix Raymond</title>
        <meta name="description" content="Riwayat pendidikan Felix Raymond — dari SD hingga SMA, dengan berbagai prestasi akademik di setiap jenjang." />
        <meta property="og:title" content="Pendidikan Felix Raymond" />
        <meta property="og:description" content="Perjalanan pendidikan Felix Raymond dari Medan, calon mahasiswa beasiswa China." />
        <meta property="og:url" content="https://lixsukagits.github.io/education" />
      </Helmet>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 md:px-10 py-20">
        <SectionHeader label={t('education.subtitle')} title={t('education.title')} />

        <div className="relative">
          <div className="timeline-line" />
          <div className="space-y-10">
            {education.map((ed, i) => (
              <motion.div
                key={ed.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative flex gap-6 pl-16"
              >
                <div
                  className="timeline-dot"
                  style={{ background: ed.current ? 'var(--primary)' : 'var(--bg)', border: '2px solid var(--border)' }}
                >
                  {ed.icon}
                </div>
                <div className="flex-1 card p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                    <div>
                      <h3 className="font-display font-bold text-xl" style={{ color: 'var(--dark)' }}>
                        {ed.school}
                      </h3>
                      <p className="font-semibold text-sm mt-0.5" style={{ color: 'var(--primary)' }}>
                        {lang === 'en' ? ed.majorEn : lang === 'zh' ? ed.majorZh : ed.major}
                      </p>
                    </div>
                    <div className="flex flex-col items-start sm:items-end gap-1 shrink-0">
                      {ed.current && (
                        <span className="inline-flex items-center gap-1.5 badge bg-green-50 text-green-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                          {t('education.current')}
                        </span>
                      )}
                      <span className="text-xs" style={{ color: 'var(--body-color)' }}>
                        {lang === 'en' ? ed.periodEn : lang === 'zh' ? ed.periodZh : ed.period}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs mb-4" style={{ color: 'var(--body-color)' }}>
                    <MapPin size={12} /> {ed.location}
                  </div>
                  <ul className="space-y-1">
                    {ed.achievements.map(ac => (
                      <li key={ac} className="flex items-start gap-2 text-sm" style={{ color: 'var(--body-color)' }}>
                        <span className="text-[var(--primary)] mt-0.5">✦</span> {ac}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}