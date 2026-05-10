import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts'
import PageWrapper from '../components/ui/page_wrapper'
import SectionHeader from '../components/ui/section_header'
import LazyImage from '../components/ui/lazy_image'
import { skills, skillRadarData } from '../data/skills'

export default function SkillsPage() {
  const { t } = useTranslation()

  return (
    <PageWrapper>
      <Helmet>
        <title>Keterampilan Felix Raymond</title>
        <meta name="description" content="Keterampilan teknis Felix Raymond — web development, programming, cybersecurity, dan desain." />
        <meta property="og:title" content="Keterampilan Felix Raymond" />
        <meta property="og:description" content="Stack teknologi dan tingkat kemampuan Felix Raymond di berbagai bidang IT." />
        <meta property="og:url" content="https://lixsukagits.github.io/skills" />
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-10 py-20">
        <SectionHeader label={t('skills.subtitle')} title={t('skills.title')} />

        {/* Radar chart */}
        <div className="card p-8 mb-12 flex flex-col items-center">
          <h3 className="font-display font-bold text-lg mb-6 text-center" style={{ color: 'var(--dark)' }}>
            Skill Overview
          </h3>
          <div className="w-full max-w-sm h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={skillRadarData}>
                <PolarGrid stroke="var(--border)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--body-color)', fontSize: 12 }} />
                <Radar dataKey="value" stroke="var(--primary)" fill="var(--primary)" fillOpacity={0.3} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Skills grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="card overflow-hidden"
              whileHover={{ y: -4 }}
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <LazyImage
                  src={skill.img}
                  alt={skill.title}
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
                <span className="absolute bottom-3 left-3 text-2xl">{skill.icon}</span>
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <h3 className="font-display font-bold" style={{ color: 'var(--dark)' }}>{skill.title}</h3>
                    <p className="text-xs" style={{ color: 'var(--body-color)' }}>{skill.desc}</p>
                  </div>
                  <span className={`badge shrink-0 ${skill.tagColor}`}>{skill.tag}</span>
                </div>
                <div className="mb-3">
                  <div className="flex justify-between text-xs mb-1" style={{ color: 'var(--body-color)' }}>
                    <span>{skill.levelLabel}</span>
                    <span>{skill.level}%</span>
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--border)' }}>
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: i * 0.07 }}
                      className="h-full rounded-full"
                      style={{ background: 'linear-gradient(90deg, var(--primary), #7c3aed)' }}
                    />
                  </div>
                </div>
                <div className="flex flex-wrap gap-1">
                  {skill.tools.map(tool => (
                    <span key={tool} className="tag text-xs">{tool}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </PageWrapper>
  )
}