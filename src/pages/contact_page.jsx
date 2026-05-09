import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { Github, Instagram, Mail, MessageCircle, Linkedin } from 'lucide-react'
import PageWrapper from '../components/ui/page_wrapper'
import SectionHeader from '../components/ui/section_header'
import { profile } from '../data/profile'

const contacts = [
  {
    icon: <MessageCircle size={22} />,
    label: 'WhatsApp',
    value: '+62 812-6272-9243',
    href: 'https://wa.me/6281262729243',
    color: '#25D366',
    bg: '#f0fdf4',
  },
  {
    icon: <Mail size={22} />,
    label: 'Email',
    value: 'lixforschl@gmail.com',
    href: 'mailto:lixforschl@gmail.com',
    color: '#ea4335',
    bg: '#fef2f2',
  },
  {
    icon: <Instagram size={22} />,
    label: 'Instagram',
    value: '@lixforschl',
    href: profile.instagram,
    color: '#e1306c',
    bg: '#fdf2f8',
  },
  {
    icon: <Github size={22} />,
    label: 'GitHub',
    value: 'lixsukagits',
    href: profile.github,
    color: '#333',
    bg: '#f6f8fa',
  },
  {
    icon: <Linkedin size={22} />,
    label: 'LinkedIn',
    value: 'Felix Raymond',
    href: profile.linkedin,
    color: '#0a66c2',
    bg: '#eff8ff',
  },
]

export default function ContactPage() {
  const { t } = useTranslation()

  return (
    <PageWrapper>
      <Helmet><title>Kontak Felix Raymond</title></Helmet>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 md:px-10 py-20">
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
              className="card flex items-center gap-4 p-5 transition-all hover:scale-[1.02] group"
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110"
                style={{ background: c.bg, color: c.color }}>
                {c.icon}
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider mb-0.5" style={{ color: 'var(--body-color)' }}>
                  {c.label}
                </p>
                <p className="font-semibold text-sm" style={{ color: 'var(--dark)' }}>{c.value}</p>
              </div>
            </motion.a>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 card p-8 text-center"
        >
          <p className="text-4xl mb-4">🤝</p>
          <h3 className="font-display font-bold text-xl mb-2" style={{ color: 'var(--dark)' }}>
            Mari Berkolaborasi!
          </h3>
          <p className="text-sm mb-6" style={{ color: 'var(--body-color)' }}>
            Tertarik untuk bekerja sama, berdiskusi tentang IT, atau sekadar ingin berteman? Jangan ragu untuk menghubungi saya!
          </p>
          <a
            href="https://wa.me/6281262729243"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-semibold text-white text-sm transition-all hover:opacity-90 hover:scale-105"
            style={{ background: 'var(--primary)' }}
          >
            <MessageCircle size={16} /> Chat Sekarang
          </a>
        </motion.div>
      </div>
    </PageWrapper>
  )
}