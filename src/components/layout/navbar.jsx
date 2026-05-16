import { useState, useRef, useEffect } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Globe, Menu, X, Home, User, Zap, Trophy, GraduationCap,
         Briefcase, Award, Image, GitBranch, FileText, Mail, Flame,
         ChevronDown, Palette, Search, BookOpen, Wrench, Library } from 'lucide-react'
import { useThemeStore } from '../../store/use_theme_store'
import { useColorThemeStore, COLOR_THEMES } from '../../store/use_color_theme_store'
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
  { to: '/achievement', icon: Trophy,        key: 'achievement' },
  { to: '/education',   icon: GraduationCap, key: 'education' },
  { to: '/experience',  icon: Briefcase,     key: 'experience' },
  { to: '/certificate', icon: Award,         key: 'certificate' },
  { to: '/gallery',     icon: Image,         key: 'gallery' },
  { to: '/timeline',    icon: GitBranch,     key: 'timeline' },
  { to: '/cv',          icon: FileText,      key: 'cv' },
  { to: '/contact',     icon: Mail,          key: 'contact' },
  { to: '/now',         icon: Flame,         key: 'now' },
  { to: '/blog',        icon: BookOpen,      key: 'blog' },
  { to: '/uses',        icon: Wrench,        key: 'uses' },
  { to: '/bookshelf',   icon: Library,       key: 'bookshelf' },
]

/* ─── THEME TOGGLE ICON ──────────────────────────────────────────
   FIX: motion.circle dengan animate={{ r }} error di FM v11 karena
   SVG attribute "r" tidak bisa dianimasikan via Framer Motion.
   Solusi: pakai 2 SVG terpisah (sun & moon) yang swap via AnimatePresence.
────────────────────────────────────────────────────────────────── */
function ThemeToggleIcon({ isDark }) {
  return (
    // FIX: style={{ display:'inline-flex', width:18, height:18, ... }} → Tailwind
    <span className="inline-flex w-[18px] h-[18px] items-center justify-center shrink-0">
      <AnimatePresence mode="wait">
        {isDark ? (
          <motion.svg
            key="moon"
            width="18" height="18" viewBox="0 0 24 24"
            fill="currentColor" stroke="none"
            initial={{ opacity: 0, rotate: -30, scale: 0.7 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 30, scale: 0.7 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </motion.svg>
        ) : (
          <motion.svg
            key="sun"
            width="18" height="18" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round"
            initial={{ opacity: 0, rotate: 30, scale: 0.7 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: -30, scale: 0.7 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
          >
            <circle cx="12" cy="12" r="4" />
            <line x1="12" y1="2"  x2="12" y2="4" />
            <line x1="12" y1="20" x2="12" y2="22" />
            <line x1="4.22" y1="4.22"  x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="2"  y1="12" x2="4"  y2="12" />
            <line x1="20" y1="12" x2="22" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </motion.svg>
        )}
      </AnimatePresence>
    </span>
  )
}

/* ─── SEARCH BAR ─────────────────────────────────────────────────
   FIX: aria-label ditambah ke clear button, placeholder pakai t()
────────────────────────────────────────────────────────────────── */
function SidebarSearch() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [results, setResults] = useState([])
  const inputRef = useRef(null)

  const allPages = LINKS.map(l => ({ ...l }))

  useEffect(() => {
    if (!query.trim()) { setResults([]); return }
    const q = query.toLowerCase()
    setResults(allPages.filter(p => t(`nav.${p.key}`).toLowerCase().includes(q)).slice(0, 5))
  }, [query])

  const handleSelect = (to) => {
    navigate(to)
    setQuery('')
    setResults([])
  }

  return (
    <div className="relative px-3 pb-2">
      <div
        className="flex items-center gap-2 px-3 py-2 rounded-xl"
        style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}
      >
        {/* FIX: style={{ color, flexShrink:0 }} → color tetap inline (CSS var), shrink-0 → Tailwind */}
        <Search size={13} className="shrink-0" style={{ color: 'var(--body-color)' }} />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder={t('nav.search_placeholder', 'Cari halaman...')}
          // FIX: hapus fontSize duplikat, text-[var(--dark)] via className
          className="flex-1 bg-transparent outline-none text-[0.8rem] text-[var(--dark)]"
        />
        {query && (
          <button
            onClick={() => { setQuery(''); setResults([]) }}
            aria-label={t('nav.clear_search', 'Hapus pencarian')}
            className="text-[var(--body-color)]"
          >
            <X size={12} />
          </button>
        )}
      </div>
      <AnimatePresence>
        {results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
            className="absolute left-3 right-3 top-full mt-1 rounded-xl overflow-hidden shadow-xl z-10"
            style={{ background: 'var(--card-bg)', border: '1px solid var(--border)' }}
          >
            {results.map(r => {
              const Icon = r.icon
              return (
                <button
                  key={r.to}
                  onClick={() => handleSelect(r.to)}
                  className="w-full flex items-center gap-2 px-3 py-2.5 text-sm text-left text-[var(--dark)] hover:bg-[var(--primary-light)] transition-colors"
                >
                  {/* FIX: style={{ color, flexShrink:0 }} → className */}
                  <Icon size={14} className="shrink-0 text-[var(--primary)]" />
                  {t(`nav.${r.key}`)}
                </button>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ─── COLOR THEME PICKER ─────────────────────────────────────────
────────────────────────────────────────────────────────────────── */
function ColorThemePicker() {
  const { colorThemeId, setColorTheme } = useColorThemeStore()
  const [open, setOpen] = useState(false)
  const current = COLOR_THEMES.find(t => t.id === colorThemeId) || COLOR_THEMES[0]

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(v => !v)}
        aria-label="Pilih tema warna"
        aria-expanded={open}
        className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm transition-colors hover:bg-[var(--primary-light)] text-[var(--body-color)]"
      >
        <span className="flex items-center gap-2">
          <Palette size={15} />
          <span>Tema Warna</span>
        </span>
        {/* background: current.primary harus tetap inline — nilai dinamis dari store */}
        <span
          className="w-4 h-4 rounded-full shrink-0"
          style={{ background: current.primary, border: '2px solid var(--border)' }}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-full left-0 w-full mb-1 rounded-xl overflow-hidden shadow-2xl z-50"
            style={{ background: 'var(--card-bg)', border: '1px solid var(--border)' }}
          >
            {COLOR_THEMES.map(theme => (
              <button
                key={theme.id}
                onClick={() => { setColorTheme(theme.id); setOpen(false) }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left text-[var(--dark)] hover:bg-[var(--primary-light)] transition-colors"
              >
                {/* background: theme.primary tetap inline — nilai dinamis */}
                <span className="w-4 h-4 rounded-full shrink-0" style={{ background: theme.primary }} />
                {theme.label}
                {theme.id === colorThemeId && (
                  <span className="ml-auto text-xs text-[var(--primary)]">✓</span>
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ─── LANG PICKER ────────────────────────────────────────────────
────────────────────────────────────────────────────────────────── */
function LangPicker() {
  const { i18n } = useTranslation()
  const [open, setOpen] = useState(false)
  const current = LANGS.find(l => l.code === i18n.language) || LANGS[0]

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(v => !v)}
        aria-label="Pilih bahasa"
        aria-expanded={open}
        className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm transition-colors hover:bg-[var(--primary-light)] text-[var(--body-color)]"
      >
        <span className="flex items-center gap-2">
          <Globe size={15} />
          <span>{current.flag} {current.label}</span>
        </span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={14} />
        </motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-full left-0 w-full mb-1 rounded-xl overflow-hidden shadow-2xl z-50"
            style={{ background: 'var(--card-bg)', border: '1px solid var(--border)' }}
          >
            {LANGS.map(lang => (
              <button
                key={lang.code}
                onClick={() => { i18n.changeLanguage(lang.code); setOpen(false) }}
                className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-left text-[var(--dark)] hover:bg-[var(--primary-light)] transition-colors"
              >
                <span>{lang.flag}</span>
                <span>{lang.label}</span>
                {lang.code === i18n.language && (
                  <span className="ml-auto text-xs text-[var(--primary)]">✓</span>
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ─── ANIMATED NAV LINK ──────────────────────────────────────────
────────────────────────────────────────────────────────────────── */
function AnimatedNavLink({ to, icon: Icon, label, end }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-colors relative group ${
          isActive
            ? 'text-[var(--primary)] bg-[var(--primary-light)]'
            : 'text-[var(--body-color)] hover:text-[var(--dark)] hover:bg-[var(--primary-light)]'
        }`
      }
    >
      {({ isActive }) => (
        <>
          <motion.span
            animate={isActive ? { scale: 1.15, rotate: [0, -8, 8, 0] } : { scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            // FIX: style={{ display:'flex', flexShrink:0 }} → Tailwind
            className="flex shrink-0"
          >
            <Icon size={16} />
          </motion.span>
          {label}
        </>
      )}
    </NavLink>
  )
}

/* ─── SIDEBAR (Desktop) ──────────────────────────────────────────
────────────────────────────────────────────────────────────────── */
function Sidebar() {
  const { t } = useTranslation()
  const { theme, toggleTheme } = useThemeStore()
  const isDark = theme === 'dark'

  return (
    <aside
      className="hidden lg:flex flex-col w-60 shrink-0 h-screen sticky top-0 z-50"
      style={{ background: 'var(--card-bg)', borderRight: '1px solid var(--border)' }}
    >
      {/* Logo */}
      <div className="px-6 py-5 border-b shrink-0" style={{ borderColor: 'var(--border)' }}>
        <NavLink
          to="/"
          className="font-display text-2xl font-extrabold text-[var(--primary)]"
        >
          Felix<span className="text-[var(--dark)]">.</span>
        </NavLink>
        <p className="text-xs mt-0.5 text-[var(--body-color)]">IT Enthusiast</p>
      </div>

      {/* Search bar */}
      <div className="pt-3 shrink-0">
        <SidebarSearch />
      </div>

      {/* Nav links */}
      <nav className="flex-1 overflow-y-auto px-3 py-2 flex flex-col gap-0.5">
        {LINKS.map(({ to, icon, key }) => (
          <AnimatedNavLink key={to} to={to} icon={icon} label={t(`nav.${key}`)} end={to === '/'} />
        ))}
      </nav>

      {/* Bottom controls */}
      <div className="px-4 py-4 border-t shrink-0 space-y-1.5" style={{ borderColor: 'var(--border)' }}>
        <LangPicker />
        <ColorThemePicker />

        {/* Dark/Light toggle */}
        <motion.button
          onClick={toggleTheme}
          aria-label={isDark ? 'Aktifkan light mode' : 'Aktifkan dark mode'}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm hover:bg-[var(--primary-light)] transition-colors text-[var(--body-color)]"
          whileTap={{ scale: 0.95 }}
        >
          {/* Toggle track — harus tetap inline karena nilai kondisional dari CSS var */}
          <motion.span
            className="inline-flex items-center justify-center w-7 h-4 rounded-lg relative shrink-0"
            style={{
              background: isDark ? 'var(--primary)' : 'var(--border)',
              transition: 'background 0.3s',
            }}
          >
            {/* FIX: background:'#fff' → bg-white via className */}
            <motion.span
              layout
              animate={{ x: isDark ? 5 : -5 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              className="w-2.5 h-2.5 rounded-full bg-white absolute"
            />
          </motion.span>
          <ThemeToggleIcon isDark={isDark} />
          <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>
        </motion.button>

        {/* CTA */}
        <motion.a
          href="https://wa.me/6281262729243"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Hubungi Felix via WhatsApp"
          // FIX: position:relative + overflow:hidden → Tailwind
          className="btn-shimmer block w-full text-center py-2.5 rounded-xl font-semibold text-white text-sm mt-1 relative overflow-hidden"
          style={{ background: 'var(--primary)' }}
          whileHover={{ scale: 1.02, boxShadow: '0 8px 24px rgba(55,88,249,0.35)' }}
          whileTap={{ scale: 0.97 }}
        >
          Hubungi Saya
        </motion.a>
      </div>
    </aside>
  )
}

/* ─── MOBILE TOPBAR + DRAWER ─────────────────────────────────────
────────────────────────────────────────────────────────────────── */
function MobileNav() {
  const { t } = useTranslation()
  const { theme, toggleTheme } = useThemeStore()
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const isDark = theme === 'dark'

  useEffect(() => { setOpen(false) }, [pathname])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <header
        className="lg:hidden fixed top-0 left-0 w-full z-50 h-14 flex items-center justify-between px-5"
        style={{ background: 'var(--card-bg)', borderBottom: '1px solid var(--border)' }}
      >
        <NavLink
          to="/"
          className="font-display text-xl font-extrabold text-[var(--primary)]"
        >
          Felix<span className="text-[var(--dark)]">.</span>
        </NavLink>
        <div className="flex items-center gap-1">
          {/* FIX: minWidth/minHeight/display/alignItems/justifyContent → Tailwind */}
          <motion.button
            onClick={toggleTheme}
            aria-label={isDark ? 'Aktifkan light mode' : 'Aktifkan dark mode'}
            className="p-2 rounded-lg hover:bg-[var(--primary-light)] transition-colors text-[var(--body-color)] min-w-11 min-h-11 flex items-center justify-center"
            whileTap={{ scale: 0.88, rotate: isDark ? -15 : 15 }}
            transition={{ type: 'spring', stiffness: 500, damping: 20 }}
          >
            <ThemeToggleIcon isDark={isDark} />
          </motion.button>
          <motion.button
            onClick={() => setOpen(true)}
            aria-label="Buka menu navigasi"
            className="p-2 rounded-lg hover:bg-[var(--primary-light)] transition-colors text-[var(--body-color)] min-w-11 min-h-11 flex items-center justify-center"
            whileTap={{ scale: 0.9 }}
          >
            <Menu size={20} />
          </motion.button>
        </div>
      </header>

      {/* Backdrop */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 lg:hidden"
            // rgba dan backdropFilter tetap inline — tidak ada Tailwind equivalent yang tepat
            style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)' }}
          />
        )}
      </AnimatePresence>

      {/* Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 220 }}
            className="fixed top-0 right-0 h-full w-72 z-50 flex flex-col lg:hidden"
            style={{ background: 'var(--card-bg)', borderLeft: '1px solid var(--border)' }}
            role="dialog"
            aria-modal="true"
            aria-label="Menu navigasi"
          >
            <div
              className="flex items-center justify-between px-5 py-4 border-b shrink-0"
              style={{ borderColor: 'var(--border)' }}
            >
              <span className="font-display font-bold text-lg text-[var(--primary)]">Menu</span>
              {/* FIX: minWidth/minHeight/display/alignItems/justifyContent → Tailwind */}
              <motion.button
                onClick={() => setOpen(false)}
                aria-label="Tutup menu"
                className="text-[var(--body-color)] min-w-11 min-h-11 flex items-center justify-center"
                whileTap={{ rotate: 90, scale: 0.85 }}
                transition={{ duration: 0.2 }}
              >
                <X size={20} />
              </motion.button>
            </div>

            {/* Search in mobile drawer */}
            <div className="pt-3 shrink-0">
              <SidebarSearch />
            </div>

            <nav className="flex-1 overflow-y-auto px-3 py-2 flex flex-col gap-0.5">
              {LINKS.map(({ to, icon, key }) => (
                <AnimatedNavLink key={to} to={to} icon={icon} label={t(`nav.${key}`)} end={to === '/'} />
              ))}
            </nav>

            <div className="px-4 py-4 border-t shrink-0 space-y-1.5" style={{ borderColor: 'var(--border)' }}>
              <LangPicker />
              <ColorThemePicker />
              {/* FIX: position:relative + overflow:hidden → Tailwind */}
              <motion.a
                href="https://wa.me/6281262729243"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Hubungi Felix via WhatsApp"
                className="btn-shimmer block w-full text-center py-2.5 rounded-xl font-semibold text-white text-sm relative overflow-hidden"
                style={{ background: 'var(--primary)' }}
                whileHover={{ scale: 1.02 }}
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

export default function Navbar() {
  return (
    <>
      <Sidebar />
      <MobileNav />
    </>
  )
}