import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'

/**
 * cursor_trail.jsx — canvas-based rewrite
 *
 * MASALAH sebelumnya:
 *   - setParticles() di setiap frame RAF → React re-render 60x/detik
 *   - DOM node per partikel → layout thrashing
 *   - Trail terlihat "berat" dan choppy
 *
 * Solusi: satu <canvas> overlay, semua partikel dikelola di array JS biasa,
 * render via requestAnimationFrame tanpa React state sama sekali.
 *
 * Mode:
 *   'sparkle' → titik-titik kecil bercahaya (default, lebih subtle dari versi lama)
 *   'orb'     → orb glowing soft
 *   Auto ZH   → karakter Hanzi kalau bahasa aktif zh
 */

const HANZI = ['学','好','中','文','人','大','小','上','下','心','美','智','勤','志','梦','行','思','力','新','进']
const SPARKLES = ['✦','✧','⋆','·','✸','★']

// Warna berbasis --primary palette
const COLORS = ['#3758F9', '#7c3aed', '#06b6d4', '#f59e0b', '#10b981']

let uid = 0

export default function CursorTrail({ mode = 'sparkle' }) {
  const { i18n } = useTranslation()
  const canvasRef = useRef(null)
  const stateRef  = useRef({
    particles: [],
    mouseX: -9999,
    mouseY: -9999,
    lastX:  -9999,
    lastY:  -9999,
    rafId:  null,
    throttle: null,
    isZH: false,
    mode: 'sparkle',
  })

  // Sinkronisasi mode & language ke ref (tidak perlu re-render)
  useEffect(() => {
    stateRef.current.isZH = i18n.language === 'zh'
    stateRef.current.mode = mode
  }, [i18n.language, mode])

  useEffect(() => {
    // Jangan tampil di touch/mobile
    const isTouch = navigator.maxTouchPoints > 0
    if (isTouch) return
    if (!window.matchMedia('(pointer: fine)').matches) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    // Resize canvas ke viewport
    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize, { passive: true })

    const S = stateRef.current

    // ── Spawn partikel ────────────────────────────────────────────
    const spawn = (x, y) => {
      const color = COLORS[Math.floor(Math.random() * COLORS.length)]
      const isZH  = S.isZH

      if (isZH) {
        S.particles.push({
          id:    ++uid,
          x, y,
          type:  'hanzi',
          char:  HANZI[Math.floor(Math.random() * HANZI.length)],
          size:  11 + Math.random() * 6,
          color,
          vx:    (Math.random() - 0.5) * 1.2,
          vy:    -0.7 - Math.random() * 1,
          alpha: 0.9,
          decay: 0.03 + Math.random() * 0.015,
          rot:   (Math.random() - 0.5) * 20,
        })
        return
      }

      if (S.mode === 'orb') {
        S.particles.push({
          id:    ++uid,
          x, y,
          type:  'orb',
          size:  5 + Math.random() * 7,
          color,
          vx:    (Math.random() - 0.5) * 0.7,
          vy:    (Math.random() - 0.5) * 0.7,
          alpha: 0.7,
          decay: 0.035 + Math.random() * 0.02,
        })
        return
      }

      // sparkle — lebih kecil & subtle dari versi lama
      S.particles.push({
        id:    ++uid,
        x, y,
        type:  'sparkle',
        char:  SPARKLES[Math.floor(Math.random() * SPARKLES.length)],
        size:  8 + Math.random() * 8,
        color,
        vx:    (Math.random() - 0.5) * 1.8,
        vy:    -0.8 - Math.random() * 1.2,
        alpha: 0.85,
        decay: 0.035 + Math.random() * 0.02,
        rot:   Math.random() * 360,
        rotV:  (Math.random() - 0.5) * 6,
      })
    }

    // ── Mouse move ────────────────────────────────────────────────
    const onMove = (e) => {
      S.mouseX = e.clientX
      S.mouseY = e.clientY

      const dx   = S.mouseX - S.lastX
      const dy   = S.mouseY - S.lastY
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < 14) return
      S.lastX = S.mouseX
      S.lastY = S.mouseY

      if (S.throttle) return
      S.throttle = setTimeout(() => { S.throttle = null }, 35)
      spawn(S.mouseX, S.mouseY)
    }

    window.addEventListener('mousemove', onMove, { passive: true })

    // ── Render loop ───────────────────────────────────────────────
    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = S.particles.length - 1; i >= 0; i--) {
        const p = S.particles[i]
        p.x     += p.vx
        p.y     += p.vy
        p.alpha -= p.decay
        if (p.alpha <= 0) { S.particles.splice(i, 1); continue }

        ctx.save()
        ctx.globalAlpha = p.alpha

        if (p.type === 'orb') {
          // Orb: glow via radial gradient
          const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 1.8)
          g.addColorStop(0, p.color)
          g.addColorStop(1, 'transparent')
          ctx.fillStyle = g
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size * 1.8, 0, Math.PI * 2)
          ctx.fill()
        } else {
          // sparkle atau hanzi — pakai teks canvas
          if (p.rot !== undefined) {
            p.rot += (p.rotV || 0)
            ctx.translate(p.x, p.y)
            ctx.rotate((p.rot * Math.PI) / 180)
            ctx.translate(-p.x, -p.y)
          }
          ctx.fillStyle    = p.color
          ctx.font         = `${p.type === 'hanzi' ? '700' : '400'} ${p.size}px ${p.type === 'hanzi' ? "'Noto Sans SC', sans-serif" : 'inherit'}`
          ctx.textAlign    = 'center'
          ctx.textBaseline = 'middle'
          // Subtle glow
          ctx.shadowColor  = p.color
          ctx.shadowBlur   = p.size * 0.6
          ctx.fillText(p.char, p.x, p.y)
          ctx.shadowBlur   = 0
        }

        ctx.restore()
      }

      // Max 28 partikel — buang yang paling tua kalau lebih
      if (S.particles.length > 28) S.particles.splice(0, S.particles.length - 28)

      S.rafId = requestAnimationFrame(tick)
    }

    S.rafId = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('resize',    resize)
      if (S.rafId)    cancelAnimationFrame(S.rafId)
      if (S.throttle) clearTimeout(S.throttle)
      S.particles = []
    }
  }, []) // sekali mount — mode & isZH dibaca dari ref

  // Touch/mobile → return null
  if (typeof navigator !== 'undefined' && navigator.maxTouchPoints > 0) return null

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position:       'fixed',
        inset:          0,
        pointerEvents:  'none',
        zIndex:         99990,
      }}
    />
  )
}