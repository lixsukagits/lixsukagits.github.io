import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useUserStore } from '../../store/use_user_store'

export default function WelcomeModal() {
  const { t } = useTranslation()
  const { setUserName } = useUserStore()
  const [name, setName] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = () => {
    const trimmed = name.trim()
    if (!trimmed) { setError(t('welcome.error')); return }
    setUserName(trimmed)
  }

  return (
    // FIX: rgba + backdropFilter tetap inline (overlay on full screen)
    <div
      className="fixed inset-0 z-[300] flex items-center justify-center px-4"
      style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(6px)' }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="welcome-title"
    >
      {/* FIX: style={{ background, border }} → className */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-sm rounded-2xl p-8 shadow-2xl
                   bg-[var(--card-bg)] border border-[var(--border)]"
      >
        <div className="text-center mb-6">
          <div className="text-4xl mb-3">👋</div>
          {/* FIX: style={{ color }} → className */}
          <h2 id="welcome-title" className="font-display text-2xl font-bold text-[var(--dark)] text-tracked">
            {t('welcome.title')}
          </h2>
          <p className="text-sm mt-1 text-[var(--body-color)]">{t('welcome.desc')}</p>
        </div>

        {/* FIX: style={{ background, color }} → className; borderColor kondisional tetap inline */}
        <input
          autoFocus
          type="text"
          value={name}
          onChange={e => { setName(e.target.value); setError('') }}
          onKeyDown={e => e.key === 'Enter' && handleSubmit()}
          placeholder={t('welcome.placeholder')}
          aria-label={t('welcome.name_label', 'Nama kamu')}
          aria-describedby={error ? 'welcome-error' : undefined}
          className="w-full px-4 py-3 rounded-xl text-sm outline-none border transition-colors
                     bg-[var(--bg)] text-[var(--dark)]"
          style={{ borderColor: error ? '#ef4444' : 'var(--border)' }}
        />
        {error && <p id="welcome-error" className="text-red-500 text-xs mt-1" role="alert">{error}</p>}

        {/* FIX: style={{ background:'var(--primary)' }} → className */}
        <button
          onClick={handleSubmit}
          className="mt-4 w-full py-3 rounded-xl font-semibold text-white text-sm
                     transition-all hover:opacity-90 active:scale-95 bg-[var(--primary)]"
        >
          {t('welcome.cta')} →
        </button>
      </motion.div>
    </div>
  )
}