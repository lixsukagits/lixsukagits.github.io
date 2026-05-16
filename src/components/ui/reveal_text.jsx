import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

/**
 * reveal_text.jsx
 * Heading muncul per-kata saat scroll (stagger animation).
 * Taruh di: src/components/ui/reveal_text.jsx
 *
 * Props:
 *   text     — string teks yang ingin di-reveal
 *   as       — tag HTML (default: 'h2')
 *   className — class tambahan
 *   style    — inline style tambahan
 *   delay    — delay awal sebelum stagger (default: 0)
 *   once     — hanya animasi sekali (default: true)
 */
export default function RevealText({
  text = '',
  as: Tag = 'h2',
  className = '',
  style = {},
  delay = 0,
  once = true,
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, margin: '-10% 0px -10% 0px' })

  const words = text.split(' ')

  return (
    <Tag
      ref={ref}
      className={className}
      style={{ ...style, display: 'flex', flexWrap: 'wrap', gap: '0 0.28em' }}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span
          key={i}
          aria-hidden="true"
          style={{ overflow: 'hidden', display: 'inline-block' }}
        >
          <motion.span
            style={{ display: 'inline-block' }}
            initial={{ y: '110%', opacity: 0 }}
            animate={isInView
              ? { y: '0%', opacity: 1 }
              : { y: '110%', opacity: 0 }
            }
            transition={{
              type: 'spring',
              stiffness: 220,
              damping: 22,
              delay: delay + i * 0.06,
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}