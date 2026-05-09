import { motion } from 'framer-motion'

export default function WhatsappButton() {
  return (
    <motion.a
      href="https://wa.me/6281262729243"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 1.5, type: 'spring' }}
      className="fixed bottom-6 right-5 z-40 w-12 h-12 rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform"
      style={{ background: '#25D366' }}
      aria-label="Chat WhatsApp"
    >
      <img src="https://www.svgrepo.com/show/38250/whatsapp.svg" alt="WA" className="w-6 h-6" />
    </motion.a>
  )
}