import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUp } from 'lucide-react'

export default function BackToTop() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const fn = () => setShow(window.scrollY > 400)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.7 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Kembali ke atas"
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.1 }}
          // FIX: w-11 h-11 = 44px minimum tap target
          className="w-11 h-11 rounded-xl flex items-center justify-center shadow-lg"
          style={{ background: 'var(--primary)', color: '#fff' }}
        >
          {/* FIX: aria-hidden — label sudah ada di button */}
          <ArrowUp size={18} aria-hidden="true" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}