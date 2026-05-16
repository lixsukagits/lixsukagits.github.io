import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useThemeStore } from '../../store/use_theme_store'
import { motion, AnimatePresence } from 'framer-motion'
import { Search } from 'lucide-react'

export default function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { theme, toggleTheme } = useThemeStore()
  const inputRef = useRef(null)

  const pages = [
    { label: t('nav.home'),        path: '/',            icon: '🏠' },
    { label: t('nav.about'),       path: '/about',       icon: '👤' },
    { label: t('nav.skills'),      path: '/skills',      icon: '💻' },
    { label: t('nav.achievement'), path: '/achievement', icon: '🏆' },
    { label: t('nav.education'),   path: '/education',   icon: '🎓' },
    { label: t('nav.experience'),  path: '/experience',  icon: '💼' },
    { label: t('nav.certificate'), path: '/certificate', icon: '📜' },
    { label: t('nav.gallery'),     path: '/gallery',     icon: '🖼️' },
    { label: t('nav.timeline'),    path: '/timeline',    icon: '📅' },
    { label: t('nav.cv'),          path: '/cv',          icon: '📄' },
    { label: t('nav.contact'),     path: '/contact',     icon: '✉️' },
    { label: t('nav.now'),         path: '/now',         icon: '🔥' },
  ]

  const actions = [
    {
      label: t('cmd.toggle_theme'),
      icon: theme === 'dark' ? '☀️' : '🌙',
      id: 'toggle-theme',
      action: toggleTheme,
    },
  ]

  const all = [
    ...pages.map(p => ({ ...p, type: 'page' })),
    ...actions.map(a => ({ ...a, type: 'action' })),
  ]

  const filtered = query
    ? all.filter(i => i.label.toLowerCase().includes(query.toLowerCase()))
    : all

  useEffect(() => {
    const fn = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        setOpen(v => !v)
      }
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [])

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50)
    else setQuery('')
  }, [open])

  const handleSelect = (item) => {
    if (item.type === 'action') { item.action(); setOpen(false) }
    else { navigate(item.path); setOpen(false) }
  }

  return (
    <>
      {/* FIX: Trigger — aria-label eksplisit */}
      <button
        onClick={() => setOpen(true)}
        aria-label={t('cmd.open_label', 'Buka command palette (Ctrl+K)')}
        aria-keyshortcuts="Control+k Meta+k"
        className="fixed bottom-24 left-5 z-40 hidden md:flex items-center gap-2 px-3 py-2 rounded-xl text-xs shadow-md transition-all hover:scale-105"
        style={{
          background: 'var(--card-bg)', border: '1px solid var(--border)',
          color: 'var(--body-color)', minHeight: 44,
        }}
      >
        <Search size={13} aria-hidden="true" />
        <kbd className="opacity-60">Ctrl K</kbd>
      </button>

      <AnimatePresence>
        {open && (
          <>
            {/* FIX: Backdrop aria-hidden — dekoratif */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="cmd-backdrop"
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />

            {/* FIX: role="dialog" + aria-modal + aria-label */}
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={t('cmd.dialog_label', 'Command palette')}
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed top-1/4 left-1/2 -translate-x-1/2 w-full max-w-lg z-[201] rounded-2xl shadow-2xl overflow-hidden"
              style={{ background: 'var(--card-bg)', border: '1px solid var(--border)' }}
            >
              <div className="flex items-center gap-3 px-4 py-3 border-b" style={{ borderColor: 'var(--border)' }}>
                <Search size={16} style={{ color: 'var(--body-color)' }} aria-hidden="true" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder={t('cmd.placeholder')}
                  aria-label={t('cmd.search_label', 'Cari halaman atau aksi')}
                  className="flex-1 bg-transparent outline-none text-sm"
                  style={{ color: 'var(--dark)' }}
                />
                <kbd
                  className="text-xs px-2 py-1 rounded-md"
                  style={{ background: 'var(--bg)', color: 'var(--body-color)' }}
                  aria-label="Tekan Escape untuk menutup"
                >
                  ESC
                </kbd>
              </div>

              <div className="max-h-72 overflow-y-auto p-2" role="listbox" aria-label={t('cmd.results_label', 'Hasil pencarian')}>
                {filtered.length === 0 ? (
                  <p className="text-center py-8 text-sm" style={{ color: 'var(--body-color)' }}>
                    {t('cmd.no_result')} &ldquo;{query}&rdquo;
                  </p>
                ) : (
                  filtered.map((item) => (
                    // FIX: key pakai path atau id — bukan index
                    <button
                      key={item.path || item.id}
                      role="option"
                      aria-selected="false"
                      onClick={() => handleSelect(item)}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-left transition-colors hover:bg-[var(--primary-light)]"
                      style={{ color: 'var(--dark)' }}
                    >
                      {/* FIX: emoji icon aria-hidden */}
                      <span className="text-base" aria-hidden="true">{item.icon}</span>
                      <span>{item.label}</span>
                      {item.type === 'action' && (
                        <span className="ml-auto text-xs tag">Action</span>
                      )}
                    </button>
                  ))
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}