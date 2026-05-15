import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import PageWrapper from '../components/ui/page_wrapper'
import { profile } from '../data/profile'

export default function NowPage() {
  const { t } = useTranslation()
  const { now } = profile

  const items = [
    { icon: '📚', label: 'Sedang Belajar',    val: now.learning,   color: '#3758F9' },
    { icon: '🔨', label: 'Sedang Dikerjakan', val: now.working_on, color: '#7c3aed' },
    { icon: '📖', label: 'Sedang Dibaca',     val: now.reading,    color: '#10b981' },
  ]

  return (
    <PageWrapper>
      <Helmet>
        <title>Sekarang — Felix Raymond</title>
        <meta name="description" content={`Update ${now.updated}: Felix sedang ${now.learning}.`} />
        <meta property="og:url" content="https://lixsukagits.github.io/now" />
      </Helmet>

      <div className="max-w-xl mx-auto px-4 sm:px-6 md:px-10 py-20">

        {/* Section label */}
        <div className="text-center mb-3">
          <p style={{
            fontSize: 'clamp(0.85rem, 1.5vw, 1rem)', fontWeight: 700,
            letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--primary)',
          }}>
            {t('now.subtitle')}
          </p>
        </div>

        {/* Updated badge */}
        <div className="flex justify-center mb-10">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold"
            style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', color: 'var(--body-color)' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            {t('now.updated')}: <strong style={{ color: 'var(--dark)' }}>{now.updated}</strong>
          </span>
        </div>

        {/* Items */}
        <div className="space-y-4">
          {items.map(({ icon, label, val, color }, i) => (
            <motion.div
              key={label}
              className="card p-5 flex gap-4 items-start"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, type: 'spring', stiffness: 260, damping: 22 }}
              whileHover={{ x: 4 }}
            >
              {/* Icon circle */}
              <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0"
                style={{ background: `${color}15`, border: `1px solid ${color}30` }}>
                {icon}
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider mb-1"
                  style={{ color }}>
                  {label}
                </p>
                <p className="font-semibold text-sm leading-snug" style={{ color: 'var(--dark)' }}>
                  {val}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Inspired by */}
        <motion.div
          className="card p-5 mt-6 text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          style={{ background: 'linear-gradient(135deg, var(--primary-light), var(--card-bg))' }}
        >
          <p className="text-xs" style={{ color: 'var(--body-color)' }}>
            Halaman ini diperbarui manual setiap beberapa minggu.{' '}
            Terinspirasi dari{' '}
            <a href="https://nownownow.com" target="_blank" rel="noopener noreferrer"
              className="link-underline font-semibold" style={{ color: 'var(--primary)' }}>
              nownownow.com
            </a>
          </p>
        </motion.div>

      </div>
    </PageWrapper>
  )
}