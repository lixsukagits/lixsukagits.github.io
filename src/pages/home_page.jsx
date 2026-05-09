import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import CountUp from 'react-countup'
import { useInView } from 'react-intersection-observer'
import { Helmet } from 'react-helmet-async'
import { useUserStore } from '../store/use_user_store'
import WelcomeModal from '../components/ui/welcome_modal'
import PageWrapper from '../components/ui/page_wrapper'
import SectionHeader from '../components/ui/section_header'
import { profile } from '../data/profile'
import { achievements } from '../data/achievements'
import { projects } from '../data/projects'
import { Github, Instagram, Mail, ExternalLink } from 'lucide-react'

function StatCard({ end, label, delay = 0 }) {
  const { ref, inView } = useInView({ triggerOnce: true })
  return (
    <div ref={ref} className="text-center p-5 rounded-2xl card">
      <div className="font-display text-3xl font-extrabold" style={{ color: 'var(--primary)' }}>
        {inView ? <CountUp end={end} duration={2} delay={delay} suffix="+" /> : '0+'}
      </div>
      <div className="text-xs mt-1 font-medium" style={{ color: 'var(--body-color)' }}>{label}</div>
    </div>
  )
}

export default function HomePage() {
  const { t } = useTranslation()
  const { userName, hasVisited } = useUserStore()

  return (
    <PageWrapper>
      <Helmet><title>Felix Raymond — Portfolio</title></Helmet>

      {!hasVisited && <WelcomeModal />}

      {/* Hero — full width, centered, no photo */}
      <section className="relative flex flex-col items-center justify-center text-center min-h-[90vh] px-6 md:px-12 py-20 overflow-hidden">
        {/* BG blob */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none -z-10 opacity-[0.07]"
          style={{ background: 'radial-gradient(circle, var(--primary), transparent 70%)' }} />

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <span className="section-label text-sm">
            {userName ? `Hi ${userName}, ${t('hero.greeting')}` : t('hero.greeting')}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mt-3 mb-4"
          style={{ color: 'var(--dark)' }}
        >
          Felix<br />Raymond
        </motion.h1>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}
          className="text-lg sm:text-xl mb-8 font-medium h-8" style={{ color: 'var(--body-color)' }}>
          <TypeAnimation
            sequence={[
              'IT Enthusiast 🔥', 2000,
              'Web Developer 💻', 2000,
              'Olimpiade Informatika 🏆', 2000,
              'Calon Mahasiswa China 🇨🇳', 2000,
            ]}
            repeat={Infinity}
            speed={50}
          />
        </motion.div>

        {/* Social icons */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}
          className="flex gap-3 justify-center mb-8">
          {[
            { href: profile.github, icon: <Github size={18} /> },
            { href: profile.instagram, icon: <img src="https://www.svgrepo.com/show/506668/instagram.svg" className="w-5 h-5" alt="ig" /> },
            { href: `mailto:${profile.email}`, icon: <Mail size={18} /> },
          ].map(({ href, icon }, i) => (
            <a key={i} href={href} target="_blank" rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:scale-110 hover:bg-[var(--primary-light)]"
              style={{ border: '1px solid var(--border)', color: 'var(--body-color)' }}>
              {icon}
            </a>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-3 justify-center">
          <a href={profile.whatsapp} target="_blank" rel="noopener noreferrer"
            className="px-8 py-3 rounded-full font-semibold text-white text-sm transition-all hover:opacity-90 hover:scale-[1.02] text-center"
            style={{ background: 'var(--primary)' }}>
            {t('hero.cta_contact')}
          </a>
          <Link to="/about"
            className="px-8 py-3 rounded-full font-semibold text-sm border-2 transition-all hover:bg-[var(--primary-light)] text-center"
            style={{ borderColor: 'var(--border)', color: 'var(--body-color)' }}>
            {t('hero.cta_portfolio')}
          </Link>
        </motion.div>

        {/* Open to work badge */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65 }}
          className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold"
          style={{ background: 'var(--primary-light)', color: 'var(--primary)' }}>
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          {t('hero.open_to')}
        </motion.div>
      </section>

      {/* Stats */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 md:px-10 pb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard end={5}  label={t('about.stats_achievements')} delay={0} />
          <StatCard end={4}  label={t('about.stats_experience')}   delay={0.1} />
          <StatCard end={3}  label={t('about.stats_projects')}     delay={0.2} />
          <StatCard end={8}  label={t('about.stats_certificates')} delay={0.3} />
        </div>
      </section>

      {/* Featured Achievements */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 md:px-10 pb-20">
        <SectionHeader label="What I've Achieved" title={t('achievement.title')} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {achievements.slice(0, 3).map((a, i) => (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="card overflow-hidden"
            >
              <div className="relative h-40 overflow-hidden">
                <img src={a.img} alt={a.title} className="w-full h-full object-cover" />
                <div className={`absolute inset-0 bg-gradient-to-t ${a.color} opacity-60`} />
                <span className="absolute top-3 left-3 text-3xl">{a.medal}</span>
                <span className="absolute top-3 right-3 badge" style={{ background: 'rgba(0,0,0,0.4)', color: '#fff' }}>
                  {a.level}
                </span>
              </div>
              <div className="p-4">
                <h3 className="font-display font-bold text-sm leading-snug" style={{ color: 'var(--dark)' }}>{a.title}</h3>
                <p className="text-xs mt-1" style={{ color: 'var(--body-color)' }}>{a.date}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link to="/achievement" className="inline-flex items-center gap-2 text-sm font-semibold transition-colors hover:opacity-80"
            style={{ color: 'var(--primary)' }}>
            Lihat Semua Prestasi <ExternalLink size={14} />
          </Link>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 md:px-10 pb-24">
        <SectionHeader label="What I've Built" title="Proyek" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="card overflow-hidden"
            >
              <div className="h-40 overflow-hidden">
                <img src={p.img} alt={p.title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-display font-bold text-sm" style={{ color: 'var(--dark)' }}>{p.title}</h3>
                  <span className="text-xs shrink-0" style={{ color: 'var(--body-color)' }}>{p.year}</span>
                </div>
                <p className="text-xs mb-3 leading-relaxed" style={{ color: 'var(--body-color)' }}>{p.desc}</p>
                <div className="flex flex-wrap gap-1">
                  {p.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </PageWrapper>
  )
}