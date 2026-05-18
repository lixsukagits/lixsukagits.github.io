import { useEffect, useRef, useState, useCallback } from 'react'
import { useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { onEasterEgg } from '../../store/use_easter_egg'

/* ─── CONSTANTS ─────────────────────────────────────────────── */
const SECRET = 'felix'
const KONAMI  = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown',
                 'ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a']
const EMOJIS  = ['🎉','✨','🔥','🏆','💻','🇨🇳','🏸','⭐','🎊','💙','🌟','🎯','🚀','💎']

// Jumlah halaman unik yang harus dikunjungi untuk trigger egg "explorer"
const EXPLORER_THRESHOLD = 5

/* ─── EGG DEFINITIONS ───────────────────────────────────────── */
const EGGS = {
  felix: {
    emoji: '🎉',
    title: 'Easter Egg Ditemukan!',
    subtitle: 'Kamu ketik "felix" di keyboard',
    accent: 'linear-gradient(90deg, #3758F9, #7c3aed, #06b6d4, #3758F9)',
    accentColor: '#3758F9',
    buttonLabel: 'Keren! ✨',
    buttonColor: 'linear-gradient(135deg, #3758F9, #7c3aed)',
    confettiCount: 40,
    content: () => (
      <>
        <p style={{ fontSize:'0.875rem', color:'var(--body-color)', lineHeight:1.7, marginBottom:'0.5rem' }}>
          Selamat! Kamu berhasil menemukan pesan rahasia Felix 🏆
        </p>
        <div style={{ margin:'1rem auto', padding:'0.75rem 1.25rem', borderRadius:'0.75rem',
          background:'var(--primary-light)', border:'1px solid var(--border)', display:'inline-block' }}>
          <p style={{ fontSize:'1.2rem', fontWeight:800, color:'var(--primary)', letterSpacing:'0.08em', marginBottom:'0.2rem' }}>
            学无止境
          </p>
          <p style={{ fontSize:'0.72rem', color:'var(--body-color)', fontStyle:'italic' }}>
            "Belajar tidak ada batasnya"
          </p>
        </div>
        <div style={{ display:'flex', flexWrap:'wrap', gap:6, justifyContent:'center', margin:'1rem 0 0.5rem' }}>
          {['#IT Enthusiast','#Web Dev','#China 🇨🇳','#Badminton 🏸'].map(tag => (
            <span key={tag} style={{ fontSize:'0.68rem', fontWeight:600, padding:'0.25rem 0.6rem',
              borderRadius:999, background:'var(--bg)', border:'1px solid var(--border)', color:'var(--body-color)' }}>
              {tag}
            </span>
          ))}
        </div>
      </>
    ),
  },

  konami: {
    emoji: '🎮',
    emojiAnimate: true,
    title: 'Konami Code!',
    subtitle: '↑↑↓↓←→←→BA',
    accent: 'linear-gradient(90deg, #f59e0b, #ef4444, #7c3aed)',
    accentColor: '#f59e0b',
    buttonLabel: 'Player 1 Start! 🎮',
    buttonColor: 'linear-gradient(135deg, #f59e0b, #ef4444)',
    confettiCount: 60,
    content: () => (
      <>
        <p style={{ fontSize:'0.875rem', color:'var(--body-color)', lineHeight:1.7, marginBottom:'1rem' }}>
          Luar biasa! Kamu tahu Konami Code?<br />
          <span style={{ fontWeight:700, color:'var(--dark)' }}>+30 nyawa</span> untuk semangat belajarmu 🚀
        </p>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, marginBottom:'0.5rem' }}>
          {[['🏆','5','Medali Emas'],['📜','8+','Sertifikat'],['🇨🇳','HSK3','Mandarin'],['💻','3+','Proyek']].map(([icon,val,label]) => (
            <div key={label} style={{ padding:'0.6rem', borderRadius:'0.75rem', background:'var(--bg)',
              border:'1px solid var(--border)', textAlign:'center' }}>
              <div style={{ fontSize:'1.3rem' }}>{icon}</div>
              <div className='font-display font-extrabold text-[var(--primary)] text-tracked' style={{ fontSize:'1rem' }}>{val}</div>
              <div className='text-[var(--body-color)]' style={{ fontSize:'0.65rem' }}>{label}</div>
            </div>
          ))}
        </div>
      </>
    ),
  },

  photo: {
    emoji: '📸',
    title: 'Kamu Stalker Nih! 😂',
    subtitle: 'Klik foto 5x berturut-turut',
    accent: 'linear-gradient(90deg, #ec4899, #f59e0b, #ec4899)',
    accentColor: '#ec4899',
    buttonLabel: 'Hehe ketahuan 🙈',
    buttonColor: 'linear-gradient(135deg, #ec4899, #f59e0b)',
    confettiCount: 35,
    content: () => (
      <>
        <p style={{ fontSize:'0.875rem', color:'var(--body-color)', lineHeight:1.7, marginBottom:'1rem' }}>
          Udah klik foto Felix berapa kali? 👀<br />
          Tenang, Felix tahu kamu penasaran 😄
        </p>
        <div style={{ padding:'0.75rem', borderRadius:'0.75rem', background:'var(--bg)',
          border:'1px solid var(--border)', marginBottom:'0.5rem' }}>
          <p className='font-semibold text-tracked-tight text-[var(--dark)] mb-1' style={{ fontSize:'0.8rem' }}>Fun Fact:</p>
          <p style={{ fontSize:'0.75rem', color:'var(--body-color)', lineHeight:1.6 }}>
            Felix suka badminton, benci bangun pagi, dan lagi ngejar beasiswa ke China 🇨🇳
          </p>
        </div>
      </>
    ),
  },

  trophy: {
    emoji: '🏆',
    emojiAnimate: true,
    title: 'Trophy Hunter!',
    subtitle: 'Klik medali 7x berturut-turut',
    accent: 'linear-gradient(90deg, #f59e0b, #fbbf24, #f59e0b)',
    accentColor: '#f59e0b',
    buttonLabel: 'Respect! 🫡',
    buttonColor: 'linear-gradient(135deg, #f59e0b, #d97706)',
    confettiCount: 50,
    content: () => (
      <>
        <p style={{ fontSize:'0.875rem', color:'var(--body-color)', lineHeight:1.7, marginBottom:'1rem' }}>
          Kamu menghargai setiap medali Felix — terima kasih! 🥹
        </p>
        <div style={{ display:'flex', gap:8, justifyContent:'center', flexWrap:'wrap', marginBottom:'0.75rem' }}>
          {['🥇','🥇','🥇','🥇','🥇'].map((m, i) => (
            <motion.span key={i} style={{ fontSize:'2rem' }}
              animate={{ y:[0,-12,0], rotate:[0,10,-10,0] }}
              transition={{ duration:1.2, repeat:Infinity, delay:i*0.2 }}>{m}</motion.span>
          ))}
        </div>
        <p style={{ fontSize:'0.75rem', color:'var(--body-color)' }}>
          5 medali emas yang tidak datang dari bakat, tapi dari latihan tiap hari 💪
        </p>
      </>
    ),
  },

  disco: {
    emoji: '🕺',
    emojiAnimate: true,
    title: 'Disco Mode! 🪩',
    subtitle: 'Toggle dark mode 10x',
    accent: 'linear-gradient(90deg, #ff0080, #7928ca, #ff0080)',
    accentColor: '#7928ca',
    buttonLabel: 'Yee-haw! 🎉',
    buttonColor: 'linear-gradient(135deg, #ff0080, #7928ca)',
    confettiCount: 80,
    content: () => (
      <>
        <p style={{ fontSize:'0.875rem', color:'var(--body-color)', lineHeight:1.7, marginBottom:'1rem' }}>
          Kamu toggle dark mode terus — mau yang mana sih? 😂
        </p>
        <motion.div style={{ display:'flex', gap:6, justifyContent:'center', marginBottom:'0.75rem', flexWrap:'wrap' }}>
          {['#ff0080','#7928ca','#3758F9','#10b981','#f59e0b','#ef4444'].map((c, i) => (
            <motion.div key={c} style={{ width:24, height:24, borderRadius:'50%', background:c }}
              animate={{ scale:[1,1.4,1], rotate:[0,180,360] }}
              transition={{ duration:1.5, repeat:Infinity, delay:i*0.15 }} />
          ))}
        </motion.div>
        <p style={{ fontSize:'0.75rem', color:'var(--body-color)' }}>
          Felix adalah pemilik website paling colorful di SMK! 🌈
        </p>
      </>
    ),
  },

  shake: {
    emoji: '📱',
    title: 'Iya Iya, Santai! 😅',
    subtitle: 'HP kamu digoyangkan terlalu keras',
    accent: 'linear-gradient(90deg, #10b981, #3758F9, #10b981)',
    accentColor: '#10b981',
    buttonLabel: 'Oke oke! 🤙',
    buttonColor: 'linear-gradient(135deg, #10b981, #3758F9)',
    confettiCount: 30,
    content: () => (
      <>
        <p style={{ fontSize:'0.875rem', color:'var(--body-color)', lineHeight:1.7, marginBottom:'1rem' }}>
          Goyangan detected! Felix juga sering goyangkan kepala pas lagu favorit di coding session 🎵
        </p>
        <div style={{ padding:'0.75rem', borderRadius:'0.75rem', background:'var(--bg)', border:'1px solid var(--border)' }}>
          <p style={{ fontSize:'0.75rem', color:'var(--body-color)', lineHeight:1.6 }}>
            🎧 Playlist coding Felix:<br />Lo-fi Hip Hop · Chinese Indie · OST Drama 🇨🇳
          </p>
        </div>
      </>
    ),
  },

  longpress: {
    emoji: '👆',
    title: 'Sabar Banget Kamu!',
    subtitle: 'Long press logo 2 detik',
    accent: 'linear-gradient(90deg, #06b6d4, #3758F9, #06b6d4)',
    accentColor: '#06b6d4',
    buttonLabel: 'Hehe! 😄',
    buttonColor: 'linear-gradient(135deg, #06b6d4, #3758F9)',
    confettiCount: 30,
    content: () => (
      <>
        <p style={{ fontSize:'0.875rem', color:'var(--body-color)', lineHeight:1.7, marginBottom:'1rem' }}>
          Kamu tahan logo Felix 2 detik — kesabaran level dewa! 🧘
        </p>
        <div style={{ padding:'0.75rem', borderRadius:'0.75rem', background:'var(--bg)', border:'1px solid var(--border)' }}>
          <p className='font-semibold text-tracked-tight text-[var(--dark)] mb-1' style={{ fontSize:'0.75rem' }}>Kata Felix:</p>
          <p style={{ fontSize:'0.75rem', color:'var(--body-color)', fontStyle:'italic', lineHeight:1.6 }}>
            "Kesabaran adalah kunci — belajar bahasa Mandarin mengajarkan itu."
          </p>
        </div>
      </>
    ),
  },

  // Easter egg #8 — sudah kunjungi 5+ halaman unik
  explorer: {
    emoji: '🗺️',
    title: 'Explorer Sejati!',
    subtitle: `Sudah jelajah ${EXPLORER_THRESHOLD} halaman berbeda`,
    accent: 'linear-gradient(90deg, #8b5cf6, #06b6d4, #8b5cf6)',
    accentColor: '#8b5cf6',
    buttonLabel: 'Mantap! 🔍',
    buttonColor: 'linear-gradient(135deg, #8b5cf6, #06b6d4)',
    confettiCount: 35,
    content: () => (
      <>
        <p style={{ fontSize:'0.875rem', color:'var(--body-color)', lineHeight:1.7, marginBottom:'1rem' }}>
          Kamu sudah jelajah {EXPLORER_THRESHOLD}+ halaman portfolio Felix — kamu pasti orang yang detail dan penasaran! 🔍
        </p>
        <div style={{ padding:'0.75rem', borderRadius:'0.75rem', background:'var(--bg)', border:'1px solid var(--border)' }}>
          <p style={{ fontSize:'0.75rem', color:'var(--body-color)', lineHeight:1.6 }}>
            💡 Hidden gem: halaman <strong style={{ color:'var(--primary)' }}>/now</strong> selalu diupdate Felix tiap beberapa minggu. Cek yuk!
          </p>
        </div>
      </>
    ),
  },

  waSecret: {
    emoji: '📞',
    title: 'Mau Ngobrol Nih?',
    subtitle: 'Tap kartu WA 5x cepat',
    accent: 'linear-gradient(90deg, #25D366, #128C7E, #25D366)',
    accentColor: '#25D366',
    buttonLabel: "Let's chat! 💬",
    buttonColor: 'linear-gradient(135deg, #25D366, #128C7E)',
    confettiCount: 25,
    content: () => (
      <>
        <p style={{ fontSize:'0.875rem', color:'var(--body-color)', lineHeight:1.7, marginBottom:'1rem' }}>
          Kamu tap kartu WA Felix berkali-kali — langsung hubungi aja ga usah malu! 😄
        </p>
        <motion.a href="https://wa.me/6281262729243" target="_blank" rel="noopener noreferrer"
          style={{ display:'inline-block', padding:'0.6rem 1.5rem', borderRadius:9999,
            background:'#25D366', color:'#fff', fontWeight:700, fontSize:'0.85rem', textDecoration:'none' }}
          whileHover={{ scale:1.05 }} whileTap={{ scale:0.96 }}>
          💬 Chat Felix Sekarang
        </motion.a>
      </>
    ),
  },

  midnight: {
    emoji: '🌙',
    title: 'Night Owl Detected!',
    subtitle: 'Buka website jam 00:00 – 01:00',
    accent: 'linear-gradient(90deg, #1e1b4b, #4c1d95, #1e1b4b)',
    accentColor: '#7c3aed',
    buttonLabel: 'Tetap semangat! 🌙',
    buttonColor: 'linear-gradient(135deg, #4c1d95, #7c3aed)',
    confettiCount: 20,
    content: () => (
      <>
        <p style={{ fontSize:'0.875rem', color:'var(--body-color)', lineHeight:1.7, marginBottom:'1rem' }}>
          Jam segini masih jelajah portfolio? Felix biasanya juga masih coding jam segini! 🦉
        </p>
        <div style={{ padding:'0.75rem', borderRadius:'0.75rem', background:'var(--bg)', border:'1px solid var(--border)' }}>
          <p className='font-semibold text-tracked-tight text-[var(--dark)] mb-1' style={{ fontSize:'0.8rem' }}>Kata Felix:</p>
          <p style={{ fontSize:'0.75rem', color:'var(--body-color)', fontStyle:'italic', lineHeight:1.6 }}>
            "Malam adalah waktu paling produktif. Dunia tidur, kita belajar." 🌟
          </p>
        </div>
      </>
    ),
  },
}

/* ─── RAIN DROP ──────────────────────────────────────────────── */
function RainDrop({ emoji, left, duration, delay, rotation }) {
  return (
    <motion.div aria-hidden="true"
      initial={{ y:'-2rem', opacity:1, rotate:0 }}
      animate={{ y:'110vh', opacity:0, rotate:rotation }}
      transition={{ duration, delay, ease:'linear' }}
      style={{ position:'fixed', top:0, left:`${left}%`, fontSize:'1.4rem',
        pointerEvents:'none', zIndex:99999, userSelect:'none' }}>
      {emoji}
    </motion.div>
  )
}

/* ─── EGG MODAL — hanya bisa tutup via tombol ────────────────── */
function EggModal({ eggId, onClose }) {
  const egg = EGGS[eggId]
  if (!egg) return null
  const closeRef = useRef(null)

  useEffect(() => {
    // Focus tombol tutup saat modal muncul
    setTimeout(() => closeRef.current?.focus(), 80)

    // Tangkap Escape untuk tutup modal
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <AnimatePresence>
      {/* Backdrop — pointer-events: none, tidak bisa diklik */}
      <motion.div aria-hidden="true"
        initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
        style={{
          position:'fixed', inset:0, zIndex:99997,
          background:'rgba(0,0,0,0.65)', backdropFilter:'blur(7px)',
          // TIDAK ada onClick — backdrop tidak interaktif
          pointerEvents:'none',
        }}
      />

      {/* Modal */}
      <motion.div
        role="dialog" aria-modal="true" aria-label={egg.title}
        initial={{ opacity:0, scale:0.78, x:'-50%', y:'calc(-50% + 28px)' }}
        animate={{ opacity:1, scale:1,    x:'-50%', y:'-50%' }}
        exit={{   opacity:0, scale:0.78,  x:'-50%', y:'calc(-50% + 28px)' }}
        transition={{ type:'spring', stiffness:320, damping:22 }}
        style={{
          position:'fixed', top:'50%', left:'50%', zIndex:99998,
          borderRadius:'1.5rem', padding:'2.5rem 2rem 2rem', textAlign:'center',
          maxWidth:380, width:'90vw', overflow:'hidden',
          background:'var(--card-bg)', border:'2px solid var(--border)',
          boxShadow:'0 40px 80px rgba(0,0,0,0.35), 0 0 0 1px rgba(55,88,249,0.15)',
          // Modal sendiri TIDAK preventDefault klik — tidak perlu stopPropagation
        }}
      >
        {/* Top accent bar */}
        <div aria-hidden="true" style={{
          position:'absolute', top:0, left:0, right:0, height:4,
          background:egg.accent, backgroundSize:'200% auto',
          animation:'gradientShift 3s linear infinite',
        }} />

        {/* Blob bg dekoratif */}
        <div aria-hidden="true" style={{
          position:'absolute', top:-40, right:-40, width:160, height:160,
          borderRadius:'50%', opacity:0.08, pointerEvents:'none',
          background:`radial-gradient(circle, ${egg.accentColor}, transparent 70%)`,
        }} />

        {/* Emoji */}
        {egg.emojiAnimate ? (
          <motion.div aria-hidden="true"
            animate={{ y:[0,-10,0], rotate:[0,-8,8,0] }}
            transition={{ duration:1.2, repeat:Infinity }}
            style={{ fontSize:'3.5rem', marginBottom:'0.75rem' }}>
            {egg.emoji}
          </motion.div>
        ) : (
          <motion.div aria-hidden="true"
            animate={{ rotate:[0,-8,8,-8,0], scale:[1,1.15,1] }}
            transition={{ duration:0.6, delay:0.2 }}
            style={{ fontSize:'3.5rem', marginBottom:'0.75rem' }}>
            {egg.emoji}
          </motion.div>
        )}

        <h3 style={{ fontFamily:'var(--font-display)', fontSize:'1.25rem', fontWeight:800,
          color:'var(--dark)', marginBottom:'0.25rem', letterSpacing:'-0.02em' }}
          className="text-tracked">
          {egg.title}
        </h3>
        <p style={{ fontSize:'0.72rem', color:egg.accentColor, fontWeight:700,
          letterSpacing:'0.08em', marginBottom:'0.5rem' }}>
          {egg.subtitle}
        </p>
        <div aria-hidden="true" style={{ width:40, height:3, borderRadius:2,
          margin:'0.75rem auto 1rem', background:egg.buttonColor }} />

        <egg.content />

        {/* Tombol tutup — SATU-SATUNYA cara keluar */}
        <motion.button
          ref={closeRef}
          onClick={onClose}
          aria-label={`Tutup — ${egg.title}`}
          whileHover={{ scale:1.05 }} whileTap={{ scale:0.96 }}
          style={{
            marginTop:'1.25rem', padding:'0.7rem 2.5rem', borderRadius:9999,
            background:egg.buttonColor, color:'#fff', fontWeight:700,
            fontSize:'0.875rem', border:'none', cursor:'pointer',
            boxShadow:`0 8px 24px ${egg.accentColor}45`,
            minWidth:44, minHeight:44, display:'block', margin:'1.25rem auto 0',
          }}
        >
          {egg.buttonLabel}
        </motion.button>

        {/* Hint kecil */}
        <p style={{ fontSize:'0.6rem', color:'var(--body-color)', opacity:0.4, marginTop:'0.5rem' }}>
          Tekan tombol di atas atau Esc untuk menutup
        </p>
      </motion.div>
    </AnimatePresence>
  )
}

/* ─── MAIN EASTER EGG COMPONENT ─────────────────────────────── */
export default function EasterEgg() {
  const [activeEgg, setActiveEgg] = useState(null)
  const [drops, setDrops]         = useState([])
  const location = useLocation()

  // Buffers
  const felixBuf    = useRef('')
  const konamiBuf   = useRef([])
  const discoCount  = useRef(0)
  const discoTimer  = useRef(null)
  const visitedPages = useRef(new Set())
  const explorerTriggered = useRef(false)
  const midnightShown = useRef(false)

  /* ── Spawn konfeti ── */
  const spawnRain = useCallback((count = 40) => {
    setDrops(Array.from({ length: count }, (_, i) => ({
      id: Date.now() + i,
      emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
      left: Math.random() * 100,
      duration: 1.3 + Math.random() * 1.4,
      delay: Math.random() * 1.8,
      rotation: (Math.random() - 0.5) * 120,
    })))
  }, [])

  /* ── Trigger egg ── */
  const trigger = useCallback((id) => {
    if (activeEgg) return   // tidak tumpuk
    const egg = EGGS[id]
    if (!egg) return
    spawnRain(egg.confettiCount)
    setActiveEgg(id)
  }, [activeEgg, spawnRain])

  /* ── Close — HANYA via tombol/Esc ── */
  const close = useCallback(() => {
    setActiveEgg(null)
    setDrops([])
  }, [])

  /* ── Listen dari halaman lain (event bus) ── */
  useEffect(() => {
    const off = onEasterEgg((id) => trigger(id))
    return off
  }, [trigger])

  /* ── 1 & 2: Keyboard (felix + Konami) ── */
  useEffect(() => {
    const handler = (e) => {
      const tag = document.activeElement?.tagName
      const isInput = tag === 'INPUT' || tag === 'TEXTAREA'

      // Konami — works everywhere
      konamiBuf.current = [...konamiBuf.current, e.key].slice(-KONAMI.length)
      if (konamiBuf.current.join(',') === KONAMI.join(',')) {
        konamiBuf.current = []; trigger('konami'); return
      }

      // Felix — skip di input
      if (isInput) return
      felixBuf.current = (felixBuf.current + e.key).slice(-SECRET.length)
      if (felixBuf.current === SECRET) { felixBuf.current = ''; trigger('felix') }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [trigger])

  /* ── 5: Dark mode toggle 10x ── */
  useEffect(() => {
    const handler = () => {
      discoCount.current += 1
      clearTimeout(discoTimer.current)
      discoTimer.current = setTimeout(() => { discoCount.current = 0 }, 3000)
      if (discoCount.current >= 10) { discoCount.current = 0; trigger('disco') }
    }
    window.addEventListener('felix:theme-toggle', handler)
    return () => window.removeEventListener('felix:theme-toggle', handler)
  }, [trigger])

  /* ── 6: Shake HP ── */
  useEffect(() => {
    if (typeof window === 'undefined') return
    let lastAcc = null
    let shakeTimeout = null
    let shakeCount = 0
    let shakeReset = null

    const handleMotion = (e) => {
      const acc = e.accelerationIncludingGravity
      if (!acc) return
      const { x, y, z } = acc
      if (lastAcc) {
        const total = Math.abs(x - lastAcc.x) + Math.abs(y - lastAcc.y) + Math.abs(z - lastAcc.z)
        if (total > 45) {
          shakeCount += 1
          clearTimeout(shakeReset)
          shakeReset = setTimeout(() => { shakeCount = 0 }, 1500)
          if (shakeCount >= 3) {   // butuh 3 gerakan keras berturut
            shakeCount = 0
            clearTimeout(shakeTimeout)
            shakeTimeout = setTimeout(() => trigger('shake'), 100)
          }
        }
      }
      lastAcc = { x, y, z }
    }

    if (typeof DeviceMotionEvent !== 'undefined' &&
        typeof DeviceMotionEvent.requestPermission === 'function') {
      const req = () => {
        DeviceMotionEvent.requestPermission().then(p => {
          if (p === 'granted') window.addEventListener('devicemotion', handleMotion)
        }).catch(() => {})
        window.removeEventListener('touchstart', req)
      }
      window.addEventListener('touchstart', req, { once: true })
    } else {
      window.addEventListener('devicemotion', handleMotion)
    }
    return () => { window.removeEventListener('devicemotion', handleMotion); clearTimeout(shakeTimeout) }
  }, [trigger])

  /* ── 8: Explorer — kunjungi 5 halaman unik ── */
  useEffect(() => {
    if (explorerTriggered.current) return
    const path = location.pathname
    visitedPages.current.add(path)
    if (visitedPages.current.size >= EXPLORER_THRESHOLD) {
      explorerTriggered.current = true
      // Delay kecil agar page transition selesai dulu
      const t = setTimeout(() => trigger('explorer'), 800)
      return () => clearTimeout(t)
    }
  }, [location.pathname, trigger])

  /* ── 10: Midnight ── */
  useEffect(() => {
    const check = () => {
      const h = new Date().getHours()
      if (h === 0 && !midnightShown.current) {
        midnightShown.current = true
        setTimeout(() => trigger('midnight'), 2000)
      }
    }
    check()
    const interval = setInterval(check, 60000)
    return () => clearInterval(interval)
  }, [trigger])

  return (
    <>
      {/* Konfeti */}
      <AnimatePresence>
        {drops.map(d => <RainDrop key={d.id} {...d} />)}
      </AnimatePresence>

      {/* Modal */}
      <AnimatePresence>
        {activeEgg && <EggModal key={activeEgg} eggId={activeEgg} onClose={close} />}
      </AnimatePresence>
    </>
  )
}