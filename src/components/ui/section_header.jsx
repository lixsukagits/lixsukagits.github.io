import { useInView } from 'react-intersection-observer'

export default function SectionHeader({ label, title, center = true }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 })

  return (
    <div ref={ref} className={`mb-12 ${center ? 'text-center' : ''}`}>
      <span
        className={`section-label transition-all duration-500 ${inView ? 'opacity-100' : 'opacity-0 translate-y-4'}`}
        style={{ display: 'block', marginBottom: '0.5rem' }}
      >
        {label}
      </span>
      <h2
        className={`font-display text-3xl md:text-4xl font-bold transition-all duration-500 delay-100 ${inView ? 'opacity-100' : 'opacity-0 translate-y-4'}`}
        style={{ color: 'var(--dark)' }}
      >
        {title}
      </h2>
    </div>
  )
}