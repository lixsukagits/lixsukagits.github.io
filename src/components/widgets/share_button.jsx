import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Share2, Link, Check } from 'lucide-react'
import toast from 'react-hot-toast'

/**
 * share_button.jsx
 * Tombol share halaman saat ini.
 * - Mobile: pakai Web Share API native (sheet bawaan HP)
 * - Desktop: copy link ke clipboard + toast notif
 * Taruh di: src/components/widgets/share_button.jsx
 *
 * Pemakaian (taruh di tiap halaman atau di app.jsx):
 *   <ShareButton />
 */
export default function ShareButton() {
  const [copied, setCopied] = useState(false)
  const [visible, setVisible] = useState(true)

  const handleShare = async () => {
    const url = window.location.href
    const title = document.title || 'Felix Raymond — Portfolio'
    const text = 'Lihat portfolio Felix Raymond — IT Enthusiast dari Medan! 🔥'

    // Coba Web Share API (mobile native)
    if (navigator.share) {
      try {
        await navigator.share({ title, text, url })
        return
      } catch (e) {
        // User cancel — tidak perlu error
        if (e.name === 'AbortError') return
      }
    }

    // Fallback: copy ke clipboard
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      toast.success('Link disalin! 🔗', {
        style: {
          background: 'var(--card-bg)',
          color: 'var(--dark)',
          border: '1px solid var(--border)',
          borderRadius: '0.75rem',
          fontSize: '0.85rem',
        },
        iconTheme: { primary: 'var(--primary)', secondary: '#fff' },
      })
      setTimeout(() => setCopied(false), 2000)
    } catch {
      toast.error('Gagal menyalin link')
    }
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          onClick={handleShare}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          title="Bagikan halaman ini"
          aria-label="Bagikan halaman ini"
          style={{
            width: 40, height: 40,
            borderRadius: '50%',
            background: 'var(--card-bg)',
            border: '1.5px solid var(--border)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: copied ? 'var(--primary)' : 'var(--body-color)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            transition: 'color 0.2s',
          }}
        >
          {copied ? <Check size={16} /> : <Share2 size={16} />}
        </motion.button>
      )}
    </AnimatePresence>
  )
}