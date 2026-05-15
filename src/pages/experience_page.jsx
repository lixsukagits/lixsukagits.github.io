import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { Calendar } from 'lucide-react'
import PageWrapper from '../components/ui/page_wrapper'
import SectionHeader from '../components/ui/section_header'
import { experience, events } from '../data/experience'

const orgColor = (ex) => ex.current
  ? { color: '#3758F9', border: 'rgba(55,88,249,0.3)',  bg: 'rgba(55,88,249,0.10)' }
  : { color: '#7c3aed', border: 'rgba(124,58,237,0.25)', bg: 'rgba(124,58,237,0.08)' }

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

        {/* ── Timeline ── */}
        <div className="relative mb-20">
          {/* Gradient line — desktop only */}
          <div
            className="hidden sm:block absolute left-6 top-0 bottom-0 w-px"
            style={{ background: 'linear-gradient(to bottom, var(--primary), var(--border) 85%, transparent)' }}
          />

          <div className="space-y-6 sm:space-y-10">
            {experience.map((ex, i) => {
              const ac = orgColor(ex)
              return (
                <motion.div
                  key={ex.id}
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ delay: i * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="relative flex gap-6 sm:pl-16"
                >
                  {/* Dot with logo — desktop only */}
                  <div className="hidden sm:flex absolute left-0 top-5 items-center justify-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 + 0.1, type: 'spring', stiffness: 300, damping: 20 }}
                      className="w-12 h-12 rounded-2xl overflow-hidden shadow-lg relative z-10"
                      style={{
                        border: ex.current ? `2px solid ${ac.color}` : '2px solid var(--border)',
                        boxShadow: ex.current
                          ? `0 0 0 4px ${ac.bg}, 0 8px 24px ${ac.bg}`
                          : '0 2px 8px rgba(0,0,0,0.08)',
                      }}
                    >
                      <img
                        src={ex.logo}
                        alt={ex.org}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                    {ex.current && (
                      <motion.div
                        className="absolute w-12 h-12 rounded-2xl"
                        animate={{ scale: [1, 1.35, 1], opacity: [0.35, 0, 0.35] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                        style={{ background: ac.bg, top: 0, left: 0 }}
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
                      style={{ background: `linear-gradient(90deg, transparent, ${ac.color}, transparent)` }}
                    />

                    {/* Bg shimmer on hover */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{ background: `radial-gradient(ellipse at top left, ${ac.bg}, transparent 70%)` }}
                    />

                    <div className="relative">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                        <div className="flex items-center gap-3">
                          {/* Logo inside card — mobile only */}
                          <div
                            className="sm:hidden w-10 h-10 rounded-xl overflow-hidden shrink-0"
                            style={{ border: `1.5px solid ${ac.border}` }}
                          >
                            <img src={ex.logo} alt={ex.org} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <h3
                              className="font-display font-bold text-lg group-hover:text-[var(--primary)] transition-colors duration-200"
                              style={{ color: 'var(--dark)', letterSpacing: '0.02em', lineHeight: 1.4 }}
                            >
                              {ex.org}
                            </h3>
                            <p className="font-semibold text-sm mt-0.5" style={{ color: ac.color }}>
                              {lang === 'en' ? ex.roleEn : lang === 'zh' ? ex.roleZh : ex.role}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col items-start sm:items-end gap-1.5 shrink-0">
                          {ex.current && (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold"
                              style={{ background: 'rgba(34,197,94,0.12)', color: '#16a34a', border: '1px solid rgba(34,197,94,0.3)' }}>
                              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                              Aktif
                            </span>
                          )}
                          <span className="inline-flex items-center gap-1 text-xs" style={{ color: 'var(--body-color)' }}>
                            <Calendar size={11} />
                            {lang === 'en' ? ex.periodEn : ex.period}
                          </span>
                        </div>
                      </div>

                      <p
                        className="text-sm leading-relaxed mb-4"
                        style={{ color: 'var(--body-color)', lineHeight: 1.75, letterSpacing: '0.01em' }}
                      >
                        {lang === 'en' ? ex.descEn : ex.desc}
                      </p>

                      <div className="flex flex-wrap gap-1.5">
                        {ex.tags.map(tag => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 rounded-full text-xs font-medium"
                            style={{ background: ac.bg, color: ac.color, border: `1px solid ${ac.border}` }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* ── Kegiatan & Event ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xl">🎪</span>
            <h2 className="font-display font-bold text-lg" style={{ color: 'var(--dark)', letterSpacing: '0.02em' }}>
              Kegiatan & Event
            </h2>
            <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, var(--border), transparent)' }} />
            <span
              className="text-xs font-semibold px-2.5 py-1 rounded-full"
              style={{ background: 'rgba(55,88,249,0.10)', color: 'var(--primary)', border: '1px solid rgba(55,88,249,0.2)' }}
            >
              {events.length}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {events.map((ev, i) => (
              <motion.div
                key={ev.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="group card p-4 flex items-center gap-4 relative overflow-hidden"
                whileHover={{ y: -3 }}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ background: 'linear-gradient(135deg, rgba(55,88,249,0.05) 0%, transparent 60%)' }}
                />
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0 transition-transform duration-200 group-hover:scale-110"
                  style={{ background: 'rgba(55,88,249,0.10)', border: '1px solid rgba(55,88,249,0.18)' }}
                >
                  {ev.icon}
                </div>
                <p
                  className="flex-1 font-semibold text-sm group-hover:text-[var(--primary)] transition-colors duration-200 min-w-0"
                  style={{ color: 'var(--dark)', letterSpacing: '0.01em' }}
                >
                  {ev.title}
                </p>
                <span
                  className="shrink-0 text-xs font-bold px-2.5 py-1 rounded-full"
                  style={{ background: 'rgba(55,88,249,0.10)', color: 'var(--primary)', border: '1px solid rgba(55,88,249,0.20)' }}
                >
                  {ev.year}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </PageWrapper>
  )
}