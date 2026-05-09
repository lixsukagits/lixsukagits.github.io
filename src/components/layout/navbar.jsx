import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Moon, Sun, Globe, Menu, X, Home, User, Zap, Trophy, GraduationCap, Briefcase, Award, Image, GitBranch, FileText, Mail, Flame, ChevronDown } from 'lucide-react'
import { useThemeStore } from '../../store/use_theme_store'
import { motion, AnimatePresence } from 'framer-motion'

const LANGS = [
  { code: 'id', label: 'ID', flag: '🇮🇩' },
  { code: 'en', label: 'EN', flag: '🇬🇧' },
  { code: 'zh', label: '中文', flag: '🇨🇳' },
]

const LINKS = [
  { to: '/',            icon: Home,         key: 'home' },
  { to: '/about',       icon: User,         key: 'about' },
  { to: '/skills',      icon: Zap,          key: 'skills' },
  { to: '/achievement', icon: Trophy,        key: 'achievement' },
  { to: '/education',   icon: GraduationCap, key: 'education' },
  { to: '/experience',  icon: Briefcase,     key: 'experience' },
  { to: '/certificate', icon: Award,         key: 'certificate' },
  { to: '/gallery',     icon: Image,         key: 'gallery' },
  { to: '/timeline',    icon: GitBranch,     key: 'timeline' },
  { to: '/cv',          icon: FileText,      key: 'cv' },
  { to: '/contact',     icon: Mail,          key: 'contact' },
  { to: '/now',         icon: Flame,         key: 'now' },
]

// ─── SIDEBAR (Desktop) ───────────────────────────────────────────
function Sidebar() {
  const { t, i18n } = useTranslation()
  const { theme, toggleTheme } = useThemeStore()
  const [langOpen, setLangOpen] = useState(false)
  const currentLang = LANGS.find(l => l.code === i18n.language) || LANGS[0]

  return (
    <aside
      className="hidden lg:flex flex-col fixed top-0 left-0 h-screen w-60 z-50 shrink-0"
      style={{
        background: 'var(--card-bg)',
        borderRight: '1px solid var(--border)',
      }}
    >
      {/* Logo */}
      <div className="px-6 py-6 border-b" style={{ borderColor: 'var(--border)' }}>
        <NavLink to="/" className="font-display text-2xl font-extrabold" style={{ color: 'var(--primary)' }}>
          Felix<span style={{ color: 'var(--dark)' }}>.</span>
        </NavLink>
        <p className="text-xs mt-1" style={{ color: 'var(--body-color)' }}>IT Enthusiast</p>
      </div>

      {/* Nav links */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 flex flex-col gap-0.5">
        {LINKS.map(({ to, icon: Icon, key }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                isActive ? 'font-semibold' : 'hover:bg-[var(--primary-light)]'
              }`
            }
            style={({ isActive }) => ({
              background: isActive ? 'var(--primary-light)' : 'transparent',
              color: isActive ? 'var(--primary)' : 'var(--body-color)',
            })}
          >
            <Icon size={16} className="shrink-0" />
            {t(`nav.${key}`)}
          </NavLink>
        ))}
      </nav>

      {/* Bottom controls */}
      <div className="px-4 py-4 border-t space-y-2" style={{ borderColor: 'var(--border)' }}>
        {/* Lang switcher */}
        <div className="relative">
          <button
            onClick={() => setLangOpen(v => !v)}
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm transition-colors hover:bg-[var(--primary-light)]"
            style={{ color: 'var(--body-color)' }}
          >
            <span className="flex items-center gap-2">
              <Globe size={15} />
              {currentLang.flag} {currentLang.label}
            </span>
            <ChevronDown size={13} className={`transition-transform ${langOpen ? 'rotate-180' : ''}`} />
          </button>
          <AnimatePresence>
            {langOpen && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                className="absolute bottom-full left-0 w-full mb-1 rounded-xl shadow-xl overflow-hidden border"
                style={{ background: 'var(--card-bg)', borderColor: 'var(--border)' }}
              >
                {LANGS.map(l => (
                  <button
                    key={l.code}
                    onClick={() => { i18n.changeLanguage(l.code); setLangOpen(false) }}
                    className="w-full flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-[var(--primary-light)] transition-colors text-left"
                    style={{ color: i18n.language === l.code ? 'var(--primary)' : 'var(--dark)', fontWeight: i18n.language === l.code ? 600 : 400 }}
                  >
                    {l.flag} {l.label}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition-colors hover:bg-[var(--primary-light)]"
          style={{ color: 'var(--body-color)' }}
        >
          {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
          {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
        </button>

        {/* Contact CTA */}
        <a
          href="https://wa.me/6281262729243"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center py-2.5 rounded-xl font-semibold text-white text-sm transition-all hover:opacity-90"
          style={{ background: 'var(--primary)' }}
        >
          Hubungi Saya
        </a>
      </div>
    </aside>
  )
}

// ─── MOBILE TOPBAR + DRAWER ──────────────────────────────────────
function MobileNav() {
  const { t, i18n } = useTranslation()
  const { theme, toggleTheme } = useThemeStore()
  const [open, setOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const { pathname } = useLocation()
  const currentLang = LANGS.find(l => l.code === i18n.language) || LANGS[0]

  useEffect(() => { setOpen(false) }, [pathname])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      {/* Top bar */}
      <header
        className="lg:hidden fixed top-0 left-0 w-full z-50 h-14 flex items-center justify-between px-5"
        style={{
          background: 'var(--card-bg)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <NavLink to="/" className="font-display text-xl font-extrabold" style={{ color: 'var(--primary)' }}>
          Felix<span style={{ color: 'var(--dark)' }}>.</span>
        </NavLink>
        <div className="flex items-center gap-1">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg transition-colors hover:bg-[var(--primary-light)]"
            style={{ color: 'var(--body-color)' }}
          >
            {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          </button>
          <button
            onClick={() => setOpen(true)}
            className="p-2 rounded-lg transition-colors hover:bg-[var(--primary-light)]"
            style={{ color: 'var(--body-color)' }}
            aria-label="Buka menu"
          >
            <Menu size={20} />
          </button>
        </div>
      </header>

      {/* Overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 lg:hidden"
            style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)' }}
          />
        )}
      </AnimatePresence>

      {/* Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 220 }}
            className="fixed top-0 right-0 h-full w-72 z-50 flex flex-col lg:hidden"
            style={{ background: 'var(--card-bg)', borderLeft: '1px solid var(--border)' }}
          >
            {/* Drawer header */}
            <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: 'var(--border)' }}>
              <span className="font-display font-bold text-lg" style={{ color: 'var(--primary)' }}>Menu</span>
              <button onClick={() => setOpen(false)} style={{ color: 'var(--body-color)' }}>
                <X size={20} />
              </button>
            </div>

            {/* Links */}
            <nav className="flex-1 overflow-y-auto px-3 py-3 flex flex-col gap-0.5">
              {LINKS.map(({ to, icon: Icon, key }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === '/'}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      isActive ? 'font-semibold' : 'hover:bg-[var(--primary-light)]'
                    }`
                  }
                  style={({ isActive }) => ({
                    background: isActive ? 'var(--primary-light)' : 'transparent',
                    color: isActive ? 'var(--primary)' : 'var(--body-color)',
                  })}
                >
                  <Icon size={16} className="shrink-0" />
                  {t(`nav.${key}`)}
                </NavLink>
              ))}
            </nav>

            {/* Drawer footer */}
            <div className="px-4 py-4 border-t space-y-2" style={{ borderColor: 'var(--border)' }}>
              {/* Lang */}
              <div className="relative">
                <button
                  onClick={() => setLangOpen(v => !v)}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm border transition-colors hover:bg-[var(--primary-light)]"
                  style={{ color: 'var(--body-color)', borderColor: 'var(--border)' }}
                >
                  <span className="flex items-center gap-2"><Globe size={14} /> {currentLang.flag} {currentLang.label}</span>
                  <ChevronDown size={13} className={`transition-transform ${langOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {langOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      className="absolute bottom-full left-0 w-full mb-1 rounded-xl shadow-xl overflow-hidden border"
                      style={{ background: 'var(--card-bg)', borderColor: 'var(--border)' }}
                    >
                      {LANGS.map(l => (
                        <button
                          key={l.code}
                          onClick={() => { i18n.changeLanguage(l.code); setLangOpen(false) }}
                          className="w-full flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-[var(--primary-light)] transition-colors text-left"
                          style={{ color: i18n.language === l.code ? 'var(--primary)' : 'var(--dark)' }}
                        >
                          {l.flag} {l.label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <a
                href="https://wa.me/6281262729243"
                className="block w-full text-center py-2.5 rounded-xl font-semibold text-white text-sm"
                style={{ background: 'var(--primary)' }}
              >
                Hubungi Saya
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// ─── EXPORT ──────────────────────────────────────────────────────
export default function Navbar() {
  return (
    <>
      <Sidebar />
      <MobileNav />
    </>
  )
}