import { useEffect, useRef } from 'react'
import { useThemeStore } from '../../store/use_theme_store'

/* ─── FLOATING ORBS ─────────────────────────────────────────── */
function Orbs() {
  const orbs = [
    { w: 520, h: 520, top: '-8%',  left: '-6%',   delay: '0s',  dur: '20s', grad: 'var(--orb-1)' },
    { w: 420, h: 420, top: '55%',  right: '-7%',  delay: '5s',  dur: '24s', grad: 'var(--orb-2)' },
    { w: 320, h: 320, top: '28%',  left: '42%',   delay: '9s',  dur: '17s', grad: 'var(--orb-3)' },
    { w: 260, h: 260, bottom:'4%', left: '18%',   delay: '3s',  dur: '21s', grad: 'var(--orb-1)' },
    { w: 200, h: 200, top: '12%',  right: '22%',  delay: '13s', dur: '15s', grad: 'var(--orb-2)' },
  ]
  return (
    <div className="orbs-container" aria-hidden="true">
      {orbs.map((o, i) => (
        <div
          key={i}
          className="orb"
          style={{
            width: o.w, height: o.h,
            top: o.top, left: o.left,
            right: o.right, bottom: o.bottom,
            background: o.grad,
            animationDelay: o.delay,
            animationDuration: o.dur,
          }}
        />
      ))}
    </div>
  )
}

/* ─── PARTICLE CANVAS ───────────────────────────────────────── */
function Particles() {
  const canvasRef = useRef(null)
  const { theme } = useThemeStore()
  const animRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()

    const isDark = theme === 'dark'
    const dotColor  = isDark ? 'rgba(100,130,255,' : 'rgba(55,88,249,'
    const lineColor = isDark ? 'rgba(100,130,255,' : 'rgba(55,88,249,'

    const W = () => canvas.width
    const H = () => canvas.height
    const COUNT = Math.floor((canvas.width * canvas.height) / 20000)

    const dots = Array.from({ length: COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.4 + 0.4,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, W(), H())

      for (let i = 0; i < dots.length; i++) {
        const d = dots[i]
        d.x += d.vx
        d.y += d.vy
        if (d.x < 0 || d.x > W()) d.vx *= -1
        if (d.y < 0 || d.y > H()) d.vy *= -1

        ctx.beginPath()
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2)
        ctx.fillStyle = dotColor + '0.55)'
        ctx.fill()

        for (let j = i + 1; j < dots.length; j++) {
          const d2 = dots[j]
          const dx = d.x - d2.x
          const dy = d.y - d2.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 110) {
            ctx.beginPath()
            ctx.moveTo(d.x, d.y)
            ctx.lineTo(d2.x, d2.y)
            ctx.strokeStyle = lineColor + (0.18 * (1 - dist / 110)) + ')'
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }
      animRef.current = requestAnimationFrame(draw)
    }

    draw()
    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [theme])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed', inset: 0,
        width: '100%', height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.55,
      }}
    />
  )
}

/* ─── EXPORT ────────────────────────────────────────────────── */
export default function AnimatedBg() {
  return (
    <>
      <Particles />
      <Orbs />
    </>
  )
}