import { useEffect } from 'react'

/**
 * custom_cursor.jsx
 * Pure JS cursor — tidak pakai React state untuk posisi
 * supaya tidak ada lag/re-render.
 * Taruh di: src/components/widgets/custom_cursor.jsx
 */
export default function CustomCursor() {
  useEffect(() => {
    // Jangan jalankan di touch device
    if (window.matchMedia('(hover: none)').matches) return

    // Buat elemen cursor langsung di DOM
    const dot = document.createElement('div')
    dot.id = 'cursor-dot'
    Object.assign(dot.style, {
      position: 'fixed',
      top: '0', left: '0',
      width: '8px', height: '8px',
      borderRadius: '50%',
      background: 'var(--primary)',
      pointerEvents: 'none',
      zIndex: '999999',
      transform: 'translate(-50%, -50%)',
      transition: 'width 0.15s, height 0.15s, opacity 0.2s',
      opacity: '0',
      willChange: 'transform',
      mixBlendMode: 'difference',
    })

    const ring = document.createElement('div')
    ring.id = 'cursor-ring'
    Object.assign(ring.style, {
      position: 'fixed',
      top: '0', left: '0',
      width: '36px', height: '36px',
      borderRadius: '50%',
      border: '1.5px solid var(--primary)',
      pointerEvents: 'none',
      zIndex: '999998',
      transform: 'translate(-50%, -50%)',
      transition: 'width 0.25s cubic-bezier(0.34,1.56,0.64,1), height 0.25s cubic-bezier(0.34,1.56,0.64,1), opacity 0.2s, border-color 0.2s',
      opacity: '0',
      willChange: 'transform',
    })

    document.body.appendChild(dot)
    document.body.appendChild(ring)

    let mouseX = -100, mouseY = -100
    let ringX = -100, ringY = -100
    let raf

    const onMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      dot.style.opacity = '1'
      ring.style.opacity = '0.6'
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`
    }

    const onLeave = () => { dot.style.opacity = '0'; ring.style.opacity = '0' }
    const onEnter = () => { dot.style.opacity = '1'; ring.style.opacity = '0.6' }

    const onDown = () => {
      dot.style.width = '5px'; dot.style.height = '5px'
      ring.style.width = '24px'; ring.style.height = '24px'
    }
    const onUp = () => {
      dot.style.width = '8px'; dot.style.height = '8px'
      ring.style.width = '36px'; ring.style.height = '36px'
    }

    // Hover elemen interaktif → ring membesar
    const onHoverIn = () => {
      ring.style.width = '52px'; ring.style.height = '52px'
      ring.style.borderColor = 'var(--primary)'
      ring.style.background = 'rgba(55,88,249,0.06)'
    }
    const onHoverOut = () => {
      ring.style.width = '36px'; ring.style.height = '36px'
      ring.style.background = 'transparent'
    }

    const SELECTORS = 'a, button, [role="button"], input, textarea, select, label'

    const attachHover = () => {
      document.querySelectorAll(SELECTORS).forEach(el => {
        el.addEventListener('mouseenter', onHoverIn)
        el.addEventListener('mouseleave', onHoverOut)
      })
    }
    attachHover()

    // Ring follow dengan smooth lag via rAF
    const animate = () => {
      ringX += (mouseX - ringX) * 0.1
      ringY += (mouseY - ringY) * 0.1
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`
      raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)

    // Re-attach saat DOM berubah (SPA navigation)
    const observer = new MutationObserver(attachHover)
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
      cancelAnimationFrame(raf)
      observer.disconnect()
      dot.remove()
      ring.remove()
    }
  }, [])

  return null // tidak render apapun — cursor dibuat langsung di DOM
}