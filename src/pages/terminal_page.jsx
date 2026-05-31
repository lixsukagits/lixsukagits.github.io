import { useState, useRef, useEffect, useCallback } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { Terminal, X, Minus, Square } from 'lucide-react'
import PageWrapper from '../components/ui/page_wrapper'
import { profile } from '../data/profile'

/**
 * terminal_page.jsx
 * Halaman /terminal — CLI interaktif bergaya terminal.
 * Ketik "help" untuk lihat semua command.
 * Taruh di: src/pages/terminal_page.jsx
 */

// ─── COMMAND DEFINITIONS ──────────────────────────────────────────
const COMMANDS = {
  help: {
    desc: 'Tampilkan semua command',
    fn: () => [
      { type: 'header', text: '📋 Available Commands:' },
      { type: 'table', rows: [
        ['whoami',       'Info singkat tentang Felix'],
        ['about',        'Cerita lengkap Felix'],
        ['skills',       'Daftar skill teknis'],
        ['achievements', 'Prestasi & medali'],
        ['contact',      'Info kontak'],
        ['quote',        'Quote motivasi acak'],
        ['hsk',          'Random kata Mandarin HSK'],
        ['age',          'Umur Felix sekarang (akurat!)'],
        ['mandarin',     'Felix & perjalanan Mandarin'],
        ['china',        'Kenapa Felix mau ke China'],
        ['clear',        'Bersihkan terminal'],
        ['help',         'Tampilkan menu ini'],
        ['exit',         'Keluar dari terminal'],
      ]},
    ],
  },

  whoami: {
    desc: 'Info singkat Felix',
    fn: () => [
      { type: 'ascii', text: `
  ███████╗███████╗██╗     ██╗██╗  ██╗
  ██╔════╝██╔════╝██║     ██║╚██╗██╔╝
  █████╗  █████╗  ██║     ██║ ╚███╔╝
  ██╔══╝  ██╔══╝  ██║     ██║ ██╔██╗
  ██║     ███████╗███████╗██║██╔╝ ██╗
  ╚═╝     ╚══════╝╚══════╝╚═╝╚═╝  ╚═╝` },
      { type: 'keyval', rows: [
        ['Name',       'Felix Raymond Tan'],
        ['Age',        '16 tahun (27 Jun 2009)'],
        ['Location',   'Medan, Indonesia 📍'],
        ['School',     'SMK Telkom 2 Medan'],
        ['Status',     '🟢 Open to collaborate'],
        ['Languages',  'ID · EN · 中文 (HSK 3) · Hokkien'],
        ['Passion',    'IT · Web Dev · Olimpiade · Badminton 🏸'],
        ['Goal',       'Beasiswa S1 IT ke China 🇨🇳'],
      ]},
    ],
  },

  about: {
    desc: 'Cerita Felix',
    fn: () => [
      { type: 'header', text: '📖 About Felix Raymond' },
      { type: 'para', text: 'Siswa IT dari Medan yang suka ngoding, main badminton, dan belajar Mandarin. Peraih 5 medali emas olimpiade informatika tingkat nasional.' },
      { type: 'para', text: 'Saat ini sedang mempersiapkan diri untuk beasiswa CSC (China Scholarship Council) — belajar Mandarin dari nol sampai HSK 3 dalam waktu kurang dari 1 tahun.' },
      { type: 'para', text: 'Prinsip hidup: 学无止境 — Belajar tidak ada batasnya.' },
    ],
  },

  skills: {
    desc: 'Skill teknis Felix',
    fn: () => [
      { type: 'header', text: '💻 Technical Skills' },
      { type: 'skillbar', skills: [
        { name: 'React / JavaScript', level: 85 },
        { name: 'Tailwind CSS',       level: 90 },
        { name: 'Python',             level: 75 },
        { name: 'C++',               level: 80 },
        { name: 'Git / GitHub',       level: 85 },
        { name: 'UI/UX Design',       level: 70 },
        { name: 'Mandarin (HSK 3)',   level: 60 },
      ]},
    ],
  },

  achievements: {
    desc: 'Prestasi Felix',
    fn: () => [
      { type: 'header', text: '🏆 Achievements' },
      { type: 'list', items: [
        '🥇 Medali Emas — Olimpiade Informatika Nasional (2024)',
        '🥇 Medali Emas — Olimpiade Informatika Nasional (2023)',
        '🥇 Medali Emas — LKS Informatika Provinsi (2024)',
        '🥇 Medali Emas — Kompetisi IT Tingkat Kota (2023)',
        '🥇 Medali Emas — Olimpiade Sains Komputer (2022)',
        '🏅 Ranking 1 — SMK Telkom 2 Medan (2025)',
        '📜 8+ Sertifikat pelatihan IT profesional',
      ]},
    ],
  },

  contact: {
    desc: 'Kontak Felix',
    fn: () => [
      { type: 'header', text: '📬 Contact Information' },
      { type: 'keyval', rows: [
        ['WhatsApp',  '+62 812-6272-9243'],
        ['Email',     profile.email || 'lixforschl@gmail.com'],
        ['GitHub',    'github.com/lixsukagits'],
        ['Instagram', '@lixforschl'],
        ['Portfolio', 'lixsukagits.github.io'],
      ]},
      { type: 'para', text: '💡 Tip: ketik "wa" untuk buka WhatsApp langsung.' },
    ],
  },

  wa: {
    desc: 'Buka WhatsApp',
    fn: () => {
      setTimeout(() => window.open('https://wa.me/6281262729243', '_blank'), 500)
      return [{ type: 'para', text: '📱 Membuka WhatsApp...' }]
    },
  },

  quote: {
    desc: 'Quote motivasi acak',
    fn: () => {
      const quotes = [
        { text: '学无止境', author: 'Peribahasa China', trans: 'Belajar tidak ada batasnya.' },
        { text: 'First, solve the problem. Then, write the code.', author: 'John Johnson', trans: null },
        { text: '千里之行，始于足下', author: 'Laozi', trans: 'Perjalanan seribu mil dimulai dari satu langkah.' },
        { text: 'The best way to predict the future is to create it.', author: 'Peter Drucker', trans: null },
        { text: '不积跬步，无以至千里', author: 'Xunzi', trans: 'Tanpa langkah kecil, tidak bisa tempuh jarak jauh.' },
        { text: 'Talk is cheap. Show me the code.', author: 'Linus Torvalds', trans: null },
      ]
      const q = quotes[Math.floor(Math.random() * quotes.length)]
      return [
        { type: 'quote', text: q.text, author: q.author, translation: q.trans },
      ]
    },
  },

  hsk: {
    desc: 'Kata Mandarin HSK acak',
    fn: () => {
      const words = [
        { hanzi: '学习', pinyin: 'xuéxí',   id: 'belajar',         en: 'to study' },
        { hanzi: '朋友', pinyin: 'péngyou',  id: 'teman',           en: 'friend' },
        { hanzi: '工作', pinyin: 'gōngzuò',  id: 'bekerja/pekerjaan', en: 'work' },
        { hanzi: '电脑', pinyin: 'diànnǎo',  id: 'komputer',        en: 'computer' },
        { hanzi: '大学', pinyin: 'dàxué',    id: 'universitas',     en: 'university' },
        { hanzi: '努力', pinyin: 'nǔlì',     id: 'bekerja keras',   en: 'to work hard' },
        { hanzi: '梦想', pinyin: 'mèngxiǎng', id: 'impian',         en: 'dream' },
        { hanzi: '成功', pinyin: 'chénggōng', id: 'sukses',         en: 'success' },
        { hanzi: '未来', pinyin: 'wèilái',   id: 'masa depan',      en: 'future' },
        { hanzi: '进步', pinyin: 'jìnbù',    id: 'kemajuan',        en: 'progress' },
      ]
      const w = words[Math.floor(Math.random() * words.length)]
      return [
        { type: 'header', text: '🇨🇳 HSK Word of the Moment' },
        { type: 'hskword', word: w },
      ]
    },
  },

  age: {
    desc: 'Umur Felix sekarang',
    fn: () => {
      const now   = new Date()
      const birth = new Date(2009, 5, 27)
      let age = now.getFullYear() - 2009
      if (now < new Date(now.getFullYear(), 5, 27)) age--
      const nextBday = new Date(now.getFullYear() + (now > new Date(now.getFullYear(), 5, 27) ? 1 : 0), 5, 27)
      const days = Math.ceil((nextBday - now) / (1000 * 60 * 60 * 24))
      const isBday = now.getMonth() === 5 && now.getDate() === 27
      return [
        { type: 'para', text: isBday ? `🎂 SELAMAT ULANG TAHUN FELIX! Hari ini Felix genap ${age} tahun! 🎉` : `Felix Raymond berumur ${age} tahun.` },
        { type: 'para', text: isBday ? 'Semoga mimpinya ke China terwujud!' : `Ulang tahun berikutnya (27 Jun): ${days} hari lagi 🎂` },
      ]
    },
  },

  mandarin: {
    desc: 'Perjalanan Mandarin Felix',
    fn: () => [
      { type: 'header', text: '🇨🇳 Felix & Bahasa Mandarin' },
      { type: 'keyval', rows: [
        ['Level sekarang', 'HSK 3 (600+ karakter)'],
        ['Target',         'HSK 4 sebelum daftar beasiswa'],
        ['Belajar sejak',  '2024'],
        ['Metode',         'HSK Online + drama China + nulis tangan'],
        ['Latar belakang', 'Keturunan Tionghoa-Hokkien'],
        ['Motivasi',       'Beasiswa CSC + identitas budaya'],
      ]},
    ],
  },

  china: {
    desc: 'Kenapa Felix mau ke China',
    fn: () => [
      { type: 'header', text: '🎓 Kenapa China?' },
      { type: 'list', items: [
        '🏭 Pusat teknologi dunia — Alibaba, Huawei, DJI, ByteDance',
        '🏛️ Beasiswa CSC — kuliah + asrama + uang saku, gratis',
        '🧬 Koneksi budaya — keturunan Tionghoa-Hokkien',
        '🌐 Network global — belajar di lingkungan internasional',
        '💡 Ekosistem inovasi yang berkembang sangat pesat',
      ]},
    ],
  },

  clear: {
    desc: 'Bersihkan terminal',
    fn: () => 'CLEAR',
  },

  exit: {
    desc: 'Keluar dari terminal',
    fn: () => 'EXIT',
  },
}

// ─── TERMINAL RENDERER ────────────────────────────────────────────
function RenderOutput({ blocks }) {
  if (!blocks) return null
  return (
    <div className="space-y-1">
      {blocks.map((block, i) => {
        if (block.type === 'header') return (
          <p key={i} style={{ color: 'var(--primary)', fontWeight: 700, marginTop: '0.5rem' }}>{block.text}</p>
        )
        if (block.type === 'para') return (
          <p key={i} style={{ color: '#a3e635', opacity: 0.9 }}>{block.text}</p>
        )
        if (block.type === 'list') return (
          <ul key={i} style={{ paddingLeft: '1rem' }}>
            {block.items.map((item, j) => (
              <li key={j} style={{ color: '#e2e8f0', marginBottom: '0.2rem' }}>{item}</li>
            ))}
          </ul>
        )
        if (block.type === 'table') return (
          <div key={i} style={{ marginTop: '0.25rem' }}>
            {block.rows.map(([cmd, desc], j) => (
              <div key={j} style={{ display: 'flex', gap: '1rem' }}>
                <span style={{ color: '#60a5fa', minWidth: 110, fontWeight: 600 }}>{cmd}</span>
                <span style={{ color: '#94a3b8' }}>{desc}</span>
              </div>
            ))}
          </div>
        )
        if (block.type === 'keyval') return (
          <div key={i} style={{ marginTop: '0.25rem' }}>
            {block.rows.map(([key, val], j) => (
              <div key={j} style={{ display: 'flex', gap: '1rem' }}>
                <span style={{ color: '#f59e0b', minWidth: 130, fontWeight: 600 }}>{key}</span>
                <span style={{ color: '#e2e8f0' }}>{val}</span>
              </div>
            ))}
          </div>
        )
        if (block.type === 'skillbar') return (
          <div key={i} style={{ marginTop: '0.5rem', space: '0.5rem' }}>
            {block.skills.map(({ name, level }, j) => (
              <div key={j} style={{ marginBottom: '0.4rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.15rem' }}>
                  <span style={{ color: '#e2e8f0', fontSize: '0.8rem' }}>{name}</span>
                  <span style={{ color: '#60a5fa', fontSize: '0.8rem' }}>{level}%</span>
                </div>
                <div style={{ height: 4, background: 'rgba(255,255,255,0.1)', borderRadius: 4, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${level}%`, background: 'linear-gradient(90deg, #3758F9, #7c3aed)', borderRadius: 4 }} />
                </div>
              </div>
            ))}
          </div>
        )
        if (block.type === 'quote') return (
          <div key={i} style={{ borderLeft: '3px solid var(--primary)', paddingLeft: '0.75rem', marginTop: '0.5rem' }}>
            <p style={{ color: '#f1f5f9', fontStyle: 'italic', fontSize: '1rem', marginBottom: '0.25rem' }}>"{block.text}"</p>
            {block.translation && <p style={{ color: '#94a3b8', fontSize: '0.8rem' }}>{block.translation}</p>}
            <p style={{ color: '#60a5fa', fontSize: '0.8rem', marginTop: '0.25rem' }}>— {block.author}</p>
          </div>
        )
        if (block.type === 'hskword') {
          const w = block.word
          return (
            <div key={i} style={{ marginTop: '0.5rem', padding: '0.75rem', borderRadius: '0.5rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <p style={{ fontSize: '2.5rem', fontFamily: "'Noto Sans SC', sans-serif", color: '#f59e0b', lineHeight: 1, marginBottom: '0.25rem' }}>{w.hanzi}</p>
              <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{w.pinyin}</p>
              <p style={{ color: '#a3e635', fontSize: '0.85rem' }}>🇮🇩 {w.id}</p>
              <p style={{ color: '#60a5fa', fontSize: '0.85rem' }}>🇬🇧 {w.en}</p>
            </div>
          )
        }
        if (block.type === 'ascii') return (
          <pre key={i} style={{ color: '#3758F9', fontSize: '0.55rem', lineHeight: 1.2, overflow: 'hidden' }}>{block.text}</pre>
        )
        return null
      })}
    </div>
  )
}

// ─── TERMINAL PAGE ────────────────────────────────────────────────
export default function TerminalPage() {
  const [history, setHistory] = useState([
    { type: 'system', text: 'Felix Raymond Portfolio Terminal v1.0' },
    { type: 'system', text: 'Ketik "help" untuk melihat semua command tersedia.' },
    { type: 'system', text: '──────────────────────────────────────' },
  ])
  const [input, setInput]         = useState('')
  const [cmdHistory, setCmdHistory] = useState([])
  const [historyIdx, setHistoryIdx] = useState(-1)
  const inputRef   = useRef(null)
  const bottomRef  = useRef(null)

  // Auto scroll ke bawah
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [history])

  // Focus input saat klik terminal
  const focusInput = () => inputRef.current?.focus()

  const runCommand = useCallback((raw) => {
    const cmd = raw.trim().toLowerCase()
    if (!cmd) return

    // Tambah ke command history
    setCmdHistory(prev => [cmd, ...prev].slice(0, 50))
    setHistoryIdx(-1)

    // Tambah baris input ke history tampilan
    setHistory(prev => [...prev, { type: 'input', text: cmd }])

    if (cmd === 'clear') {
      setHistory([{ type: 'system', text: 'Terminal cleared. Ketik "help" untuk mulai.' }])
      return
    }

    if (cmd === 'exit') {
      setHistory(prev => [...prev, { type: 'output', blocks: [{ type: 'para', text: '👋 Sampai jumpa! Kembali ke portfolio...' }] }])
      setTimeout(() => window.history.back(), 1500)
      return
    }

    const command = COMMANDS[cmd]
    if (!command) {
      setHistory(prev => [...prev, {
        type: 'error',
        text: `Command "${cmd}" tidak dikenal. Ketik "help" untuk daftar command.`
      }])
      return
    }

    const result = command.fn()
    if (result === 'CLEAR') {
      setHistory([{ type: 'system', text: 'Terminal cleared.' }])
      return
    }
    if (result === 'EXIT') {
      setHistory(prev => [...prev, { type: 'output', blocks: [{ type: 'para', text: '👋 Kembali ke portfolio...' }] }])
      setTimeout(() => window.history.back(), 1500)
      return
    }

    setHistory(prev => [...prev, { type: 'output', blocks: result }])
  }, [])

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      runCommand(input)
      setInput('')
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      const idx = Math.min(historyIdx + 1, cmdHistory.length - 1)
      setHistoryIdx(idx)
      setInput(cmdHistory[idx] || '')
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      const idx = Math.max(historyIdx - 1, -1)
      setHistoryIdx(idx)
      setInput(idx === -1 ? '' : cmdHistory[idx] || '')
    } else if (e.key === 'Tab') {
      e.preventDefault()
      // Autocomplete
      const matches = Object.keys(COMMANDS).filter(c => c.startsWith(input))
      if (matches.length === 1) setInput(matches[0])
    }
  }

  return (
    <PageWrapper>
      <Helmet>
        <title>Terminal — Felix Raymond</title>
        <meta name="description" content="Terminal interaktif portfolio Felix Raymond. Ketik 'help' untuk mulai." />
        <meta property="og:url" content="https://lixsukagits.github.io/terminal" />
      </Helmet>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 md:px-10 py-20">
        {/* Header */}
        <div className="text-center mb-8">
          <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.2em',
            textTransform: 'uppercase', color: 'var(--primary)', marginBottom: '0.5rem' }}>
            Interactive CLI
          </p>
          <h1 className="font-display text-3xl font-bold flex items-center justify-center gap-3"
            style={{ color: 'var(--dark)' }}>
            <Terminal size={28} style={{ color: 'var(--primary)' }} />
            Terminal
          </h1>
          <p className="mt-2 text-sm" style={{ color: 'var(--body-color)' }}>
            Jelajahi portfolio Felix via command line. Ketik <code style={{ color: 'var(--primary)', background: 'var(--primary-light)', padding: '0.1rem 0.4rem', borderRadius: 4 }}>help</code> untuk mulai.
          </p>
        </div>

        {/* Terminal window */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 22 }}
          style={{ borderRadius: '0.875rem', overflow: 'hidden',
            boxShadow: '0 24px 64px rgba(0,0,0,0.25)', border: '1px solid rgba(255,255,255,0.08)' }}>

          {/* Title bar */}
          <div style={{ background: '#1e1e2e', padding: '0.6rem 1rem',
            display: 'flex', alignItems: 'center', gap: '0.5rem',
            borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ display: 'flex', gap: 6 }}>
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f57', cursor: 'pointer' }} />
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#febc2e' }} />
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#28c840' }} />
            </div>
            <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem',
              fontFamily: 'monospace', margin: '0 auto' }}>
              felix@portfolio ~ terminal
            </span>
          </div>

          {/* Terminal body */}
          <div
            onClick={focusInput}
            style={{
              background: '#0d1117', padding: '1rem',
              minHeight: 400, maxHeight: '60vh', overflowY: 'auto',
              fontFamily: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace",
              fontSize: '0.82rem', lineHeight: 1.6, cursor: 'text',
            }}
          >
            {history.map((entry, i) => (
              <div key={i} style={{ marginBottom: '0.25rem' }}>
                {entry.type === 'system' && (
                  <p style={{ color: '#64748b' }}>{entry.text}</p>
                )}
                {entry.type === 'input' && (
                  <div style={{ display: 'flex', gap: '0.5rem', color: '#a3e635' }}>
                    <span style={{ color: '#f59e0b', fontWeight: 700 }}>felix@portfolio</span>
                    <span style={{ color: '#60a5fa' }}>~</span>
                    <span style={{ color: '#e2e8f0' }}>$</span>
                    <span>{entry.text}</span>
                  </div>
                )}
                {entry.type === 'output' && (
                  <div style={{ paddingLeft: '0.5rem', marginBottom: '0.5rem' }}>
                    <RenderOutput blocks={entry.blocks} />
                  </div>
                )}
                {entry.type === 'error' && (
                  <p style={{ color: '#f87171', paddingLeft: '0.5rem' }}>
                    ✗ {entry.text}
                  </p>
                )}
              </div>
            ))}

            {/* Current input line */}
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginTop: '0.25rem' }}>
              <span style={{ color: '#f59e0b', fontWeight: 700 }}>felix@portfolio</span>
              <span style={{ color: '#60a5fa' }}>~</span>
              <span style={{ color: '#e2e8f0' }}>$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                autoFocus
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
                style={{
                  background: 'transparent', border: 'none', outline: 'none',
                  color: '#e2e8f0', fontFamily: 'inherit', fontSize: 'inherit',
                  flex: 1, caretColor: '#a3e635',
                }}
                placeholder="type a command..."
              />
              {/* Blinking cursor */}
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                style={{ color: '#a3e635', fontWeight: 700 }}>▋</motion.span>
            </div>

            <div ref={bottomRef} />
          </div>

          {/* Footer hint */}
          <div style={{ background: '#1e1e2e', padding: '0.4rem 1rem',
            borderTop: '1px solid rgba(255,255,255,0.05)',
            display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {['Tab: autocomplete', '↑↓: history', 'Enter: run'].map(hint => (
              <span key={hint} style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.65rem' }}>{hint}</span>
            ))}
          </div>
        </motion.div>

        {/* Quick command chips */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: '1rem', justifyContent: 'center' }}>
          {['help','whoami','skills','achievements','quote','hsk'].map(cmd => (
            <motion.button key={cmd} onClick={() => { runCommand(cmd); focusInput() }}
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              style={{ padding: '0.3rem 0.75rem', borderRadius: 999, fontSize: '0.72rem',
                fontFamily: 'monospace', fontWeight: 600,
                background: 'var(--card-bg)', border: '1px solid var(--border)',
                color: 'var(--primary)', cursor: 'pointer' }}>
              {cmd}
            </motion.button>
          ))}
        </div>
      </div>
    </PageWrapper>
  )
}