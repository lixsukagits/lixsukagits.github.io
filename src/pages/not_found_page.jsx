import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home } from 'lucide-react'
import PageWrapper from '../components/ui/page_wrapper'

export default function NotFoundPage() {
  return (
    <PageWrapper>
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring' }}
        >
          <p className="text-8xl mb-6">🔍</p>
          <h1 className="font-display text-5xl font-extrabold mb-3" style={{ color: 'var(--dark)' }}>404</h1>
          <p className="text-lg mb-8" style={{ color: 'var(--body-color)' }}>
            Halaman tidak ditemukan
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-semibold text-white transition-all hover:opacity-90"
            style={{ background: 'var(--primary)' }}
          >
            <Home size={16} /> Kembali ke Beranda
          </Link>
        </motion.div>
      </div>
    </PageWrapper>
  )
}