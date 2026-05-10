import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import PageWrapper from '../components/ui/page_wrapper'
import SectionHeader from '../components/ui/section_header'
import { profile } from '../data/profile'

export default function NowPage() {
  const { t } = useTranslation()
  const { now } = profile

  const items = [
    { icon: '📚', label: 'Sedang Belajar', val: now.learning },
    { icon: '🔨', label: 'Sedang Dikerjakan', val: now.working_on },
    { icon: '📖', label: 'Sedang Dibaca', val: now.reading },
  ]

  return (
    <PageWrapper>
      <Helmet>
        <title>Sekarang — Felix Raymond</title>
        <meta name="description" content={`Update ${now.updated}: Felix sedang belajar ${now.learning} dan mengerjakan ${now.working_on}.`} />
        <meta property="og:title" content="Apa yang Sedang Felix Kerjakan Sekarang?" />
        <meta property="og:description" content={`Update terbaru ${now.updated} — aktivitas terkini Felix Raymond.`} />
        <meta property="og:url" content="https://lixsukagits.github.io/now" />
      </Helmet>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 md:px-10 py-20">
        <SectionHeader label={t('now.subtitle')} title={t('now.title')} />

        <p className="text-sm text-center mb-10" style={{ color: 'var(--body-color)' }}>
          {t('now.updated')}: <strong>{now.updated}</strong>
        </p>

        <div className="space-y-4">
          {items.map(item => (
            <div key={item.label} className="card p-6 flex gap-4 items-start">
              <span className="text-3xl">{item.icon}</span>
              <div>
                <p className="section-label mb-1">{item.label}</p>
                <p className="font-semibold" style={{ color: 'var(--dark)' }}>{item.val}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="card p-6 mt-6 text-center">
          <p className="text-sm" style={{ color: 'var(--body-color)' }}>
            Halaman ini diperbarui secara manual setiap beberapa minggu. Terinspirasi dari{' '}
            <a href="https://nownownow.com" target="_blank" rel="noopener noreferrer"
              className="link-underline" style={{ color: 'var(--primary)' }}>
              nownownow.com
            </a>
          </p>
        </div>
      </div>
    </PageWrapper>
  )
}