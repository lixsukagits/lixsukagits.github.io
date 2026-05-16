import { motion } from 'framer-motion'

const labelVariants = {
  hidden:  { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
}

const titleVariants = {
  hidden:  { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut', delay: 0.1 } },
}

export default function SectionHeader({ label, title, center = true }) {
  return (
    <div className={`mb-12 ${center ? 'text-center' : ''}`}>
      <motion.span
        className="section-label block mb-2"
        variants={labelVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {label}
      </motion.span>
      <motion.h2
        className="font-display text-3xl md:text-4xl font-bold"
        style={{ color: 'var(--dark)' }}
        variants={titleVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {title}
      </motion.h2>
    </div>
  )
}