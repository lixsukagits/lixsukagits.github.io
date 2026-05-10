import { useRef, useState } from 'react'
import { motion, useSpring } from 'framer-motion'

/**
 * tilt_card.jsx — glare diperkuat, FM v11 compatible
 * Taruh di: src/components/ui/tilt_card.jsx
 */
export default function TiltCard({
  children,
  maxTilt = 16,
  glare = true,
  scale = 1.05,
  className = '',
  style = {},
}) {
  const ref = useRef(null)
  const [hovered, setHovered] = useState(false)
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 })
  const [glareOpacity, setGlareOpacity] = useState(0)

  const rotateX = useSpring(0, { stiffness: 180, damping: 18 })
  const rotateY = useSpring(0, { stiffness: 180, damping: 18 })
  const scaleVal = useSpring(1, { stiffness: 180, damping: 18 })

  const handleMove = (e) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top)  / rect.height

    const rx = (0.5 - y) * maxTilt * 2
    const ry = (x - 0.5) * maxTilt * 2

    rotateX.set(rx)
    rotateY.set(ry)

    // Glare lebih kuat — opacity max 0.6
    const dist = Math.sqrt(Math.pow(x - 0.5, 2) + Math.pow(y - 0.5, 2))
    setGlarePos({ x: x * 100, y: y * 100 })
    setGlareOpacity(Math.min(dist * 1.2, 0.6))
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
        perspective: 800,
        position: 'relative',
        willChange: 'transform',
      }}
      className={className}
    >
      {children}

      {/* Glare — lebih terang & lebih besar */}
      {glare && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 'inherit',
            pointerEvents: 'none',
            zIndex: 2,
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.15) 40%, transparent 70%)`,
            opacity: glareOpacity,
            transition: 'opacity 0.05s linear',
            mixBlendMode: 'overlay',
          }}
        />
      )}

      {/* Edge highlight saat hover */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 'inherit',
          pointerEvents: 'none',
          zIndex: 3,
          border: `1.5px solid rgba(255,255,255,${hovered ? 0.2 : 0})`,
          boxShadow: hovered
            ? '0 30px 60px rgba(55,88,249,0.2), inset 0 1px 0 rgba(255,255,255,0.15)'
            : 'none',
          transition: 'border 0.3s, box-shadow 0.3s',
        }}
      />
    </motion.div>
  )
}