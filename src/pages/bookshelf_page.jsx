import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { Star } from 'lucide-react'
import PageWrapper from '../components/ui/page_wrapper'

// NOTE: status key map — UI label dari t(), data filter tetap pakai key EN
const STATUS_KEYS = ['status_done', 'status_reading', 'status_want']
const STATUS_COLORS = {
  status_done:    '#10b981',
  status_reading: '#3758F9',
  status_want:    '#f59e0b',
}
// Map dari status ID (di data) ke key i18n
const STATUS_ID_TO_KEY = {
  'Sudah Baca':    'status_done',
  'Sedang Dibaca': 'status_reading',
  'Ingin Baca':    'status_want',
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
    title: "You Don't Know JS",
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

const ALL_CATEGORIES_KEYS = ['all', ...new Set(BOOKS.map(b => b.category))]

function StarRating({ rating }) {
  if (!rating) return null
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <Star
          key={i} size={12}
          fill={i <= rating ? '#f59e0b' : 'none'}
          className={i <= rating ? 'text-amber-400' : 'text-[var(--border)]'}
        />
      ))}
    </div>
  )
}

export default function BookshelfPage() {
  const { t } = useTranslation()
  const [category, setCategory] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')

  const filtered = BOOKS.filter(b => {
    const catOk = category === 'all' || b.category === category
    const statusOk = statusFilter === 'all' || STATUS_ID_TO_KEY[b.status] === statusFilter
    return catOk && statusOk
  })

  const counts = {
    status_done:    BOOKS.filter(b => b.status === 'Sudah Baca').length,
    status_reading: BOOKS.filter(b => b.status === 'Sedang Dibaca').length,
    status_want:    BOOKS.filter(b => b.status === 'Ingin Baca').length,
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
        {/* FIX: style={{ ... }} → className + t() */}
        <div className="text-center mb-8">
          <p className="text-[0.7rem] font-bold tracking-[0.2em] uppercase text-[var(--primary)] mb-2">
            {t('bookshelf.subtitle')}
          </p>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-[var(--dark)]">
            {t('bookshelf.title')}
          </h1>
          <p className="mt-3 text-sm text-[var(--body-color)]">{t('bookshelf.desc')}</p>
        </div>

        {/* Stats — klik untuk filter status */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {STATUS_KEYS.map(key => {
            const color = STATUS_COLORS[key]
            const isActive = statusFilter === key
            return (
              <motion.button
                key={key}
                onClick={() => setStatusFilter(isActive ? 'all' : key)}
                whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}
                className="card p-4 text-center"
                style={{ borderColor: isActive ? color : 'var(--border)' }}
              >
                <div className="font-display text-2xl font-bold" style={{ color }}>{counts[key]}</div>
                {/* FIX: hardcode status label → t() */}
                <div className="text-xs mt-0.5 text-[var(--body-color)]">{t(`bookshelf.${key}`)}</div>
              </motion.button>
            )
          })}
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {ALL_CATEGORIES_KEYS.map(cat => {
            const isActive = category === cat
            const label = cat === 'all' ? t('bookshelf.filter_all') : cat
            return (
              <motion.button
                key={cat}
                onClick={() => setCategory(cat)}
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                // FIX: style={{ background, color, border }} → className
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all border ${
                  isActive
                    ? 'bg-[var(--primary)] text-white border-[var(--primary)]'
                    : 'bg-[var(--card-bg)] text-[var(--body-color)] border-[var(--border)]'
                }`}
              >
                {label}
              </motion.button>
            )
          })}
        </div>

        {/* Book list */}
        <div className="space-y-3">
          {filtered.map((book, i) => {
            const statusKey = STATUS_ID_TO_KEY[book.status]
            const statusColor = STATUS_COLORS[statusKey]
            return (
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
                  {/* icon bg — alpha dari statusColor dinamis, tetap inline */}
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0"
                    style={{ background: `${statusColor}12`, border: `1px solid ${statusColor}25` }}
                  >
                    {book.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 flex-wrap mb-1">
                      <h3 className="font-display font-bold text-sm leading-snug text-[var(--dark)] text-tracked word-loose">
                        {book.title}
                      </h3>
                      {/* FIX: hardcode status string → t() */}
                      <span
                        className="text-xs px-2 py-0.5 rounded-full shrink-0 font-semibold"
                        style={{ background: `${statusColor}12`, color: statusColor }}
                      >
                        {t(`bookshelf.${statusKey}`)}
                      </span>
                    </div>
                    <p className="text-xs mb-2 text-[var(--body-color)]">
                      {book.author} · <span className="tag" style={{ display: 'inline' }}>{book.category}</span>
                    </p>
                    {book.rating && <StarRating rating={book.rating} />}
                    <p className="text-xs mt-2 leading-relaxed text-[var(--body-color)]">{book.review}</p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* FIX: t() + style={{ color }} → className */}
        {filtered.length === 0 && (
          <div className="text-center py-12">
            <p className="text-4xl mb-3">📚</p>
            <p className="text-[var(--body-color)]">{t('bookshelf.empty')}</p>
          </div>
        )}
      </div>
    </PageWrapper>
  )
}