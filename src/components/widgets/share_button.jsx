import { useState } from 'react'
import { motion } from 'framer-motion'
import { Share2, Check } from 'lucide-react'
import toast from 'react-hot-toast'

export default function ShareButton() {
  const [copied, setCopied] = useState(false)

  const handleShare = async () => {
    const url = window.location.href
    const title = document.title || 'Felix Raymond — Portfolio'
    const text = 'Lihat portfolio Felix Raymond — IT Enthusiast dari Medan! 🔥'

    if (navigator.share) {
      try {
        await navigator.share({ title, text, url })
        return
      } catch (e) {
        if (e.name === 'AbortError') return
      }
    }

    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      toast.success('Link disalin! 🔗', {
        style: {
          background: 'var(--card-bg)', color: 'var(--dark)',
          border: '1px solid var(--border)', borderRadius: '0.75rem', fontSize: '0.85rem',
        },
        iconTheme: { primary: 'var(--primary)', secondary: '#fff' },
      })
      setTimeout(() => setCopied(false), 2000)
    } catch {
      toast.error('Gagal menyalin link')
    }
  }

  return (
    <motion.button
      onClick={handleShare}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      // FIX: aria-label dinamis sesuai state + aria-live announce
      aria-label={copied ? 'Link tersalin!' : 'Bagikan halaman ini'}
      aria-live="polite"
      style={{
        // FIX: 44×44px minimum tap target
        width: 44, height: 44,
        borderRadius: '50%',
        background: 'var(--card-bg)',
        border: '1.5px solid var(--border)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: copied ? 'var(--primary)' : 'var(--body-color)',
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        transition: 'color 0.2s',
        cursor: 'pointer',
      }}
    >
      {/* FIX: icon aria-hidden — label sudah ada di button */}
      {copied
        ? <Check size={16} aria-hidden="true" />
        : <Share2 size={16} aria-hidden="true" />}
    </motion.button>
  )
}