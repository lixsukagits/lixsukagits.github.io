import { useEffect } from 'react'

/**
 * custom_cursor.jsx
 * - Desktop (mouse): custom dot + ring
 * - Mobile/touch: tidak muncul
 *
 * FIX: Tidak pakai media query untuk deteksi (pointer: coarse, hover, dll)
 * karena laptop touchscreen Windows melaporkan semua sebagai touch device
 * meskipun sedang dipakai dengan mouse.
 *
 * Strategi: SELALU siapkan elemen, aktifkan hanya setelah mousemove
 * dikonfirmasi bukan dari touch via InputDeviceCapabilities.firesTouchEvents.
 * Kalau user switch ke touch, cursor disembunyikan lagi.
 */
export default function CustomCursor() {
  useEffect(() => {
    const dot  = document.createElement('div')
    const ring = document.createElement('div')
    dot.id  = 'felix-cursor-dot'
    ring.id = 'felix-cursor-ring'

    Object.assign(dot.style, {
      position: 'fixed', top: '0', left: '0',
      width: '8px', height: '8px', borderRadius: '50%',
      background: 'var(--primary)',
      pointerEvents: 'none', zIndex: '2147483647',
      opacity: '0', transform: 'translate(-9999px, -9999px)',
      transition: 'opacity 0.2s, width 0.15s, height 0.15s',
      willChange: 'transform',
    })

    Object.assign(ring.style, {
      position: 'fixed', top: '0', left: '0',
      width: '36px', height: '36px', borderRadius: '50%',
      border: '1.5px solid var(--primary)',
      pointerEvents: 'none', zIndex: '2147483646',
      opacity: '0', transform: 'translate(-9999px, -9999px)',
      transition: 'opacity 0.2s, width 0.25s cubic-bezier(0.34,1.56,0.64,1), height 0.25s cubic-bezier(0.34,1.56,0.64,1)',
      willChange: 'transform',
    })

    document.body.appendChild(dot)
    document.body.appendChild(ring)

    let mouseX = -9999, mouseY = -9999
    let ringX  = -9999, ringY  = -9999
    let rafId
    let isVisible  = false
    let usingMouse = false
    let styleTag   = null

    const HOVER_SELECTORS = 'a, button, [role="button"], input, textarea, select, label, .card'

    const onHoverIn = () => {
      if (!usingMouse) return
      ring.style.width       = '50px'
      ring.style.height      = '50px'
      ring.style.borderColor = 'var(--primary)'
      ring.style.background  = 'rgba(55,88,249,0.07)'
    }

    const onHoverOut = () => {
      ring.style.width      = '36px'
      ring.style.height     = '36px'
      ring.style.background = 'transparent'
    }

    const attachHover = () => {
      document.querySelectorAll(HOVER_SELECTORS).forEach(el => {
        el.removeEventListener('mouseenter', onHoverIn)
        el.removeEventListener('mouseleave', onHoverOut)
        el.addEventListener('mouseenter', onHoverIn)
        el.addEventListener('mouseleave', onHoverOut)
      })
    }

    const enableCursorHide = () => {
      if (styleTag) return
      styleTag = document.createElement('style')
      styleTag.id = 'felix-cursor-style'
      styleTag.textContent = '*, *::before, *::after { cursor: none !important; }'
      document.head.appendChild(styleTag)
    }

    const disableCursorHide = () => {
      styleTag?.remove()
      styleTag = null
    }

    const onMove = (e) => {
      // InputDeviceCapabilities: firesTouchEvents = true berarti event dari touch
      // Kalau tidak ada sourceCapabilities (browser lama) → anggap mouse
      const isFromTouch = e.sourceCapabilities?.firesTouchEvents === true

      if (!isFromTouch) {
        if (!usingMouse) {
          usingMouse = true
          enableCursorHide()
          attachHover()
        }
      } else {
        // Mouse event yang di-generate dari touch — skip
        return
      }

      mouseX = e.clientX
      mouseY = e.clientY
      dot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`

      if (!isVisible) {
        isVisible = true
        dot.style.opacity  = '1'
        ring.style.opacity = '0.65'
      }
    }

    // User switch ke touch — restore cursor
    const onTouchStart = () => {
      if (!usingMouse) return
      usingMouse = false
      isVisible  = false
      dot.style.opacity  = '0'
      ring.style.opacity = '0'
      disableCursorHide()
    }

    const onLeave = () => {
      isVisible = false
      dot.style.opacity  = '0'
      ring.style.opacity = '0'
    }

    const onEnter = () => {
      if (!usingMouse || mouseX < 0) return
      isVisible = true
      dot.style.opacity  = '1'
      ring.style.opacity = '0.65'
    }

    const onDown = () => {
      if (!usingMouse) return
      dot.style.width  = '5px';  dot.style.height  = '5px'
      ring.style.width = '22px'; ring.style.height = '22px'
    }

    const onUp = () => {
      if (!usingMouse) return
      dot.style.width  = '8px';  dot.style.height  = '8px'
      ring.style.width = '36px'; ring.style.height = '36px'
    }

    // Ring lerp — selalu jalan
    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.1
      ringY += (mouseY - ringY) * 0.1
      ring.style.transform = `translate(${ringX - 18}px, ${ringY - 18}px)`
      rafId = requestAnimationFrame(animateRing)
    }
    rafId = requestAnimationFrame(animateRing)

    // MutationObserver debounced
    let debounceTimer
    const observer = new MutationObserver(() => {
      clearTimeout(debounceTimer)
      debounceTimer = setTimeout(attachHover, 200)
    })
    observer.observe(document.body, { childList: true, subtree: true })

    document.addEventListener('mousemove',  onMove,       { passive: true })
    document.addEventListener('touchstart', onTouchStart, { passive: true })
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)
    document.addEventListener('mousedown',  onDown)
    document.addEventListener('mouseup',    onUp)

    return () => {
      document.removeEventListener('mousemove',  onMove)
      document.removeEventListener('touchstart', onTouchStart)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
      document.removeEventListener('mousedown',  onDown)
      document.removeEventListener('mouseup',    onUp)
      cancelAnimationFrame(rafId)
      clearTimeout(debounceTimer)
      observer.disconnect()
      disableCursorHide()
      dot.remove()
      ring.remove()
    }
  }, [])

  return null
}