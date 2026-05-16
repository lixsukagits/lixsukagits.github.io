import { useRef, useState } from 'react'
import { motion, useSpring } from 'framer-motion'

/**
 * magnetic_button.jsx
 * Button yang bergerak mengikuti kursor saat hover (magnetic effect).
 * Otomatis disabled di touch device.
 * Taruh di: src/components/ui/magnetic_button.jsx
 *
 * Props:
 *   children   — konten button / link
 *   strength   — kekuatan tarik magnet (default: 0.35)
 *   className  — class tambahan untuk element luar
 *   style      — inline style tambahan
 *   as         — element yang dirender: 'button' | 'a' | 'div' (default: 'button')
 *   ...rest    — semua props lain diteruskan ke element (href, onClick, dll)
 */
export default function MagneticButton({
  children,
  strength = 0.35,
  className = '',
  style = {},
  as: Tag = 'button',
  ...rest
}) {
  const ref = useRef(null)
  const [hovered, setHovered] = useState(false)

  // Spring physics untuk gerakan halus
  const x = useSpring(0, { stiffness: 200, damping: 20, mass: 0.5 })
  const y = useSpring(0, { stiffness: 200, damping: 20, mass: 0.5 })

  // Deteksi touch device — jangan aktifkan magnetic di sentuh
  const isTouch = typeof navigator !== 'undefined' && navigator.maxTouchPoints > 0

  const handleMouseMove = (e) => {
    if (isTouch) return
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top  + rect.height / 2
    x.set((e.clientX - centerX) * strength)
    y.set((e.clientY - centerY) * strength)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    setHovered(false)
  }

  return (
    <motion.div
      ref={ref}
      style={{ display: 'inline-block', ...style }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => !isTouch && setHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div style={{ x, y }}>
        <Tag
          className={className}
          {...rest}
        >
          {children}
        </Tag>
      </motion.div>
    </motion.div>
  )
}