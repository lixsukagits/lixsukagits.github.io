import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import PageWrapper from '../components/ui/page_wrapper'

const USES = [
  {
    category: 'Perangkat', emoji: '💻', color: '#3758F9',
    items: [
      { name: 'Laptop',           desc: 'Perangkat utama untuk coding, belajar, dan kompetisi',              icon: '🖥️' },
      { name: 'Headphones',       desc: 'Teman setia saat ngoding marathon atau belajar Mandarin',           icon: '🎧' },
      { name: 'Smartphone',       desc: 'Foto, komunikasi, dan akses materi belajar mobile',                 icon: '📱' },
    ],
  },
  {
    category: 'Development', emoji: '⚙️', color: '#7c3aed',
    items: [
      { name: 'VS Code',          desc: 'Editor utama. Extension: Prettier, ESLint, Tailwind IntelliSense', icon: '📝' },
      { name: 'React + Vite',     desc: 'Stack pilihan untuk web development. Fast HMR, DX luar biasa',     icon: '⚛️' },
      { name: 'Tailwind CSS v4',  desc: 'Utility-first CSS yang bikin styling cepat dan konsisten',          icon: '🎨' },
      { name: 'Git + GitHub',     desc: 'Version control dan hosting semua proyek',                          icon: '🐙' },
      { name: 'Framer Motion',    desc: 'Library animasi React favorit — bikin website terasa hidup',        icon: '✨' },
    ],
  },
  {
    category: 'Produktivitas', emoji: '📋', color: '#10b981',
    items: [
      { name: 'Notion',           desc: 'Catatan pelajaran, jadwal, dan tracking progress HSK',              icon: '📓' },
      { name: 'Google Calendar',  desc: 'Jadwal harian dan reminder deadline kompetisi',                     icon: '📅' },
      { name: 'Figma',            desc: 'Desain mockup sebelum mulai coding — helps a lot!',                 icon: '🖼️' },
      { name: 'Canva',            desc: 'Poster, presentasi, dan materi visual lainnya',                     icon: '🎭' },
    ],
  },
  {
    category: 'Belajar Mandarin', emoji: '🇨🇳', color: '#dc2626',
    items: [
      { name: 'HSK Online',       desc: 'Platform latihan soal HSK resmi. Wajib tiap hari minimal 15 menit', icon: '📚' },
      { name: 'Pleco',            desc: 'Kamus Mandarin terbaik — ada flashcard dan tone practice',           icon: '🔤' },
      { name: 'Drama China',      desc: 'Nonton dengan subtitle dual bahasa untuk exposure alami',            icon: '📺' },
      { name: 'Buku Karakter',    desc: 'Nulis karakter tangan — cara paling efektif menghafalkan karakter', icon: '✍️' },
    ],
  },
  {
    category: 'Coding & Kompetisi', emoji: '🏆', color: '#d97706',
    items: [
      { name: 'CodeForces',       desc: 'Platform latihan algoritma dan competitive programming utama',      icon: '💪' },
      { name: 'LeetCode',         desc: 'Latihan data structures & algorithms',                              icon: '🧩' },
      { name: 'C++ / Python',     desc: 'C++ untuk speed di kompetisi, Python untuk scripting',              icon: '🐍' },
    ],
  },
  {
    category: 'Browser & Extension', emoji: '🌐', color: '#0891b2',
    items: [
      { name: 'Google Chrome',    desc: 'Browser utama — DevTools paling lengkap untuk web dev',            icon: '🔵' },
      { name: 'uBlock Origin',    desc: 'Ad blocker wajib, browsing jadi jauh lebih bersih',                icon: '🛡️' },
      { name: 'Wappalyzer',       desc: 'Cek tech stack website lain — belajar dari yang sudah ada',        icon: '🔍' },
    ],
  },
]

export default function UsesPage() {
  return (
    <PageWrapper>
      <Helmet>
        <title>Uses — Felix Raymond</title>
        <meta name="description" content="Perangkat, software, dan tools yang Felix Raymond pakai sehari-hari." />
        <meta property="og:url" content="https://lixsukagits.github.io/uses" />
      </Helmet>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 md:px-10 py-20">

        <div className="text-center mb-12">
          <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--primary)', marginBottom: '0.5rem' }}>
            Setup & Tools
          </p>
          <h1 className="font-display text-3xl md:text-4xl font-bold" style={{ color: 'var(--dark)' }}>Uses</h1>
          <p className="mt-3 text-sm max-w-md mx-auto" style={{ color: 'var(--body-color)' }}>
            Perangkat, software, dan tools yang saya pakai sehari-hari untuk coding, belajar Mandarin, dan produktivitas.
          </p>
        </div>

        <div className="space-y-10">
          {USES.map((section, si) => (
            <motion.div key={section.category}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: si * 0.08 }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg"
                  style={{ background: `${section.color}15`, border: `1px solid ${section.color}25` }}>
                  {section.emoji}
                </div>
                <h2 className="font-display font-bold text-lg" style={{ color: 'var(--dark)' }}>{section.category}</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {section.items.map((item, ii) => (
                  <motion.div key={item.name}
                    initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: si * 0.04 + ii * 0.06, type: 'spring', stiffness: 260, damping: 22 }}
                    whileHover={{ x: 4 }} className="card p-4 flex items-start gap-3">
                    <span className="text-xl shrink-0 mt-0.5">{item.icon}</span>
                    <div>
                      <p className="font-semibold text-sm" style={{ color: 'var(--dark)' }}>{item.name}</p>
                      <p className="text-xs mt-0.5 leading-relaxed" style={{ color: 'var(--body-color)' }}>{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="mt-12 card p-5 text-center"
          style={{ background: 'linear-gradient(135deg, var(--primary-light), var(--card-bg))' }}>
          <p className="text-sm" style={{ color: 'var(--body-color)' }}>
            Terinspirasi dari{' '}
            <a href="https://uses.tech" target="_blank" rel="noopener noreferrer"
              className="link-underline font-semibold" style={{ color: 'var(--primary)' }}>uses.tech</a>
            {' '}— komunitas developer yang berbagi setup mereka.
          </p>
        </motion.div>
      </div>
    </PageWrapper>
  )
}