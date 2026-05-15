import { useEffect } from 'react'

/**
 * custom_cursor.jsx
 * - Desktop (mouse): custom dot + ring
 * - Mobile/touch: tidak muncul sama sekali
 *
 * FIX: Deteksi touch pakai 'ontouchstart' + pointer media query
 * sebelumnya terbalik — hover:none harusnya = touch device
 *
 * Taruh di: src/components/widgets/custom_cursor.jsx
 */
export default function CustomCursor() {
  useEffect(() => {
    // Deteksi touch device — jika ada, skip cursor sama sekali
    const isTouch =
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia('(pointer: coarse)').matches

    if (isTouch) return

    // Buat elemen cursor langsung di DOM — tidak pakai React state
    // supaya tidak ada re-render & tidak ada lag
    const dot = document.createElement('div')
    dot.id = 'felix-cursor-dot'
    const ring = document.createElement('div')
    ring.id = 'felix-cursor-ring'

    Object.assign(dot.style, {
      position: 'fixed',
      top: '0',
      left: '0',
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      background: 'var(--primary)',
      pointerEvents: 'none',
      zIndex: '2147483647', // max z-index
      opacity: '0',
      transform: 'translate(-9999px, -9999px)',
      transition: 'opacity 0.2s, width 0.15s, height 0.15s',
      willChange: 'transform',
    })

    Object.assign(ring.style, {
      position: 'fixed',
      top: '0',
      left: '0',
      width: '36px',
      height: '36px',
      borderRadius: '50%',
      border: '1.5px solid var(--primary)',
      pointerEvents: 'none',
      zIndex: '2147483646',
      opacity: '0',
      transform: 'translate(-9999px, -9999px)',
      transition: 'opacity 0.2s, width 0.25s cubic-bezier(0.34,1.56,0.64,1), height 0.25s cubic-bezier(0.34,1.56,0.64,1)',
      willChange: 'transform',
    })

    document.body.appendChild(dot)
    document.body.appendChild(ring)

    let mouseX = -9999
    let mouseY = -9999
    let ringX = -9999
    let ringY = -9999
    let rafId
    let isVisible = false

    // Update dot posisi langsung (no lag)
    const onMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY

      // Dot mengikuti langsung
      dot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`

      if (!isVisible) {
        isVisible = true
        dot.style.opacity = '1'
        ring.style.opacity = '0.65'
      }
    }

    const onLeave = () => {
      isVisible = false
      dot.style.opacity = '0'
      ring.style.opacity = '0'
    }

    const onEnter = () => {
      if (mouseX > 0) {
        isVisible = true
        dot.style.opacity = '1'
        ring.style.opacity = '0.65'
      }
    }

    const onDown = () => {
      dot.style.width = '5px'
      dot.style.height = '5px'
      ring.style.width = '22px'
      ring.style.height = '22px'
    }

    const onUp = () => {
      dot.style.width = '8px'
      dot.style.height = '8px'
      ring.style.width = '36px'
      ring.style.height = '36px'
    }

    // Hover interaktif — ring membesar
    const onHoverIn = () => {
      ring.style.width = '50px'
      ring.style.height = '50px'
      ring.style.borderColor = 'var(--primary)'
      ring.style.background = 'rgba(55,88,249,0.07)'
    }
    const onHoverOut = () => {
      ring.style.width = '36px'
      ring.style.height = '36px'
      ring.style.background = 'transparent'
    }

    const HOVER_SELECTORS = 'a, button, [role="button"], input, textarea, select, label, .card'

    const attachHover = () => {
      document.querySelectorAll(HOVER_SELECTORS).forEach(el => {
        // Hapus listener lama dulu supaya tidak double
        el.removeEventListener('mouseenter', onHoverIn)
        el.removeEventListener('mouseleave', onHoverOut)
        el.addEventListener('mouseenter', onHoverIn)
        el.addEventListener('mouseleave', onHoverOut)
      })
    }

    attachHover()

    // Ring follow dengan smooth lag via rAF
    const animateRing = () => {
      // Lerp — ring mengejar posisi mouse
      ringX += (mouseX - ringX) * 0.1
      ringY += (mouseY - ringY) * 0.1
      ring.style.transform = `translate(${ringX - 18}px, ${ringY - 18}px)`
      rafId = requestAnimationFrame(animateRing)
    }
    rafId = requestAnimationFrame(animateRing)

    // Re-attach hover saat DOM berubah (navigasi SPA)
    const observer = new MutationObserver(() => attachHover())
    observer.observe(document.body, { childList: true, subtree: true })

    document.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)
    document.addEventListener('mousedown', onDown)
    document.addEventListener('mouseup', onUp)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('mouseup', onUp)
      cancelAnimationFrame(rafId)
      observer.disconnect()
      dot.remove()
      ring.remove()
    }
  }, [])

  return null
}