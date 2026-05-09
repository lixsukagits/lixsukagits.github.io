import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import { Printer, Download, Share2 } from 'lucide-react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import PageWrapper from '../components/ui/page_wrapper'
import { profile } from '../data/profile'
import { skills } from '../data/skills'
import { education } from '../data/education'
import { experience } from '../data/experience'
import { achievements } from '../data/achievements'

export default function CvPage() {
  const { t } = useTranslation()
  const cvRef = useRef(null)

  // Print — works on both desktop & mobile browser
  const handlePrint = () => {
    window.print()
  }

  // Share / download on mobile via Web Share API, fallback copy link
  const handleShare = async () => {
    const url = window.location.href
    if (navigator.share) {
      try {
        await navigator.share({ title: 'CV Felix Raymond', url })
      } catch (_) {}
    } else {
      await navigator.clipboard.writeText(url)
      toast.success('Link CV berhasil disalin!')
    }
  }

  return (
    <PageWrapper>
      <Helmet><title>CV Felix Raymond</title></Helmet>

      {/* Print styles: visibility trick = hanya #cv-print yang tercetak */}
      <style>{`
        @media print {
          body * { visibility: hidden !important; }
          #cv-print, #cv-print * { visibility: visible !important; }
          #cv-print {
            position: fixed !important;
            inset: 0 !important;
            width: 100% !important;
            height: auto !important;
            box-shadow: none !important;
            border: none !important;
            margin: 0 !important;
            padding: 28px !important;
            background: white !important;
            overflow: visible !important;
          }
          body { background: white !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          @page { margin: 0.8cm; size: A4; }
        }
      `}</style>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 md:px-12 py-8 md:py-16">

        {/* Controls */}
        <div className="no-print flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <span className="section-label block mb-1">{t('cv.subtitle')}</span>
            <h1 className="font-display text-2xl sm:text-3xl font-bold" style={{ color: 'var(--dark)' }}>
              {t('cv.title')}
            </h1>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            {/* Share/download — mobile friendly */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleShare}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all"
              style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', color: 'var(--dark)' }}
            >
              <Share2 size={15} />
              <span className="sm:inline">Bagikan</span>
            </motion.button>
            {/* Print / Save as PDF */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handlePrint}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
              style={{ background: 'var(--primary)' }}
            >
              <Printer size={15} />
              <span>{t('cv.download')} / PDF</span>
            </motion.button>
          </div>
        </div>

        {/* Tip mobile */}
        <div className="no-print mb-6 px-4 py-3 rounded-xl text-xs sm:hidden" style={{ background: 'var(--primary-light)', color: 'var(--primary)' }}>
          💡 Tap <strong>Download / PDF</strong> lalu pilih <strong>"Save as PDF"</strong> di browser untuk menyimpan.
        </div>

        {/* CV Content */}
        <div
          id="cv-print"
          ref={cvRef}
          className="card p-6 sm:p-8 md:p-12"
        >
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 pb-6 mb-6"
            style={{ borderBottom: '2px solid var(--primary)' }}>
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold text-white shrink-0"
              style={{ background: 'var(--primary)' }}>
              FR
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold" style={{ color: 'var(--dark)' }}>
                {profile.name}
              </h2>
              <p className="text-sm font-medium mt-0.5" style={{ color: 'var(--primary)' }}>
                IT Enthusiast · Web Developer · SMK Telkom 2 Medan
              </p>
              <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs" style={{ color: 'var(--body-color)' }}>
                <span>📧 {profile.email}</span>
                <span>📱 +62 812-6272-9243</span>
                <span>📍 {profile.location}</span>
                <span>🌐 lixsukagits.github.io</span>
              </div>
            </div>
          </div>

          {/* Education */}
          <section className="mb-7">
            <h3 className="font-display font-bold text-base mb-3 pb-2" style={{ color: 'var(--dark)', borderBottom: '1px solid var(--border)' }}>
              🎓 Pendidikan
            </h3>
            <div className="space-y-3">
              {education.map(ed => (
                <div key={ed.id} className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
                  <div>
                    <p className="font-semibold text-sm" style={{ color: 'var(--dark)' }}>{ed.school}</p>
                    <p className="text-xs" style={{ color: 'var(--primary)' }}>{ed.major}</p>
                    {ed.current && <p className="text-xs mt-0.5 text-green-600 font-semibold">● Sedang Berjalan</p>}
                  </div>
                  <span className="text-xs shrink-0" style={{ color: 'var(--body-color)' }}>{ed.period}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Experience */}
          <section className="mb-7">
            <h3 className="font-display font-bold text-base mb-3 pb-2" style={{ color: 'var(--dark)', borderBottom: '1px solid var(--border)' }}>
              💼 Pengalaman
            </h3>
            <div className="space-y-4">
              {experience.map(ex => (
                <div key={ex.id}>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 mb-1">
                    <div>
                      <p className="font-semibold text-sm" style={{ color: 'var(--dark)' }}>{ex.org}</p>
                      <p className="text-xs font-medium" style={{ color: 'var(--primary)' }}>{ex.role}</p>
                    </div>
                    <span className="text-xs shrink-0" style={{ color: 'var(--body-color)' }}>{ex.period}</span>
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--body-color)' }}>{ex.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Achievements */}
          <section className="mb-7">
            <h3 className="font-display font-bold text-base mb-3 pb-2" style={{ color: 'var(--dark)', borderBottom: '1px solid var(--border)' }}>
              🏆 Prestasi
            </h3>
            <div className="space-y-2">
              {achievements.map(a => (
                <div key={a.id} className="flex items-start gap-2">
                  <span className="shrink-0">{a.medal}</span>
                  <div className="flex-1 flex flex-col sm:flex-row sm:justify-between sm:items-start gap-0.5">
                    <p className="text-xs font-medium" style={{ color: 'var(--dark)' }}>{a.title}</p>
                    <span className="text-xs shrink-0" style={{ color: 'var(--body-color)' }}>{a.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Skills */}
          <section className="mb-7">
            <h3 className="font-display font-bold text-base mb-3 pb-2" style={{ color: 'var(--dark)', borderBottom: '1px solid var(--border)' }}>
              💻 Keterampilan
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {skills.map(s => (
                <div key={s.id} className="flex items-center gap-2">
                  <span className="shrink-0">{s.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between text-xs mb-0.5">
                      <span className="truncate" style={{ color: 'var(--dark)' }}>{s.title}</span>
                      <span className="shrink-0 ml-1" style={{ color: 'var(--body-color)' }}>{s.levelLabel}</span>
                    </div>
                    <div className="h-1 rounded-full" style={{ background: 'var(--border)' }}>
                      <div className="h-full rounded-full" style={{ width: `${s.level}%`, background: 'var(--primary)' }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Languages */}
          <section>
            <h3 className="font-display font-bold text-base mb-3 pb-2" style={{ color: 'var(--dark)', borderBottom: '1px solid var(--border)' }}>
              🌐 Bahasa
            </h3>
            <div className="flex flex-wrap gap-2">
              {profile.languages.map(lang => (
                <span key={lang.name} className="text-xs px-3 py-1.5 rounded-lg font-medium"
                  style={{ background: 'var(--primary-light)', color: 'var(--primary)' }}>
                  {lang.flag} {lang.name} — {lang.level}
                </span>
              ))}
            </div>
          </section>
        </div>
      </div>
    </PageWrapper>
  )
}