import { useEffect } from 'react'

/**
 * custom_cursor.jsx — dot-only redesign
 *
 * Kenapa dot-only:
 *   Cursor trail sudah menjadi "ekor visual". Ring yang ngekor
 *   di belakang dot = dua hal bergerak beda kecepatan → mual.
 *   Dot-only: satu titik yang snap langsung, bersih, trail jadi fokus.
 *
 * Behaviour:
 *   - Idle        : dot 7px, warna --primary
 *   - Hover link  : dot membesar ke 12px + sedikit glow
 *   - Click       : dot mengecil 4px sesaat (feedback) + ripple
 *   - Text input  : dot berubah jadi beam cursor tipis (UX-friendly)
 *   - Cursor hide : via <style> injection seperti sebelumnya
 *   - Touch/mobile: tidak aktif
 */
export default function CustomCursor() {
  useEffect(() => {
    const dot = document.createElement('div')
    dot.id = 'felix-cursor-dot'

    Object.assign(dot.style, {
      position:       'fixed',
      top:            '0',
      left:           '0',
      width:          '7px',
      height:         '7px',
      borderRadius:   '50%',
      background:     'var(--primary)',
      pointerEvents:  'none',
      zIndex:         '2147483647',
      opacity:        '0',
      transition:     'opacity 0.15s, width 0.15s ease, height 0.15s ease, background 0.15s, box-shadow 0.15s',
      willChange:     'transform',
    })

    document.body.appendChild(dot)

    let mouseX     = -9999
    let mouseY     = -9999
    let isVisible  = false
    let usingMouse = false
    let styleTag   = null
    let isHovering = false
    let isInput    = false

    const dotHalfSize = () => {
      if (isInput)    return 1
      if (isHovering) return 6
      return 3.5
    }

    const moveDot = (x, y) => {
      dot.style.transform = `translate(${x - dotHalfSize()}px, ${y - dotHalfSize()}px)`
    }

    const setIdle = () => {
      dot.style.width        = '7px'
      dot.style.height       = '7px'
      dot.style.borderRadius = '50%'
      dot.style.boxShadow    = 'none'
      dot.style.background   = 'var(--primary)'
    }

    const setHover = () => {
      dot.style.width        = '12px'
      dot.style.height       = '12px'
      dot.style.borderRadius = '50%'
      dot.style.boxShadow    = '0 0 8px var(--primary)'
      dot.style.background   = 'var(--primary)'
    }

    const setBeam = () => {
      dot.style.width        = '2px'
      dot.style.height       = '18px'
      dot.style.borderRadius = '1px'
      dot.style.boxShadow    = 'none'
      dot.style.background   = 'var(--primary)'
    }

    const setClick = () => {
      dot.style.width        = '4px'
      dot.style.height       = '4px'
      dot.style.borderRadius = '50%'
    }

    const spawnRipple = (x, y) => {
      const r = document.createElement('div')
      Object.assign(r.style, {
        position:      'fixed',
        left:          `${x - 12}px`,
        top:           `${y - 12}px`,
        width:         '24px',
        height:        '24px',
        borderRadius:  '50%',
        border:        '1.5px solid var(--primary)',
        pointerEvents: 'none',
        zIndex:        '2147483645',
        opacity:       '0.55',
        transform:     'scale(1)',
        transition:    'transform 0.38s ease-out, opacity 0.38s ease-out',
      })
      document.body.appendChild(r)
      requestAnimationFrame(() => {
        r.style.transform = 'scale(2.5)'
        r.style.opacity   = '0'
      })
      setTimeout(() => r.remove(), 400)
    }

    const HOVER_SEL = 'a, button, [role="button"], select, label, .card, [data-cursor-hover]'
    const INPUT_SEL = 'input[type="text"], input[type="email"], input[type="search"], input[type="password"], textarea, [contenteditable]'

    const onHoverIn  = () => { if (!usingMouse) return; isHovering = true;  setHover(); moveDot(mouseX, mouseY) }
    const onHoverOut = () => { isHovering = false; if (!isInput) { setIdle(); moveDot(mouseX, mouseY) } }
    const onInputIn  = () => { if (!usingMouse) return; isInput = true;  setBeam(); moveDot(mouseX, mouseY) }
    const onInputOut = () => { isInput = false; if (!isHovering) { setIdle(); moveDot(mouseX, mouseY) } }

    const attachHover = () => {
      document.querySelectorAll(HOVER_SEL).forEach(el => {
        el.removeEventListener('mouseenter', onHoverIn)
        el.removeEventListener('mouseleave', onHoverOut)
        el.addEventListener('mouseenter', onHoverIn)
        el.addEventListener('mouseleave', onHoverOut)
      })
      document.querySelectorAll(INPUT_SEL).forEach(el => {
        el.removeEventListener('mouseenter', onInputIn)
        el.removeEventListener('mouseleave', onInputOut)
        el.addEventListener('mouseenter', onInputIn)
        el.addEventListener('mouseleave', onInputOut)
      })
    }

    const enableCursorHide = () => {
      if (styleTag) return
      styleTag = document.createElement('style')
      styleTag.id = 'felix-cursor-style'
      styleTag.textContent = '*, *::before, *::after { cursor: none !important; }'
      document.head.appendChild(styleTag)
    }
    const disableCursorHide = () => { styleTag?.remove(); styleTag = null }

    const onMove = (e) => {
      if (e.sourceCapabilities?.firesTouchEvents === true) return
      if (!usingMouse) { usingMouse = true; enableCursorHide(); attachHover() }
      mouseX = e.clientX
      mouseY = e.clientY
      moveDot(mouseX, mouseY)
      if (!isVisible) { isVisible = true; dot.style.opacity = '1' }
    }

    const onTouchStart = () => {
      if (!usingMouse) return
      usingMouse = false; isVisible = false
      dot.style.opacity = '0'
      disableCursorHide()
    }

    const onLeave = () => { isVisible = false; dot.style.opacity = '0' }
    const onEnter = () => { if (!usingMouse) return; isVisible = true; dot.style.opacity = '1' }

    const onDown = (e) => {
      if (!usingMouse) return
      spawnRipple(e.clientX, e.clientY)
      setClick(); moveDot(mouseX, mouseY)
    }
    const onUp = () => {
      if (!usingMouse) return
      if (isInput) setBeam()
      else if (isHovering) setHover()
      else setIdle()
      moveDot(mouseX, mouseY)
    }

    let debTimer
    const observer = new MutationObserver(() => {
      clearTimeout(debTimer)
      debTimer = setTimeout(attachHover, 200)
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
      clearTimeout(debTimer)
      observer.disconnect()
      disableCursorHide()
      dot.remove()
    }
  }, [])

  return null
}