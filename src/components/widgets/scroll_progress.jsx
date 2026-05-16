import { useEffect, useState } from 'react'

export default function ScrollProgress() {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement
      const pct = (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100
      setWidth(Math.min(pct, 100))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    // FIX: position/top/left/zIndex/pointerEvents/borderRadius → Tailwind
    // width% + gradient + transition tetap inline — nilai dinamis dari state
    <div
      id="scroll-progress"
      role="progressbar"
      aria-valuenow={Math.round(width)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Progres scroll halaman"
      className="fixed top-0 left-0 h-[3px] z-[9999] pointer-events-none rounded-r-[2px]"
      style={{
        width: `${width}%`,
        background: 'linear-gradient(90deg, var(--primary), #7c3aed)',
        transition: 'width 0.1s linear',
      }}
    />
  )
}