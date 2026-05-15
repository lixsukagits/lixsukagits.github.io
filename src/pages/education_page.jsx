import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { MapPin, Calendar } from 'lucide-react'
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
        <meta name="description" content="Riwayat pendidikan Felix Raymond — dari Playgroup hingga SMA, dengan berbagai prestasi akademik di setiap jenjang." />
        <meta property="og:title" content="Pendidikan Felix Raymond" />
        <meta property="og:description" content="Perjalanan pendidikan Felix Raymond dari Medan, calon mahasiswa beasiswa China." />
        <meta property="og:url" content="https://lixsukagits.github.io/education" />
      </Helmet>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 md:px-10 py-20">
        <SectionHeader label={t('education.subtitle')} title={t('education.title')} />

        <div className="relative mt-4">
          {/* Timeline line — desktop only */}
          <div
            className="hidden sm:block absolute left-6 top-0 bottom-0 w-px"
            style={{ background: 'linear-gradient(to bottom, var(--primary), var(--border) 80%, transparent)' }}
          />

          <div className="space-y-6 sm:space-y-10">
            {education.map((ed, i) => (
              <motion.div
                key={ed.id}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.15, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                // Desktop: pl-16 for dot space. Mobile: no padding, card only
                className="relative flex gap-6 sm:pl-16"
              >
                {/* Dot with logo — desktop only (hidden on mobile) */}
                <div className="hidden sm:flex absolute left-0 top-5 flex-col items-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 + 0.1, type: 'spring', stiffness: 300, damping: 20 }}
                    className="w-12 h-12 rounded-2xl overflow-hidden shadow-lg relative z-10"
                    style={{
                      border: ed.current
                        ? '2px solid var(--primary)'
                        : '2px solid var(--border)',
                      boxShadow: ed.current
                        ? '0 0 0 4px rgba(55,88,249,0.15), 0 8px 24px rgba(55,88,249,0.25)'
                        : '0 2px 8px rgba(0,0,0,0.08)',
                    }}
                  >
                    <img
                      src={ed.logo}
                      alt={ed.school}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                  {/* Pulse ring for current */}
                  {ed.current && (
                    <motion.div
                      className="absolute w-12 h-12 rounded-2xl"
                      animate={{ scale: [1, 1.35, 1], opacity: [0.35, 0, 0.35] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                      style={{ background: 'rgba(55,88,249,0.2)', top: 0, left: 0 }}
                    />
                  )}
                </div>

                {/* Card */}
                <motion.div
                  className="flex-1 card p-6 group relative overflow-hidden"
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  {/* Top accent on hover */}
                  <div
                    className="absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: ed.current
                      ? 'linear-gradient(90deg, transparent, var(--primary), transparent)'
                      : 'linear-gradient(90deg, transparent, #7c3aed, transparent)'
                    }}
                  />

                  {/* Subtle bg shimmer on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ background: 'radial-gradient(ellipse at top left, rgba(55,88,249,0.06), transparent 70%)' }}
                  />

                  <div className="relative">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                      <div className="flex items-center gap-3">
                        {/* Logo inside card — mobile only */}
                        <div
                          className="sm:hidden w-10 h-10 rounded-xl overflow-hidden shrink-0"
                          style={{ border: '1.5px solid var(--border)' }}
                        >
                          <img src={ed.logo} alt={ed.school} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <h3
                            className="font-display font-bold text-lg sm:text-xl group-hover:text-[var(--primary)] transition-colors duration-200"
                            style={{ color: 'var(--dark)', letterSpacing: '0.02em' }}
                          >
                            {ed.school}
                          </h3>
                          <p className="font-semibold text-sm mt-0.5" style={{ color: 'var(--primary)' }}>
                            {lang === 'en' ? ed.majorEn : lang === 'zh' ? ed.majorZh : ed.major}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col items-start sm:items-end gap-1.5 shrink-0">
                        {ed.current && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold"
                            style={{ background: 'rgba(34,197,94,0.12)', color: '#16a34a', border: '1px solid rgba(34,197,94,0.3)' }}>
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                            {t('education.current')}
                          </span>
                        )}
                        <span className="inline-flex items-center gap-1 text-xs" style={{ color: 'var(--body-color)' }}>
                          <Calendar size={11} />
                          {lang === 'en' ? ed.periodEn : lang === 'zh' ? ed.periodZh : ed.period}
                        </span>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full mb-4"
                      style={{ background: 'var(--bg)', color: 'var(--body-color)' }}>
                      <MapPin size={11} /> {ed.location}
                    </div>

                    {/* Achievements */}
                    <ul className="space-y-2">
                      {ed.achievements.map((ac, j) => (
                        <motion.li
                          key={ac}
                          initial={{ opacity: 0, x: -8 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.15 + j * 0.06 + 0.2 }}
                          className="flex items-start gap-2.5 text-sm"
                          style={{ color: 'var(--body-color)', lineHeight: 1.65, letterSpacing: '0.01em' }}
                        >
                          <span className="shrink-0 mt-1 w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold"
                            style={{ background: 'rgba(55,88,249,0.1)', color: 'var(--primary)' }}>
                            ✦
                          </span>
                          {ac}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}