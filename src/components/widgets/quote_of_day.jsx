import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * quote_of_day.jsx
 * Quote berganti tiap hari — dipilih berdasarkan nomor hari dalam tahun
 * sehingga semua user di hari yang sama melihat quote yang sama.
 * Fallback ke zenquotes.io kalau fetch berhasil.
 * Taruh di: src/components/widgets/quote_of_day.jsx
 */

// 20 quotes pilihan — bisa diganti Felix saat cleaning data
const LOCAL_QUOTES = [
  {
    text: "The best way to predict the future is to create it.",
    author: "Peter Drucker",
    tag: "💡 Motivasi",
  },
  {
    text: "Code is like humor. When you have to explain it, it's bad.",
    author: "Cory House",
    tag: "💻 Programming",
  },
  {
    text: "学而不思则罔，思而不学则殆。",
    author: "Konfusius",
    tag: "📖 Mandarin",
    translation: "Belajar tanpa berpikir adalah sia-sia; berpikir tanpa belajar adalah berbahaya.",
  },
  {
    text: "First, solve the problem. Then, write the code.",
    author: "John Johnson",
    tag: "💻 Programming",
  },
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
    tag: "🔥 Inspirasi",
  },
  {
    text: "不积跬步，无以至千里。",
    author: "Xunzi",
    tag: "📖 Mandarin",
    translation: "Tanpa langkah-langkah kecil, kamu tidak bisa menempuh seribu mil.",
  },
  {
    text: "Programs must be written for people to read, and only incidentally for machines to execute.",
    author: "Harold Abelson",
    tag: "💻 Programming",
  },
  {
    text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill",
    tag: "💪 Ketangguhan",
  },
  {
    text: "知之为知之，不知为不知，是知也。",
    author: "Konfusius",
    tag: "📖 Mandarin",
    translation: "Mengetahui apa yang kamu tahu dan mengakui apa yang tidak kamu tahu — itulah pengetahuan.",
  },
  {
    text: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    author: "Martin Fowler",
    tag: "💻 Programming",
  },
  {
    text: "It always seems impossible until it's done.",
    author: "Nelson Mandela",
    tag: "🔥 Inspirasi",
  },
  {
    text: "吃得苦中苦，方为人上人。",
    author: "Peribahasa China",
    tag: "📖 Mandarin",
    translation: "Mereka yang mau menderita akan mencapai puncak.",
  },
  {
    text: "Simplicity is the soul of efficiency.",
    author: "Austin Freeman",
    tag: "💡 Desain",
  },
  {
    text: "The secret of getting ahead is getting started.",
    author: "Mark Twain",
    tag: "🚀 Action",
  },
  {
    text: "路漫漫其修远兮，吾将上下而求索。",
    author: "Qu Yuan",
    tag: "📖 Mandarin",
    translation: "Jalan masih panjang dan jauh, tapi aku akan terus mencari.",
  },
  {
    text: "Talk is cheap. Show me the code.",
    author: "Linus Torvalds",
    tag: "💻 Programming",
  },
  {
    text: "Strive not to be a success, but rather to be of value.",
    author: "Albert Einstein",
    tag: "💡 Motivasi",
  },
  {
    text: "千里之行，始于足下。",
    author: "Laozi",
    tag: "📖 Mandarin",
    translation: "Perjalanan seribu mil dimulai dari satu langkah.",
  },
  {
    text: "The computer was born to solve problems that did not exist before.",
    author: "Bill Gates",
    tag: "💻 Tech",
  },
  {
    text: "Believe you can and you're halfway there.",
    author: "Theodore Roosevelt",
    tag: "🔥 Inspirasi",
  },
]

function getDayIndex() {
  const now   = new Date()
  const start = new Date(now.getFullYear(), 0, 0)
  const diff  = now - start
  const day   = Math.floor(diff / (1000 * 60 * 60 * 24))
  return day % LOCAL_QUOTES.length
}

export default function QuoteOfDay() {
  const [quote, setQuote]     = useState(null)
  const [loading, setLoading] = useState(true)
  const [showTrans, setShowTrans] = useState(false)

  useEffect(() => {
    // Coba fetch dari zenquotes.io via proxy (CORS-safe)
    const localQuote = LOCAL_QUOTES[getDayIndex()]

    fetch('https://zenquotes.io/api/today')
      .then(r => r.json())
      .then(data => {
        if (data?.[0]?.q) {
          setQuote({
            text: data[0].q,
            author: data[0].a,
            tag: '🌐 Today',
          })
        } else {
          setQuote(localQuote)
        }
      })
      .catch(() => setQuote(localQuote))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="card p-5">
        <div className="skeleton h-3 w-16 rounded mb-3" />
        <div className="skeleton h-4 w-full rounded mb-2" />
        <div className="skeleton h-4 w-3/4 rounded mb-2" />
        <div className="skeleton h-3 w-24 rounded" />
      </div>
    )
  }

  if (!quote) return null

  const isMandarin = quote.tag?.includes('Mandarin')

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="card p-5 relative overflow-hidden"
    >
      {/* Decorative quote mark */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: -8, left: 8,
        fontSize: '5rem', lineHeight: 1, opacity: 0.04,
        fontFamily: 'Georgia, serif', color: 'var(--primary)',
        userSelect: 'none', pointerEvents: 'none',
      }}>
        "
      </div>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
        <span style={{ fontSize: '1rem' }}>💬</span>
        <p style={{ fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase',
          letterSpacing: '0.12em', color: 'var(--primary)' }}>
          Quote Hari Ini
        </p>
        <span style={{ marginLeft: 'auto', fontSize: '0.62rem', color: 'var(--body-color)',
          background: 'var(--bg)', border: '1px solid var(--border)',
          borderRadius: 999, padding: '0.15rem 0.5rem' }}>
          {quote.tag}
        </span>
      </div>

      {/* Quote text */}
      <AnimatePresence mode="wait">
        <motion.blockquote
          key={quote.text}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          style={{
            borderLeft: '3px solid var(--primary)',
            paddingLeft: '0.875rem',
            marginBottom: '0.75rem',
          }}
        >
          <p style={{
            fontSize: isMandarin ? '1.05rem' : '0.875rem',
            fontStyle: isMandarin ? 'normal' : 'italic',
            color: 'var(--dark)',
            lineHeight: 1.65,
            fontFamily: isMandarin ? "'Noto Sans SC', sans-serif" : 'inherit',
            fontWeight: isMandarin ? 600 : 400,
          }}>
            "{quote.text}"
          </p>

          {/* Terjemahan Mandarin — toggle */}
          {isMandarin && quote.translation && (
            <div style={{ marginTop: '0.5rem' }}>
              <button
                onClick={() => setShowTrans(v => !v)}
                style={{ fontSize: '0.65rem', color: 'var(--primary)', background: 'none',
                  border: 'none', cursor: 'pointer', padding: 0, fontWeight: 600 }}>
                {showTrans ? '▲ Sembunyikan' : '▼ Lihat terjemahan'}
              </button>
              <AnimatePresence>
                {showTrans && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    style={{ fontSize: '0.75rem', color: 'var(--body-color)',
                      fontStyle: 'italic', marginTop: '0.35rem', lineHeight: 1.6 }}>
                    {quote.translation}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          )}
        </motion.blockquote>
      </AnimatePresence>

      {/* Author */}
      <p style={{ fontSize: '0.72rem', color: 'var(--body-color)', fontWeight: 600 }}>
        — {quote.author}
      </p>
    </motion.div>
  )
}