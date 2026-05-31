import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

const BIRTH = new Date(2009, 5, 27)

function getAgeData() {
  const now  = new Date()
  const year = now.getFullYear()

  let age = year - 2009
  const hasHadBday = now.getMonth() > 5 || (now.getMonth() === 5 && now.getDate() >= 27)
  if (!hasHadBday) age -= 1

  let nextBday = new Date(year, 5, 27)
  if (nextBday <= now) nextBday = new Date(year + 1, 5, 27)

  const diff  = nextBday - now
  const days  = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const mins  = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const secs  = Math.floor((diff % (1000 * 60)) / 1000)

  const isBday = now.getMonth() === 5 && now.getDate() === 27

  return { age, days, hours, mins, secs, isBday }
}

/* ─── FLIP NUMBER ────────────────────────────────────────────── */
function FlipNum({ value, label, color }) {
  const val = String(value).padStart(2, '0')
  return (
    <div className="text-center">
      <motion.div
        key={val}
        initial={{ rotateX: -90, opacity: 0 }}
        animate={{ rotateX: 0, opacity: 1 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        // FIX: style{{ fontFamily, fontSize, fontWeight, color, lineHeight, minWidth, display,
        //      background, border, borderRadius, padding }} → Tailwind + inline untuk nilai dinamis
        className="font-display font-extrabold inline-block rounded-lg px-[0.6rem] py-[0.35rem]
                   text-[clamp(1.1rem,3vw,1.6rem)] leading-none min-w-[2.2ch]"
        style={{ color, background: `${color}12`, border: `1px solid ${color}25` }}
      >
        {val}
      </motion.div>
      {/* FIX: style → className */}
      <p className="text-[0.6rem] text-[var(--body-color)] mt-1 font-semibold uppercase tracking-[0.08em]">
        {label}
      </p>
    </div>
  )
}

/* ─── MAIN COMPONENT ─────────────────────────────────────────── */
export default function AgeCountdown() {
  const { t } = useTranslation()
  const [data, setData] = useState(getAgeData)

  useEffect(() => {
    const interval = setInterval(() => setData(getAgeData()), 1000)
    return () => clearInterval(interval)
  }, [])

  const { age, days, hours, mins, secs, isBday } = data

  if (isBday) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="card p-5 text-center"
        style={{ background: 'linear-gradient(135deg, var(--primary-light), var(--card-bg))' }}
      >
        <motion.div
          animate={{ rotate: [0, -10, 10, -10, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 2 }}
          className="text-[2.5rem] mb-2"
        >🎂</motion.div>
        {/* FIX: style → className + t() */}
        <p className="font-display font-extrabold text-[1.1rem] text-[var(--primary)] mb-1">
          {t('age.bday_title')}
        </p>
        <p className="text-[0.8rem] text-[var(--body-color)]">
          {t('age.bday_desc', { age })}
        </p>
      </motion.div>
    )
  }

  const nextYear = new Date() > new Date(new Date().getFullYear(), 5, 27)
    ? new Date().getFullYear() + 1
    : new Date().getFullYear()

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="card p-5"
    >
      {/* Header */}
      {/* FIX: style{{ display, alignItems, gap, marginBottom }} → Tailwind */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-[1.2rem]">🎂</span>
        <div>
          {/* FIX: style → className + t() */}
          <p className="font-display font-bold text-[0.85rem] text-[var(--dark)] leading-tight">
            {t('age.title')}
          </p>
          <p className="text-[0.68rem] text-[var(--body-color)]">
            {age} {t('age.years')} · {t('age.subtitle').split('·')[1]?.trim() ?? 'next birthday:'}
          </p>
        </div>
        <div className="ml-auto text-right">
          <span className="font-display font-extrabold text-[1.8rem] text-[var(--primary)] leading-none">
            {age}
          </span>
          <p className="text-[0.6rem] text-[var(--body-color)] mt-0.5">{t('age.years')}</p>
        </div>
      </div>

      {/* Countdown */}
      {/* FIX: style{{ display, gap, justifyContent, alignItems }} → Tailwind */}
      <div className="flex gap-2 justify-center items-start">
        <FlipNum value={days}  label={t('age.days')}  color="#3758F9" />
        <div className="text-[var(--body-color)] text-[1.4rem] font-bold pt-1 opacity-50">:</div>
        <FlipNum value={hours} label={t('age.hours')} color="#7c3aed" />
        <div className="text-[var(--body-color)] text-[1.4rem] font-bold pt-1 opacity-50">:</div>
        <FlipNum value={mins}  label={t('age.mins')}  color="#10b981" />
        <div className="text-[var(--body-color)] text-[1.4rem] font-bold pt-1 opacity-50">:</div>
        <FlipNum value={secs}  label={t('age.secs')}  color="#f59e0b" />
      </div>

      {/* Progress bar */}
      {/* FIX: style → Tailwind */}
      <div className="mt-3">
        <div className="flex justify-between text-[0.62rem] text-[var(--body-color)] mb-1">
          <span>27 Jun {nextYear === new Date().getFullYear() + 1 ? new Date().getFullYear() : new Date().getFullYear()}</span>
          <span>27 Jun {nextYear}</span>
        </div>
        <div className="h-1 rounded-full overflow-hidden" style={{ background: 'var(--border)' }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${Math.max(0, 100 - (days / 365) * 100)}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="h-full rounded-full"
            style={{ background: 'linear-gradient(90deg, #3758F9, #7c3aed, #10b981)' }}
          />
        </div>
      </div>
    </motion.div>
  )
}