import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis,
  ResponsiveContainer, Tooltip,
} from 'recharts'
import PageWrapper from '../components/ui/page_wrapper'
import SectionHeader from '../components/ui/section_header'
import LazyImage from '../components/ui/lazy_image'
import { skills, skillRadarData } from '../data/skills'

/* ─── STAGGER ───────────────────────────────────────────────── */
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}
const item = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 260, damping: 22 } },
}

/* ─── CUSTOM RADAR TOOLTIP ──────────────────────────────────── */
function RadarTooltip({ active, payload }) {
  if (!active || !payload?.length) return null
  return (
    <div className="px-3 py-2 rounded-xl text-xs font-semibold shadow-lg"
      style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', color: 'var(--dark)' }}>
      {payload[0].payload.subject}: <span style={{ color: 'var(--primary)' }}>{payload[0].value}%</span>
    </div>
  )
}

/* ─── FILTER TAGS ───────────────────────────────────────────── */
// FIX: ALL_TAGS pakai i18n key, bukan hardcode ID
const TAG_KEYS = ['all', 'frontend', 'creative', 'hardware', 'design', 'media', 'productivity', 'programming']

/* ─── SKILLS PAGE ───────────────────────────────────────────── */
export default function SkillsPage() {
  const { t, i18n } = useTranslation()
  const [activeTag, setActiveTag] = useState('all')
  const lang = i18n.language

  // FIX: filter pakai nilai asli dari data (bahasa Indonesia),
  // tapi display label ditranslate. Map activeTag key ke nilai filter.
  const TAG_VALUE_MAP = {
    all: 'Semua',
    frontend: 'Frontend',
    creative: 'Kreatif',
    hardware: 'Hardware',
    design: 'Desain',
    media: 'Media',
    productivity: 'Produktivitas',
    programming: 'Programming',
  }

  const TAG_LABEL = (key) => t(`skills.tag_${key}`, TAG_VALUE_MAP[key])

  const filtered = activeTag === 'all'
    ? skills
    : skills.filter(s => s.tag === TAG_VALUE_MAP[activeTag])

  return (
    <PageWrapper>
      <Helmet>
        <title>Keterampilan Felix Raymond</title>
        <meta name="description" content="Keterampilan teknis Felix Raymond — web development, programming, cybersecurity, dan desain." />
        <meta property="og:title" content="Keterampilan Felix Raymond" />
        <meta property="og:url" content="https://lixsukagits.github.io/skills" />
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-10 py-20">

        {/* FIX: Pakai SectionHeader — konsisten dengan halaman lain */}
        <SectionHeader
          label={t('skills.subtitle')}
          title={t('nav.skills')}
        />

        {/* ── Radar chart + level legend side by side ── */}
        <div className="card p-6 sm:p-8 mb-10 flex flex-col md:flex-row items-center gap-8">
          {/* Radar */}
          <div className="w-full md:w-1/2 h-64" role="img" aria-label="Radar chart kemampuan skill">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={skillRadarData} margin={{ top: 10, right: 20, bottom: 10, left: 20 }}>
                <PolarGrid stroke="var(--border)" />
                <PolarAngleAxis
                  dataKey="subject"
                  tick={{ fill: 'var(--body-color)', fontSize: 11, fontWeight: 600 }}
                />
                <Radar
                  dataKey="value"
                  stroke="var(--primary)"
                  fill="var(--primary)"
                  fillOpacity={0.25}
                  strokeWidth={2}
                  dot={{ r: 3, fill: 'var(--primary)' }}
                />
                <Tooltip content={<RadarTooltip />} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Legend level */}
          <div className="w-full md:w-1/2 space-y-3">
            <p className="font-display font-bold text-base mb-4" style={{ color: 'var(--dark)' }}>
              Skill Overview
            </p>
            {skillRadarData.map(({ subject, value }) => (
              <div key={subject}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-medium" style={{ color: 'var(--dark)' }}>{subject}</span>
                  <span style={{ color: 'var(--primary)' }}>{value}%</span>
                </div>
                <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--border)' }}>
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${value}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className="h-full rounded-full"
                    style={{ background: 'linear-gradient(90deg, var(--primary), #7c3aed)' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Filter tabs ── */}
        {/* FIX: aria-pressed untuk state toggle, role="group" untuk context */}
        <div
          className="flex flex-wrap gap-2 mb-8 justify-center"
          role="group"
          aria-label={t('skills.filter_label', 'Filter kategori skill')}
        >
          {TAG_KEYS.map(key => {
            const isActive = activeTag === key
            return (
              <motion.button
                key={key}
                onClick={() => setActiveTag(key)}
                aria-pressed={isActive}
                className="px-4 py-2 rounded-full text-xs font-semibold transition-all"
                style={{
                  background: isActive ? 'var(--primary)' : 'var(--card-bg)',
                  color: isActive ? '#fff' : 'var(--body-color)',
                  border: `1px solid ${isActive ? 'var(--primary)' : 'var(--border)'}`,
                  minHeight: 36,
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {TAG_LABEL(key)}
              </motion.button>
            )
          })}
        </div>

        {/* ── Skills grid ── */}
        {/* FIX: key={activeTag} agar stagger variants re-trigger saat filter ganti */}
        <motion.div
          key={activeTag}
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((skill, i) => (
              <motion.div
                key={skill.id}
                variants={item}
                layout
                exit={{ opacity: 0, scale: 0.9 }}
                className="card overflow-hidden"
                whileHover={{ y: -5 }}
              >
                {/* Image */}
                <div className="relative aspect-[16/9] overflow-hidden">
                  <LazyImage
                    src={skill.img}
                    alt={skill.title}
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent pointer-events-none" />
                  {/* Icon + level badge overlay */}
                  <div className="absolute bottom-0 left-0 right-0 px-3 pb-3 flex items-end justify-between">
                    {/* FIX: emoji dekoratif → aria-hidden */}
                    <span className="text-2xl drop-shadow" aria-hidden="true">{skill.icon}</span>
                    <span
                      className="text-xs font-bold px-2 py-1 rounded-lg"
                      style={{ background: 'rgba(0,0,0,0.55)', color: '#fff', backdropFilter: 'blur(4px)' }}
                    >
                      {skill.level}%
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  {/* Title + tag */}
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <h3 className="font-display font-bold text-sm" style={{ color: 'var(--dark)' }}>
                        {lang === 'zh' ? skill.titleZh : skill.title}
                      </h3>
                      <p className="text-xs mt-0.5" style={{ color: 'var(--body-color)' }}>
                        {lang === 'zh' ? skill.descZh : skill.desc}
                      </p>
                    </div>
                    <span className={`badge shrink-0 text-xs ${skill.tagColor}`}>{skill.tag}</span>
                  </div>

                  {/* Progress bar */}
                  <div className="mb-3 mt-3">
                    <div className="flex justify-between text-xs mb-1.5" style={{ color: 'var(--body-color)' }}>
                      <span className="font-medium">{skill.levelLabel}</span>
                    </div>
                    <div
                      className="h-1.5 rounded-full overflow-hidden"
                      style={{ background: 'var(--border)' }}
                      role="progressbar"
                      aria-valuenow={skill.level}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label={`${skill.title} ${skill.level}%`}
                    >
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: i * 0.06, ease: 'easeOut' }}
                        className="h-full rounded-full"
                        style={{ background: 'linear-gradient(90deg, var(--primary), #7c3aed)' }}
                      />
                    </div>
                  </div>

                  {/* Tools */}
                  <div className="flex flex-wrap gap-1">
                    {skill.tools.map(tool => (
                      <span key={tool} className="tag text-xs">{tool}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-4xl mb-3" aria-hidden="true">🔍</p>
            <p style={{ color: 'var(--body-color)' }}>{t('skills.empty', 'Tidak ada skill di kategori ini.')}</p>
          </div>
        )}
      </div>
    </PageWrapper>
  )
}