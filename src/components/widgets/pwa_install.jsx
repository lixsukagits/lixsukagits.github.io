import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Download, Smartphone } from 'lucide-react'

/**
 * pwa_install.jsx
 * PWA install prompt — muncul setelah user 30 detik di halaman,
 * hanya sekali per session, hanya kalau browser support beforeinstallprompt.
 * Di iOS, tampilkan instruksi manual (Add to Home Screen).
 * Taruh di: src/components/widgets/pwa_install.jsx
 */

function isIOS() {
  if (typeof navigator === 'undefined') return false
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream
}

function isSafari() {
  if (typeof navigator === 'undefined') return false
  return /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
}

function isInStandaloneMode() {
  return typeof window !== 'undefined' &&
    (window.matchMedia('(display-mode: standalone)').matches ||
     window.navigator.standalone === true)
}

export default function PwaInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [show, setShow]       = useState(false)
  const [showIOS, setShowIOS] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    // Jangan tampilkan kalau sudah installed
    if (isInStandaloneMode()) return

    // Cek session storage — hanya tampil sekali per session
    try {
      if (sessionStorage.getItem('felix-pwa-dismissed')) return
    } catch {}

    // Android / Chrome — listen beforeinstallprompt
    const handler = (e) => {
      e.preventDefault()
      setDeferredPrompt(e)
      // Delay 30 detik sebelum prompt muncul
      setTimeout(() => setShow(true), 30000)
    }
    window.addEventListener('beforeinstallprompt', handler)

    // iOS Safari — tampilkan instruksi manual setelah 45 detik
    if (isIOS() && isSafari()) {
      setTimeout(() => setShowIOS(true), 45000)
    }

    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return
    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    if (outcome === 'accepted') {
      setShow(false)
    }
    setDeferredPrompt(null)
  }

  const handleDismiss = () => {
    setShow(false)
    setShowIOS(false)
    setDismissed(true)
    try { sessionStorage.setItem('felix-pwa-dismissed', '1') } catch {}
  }

  if (dismissed) return null

  return (
    <>
      {/* Android / Chrome install prompt */}
      <AnimatePresence>
        {show && deferredPrompt && (
          <motion.div
            initial={{ opacity: 0, y: 80, scale: 0.95 }}
            animate={{ opacity: 1, y: 0,  scale: 1 }}
            exit={{   opacity: 0, y: 80,  scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 260, damping: 24 }}
            style={{
              position: 'fixed', bottom: '5rem', left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 9990, width: 'min(360px, 90vw)',
            }}
          >
            <div className="card p-4 flex items-start gap-3"
              style={{ boxShadow: '0 16px 48px rgba(0,0,0,0.18)', border: '1px solid var(--border)' }}>
              {/* Icon */}
              <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: 'var(--primary-light)', color: 'var(--primary)' }}>
                <Download size={20} />
              </div>

              <div className="flex-1 min-w-0">
                <p className="font-display font-bold text-sm text-[var(--dark)] mb-0.5">
                  Install Portfolio Felix
                </p>
                <p className="text-xs text-[var(--body-color)] leading-relaxed mb-3">
                  Tambahkan ke layar utama untuk akses lebih cepat — offline pun bisa!
                </p>
                <div className="flex gap-2">
                  <motion.button onClick={handleInstall}
                    whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                    className="px-4 py-1.5 rounded-lg text-xs font-semibold text-white"
                    style={{ background: 'var(--primary)' }}>
                    Install ✨
                  </motion.button>
                  <button onClick={handleDismiss}
                    className="px-4 py-1.5 rounded-lg text-xs font-semibold"
                    style={{ background: 'var(--bg)', color: 'var(--body-color)',
                      border: '1px solid var(--border)' }}>
                    Nanti aja
                  </button>
                </div>
              </div>

              <button onClick={handleDismiss} aria-label="Tutup"
                style={{ color: 'var(--body-color)', background: 'none', border: 'none',
                  cursor: 'pointer', flexShrink: 0, padding: 0 }}>
                <X size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* iOS Safari — instruksi manual */}
      <AnimatePresence>
        {showIOS && (
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 80 }}
            transition={{ type: 'spring', stiffness: 260, damping: 24 }}
            style={{
              position: 'fixed', bottom: '5rem', left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 9990, width: 'min(360px, 90vw)',
            }}
          >
            <div className="card p-4"
              style={{ boxShadow: '0 16px 48px rgba(0,0,0,0.18)', border: '1px solid var(--border)' }}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Smartphone size={18} style={{ color: 'var(--primary)' }} />
                  <p className="font-display font-bold text-sm text-[var(--dark)]">
                    Tambah ke Home Screen
                  </p>
                </div>
                <button onClick={handleDismiss} aria-label="Tutup"
                  style={{ color: 'var(--body-color)', background: 'none', border: 'none', cursor: 'pointer' }}>
                  <X size={16} />
                </button>
              </div>
              <ol className="text-xs text-[var(--body-color)] space-y-1.5 leading-relaxed">
                <li>1. Tap tombol <strong style={{ color: 'var(--dark)' }}>Share</strong> (kotak dengan panah ↑) di browser</li>
                <li>2. Scroll ke bawah dan pilih <strong style={{ color: 'var(--dark)' }}>"Add to Home Screen"</strong></li>
                <li>3. Tap <strong style={{ color: 'var(--dark)' }}>Add</strong> — selesai! 🎉</li>
              </ol>
              {/* Arrow pointing down ke share button */}
              <div style={{ textAlign: 'center', marginTop: '0.75rem', fontSize: '1.5rem' }}>↓</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}