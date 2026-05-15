import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import { Github, Instagram, Mail, Linkedin } from 'lucide-react'
import { profile } from '../../data/profile'

const QUICK_LINKS = [
  { to: '/',            key: 'home' },
  { to: '/about',       key: 'about' },
  { to: '/skills',      key: 'skills' },
  { to: '/achievement', key: 'achievement' },
  { to: '/certificate', key: 'certificate' },
  { to: '/timeline',    key: 'timeline' },
]

const SOCIAL = [
  { href: profile.github,            icon: Github,    label: 'GitHub' },
  { href: profile.instagram,         icon: Instagram, label: 'Instagram' },
  { href: `mailto:${profile.email}`, icon: Mail,      label: 'Email' },
  { href: profile.linkedin,          icon: Linkedin,  label: 'LinkedIn' },
]

export default function Footer() {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  return (
    <footer
      className="mt-20 border-t"
      style={{ background: 'var(--card-bg)', borderColor: 'var(--border)' }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Brand */}
          <div>
            <span className="font-display text-2xl font-extrabold" style={{ color: 'var(--primary)' }}>
              Felix<span style={{ color: 'var(--dark)' }}>.</span>
            </span>
            <p className="text-sm mt-2 leading-relaxed" style={{ color: 'var(--body-color)' }}>
              IT Enthusiast · Web Developer<br />SMK Telkom 2 Medan
            </p>
            <div className="flex gap-2 mt-4">
              {SOCIAL.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('mailto') ? undefined : '_blank'}
                  rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                  aria-label={label}
                  className="p-2 rounded-lg transition-colors hover:bg-[var(--primary-light)] hover:text-[var(--primary)]"
                  style={{ color: 'var(--body-color)' }}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-display font-bold mb-4 text-sm tracking-wider uppercase" style={{ color: 'var(--dark)' }}>
              Halaman
            </h4>
            <div className="grid grid-cols-2 gap-1">
              {QUICK_LINKS.map(({ to, key }) => (
                <NavLink
                  key={to}
                  to={to}
                  className="text-sm py-1 transition-colors hover:text-[var(--primary)]"
                  style={{ color: 'var(--body-color)' }}
                >
                  {t(`nav.${key}`)}
                </NavLink>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-bold mb-4 text-sm tracking-wider uppercase" style={{ color: 'var(--dark)' }}>
              Kontak
            </h4>
            <div className="space-y-2 text-sm" style={{ color: 'var(--body-color)' }}>
              <p>📧 {profile.email}</p>
              <p>📍 {profile.location}</p>
              <p>🏫 SMK Telkom 2 Medan</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="border-t mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2"
          style={{ borderColor: 'var(--border)' }}
        >
          <p className="text-xs" style={{ color: 'var(--body-color)' }}>
            {t('footer.made')} — {year}
          </p>
          <p className="text-xs" style={{ color: 'var(--body-color)' }}>
            Built with React + Vite + Tailwind v4 ⚡
          </p>
        </div>
      </div>
    </footer>
  )
}