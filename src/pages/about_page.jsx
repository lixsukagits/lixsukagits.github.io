import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import PageWrapper from '../components/ui/page_wrapper'
import SectionHeader from '../components/ui/section_header'
import { profile } from '../data/profile'

export default function AboutPage() {
  const { t } = useTranslation()

  return (
    <PageWrapper>
      <Helmet><title>Tentang Felix Raymond</title></Helmet>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 md:px-10 py-20">
        <SectionHeader label={t('about.subtitle')} title={t('about.title')} />

        {/* Bio + photo */}
        <div className="card p-6 sm:p-8 md:p-12 flex flex-col md:flex-row gap-8 items-start md:items-center mb-8">
          <div className="w-full md:w-2/5 flex justify-center">
            <div className="relative">
              <img
                src="https://placehold.co/400x500/e8ecff/3758F9?text=Felix"
                alt="Felix Raymond"
                className="rounded-2xl w-full max-w-xs object-cover shadow-xl"
              />
              <div className="absolute -bottom-4 -right-4 px-4 py-2 rounded-2xl shadow text-sm font-bold"
                style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', color: 'var(--primary)' }}>
                Class of 2027 🎓
              </div>
            </div>
          </div>
          <div className="w-full md:w-3/5">
            <h3 className="font-display text-2xl font-bold mb-4" style={{ color: 'var(--dark)' }}>
              {profile.name}
            </h3>
            <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--body-color)' }}>{t('about.bio1')}</p>
            <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--body-color)' }}>{t('about.bio2')}</p>
            <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--body-color)' }}>{t('about.bio3')}</p>

            {/* Info grid */}
            <div className="grid grid-cols-2 gap-3 text-sm">
              {[
                { label: '🎂 Lahir', val: profile.birth.date },
                { label: '📍 Lokasi', val: profile.location },
                { label: '🙏 Agama', val: profile.religion },
                { label: '🏮 Suku', val: profile.ethnicity },
                { label: '👨‍👩‍👦 Keluarga', val: profile.sibling },
                { label: '🎯 Kepribadian', val: profile.personality },
              ].map(({ label, val }) => (
                <div key={label} className="p-3 rounded-xl" style={{ background: 'var(--bg)' }}>
                  <div className="text-xs mb-0.5" style={{ color: 'var(--body-color)' }}>{label}</div>
                  <div className="font-semibold text-xs" style={{ color: 'var(--dark)' }}>{val}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Languages */}
        <div className="card p-6 mb-8">
          <h3 className="font-display font-bold text-lg mb-4" style={{ color: 'var(--dark)' }}>🌐 Bahasa</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {profile.languages.map(lang => (
              <div key={lang.name} className="text-center p-4 rounded-xl" style={{ background: 'var(--bg)' }}>
                <div className="text-2xl mb-1">{lang.flag}</div>
                <div className="font-semibold text-sm" style={{ color: 'var(--dark)' }}>{lang.name}</div>
                <div className="text-xs tag mt-1">{lang.level}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Hobbies */}
        <div className="card p-6 mb-8">
          <h3 className="font-display font-bold text-lg mb-4" style={{ color: 'var(--dark)' }}>🎨 Hobi & Minat</h3>
          <div className="flex flex-wrap gap-2">
            {profile.hobbies.map(h => (
              <span key={h} className="px-3 py-2 rounded-full text-sm font-medium"
                style={{ background: 'var(--primary-light)', color: 'var(--primary)' }}>
                {h}
              </span>
            ))}
          </div>
        </div>

        {/* Goals */}
        <div className="card p-6 mb-8">
          <h3 className="font-display font-bold text-lg mb-4" style={{ color: 'var(--dark)' }}>🎯 Impian & Target</h3>
          <div className="space-y-3">
            {[
              { icon: '📅', label: 'Target Jangka Pendek', val: profile.goals.short },
              { icon: '🎓', label: 'Target Jangka Panjang', val: profile.goals.long },
              { icon: '💼', label: 'Impian Karir', val: profile.goals.career },
              { icon: '🇨🇳', label: 'Mengapa China?', val: profile.goals.china_reason },
            ].map(({ icon, label, val }) => (
              <div key={label} className="flex gap-4 p-4 rounded-xl" style={{ background: 'var(--bg)' }}>
                <span className="text-xl shrink-0">{icon}</span>
                <div>
                  <div className="text-xs font-bold mb-0.5" style={{ color: 'var(--primary)' }}>{label}</div>
                  <div className="text-sm" style={{ color: 'var(--dark)' }}>{val}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quotes */}
        <div className="card p-6">
          <h3 className="font-display font-bold text-lg mb-4" style={{ color: 'var(--dark)' }}>💬 Quotes</h3>
          <div className="space-y-4">
            {profile.quotes.map((q, i) => (
              <blockquote key={i} className="border-l-4 pl-4 py-2" style={{ borderColor: 'var(--primary)' }}>
                <p className="text-sm italic mb-1" style={{ color: 'var(--dark)' }}>"{q.text}"</p>
                <cite className="text-xs" style={{ color: 'var(--body-color)' }}>— {q.source}</cite>
              </blockquote>
            ))}
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}