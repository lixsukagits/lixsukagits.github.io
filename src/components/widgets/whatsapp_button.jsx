import { motion } from 'framer-motion'

export default function WhatsappButton() {
  return (
    <motion.a
      href="https://wa.me/6281262729243"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 1.2, type: 'spring', stiffness: 300 }}
      className="w-12 h-12 rounded-full flex items-center justify-center shadow-xl"
      style={{ background: '#25D366' }}
      aria-label="Chat WhatsApp"
      whileHover={{ scale: 1.12 }}
      whileTap={{ scale: 0.92 }}
    >
      <img src="https://www.svgrepo.com/show/38250/whatsapp.svg" alt="WA" className="w-6 h-6" />
    </motion.a>
  )
}