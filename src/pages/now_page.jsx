import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import PageWrapper from '../components/ui/page_wrapper'
import SectionHeader from '../components/ui/section_header'
import { profile } from '../data/profile'

export default function NowPage() {
  const { t } = useTranslation()
  const { now } = profile

  // NOTE: color tetap inline — semantik per-item, bukan design token
  const items = [
    { icon: '📚', labelKey: 'now.learning_label',    val: now.learning,   color: '#3758F9' },
    { icon: '🔨', labelKey: 'now.working_on_label',  val: now.working_on, color: '#7c3aed' },
    { icon: '📖', labelKey: 'now.reading_label',     val: now.reading,    color: '#10b981' },
  ]

  const FALLBACKS = {
    'now.learning_label':   'Sedang Belajar',
    'now.working_on_label': 'Sedang Dikerjakan',
    'now.reading_label':    'Sedang Dibaca',
  }

  return (
    <PageWrapper>
      <Helmet>
        <title>Sekarang — Felix Raymond</title>
        <meta name="description" content={`Update ${now.updated}: Felix sedang ${now.learning}.`} />
        <meta property="og:url" content="https://lixsukagits.github.io/now" />
      </Helmet>

      <div className="max-w-xl mx-auto px-4 sm:px-6 md:px-10 py-20">

        <SectionHeader label={t('now.subtitle')} title={t('nav.now')} />

        {/* Updated badge */}
        {/* FIX: style={{ background, border, color }} → className */}
        <div className="flex justify-center mb-10">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold
                           bg-[var(--card-bg)] border border-[var(--border)] text-[var(--body-color)]">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" aria-hidden="true" />
            {t('now.updated')}: <strong className="text-[var(--dark)]">{now.updated}</strong>
          </span>
        </div>

        {/* Items */}
        <div className="space-y-4">
          {items.map(({ icon, labelKey, val, color }, i) => (
            <motion.div
              key={labelKey}
              className="card p-5 flex gap-4 items-start"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, type: 'spring', stiffness: 260, damping: 22 }}
              whileHover={{ x: 4 }}
            >
              {/* icon bg — alpha dari color dinamis, tetap inline */}
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0"
                style={{ background: `${color}15`, border: `1px solid ${color}30` }}
                aria-hidden="true"
              >
                {icon}
              </div>
              <div>
                {/* FIX: style={{ color }} pada label tetap inline — semantik per-item */}
                <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color }}>
                  {t(labelKey, FALLBACKS[labelKey])}
                </p>
                {/* FIX: style={{ color:'var(--dark)' }} → className */}
                <p className="font-semibold text-sm leading-snug text-[var(--dark)]">{val}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Inspired by */}
        {/* FIX: style={{ background }} → inline tetap (gradient); style={{ color }} → className */}
        <motion.div
          className="card p-5 mt-6 text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          style={{ background: 'linear-gradient(135deg, var(--primary-light), var(--card-bg))' }}
        >
          <p className="text-xs text-[var(--body-color)]">
            {t('now.inspired_prefix', 'Halaman ini diperbarui manual setiap beberapa minggu. Terinspirasi dari')}{' '}
            <a
              href="https://nownownow.com"
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline font-semibold text-[var(--primary)]"
            >
              nownownow.com
            </a>
          </p>
        </motion.div>

      </div>
    </PageWrapper>
  )
}