import { useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence, useSpring } from 'framer-motion'

/**
 * hover_preview.jsx
 * Wrapper: hover di atas children → preview gambar melayang mengikuti kursor.
 * Otomatis disabled di touch device.
 * Taruh di: src/components/ui/hover_preview.jsx
 *
 * Props:
 *   src       — URL gambar preview
 *   alt       — alt text gambar
 *   width     — lebar preview card (default: 200)
 *   height    — tinggi preview card (default: 140)
 *   children  — elemen trigger (teks / komponen)
 *   className — class tambahan pada trigger wrapper
 *
 * Contoh pemakaian:
 *   <HoverPreview src={cert.img} alt={cert.title}>
 *     <span className="font-bold">{cert.title}</span>
 *   </HoverPreview>
 */
export default function HoverPreview({
  src,
  alt = '',
  width = 200,
  height = 140,
  children,
  className = '',
}) {
  const [visible, setVisible] = useState(false)
  const containerRef = useRef(null)

  // Spring untuk gerakan halus mengikuti kursor
  const mouseX = useSpring(0, { stiffness: 280, damping: 22 })
  const mouseY = useSpring(0, { stiffness: 280, damping: 22 })

  // Deteksi touch device
  const isTouch = typeof navigator !== 'undefined' && navigator.maxTouchPoints > 0

  const handleMouseMove = useCallback((e) => {
    if (isTouch) return
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    // Posisi relatif terhadap viewport — offset agar preview tidak menutupi kursor
    mouseX.set(e.clientX + 16)
    mouseY.set(e.clientY - height / 2)
  }, [isTouch, height, mouseX, mouseY])

  if (isTouch) return <span className={className}>{children}</span>

  return (
    <>
      <span
        ref={containerRef}
        className={`inline-block cursor-pointer ${className}`}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        onMouseMove={handleMouseMove}
      >
        {children}
      </span>

      {/* Portal-style: fixed overlay, tidak terpengaruh overflow parent */}
      <AnimatePresence>
        {visible && src && (
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: 8 }}
            transition={{ type: 'spring', stiffness: 300, damping: 24 }}
            style={{
              position: 'fixed',
              left: mouseX,
              top:  mouseY,
              width,
              height,
              zIndex: 9999,
              pointerEvents: 'none',
              borderRadius: '0.875rem',
              overflow: 'hidden',
              border: '1px solid var(--border)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
              background: 'var(--card-bg)',
            }}
          >
            <img
              src={src}
              alt={alt}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
            {/* Subtle gradient overlay bottom */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 60%)',
              pointerEvents: 'none',
            }} />
            {alt && (
              <div style={{
                position: 'absolute', bottom: 8, left: 10, right: 10,
                color: '#fff',
                fontSize: '0.65rem',
                fontWeight: 700,
                lineHeight: 1.3,
                textShadow: '0 1px 4px rgba(0,0,0,0.8)',
                pointerEvents: 'none',
              }}>
                {alt}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}