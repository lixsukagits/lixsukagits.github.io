import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Globe, Menu, X, Home, User, Zap, Trophy, GraduationCap, Briefcase, Award, Image, GitBranch, FileText, Mail, Flame, ChevronDown } from 'lucide-react'
import { useThemeStore } from '../../store/use_theme_store'
import { motion, AnimatePresence } from 'framer-motion'

const LANGS = [
  { code: 'id', label: 'ID', flag: '🇮🇩' },
  { code: 'en', label: 'EN', flag: '🇬🇧' },
  { code: 'zh', label: '中文', flag: '🇨🇳' },
]

const LINKS = [
  { to: '/',            icon: Home,          key: 'home' },
  { to: '/about',       icon: User,          key: 'about' },
  { to: '/skills',      icon: Zap,           key: 'skills' },
  { to: '/achievement', icon: Trophy,         key: 'achievement' },
  { to: '/education',   icon: GraduationCap,  key: 'education' },
  { to: '/experience',  icon: Briefcase,      key: 'experience' },
  { to: '/certificate', icon: Award,          key: 'certificate' },
  { to: '/gallery',     icon: Image,          key: 'gallery' },
  { to: '/timeline',    icon: GitBranch,      key: 'timeline' },
  { to: '/cv',          icon: FileText,       key: 'cv' },
  { to: '/contact',     icon: Mail,           key: 'contact' },
  { to: '/now',         icon: Flame,          key: 'now' },
]

// ─── ANIMATED THEME TOGGLE ───────────────────────────────────────
// SVG morphing sun ↔ moon, no external deps
function ThemeToggleIcon({ isDark }) {
  return (
    <motion.svg
      width="18" height="18" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round"
      style={{ display: 'block', flexShrink: 0 }}
    >
      {/* Center circle — shrinks for moon, full for sun */}
      <motion.circle
        cx="12" cy="12"
        animate={{ r: isDark ? 5 : 4 }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
      />

      {/* Sun rays — fade & rotate out when switching to dark */}
      <AnimatePresence>
        {!isDark && (
          <motion.g
            key="rays"
            initial={{ opacity: 0, rotate: -30 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 30 }}
            transition={{ duration: 0.35 }}
            style={{ transformOrigin: '12px 12px' }}
          >
            <line x1="12" y1="2"  x2="12" y2="4" />
            <line x1="12" y1="20" x2="12" y2="22" />
            <line x1="4.22" y1="4.22"  x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="2"  y1="12" x2="4"  y2="12" />
            <line x1="20" y1="12" x2="22" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </motion.g>
        )}
      </AnimatePresence>

      {/* Moon mask — slides in from top-right */}
      <AnimatePresence>
        {isDark && (
          <motion.path
            key="moon"
            d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
            initial={{ opacity: 0, x: 4, y: -4 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: 4, y: -4 }}
            transition={{ duration: 0.35 }}
            fill="currentColor"
            stroke="none"
          />
        )}
      </AnimatePresence>
    </motion.svg>
  )
}

// ─── ANIMATED NAV LINK ───────────────────────────────────────────
function AnimatedNavLink({ to, icon: Icon, label, end }) {
  return (
    <NavLink
      to={to}
      end={end}
      className="nav-item group"
      style={({ isActive }) => ({
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        padding: '0.625rem 0.75rem',
        borderRadius: '0.75rem',
        fontSize: '0.875rem',
        fontWeight: isActive ? 600 : 500,
        background: isActive ? 'var(--primary-light)' : 'transparent',
        color: isActive ? 'var(--primary)' : 'var(--body-color)',
        transition: 'background 0.15s, color 0.15s',
        position: 'relative',
        overflow: 'hidden',
        textDecoration: 'none',
      })}
    >
      {({ isActive }) => (
        <>
          {/* Slide-in background on hover */}
          <motion.span
            className="nav-hover-bg"
            style={{
              position: 'absolute',
              inset: 0,
              background: 'var(--primary-light)',
              borderRadius: '0.75rem',
              zIndex: 0,
              pointerEvents: 'none',
            }}
            initial={{ scaleX: 0, originX: 0 }}
            whileHover={!isActive ? { scaleX: 1 } : {}}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          />
          <span style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: '0.75rem', width: '100%' }}>
            <motion.span
              whileHover={{ scale: 1.15, rotate: isActive ? 0 : -8 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              style={{ display: 'flex', flexShrink: 0 }}
            >
              <Icon size={16} />
            </motion.span>
            {label}
          </span>
        </>
      )}
    </NavLink>
  )
}

// ─── SIDEBAR (Desktop) ───────────────────────────────────────────
function Sidebar() {
  const { t, i18n } = useTranslation()
  const { theme, toggleTheme } = useThemeStore()
  const [langOpen, setLangOpen] = useState(false)
  const currentLang = LANGS.find(l => l.code === i18n.language) || LANGS[0]
  const isDark = theme === 'dark'

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
        {LINKS.map(({ to, icon, key }) => (
          <AnimatedNavLink key={to} to={to} icon={icon} label={t(`nav.${key}`)} end={to === '/'} />
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
            <motion.span
              animate={{ rotate: langOpen ? 180 : 0 }}
              transition={{ duration: 0.25 }}
              style={{ display: 'flex' }}
            >
              <ChevronDown size={13} />
            </motion.span>
          </button>
          <AnimatePresence>
            {langOpen && (
              <motion.div
                initial={{ opacity: 0, y: 6, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.97 }}
                transition={{ duration: 0.18 }}
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

        {/* Theme toggle — animated */}
        <motion.button
          onClick={toggleTheme}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm hover:bg-[var(--primary-light)]"
          style={{ color: 'var(--body-color)' }}
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          aria-label="Toggle theme"
        >
          {/* Pill track */}
          <motion.span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 30,
              height: 18,
              borderRadius: 9,
              background: isDark ? 'var(--primary)' : 'var(--border)',
              position: 'relative',
              flexShrink: 0,
              transition: 'background 0.3s',
            }}
          >
            <motion.span
              layout
              animate={{ x: isDark ? 6 : -6 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              style={{
                width: 12, height: 12,
                borderRadius: '50%',
                background: '#fff',
                position: 'absolute',
              }}
            />
          </motion.span>
          <ThemeToggleIcon isDark={isDark} />
          <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>
        </motion.button>

        {/* Contact CTA with shimmer */}
        <motion.a
          href="https://wa.me/6281262729243"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-shimmer block w-full text-center py-2.5 rounded-xl font-semibold text-white text-sm"
          style={{ background: 'var(--primary)', position: 'relative', overflow: 'hidden' }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        >
          Hubungi Saya
        </motion.a>
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
  const isDark = theme === 'dark'

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
        style={{ background: 'var(--card-bg)', borderBottom: '1px solid var(--border)' }}
      >
        <NavLink to="/" className="font-display text-xl font-extrabold" style={{ color: 'var(--primary)' }}>
          Felix<span style={{ color: 'var(--dark)' }}>.</span>
        </NavLink>
        <div className="flex items-center gap-1">
          {/* Mobile theme toggle — icon only */}
          <motion.button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-[var(--primary-light)]"
            style={{ color: 'var(--body-color)' }}
            whileTap={{ scale: 0.88, rotate: isDark ? -15 : 15 }}
            transition={{ type: 'spring', stiffness: 500, damping: 20 }}
            aria-label="Toggle theme"
          >
            <ThemeToggleIcon isDark={isDark} />
          </motion.button>
          <motion.button
            onClick={() => setOpen(true)}
            className="p-2 rounded-lg hover:bg-[var(--primary-light)]"
            style={{ color: 'var(--body-color)' }}
            whileTap={{ scale: 0.9 }}
            aria-label="Buka menu"
          >
            <Menu size={20} />
          </motion.button>
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
              <motion.button
                onClick={() => setOpen(false)}
                style={{ color: 'var(--body-color)' }}
                whileTap={{ rotate: 90, scale: 0.85 }}
                transition={{ duration: 0.2 }}
              >
                <X size={20} />
              </motion.button>
            </div>

            {/* Links */}
            <nav className="flex-1 overflow-y-auto px-3 py-3 flex flex-col gap-0.5">
              {LINKS.map(({ to, icon, key }) => (
                <AnimatedNavLink key={to} to={to} icon={icon} label={t(`nav.${key}`)} end={to === '/'} />
              ))}
            </nav>

            {/* Drawer footer */}
            <div className="px-4 py-4 border-t space-y-2" style={{ borderColor: 'var(--border)' }}>
              <div className="relative">
                <button
                  onClick={() => setLangOpen(v => !v)}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm border transition-colors hover:bg-[var(--primary-light)]"
                  style={{ color: 'var(--body-color)', borderColor: 'var(--border)' }}
                >
                  <span className="flex items-center gap-2"><Globe size={14} /> {currentLang.flag} {currentLang.label}</span>
                  <motion.span
                    animate={{ rotate: langOpen ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    style={{ display: 'flex' }}
                  >
                    <ChevronDown size={13} />
                  </motion.span>
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
              <motion.a
                href="https://wa.me/6281262729243"
                className="btn-shimmer block w-full text-center py-2.5 rounded-xl font-semibold text-white text-sm"
                style={{ background: 'var(--primary)', position: 'relative', overflow: 'hidden' }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Hubungi Saya
              </motion.a>
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