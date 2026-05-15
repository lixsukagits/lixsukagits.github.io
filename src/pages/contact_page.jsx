import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { Github, Mail, MessageCircle, Linkedin, Copy, Check } from 'lucide-react'
import PageWrapper from '../components/ui/page_wrapper'
import { profile } from '../data/profile'
import { useThemeStore } from '../store/use_theme_store'
import toast from 'react-hot-toast'

/* ─── GISCUS CONFIG ─────────────────────────────────────────── */
const GISCUS_REPO_ID     = 'R_kgDOSYX86A'
const GISCUS_CATEGORY_ID = 'DIC_kwDOSYX86M4C8oq2'

/* ─── CONTACTS ──────────────────────────────────────────────── */
const contacts = [
  {
    icon: <MessageCircle size={20} />,
    label: 'WhatsApp', value: '+62 812-6272-9243', copyValue: '+6281262729243',
    href: 'https://wa.me/6281262729243',
    color: '#25D366', bg: '#f0fdf4', bgDark: '#0f2a1a',
  },
  {
    icon: <Mail size={20} />,
    label: 'Email', value: 'lixforschl@gmail.com', copyValue: 'lixforschl@gmail.com',
    href: 'mailto:lixforschl@gmail.com',
    color: '#ea4335', bg: '#fef2f2', bgDark: '#2a0f0f',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
    label: 'Instagram', value: '@lixforschl', copyValue: 'https://instagram.com/lixforschl',
    href: profile.instagram,
    color: '#e1306c', bg: '#fdf2f8', bgDark: '#2a0f1a',
  },
  {
    icon: <Github size={20} />,
    label: 'GitHub', value: 'lixsukagits', copyValue: 'https://github.com/lixsukagits',
    href: profile.github,
    color: '#333', bg: '#f6f8fa', bgDark: '#1a1f2e',
  },
  {
    icon: <Linkedin size={20} />,
    label: 'LinkedIn', value: 'Felix Raymond', copyValue: profile.linkedin,
    href: profile.linkedin,
    color: '#0a66c2', bg: '#eff8ff', bgDark: '#0f1f2e',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.04.033.05a19.906 19.906 0 0 0 5.993 3.04.077.077 0 0 0 .083-.027c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.04.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
      </svg>
    ),
    label: 'Discord', value: 'Felix Raymond', copyValue: profile.discord || 'https://discord.com',
    href: profile.discord || 'https://discord.com',
    color: '#5865F2', bg: '#f0f0ff', bgDark: '#0f0f2a',
  },
]

/* ─── CONTACT CARD ──────────────────────────────────────────── */
function ContactCard({ c, i, isDark }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async (e) => {
    e.preventDefault(); e.stopPropagation()
    try {
      await navigator.clipboard.writeText(c.copyValue)
      setCopied(true)
      toast.success(`${c.label} disalin! 📋`, {
        style: {
          background: 'var(--card-bg)', color: 'var(--dark)',
          border: '1px solid var(--border)', borderRadius: '0.75rem', fontSize: '0.85rem',
        },
      })
      setTimeout(() => setCopied(false), 2000)
    } catch { toast.error('Gagal menyalin') }
  }

  return (
    <motion.a
      href={c.href} target="_blank" rel="noopener noreferrer"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.07, type: 'spring', stiffness: 260, damping: 22 }}
      whileHover={{ y: -4, boxShadow: '0 16px 32px rgba(0,0,0,0.08)' }}
      className="card flex items-center gap-4 p-4 sm:p-5"
      style={{ textDecoration: 'none' }}
    >
      <motion.div
        className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
        style={{ background: isDark ? c.bgDark : c.bg, color: c.color }}
        whileHover={{ scale: 1.12, rotate: -6 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      >
        {c.icon}
      </motion.div>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-semibold uppercase tracking-wider mb-0.5" style={{ color: 'var(--body-color)' }}>
          {c.label}
        </p>
        <p className="font-semibold text-sm truncate" style={{ color: 'var(--dark)' }}>
          {c.value}
        </p>
      </div>
      {/* Copy button — klik untuk salin, bukan buka link */}
      <motion.button
        onClick={handleCopy}
        whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}
        title="Salin"
        style={{
          width: 30, height: 30, borderRadius: '50%', border: 'none', flexShrink: 0,
          background: copied ? 'var(--primary-light)' : 'transparent',
          color: copied ? 'var(--primary)' : c.color,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          opacity: 0.7, transition: 'background 0.2s, color 0.2s, opacity 0.2s',
        }}
        onMouseEnter={e => e.currentTarget.style.opacity = '1'}
        onMouseLeave={e => e.currentTarget.style.opacity = '0.7'}
      >
        {copied ? <Check size={13} /> : <Copy size={13} />}
      </motion.button>
      {/* Arrow */}
      <motion.span
        className="shrink-0 text-lg"
        style={{ color: c.color, opacity: 0.5 }}
        initial={{ x: 0 }} whileHover={{ x: 3 }}
      >
        →
      </motion.span>
    </motion.a>
  )
}

/* ─── GISCUS ────────────────────────────────────────────────── */
function Giscus() {
  const containerRef = useRef(null)
  const { theme } = useThemeStore()
  const giscusTheme = theme === 'dark' ? 'dark_dimmed' : 'light'

  useEffect(() => {
    if (!containerRef.current) return
    containerRef.current.innerHTML = ''
    const s = document.createElement('script')
    s.src = 'https://giscus.app/client.js'
    s.setAttribute('data-repo',              'lixsukagits/lixsukagits.github.io')
    s.setAttribute('data-repo-id',           GISCUS_REPO_ID)
    s.setAttribute('data-category',          'General')
    s.setAttribute('data-category-id',       GISCUS_CATEGORY_ID)
    s.setAttribute('data-mapping',           'specific')
    s.setAttribute('data-term',              'Guestbook')
    s.setAttribute('data-strict',            '0')
    s.setAttribute('data-reactions-enabled', '1')
    s.setAttribute('data-emit-metadata',     '0')
    s.setAttribute('data-input-position',    'bottom')
    s.setAttribute('data-theme',             giscusTheme)
    s.setAttribute('data-lang',              'id')
    s.setAttribute('data-loading',           'lazy')
    s.crossOrigin = 'anonymous'; s.async = true
    containerRef.current.appendChild(s)
  }, [giscusTheme])

  return <div ref={containerRef} />
}

/* ─── CONTACT PAGE ──────────────────────────────────────────── */
export default function ContactPage() {
  const { t } = useTranslation()
  const { theme } = useThemeStore()
  const isDark = theme === 'dark'

  return (
    <PageWrapper>
      <Helmet>
        <title>Kontak Felix Raymond</title>
        <meta name="description" content="Hubungi Felix Raymond — WhatsApp, Email, Instagram, GitHub, LinkedIn." />
      </Helmet>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 md:px-10 py-20">

        <div className="text-center mb-4">
          <p style={{
            fontSize: 'clamp(0.85rem, 1.5vw, 1rem)',
            fontWeight: 700, letterSpacing: '0.2em',
            textTransform: 'uppercase', color: 'var(--primary)',
          }}>
            {t('contact.subtitle')}
          </p>
        </div>
        <p className="text-center text-sm mb-12" style={{ color: 'var(--body-color)' }}>
          {t('contact.desc')}
        </p>

        {/* Contact grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-12">
          {contacts.map((c, i) => (
            <ContactCard key={c.label} c={c} i={i} isDark={isDark} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="card p-7 text-center mb-12"
          style={{ background: 'linear-gradient(135deg, var(--primary-light), var(--card-bg))' }}
        >
          <p className="text-3xl mb-3">🤝</p>
          <h3 className="font-display font-bold text-lg mb-2" style={{ color: 'var(--dark)' }}>
            Mari Berkolaborasi!
          </h3>
          <p className="text-sm mb-5" style={{ color: 'var(--body-color)' }}>
            {t('contact.desc')}
          </p>
          <motion.a
            href="https://wa.me/6281262729243"
            className="btn-shimmer inline-flex items-center gap-2 px-7 py-3 rounded-full font-semibold text-white text-sm"
            style={{ background: 'linear-gradient(135deg, var(--primary), #7c3aed)', position: 'relative', overflow: 'hidden' }}
            whileHover={{ scale: 1.05, boxShadow: '0 12px 32px rgba(55,88,249,0.35)' }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          >
            <MessageCircle size={15} /> Chat Sekarang
          </motion.a>
        </motion.div>

        {/* Guestbook */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <div className="text-center mb-6">
            <p style={{
              fontSize: 'clamp(0.85rem, 1.5vw, 1rem)',
              fontWeight: 700, letterSpacing: '0.2em',
              textTransform: 'uppercase', color: 'var(--primary)', marginBottom: '0.4rem',
            }}>
              Say Hello
            </p>
            <h2 className="font-display text-2xl font-extrabold" style={{ color: 'var(--dark)' }}>
              Guestbook
            </h2>
            <p className="mt-2 text-sm" style={{ color: 'var(--body-color)' }}>
              Tinggalkan pesan untuk Felix — login GitHub untuk berkomentar 👋
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden"
            style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', padding: '1.25rem' }}>
            <Giscus />
          </div>
          <p className="mt-3 text-xs text-center" style={{ color: 'var(--body-color)' }}>
            Ditenagai oleh{' '}
            <a href="https://giscus.app" target="_blank" rel="noopener noreferrer"
              className="link-underline" style={{ color: 'var(--primary)' }}>Giscus</a>
            {' '}& GitHub Discussions — gratis, tanpa iklan.
          </p>
        </motion.div>

      </div>
    </PageWrapper>
  )
}