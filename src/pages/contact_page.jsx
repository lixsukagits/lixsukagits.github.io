import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { Github, Instagram, Mail, MessageCircle, Linkedin } from 'lucide-react'
import PageWrapper from '../components/ui/page_wrapper'
import SectionHeader from '../components/ui/section_header'
import { profile } from '../data/profile'
import { useThemeStore } from '../store/use_theme_store'

// ─── GISCUS CONFIG ───────────────────────────────────────────────
const GISCUS_REPO_ID     = 'R_kgDOSYX86A'
const GISCUS_CATEGORY_ID = 'DIC_kwDOSYX86M4C8oq2'

const contacts = [
  {
    icon: <MessageCircle size={22} />,
    label: 'WhatsApp',
    value: '+62 812-6272-9243',
    href: 'https://wa.me/6281262729243',
    color: '#25D366',
    bg: '#f0fdf4',
    bgDark: '#0f2a1a',
  },
  {
    icon: <Mail size={22} />,
    label: 'Email',
    value: 'lixforschl@gmail.com',
    href: 'mailto:lixforschl@gmail.com',
    color: '#ea4335',
    bg: '#fef2f2',
    bgDark: '#2a0f0f',
  },
  {
    icon: <Instagram size={22} />,
    label: 'Instagram',
    value: '@lixforschl',
    href: profile.instagram,
    color: '#e1306c',
    bg: '#fdf2f8',
    bgDark: '#2a0f1a',
  },
  {
    icon: <Github size={22} />,
    label: 'GitHub',
    value: 'lixsukagits',
    href: profile.github,
    color: '#333',
    bg: '#f6f8fa',
    bgDark: '#1a1f2e',
  },
  {
    icon: <Linkedin size={22} />,
    label: 'LinkedIn',
    value: 'Felix Raymond',
    href: profile.linkedin,
    color: '#0a66c2',
    bg: '#eff8ff',
    bgDark: '#0f1f2e',
  },
]

// ─── GISCUS EMBED ────────────────────────────────────────────────
function Giscus() {
  const containerRef = useRef(null)
  const { theme } = useThemeStore()
  const giscusTheme = theme === 'dark' ? 'dark_dimmed' : 'light'

  useEffect(() => {
    if (!containerRef.current) return

    // Bersihkan embed lama tiap theme berubah
    containerRef.current.innerHTML = ''

    const script = document.createElement('script')
    script.src = 'https://giscus.app/client.js'
    script.setAttribute('data-repo',              'lixsukagits/lixsukagits.github.io')
    script.setAttribute('data-repo-id',           GISCUS_REPO_ID)
    script.setAttribute('data-category',          'General')
    script.setAttribute('data-category-id',       GISCUS_CATEGORY_ID)
    script.setAttribute('data-mapping',           'specific')
    script.setAttribute('data-term',              'Guestbook')
    script.setAttribute('data-strict',            '0')
    script.setAttribute('data-reactions-enabled', '1')
    script.setAttribute('data-emit-metadata',     '0')
    script.setAttribute('data-input-position',    'bottom')
    script.setAttribute('data-theme',             giscusTheme)
    script.setAttribute('data-lang',              'id')
    script.setAttribute('data-loading',           'lazy')
    script.crossOrigin = 'anonymous'
    script.async = true

    containerRef.current.appendChild(script)
  }, [giscusTheme])

  return <div ref={containerRef} />
}

// ─── CONTACT PAGE ────────────────────────────────────────────────
export default function ContactPage() {
  const { t } = useTranslation()
  const { theme } = useThemeStore()
  const isDark = theme === 'dark'

  return (
    <PageWrapper>
      <Helmet><title>Kontak Felix Raymond</title></Helmet>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 md:px-10 py-20">

        {/* ── Kontak ── */}
        <SectionHeader label={t('contact.subtitle')} title={t('contact.title')} />
        <p className="text-center text-base mb-12" style={{ color: 'var(--body-color)' }}>
          {t('contact.desc')}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {contacts.map((c, i) => (
            <motion.a
              key={c.label}
              href={c.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{
                y: -4,
                boxShadow: '0 16px 32px rgba(0,0,0,0.08)',
              }}
              className="card flex items-center gap-4 p-5 group"
              style={{ textDecoration: 'none' }}
            >
              <motion.div
                className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                style={{
                  background: isDark ? c.bgDark : c.bg,
                  color: c.color,
                }}
                whileHover={{ scale: 1.15, rotate: -8 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              >
                {c.icon}
              </motion.div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider mb-0.5" style={{ color: 'var(--body-color)' }}>
                  {c.label}
                </p>
                <p className="font-semibold text-sm" style={{ color: 'var(--dark)' }}>{c.value}</p>
              </div>
            </motion.a>
          ))}
        </div>

        {/* ── Guestbook ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-16"
        >
          {/* Header */}
          <div className="mb-6 text-center">
            <span className="section-label">Say Hello</span>
            <h2 className="font-display text-2xl font-extrabold mt-2" style={{ color: 'var(--dark)' }}>
              Guestbook
            </h2>
            <p className="mt-2 text-sm" style={{ color: 'var(--body-color)' }}>
              Tinggalkan pesan atau kesan untuk Felix — login GitHub untuk berkomentar 👋
            </p>
          </div>

          {/* Giscus wrapper */}
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              background: 'var(--card-bg)',
              border: '1px solid var(--border)',
              padding: '1.25rem',
            }}
          >
            {GISCUS_REPO_ID === 'GANTI_REPO_ID' ? (
              /* Placeholder sampai Giscus dikonfigurasi */
              <div className="text-center py-10">
                <p className="text-3xl mb-3">💬</p>
                <p className="font-semibold text-sm mb-1" style={{ color: 'var(--dark)' }}>
                  Guestbook belum dikonfigurasi
                </p>
                <p className="text-xs" style={{ color: 'var(--body-color)' }}>
                  Buka{' '}
                  <a
                    href="https://giscus.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline"
                    style={{ color: 'var(--primary)' }}
                  >
                    giscus.app
                  </a>
                  , salin <code>repo-id</code> & <code>category-id</code>,
                  lalu tempel di konstanta atas file ini.
                </p>
              </div>
            ) : (
              <Giscus />
            )}
          </div>

          <p className="mt-3 text-xs text-center" style={{ color: 'var(--body-color)' }}>
            Ditenagai oleh{' '}
            <a
              href="https://giscus.app"
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline"
              style={{ color: 'var(--primary)' }}
            >
              Giscus
            </a>{' '}
            & GitHub Discussions — gratis, tanpa iklan.
          </p>
        </motion.div>

        {/* ── CTA Kolaborasi ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-10 card p-8 text-center"
        >
          <p className="text-4xl mb-4">🤝</p>
          <h3 className="font-display font-bold text-xl mb-2" style={{ color: 'var(--dark)' }}>
            Mari Berkolaborasi!
          </h3>
          <p className="text-sm mb-6" style={{ color: 'var(--body-color)' }}>
            Tertarik untuk bekerja sama, berdiskusi tentang IT, atau sekadar ingin berteman? Jangan ragu untuk menghubungi saya!
          </p>
          <motion.a
            href="https://wa.me/6281262729243"
            className="btn-shimmer inline-flex items-center gap-2 px-8 py-3 rounded-full font-semibold text-white text-sm"
            style={{ background: 'var(--primary)', position: 'relative', overflow: 'hidden' }}
            whileHover={{ scale: 1.05, boxShadow: '0 12px 32px rgba(55,88,249,0.35)' }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          >
            <MessageCircle size={16} /> Chat Sekarang
          </motion.a>
        </motion.div>

      </div>
    </PageWrapper>
  )
}