import { useState } from 'react'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { BookOpen, Star } from 'lucide-react'
import PageWrapper from '../components/ui/page_wrapper'

/**
 * bookshelf_page.jsx
 * Halaman "Bookshelf" — buku & bacaan yang sudah/sedang dibaca Felix.
 * Taruh di: src/pages/bookshelf_page.jsx
 */

const STATUS_COLORS = {
  'Sedang Dibaca': '#3758F9',
  'Sudah Baca': '#10b981',
  'Ingin Baca': '#f59e0b',
}

const BOOKS = [
  {
    id: 1,
    title: 'Clean Code',
    author: 'Robert C. Martin',
    category: 'Programming',
    status: 'Sudah Baca',
    rating: 5,
    emoji: '🧹',
    review: 'Wajib baca untuk semua programmer. Mengubah cara saya nulis kode — dari yang "jalan" menjadi yang "bersih dan maintainable".',
    year: 2024,
  },
  {
    id: 2,
    title: 'Materi HSK 3 — 汉语水平考试',
    author: 'Hanban',
    category: 'Mandarin',
    status: 'Sedang Dibaca',
    rating: 4,
    emoji: '🇨🇳',
    review: 'Buku resmi persiapan HSK 3. Dense tapi sangat komprehensif. Dikombinasikan dengan latihan soal online.',
    year: 2026,
  },
  {
    id: 3,
    title: 'Atomic Habits',
    author: 'James Clear',
    category: 'Self-Development',
    status: 'Sudah Baca',
    rating: 5,
    emoji: '⚛️',
    review: 'Mengubah perspektif saya tentang kebiasaan. Bukan tentang goal, tapi tentang sistem. Sangat relevan untuk persiapan beasiswa.',
    year: 2025,
  },
  {
    id: 4,
    title: 'Introduction to Algorithms (CLRS)',
    author: 'Cormen, Leiserson, Rivest, Stein',
    category: 'Computer Science',
    status: 'Sedang Dibaca',
    rating: 4,
    emoji: '📊',
    review: 'Buku algoritma paling komprehensif. Berat tapi sangat worth it untuk persiapan olimpiade dan pemahaman CS yang dalam.',
    year: 2025,
  },
  {
    id: 5,
    title: 'You Don\'t Know JS',
    author: 'Kyle Simpson',
    category: 'Programming',
    status: 'Sudah Baca',
    rating: 4,
    emoji: '🟨',
    review: 'Seri buku yang mengubah cara saya memahami JavaScript. Bukan hanya "apa" tapi "kenapa" JS bekerja seperti itu.',
    year: 2025,
  },
  {
    id: 6,
    title: 'The Pragmatic Programmer',
    author: 'David Thomas & Andrew Hunt',
    category: 'Programming',
    status: 'Ingin Baca',
    rating: null,
    emoji: '🔧',
    review: 'Sudah banyak direkomendasikan senior dev. Di-wishlist untuk dibaca setelah selesai CLRS.',
    year: null,
  },
  {
    id: 7,
    title: 'Thinking, Fast and Slow',
    author: 'Daniel Kahneman',
    category: 'Psikologi',
    status: 'Ingin Baca',
    rating: null,
    emoji: '🧠',
    review: 'Penasaran dengan konsep System 1 dan System 2 thinking. Relevan untuk problem solving di olimpiade.',
    year: null,
  },
]

const ALL_CATEGORIES = ['Semua', ...new Set(BOOKS.map(b => b.category))]
const ALL_STATUS = ['Semua', ...Object.keys(STATUS_COLORS)]

function StarRating({ rating }) {
  if (!rating) return null
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <Star key={i} size={12} fill={i <= rating ? '#f59e0b' : 'none'}
          style={{ color: i <= rating ? '#f59e0b' : 'var(--border)' }} />
      ))}
    </div>
  )
}

export default function BookshelfPage() {
  const [category, setCategory] = useState('Semua')
  const [status, setStatus] = useState('Semua')

  const filtered = BOOKS.filter(b => {
    const catOk = category === 'Semua' || b.category === category
    const statusOk = status === 'Semua' || b.status === status
    return catOk && statusOk
  })

  const counts = {
    'Sudah Baca': BOOKS.filter(b => b.status === 'Sudah Baca').length,
    'Sedang Dibaca': BOOKS.filter(b => b.status === 'Sedang Dibaca').length,
    'Ingin Baca': BOOKS.filter(b => b.status === 'Ingin Baca').length,
  }

  return (
    <PageWrapper>
      <Helmet>
        <title>Bookshelf — Felix Raymond</title>
        <meta name="description" content="Buku dan bacaan Felix Raymond — programming, Mandarin, self-development." />
        <meta property="og:url" content="https://lixsukagits.github.io/bookshelf" />
      </Helmet>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 md:px-10 py-20">

        {/* Header */}
        <div className="text-center mb-8">
          <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--primary)', marginBottom: '0.5rem' }}>
            Reading List
          </p>
          <h1 className="font-display text-3xl md:text-4xl font-bold" style={{ color: 'var(--dark)' }}>
            Bookshelf
          </h1>
          <p className="mt-3 text-sm" style={{ color: 'var(--body-color)' }}>
            Buku dan bacaan yang membentuk cara saya berpikir dan belajar.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {Object.entries(counts).map(([s, count]) => (
            <motion.button
              key={s}
              onClick={() => setStatus(status === s ? 'Semua' : s)}
              whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}
              className="card p-4 text-center"
              style={{ borderColor: status === s ? STATUS_COLORS[s] : 'var(--border)' }}
            >
              <div className="font-display text-2xl font-bold" style={{ color: STATUS_COLORS[s] }}>{count}</div>
              <div className="text-xs mt-0.5" style={{ color: 'var(--body-color)' }}>{s}</div>
            </motion.button>
          ))}
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {ALL_CATEGORIES.map(cat => (
            <motion.button
              key={cat}
              onClick={() => setCategory(cat)}
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
              className="px-3 py-1.5 rounded-xl text-xs font-medium transition-all"
              style={{
                background: category === cat ? 'var(--primary)' : 'var(--card-bg)',
                color: category === cat ? '#fff' : 'var(--body-color)',
                border: `1px solid ${category === cat ? 'var(--primary)' : 'var(--border)'}`,
              }}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        {/* Book list */}
        <div className="space-y-3">
          {filtered.map((book, i) => (
            <motion.div
              key={book.id}
              className="card p-5"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              whileHover={{ x: 4 }}
            >
              <div className="flex gap-4">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0"
                  style={{ background: `${STATUS_COLORS[book.status]}12`, border: `1px solid ${STATUS_COLORS[book.status]}25` }}>
                  {book.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 flex-wrap mb-1">
                    <h3 className="font-display font-bold text-sm leading-snug" style={{ color: 'var(--dark)' }}>
                      {book.title}
                    </h3>
                    <span className="text-xs px-2 py-0.5 rounded-full shrink-0"
                      style={{ background: `${STATUS_COLORS[book.status]}12`, color: STATUS_COLORS[book.status], fontWeight: 600 }}>
                      {book.status}
                    </span>
                  </div>
                  <p className="text-xs mb-2" style={{ color: 'var(--body-color)' }}>
                    {book.author} · <span className="tag" style={{ display: 'inline' }}>{book.category}</span>
                  </p>
                  {book.rating && <StarRating rating={book.rating} />}
                  <p className="text-xs mt-2 leading-relaxed" style={{ color: 'var(--body-color)' }}>
                    {book.review}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <p className="text-4xl mb-3">📚</p>
            <p style={{ color: 'var(--body-color)' }}>Tidak ada buku yang cocok filter ini.</p>
          </div>
        )}
      </div>
    </PageWrapper>
  )
}