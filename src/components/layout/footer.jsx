import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import { Github, Instagram, Mail } from 'lucide-react'
import { profile } from '../../data/profile'

export default function Footer() {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  return (
    <footer style={{ background: 'var(--card-bg)', borderTop: '1px solid var(--border)' }} className="mt-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <span className="font-display text-2xl font-extrabold" style={{ color: 'var(--primary)' }}>Felix.</span>
            <p className="text-sm mt-2 leading-relaxed" style={{ color: 'var(--body-color)' }}>
              IT Enthusiast · Web Developer<br />SMK Telkom 2 Medan
            </p>
            <div className="flex gap-3 mt-4">
              <a href={profile.github} target="_blank" rel="noopener noreferrer"
                className="p-2 rounded-lg transition-colors hover:bg-[var(--primary-light)]" style={{ color: 'var(--body-color)' }}>
                <Github size={18} />
              </a>
              <a href={profile.instagram} target="_blank" rel="noopener noreferrer"
                className="p-2 rounded-lg transition-colors hover:bg-[var(--primary-light)]" style={{ color: 'var(--body-color)' }}>
                <Instagram size={18} />
              </a>
              <a href={`mailto:${profile.email}`}
                className="p-2 rounded-lg transition-colors hover:bg-[var(--primary-light)]" style={{ color: 'var(--body-color)' }}>
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-display font-bold mb-4 text-sm tracking-wider uppercase" style={{ color: 'var(--dark)' }}>
              Halaman
            </h4>
            <div className="grid grid-cols-2 gap-1">
              {[
                { to: '/', label: t('nav.home') },
                { to: '/about', label: t('nav.about') },
                { to: '/skills', label: t('nav.skills') },
                { to: '/achievement', label: t('nav.achievement') },
                { to: '/certificate', label: t('nav.certificate') },
                { to: '/timeline', label: t('nav.timeline') },
              ].map(({ to, label }) => (
                <NavLink key={to} to={to}
                  className="text-sm py-1 transition-colors hover:text-[var(--primary)]"
                  style={{ color: 'var(--body-color)' }}
                >
                  {label}
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

        <div className="border-t mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2"
          style={{ borderColor: 'var(--border)' }}>
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