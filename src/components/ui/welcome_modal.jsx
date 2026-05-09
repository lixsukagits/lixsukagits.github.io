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
    <div className="fixed inset-0 z-[300] flex items-center justify-center px-4"
      style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(6px)' }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-sm rounded-2xl p-8 shadow-2xl"
        style={{ background: 'var(--card-bg)', border: '1px solid var(--border)' }}
      >
        <div className="text-center mb-6">
          <div className="text-4xl mb-3">👋</div>
          <h2 className="font-display text-2xl font-bold" style={{ color: 'var(--dark)' }}>
            {t('welcome.title')}
          </h2>
          <p className="text-sm mt-1" style={{ color: 'var(--body-color)' }}>
            {t('welcome.desc')}
          </p>
        </div>
        <input
          autoFocus
          type="text"
          value={name}
          onChange={e => { setName(e.target.value); setError('') }}
          onKeyDown={e => e.key === 'Enter' && handleSubmit()}
          placeholder={t('welcome.placeholder')}
          className="w-full px-4 py-3 rounded-xl text-sm outline-none border transition-colors"
          style={{
            background: 'var(--bg)',
            borderColor: error ? '#ef4444' : 'var(--border)',
            color: 'var(--dark)',
          }}
        />
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        <button
          onClick={handleSubmit}
          className="mt-4 w-full py-3 rounded-xl font-semibold text-white text-sm transition-all hover:opacity-90 active:scale-95"
          style={{ background: 'var(--primary)' }}
        >
          {t('welcome.cta')} →
        </button>
      </motion.div>
    </div>
  )
}