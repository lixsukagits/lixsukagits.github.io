import { useRef, useState } from 'react'
import { motion, useSpring } from 'framer-motion'

/**
 * tilt_card.jsx — FM v11 compatible
 * 3D tilt mengikuti mouse + efek glare manual (tanpa useTransform array).
 * Taruh di: src/components/ui/tilt_card.jsx
 */
export default function TiltCard({
  children,
  maxTilt = 14,
  glare = true,
  scale = 1.04,
  className = '',
  style = {},
}) {
  const ref = useRef(null)
  const [hovered, setHovered] = useState(false)
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 })
  const [glareOpacity, setGlareOpacity] = useState(0)

  const rotateX = useSpring(0, { stiffness: 200, damping: 20 })
  const rotateY = useSpring(0, { stiffness: 200, damping: 20 })
  const scaleVal = useSpring(1, { stiffness: 200, damping: 20 })

  const handleMove = (e) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top)  / rect.height

    const rx = (0.5 - y) * maxTilt * 2
    const ry = (x - 0.5) * maxTilt * 2

    rotateX.set(rx)
    rotateY.set(ry)
    setGlarePos({ x: x * 100, y: y * 100 })
    setGlareOpacity(Math.min((Math.abs(rx) + Math.abs(ry)) / (maxTilt * 2) * 0.4, 0.4))
  }

  const handleEnter = () => {
    setHovered(true)
    scaleVal.set(scale)
  }

  const handleLeave = () => {
    setHovered(false)
    rotateX.set(0)
    rotateY.set(0)
    scaleVal.set(1)
    setGlareOpacity(0)
    setGlarePos({ x: 50, y: 50 })
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={{
        ...style,
        rotateX,
        rotateY,
        scale: scaleVal,
        transformStyle: 'preserve-3d',
        transformPerspective: 800,
        position: 'relative',
        willChange: 'transform',
      }}
      className={className}
    >
      {children}

      {/* Glare overlay */}
      {glare && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 'inherit',
            pointerEvents: 'none',
            zIndex: 2,
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.35) 0%, transparent 65%)`,
            opacity: glareOpacity,
            transition: 'opacity 0.1s ease',
          }}
        />
      )}

      {/* Edge glow saat hover */}
      {hovered && (
        <div
          style={{
            position: 'absolute',
            inset: -1,
            borderRadius: 'inherit',
            border: '1px solid rgba(55,88,249,0.35)',
            boxShadow: '0 0 20px rgba(55,88,249,0.15)',
            pointerEvents: 'none',
            zIndex: 3,
          }}
        />
      )}
    </motion.div>
  )
}