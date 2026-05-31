import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * snake_game.jsx
 * Mini Snake game — playable di 404 page dan bisa di-embed di mana saja.
 * Kontrol: WASD / Arrow keys (desktop) + swipe gesture (mobile)
 * Taruh di: src/components/widgets/snake_game.jsx
 */

const CELL   = 18    // ukuran tiap sel dalam px
const COLS   = 18    // jumlah kolom
const ROWS   = 16    // jumlah baris
const W      = COLS * CELL
const H      = ROWS * CELL

const DIR = { UP: [0,-1], DOWN: [0,1], LEFT: [-1,0], RIGHT: [1,0] }

const SPEEDS = { easy: 200, normal: 130, hard: 75 }

function randomFood(snake) {
  let pos
  do {
    pos = [
      Math.floor(Math.random() * COLS),
      Math.floor(Math.random() * ROWS),
    ]
  } while (snake.some(s => s[0] === pos[0] && s[1] === pos[1]))
  return pos
}

const FOODS = ['🍎','🍊','🍋','🍇','🍓','🍑','🥝','🍉']
const INITIAL_SNAKE = [[9,8],[8,8],[7,8]]

export default function SnakeGame({ embedded = false }) {
  const canvasRef    = useRef(null)
  const stateRef     = useRef({
    snake: [...INITIAL_SNAKE.map(s => [...s])],
    dir:   [...DIR.RIGHT],
    nextDir: [...DIR.RIGHT],
    food:  [14, 8],
    score: 0,
    running: false,
    dead: false,
    foodEmoji: FOODS[0],
  })
  const intervalRef  = useRef(null)
  const touchStart   = useRef(null)

  const [displayScore, setDisplayScore] = useState(0)
  const [phase, setPhase]   = useState('idle')   // idle | playing | dead
  const [speed, setSpeed]   = useState('normal')
  const [hiScore, setHiScore] = useState(() => {
    try { return parseInt(localStorage.getItem('felix-snake-hi') || '0') } catch { return 0 }
  })

  /* ── Draw ── */
  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const s   = stateRef.current

    // Background grid
    ctx.fillStyle = getComputedStyle(document.documentElement)
      .getPropertyValue('--bg').trim() || '#f8fafc'
    ctx.fillRect(0, 0, W, H)

    // Grid lines
    ctx.strokeStyle = 'rgba(128,128,128,0.06)'
    ctx.lineWidth = 0.5
    for (let x = 0; x <= COLS; x++) {
      ctx.beginPath(); ctx.moveTo(x * CELL, 0); ctx.lineTo(x * CELL, H); ctx.stroke()
    }
    for (let y = 0; y <= ROWS; y++) {
      ctx.beginPath(); ctx.moveTo(0, y * CELL); ctx.lineTo(W, y * CELL); ctx.stroke()
    }

    // Food
    ctx.font = `${CELL - 2}px serif`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(
      s.foodEmoji,
      s.food[0] * CELL + CELL / 2,
      s.food[1] * CELL + CELL / 2,
    )

    // Snake
    s.snake.forEach(([x, y], i) => {
      const primary = getComputedStyle(document.documentElement)
        .getPropertyValue('--primary').trim() || '#3758F9'

      if (i === 0) {
        // Head
        ctx.fillStyle = primary
        ctx.beginPath()
        ctx.roundRect(x * CELL + 1, y * CELL + 1, CELL - 2, CELL - 2, 4)
        ctx.fill()
        // Eyes
        ctx.fillStyle = '#fff'
        const [ex1, ey1, ex2, ey2] = s.dir[0] === 0
          ? [x*CELL+4, y*CELL+5, x*CELL+CELL-4, y*CELL+5]
          : [x*CELL+CELL/2-2, y*CELL+4, x*CELL+CELL/2-2, y*CELL+CELL-4]
        ctx.beginPath(); ctx.arc(ex1, ey1, 2, 0, Math.PI*2); ctx.fill()
        ctx.beginPath(); ctx.arc(ex2, ey2, 2, 0, Math.PI*2); ctx.fill()
      } else {
        // Body — gradient dari primary ke lighter
        const alpha = Math.max(0.3, 1 - (i / s.snake.length) * 0.6)
        ctx.fillStyle = primary + Math.round(alpha * 255).toString(16).padStart(2,'0')
        ctx.beginPath()
        ctx.roundRect(x * CELL + 2, y * CELL + 2, CELL - 4, CELL - 4, 3)
        ctx.fill()
      }
    })
  }, [])

  /* ── Game loop tick ── */
  const tick = useCallback(() => {
    const s = stateRef.current
    if (!s.running) return

    s.dir = [...s.nextDir]
    const head  = [s.snake[0][0] + s.dir[0], s.snake[0][1] + s.dir[1]]

    // Wall collision
    if (head[0] < 0 || head[0] >= COLS || head[1] < 0 || head[1] >= ROWS) {
      s.running = false; s.dead = true
      setPhase('dead')
      if (s.score > hiScore) {
        setHiScore(s.score)
        try { localStorage.setItem('felix-snake-hi', s.score) } catch {}
      }
      return
    }

    // Self collision
    if (s.snake.some(seg => seg[0] === head[0] && seg[1] === head[1])) {
      s.running = false; s.dead = true
      setPhase('dead')
      if (s.score > hiScore) {
        setHiScore(s.score)
        try { localStorage.setItem('felix-snake-hi', s.score) } catch {}
      }
      return
    }

    const ateFood = head[0] === s.food[0] && head[1] === s.food[1]
    s.snake = [head, ...s.snake]
    if (!ateFood) s.snake.pop()
    else {
      s.score += 10
      setDisplayScore(s.score)
      s.food = randomFood(s.snake)
      s.foodEmoji = FOODS[Math.floor(Math.random() * FOODS.length)]
    }
    draw()
  }, [draw, hiScore])

  /* ── Start / Restart ── */
  const startGame = useCallback(() => {
    const s = stateRef.current
    s.snake   = INITIAL_SNAKE.map(s => [...s])
    s.dir     = [...DIR.RIGHT]
    s.nextDir = [...DIR.RIGHT]
    s.food    = randomFood(s.snake)
    s.foodEmoji = FOODS[Math.floor(Math.random() * FOODS.length)]
    s.score   = 0
    s.running = true
    s.dead    = false
    setDisplayScore(0)
    setPhase('playing')
    clearInterval(intervalRef.current)
    intervalRef.current = setInterval(tick, SPEEDS[speed])
    draw()
  }, [tick, draw, speed])

  /* ── Keyboard ── */
  useEffect(() => {
    const handler = (e) => {
      const s = stateRef.current
      if (!s.running) return
      const map = {
        ArrowUp: DIR.UP, ArrowDown: DIR.DOWN, ArrowLeft: DIR.LEFT, ArrowRight: DIR.RIGHT,
        w: DIR.UP, s: DIR.DOWN, a: DIR.LEFT, d: DIR.RIGHT,
        W: DIR.UP, S: DIR.DOWN, A: DIR.LEFT, D: DIR.RIGHT,
      }
      const newDir = map[e.key]
      if (!newDir) return
      // Cegah balik arah 180°
      if (newDir[0] === -s.dir[0] && newDir[1] === -s.dir[1]) return
      e.preventDefault()
      s.nextDir = newDir
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  /* ── Touch swipe ── */
  const handleTouchStart = (e) => {
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
  }
  const handleTouchEnd = (e) => {
    if (!touchStart.current) return
    const dx = e.changedTouches[0].clientX - touchStart.current.x
    const dy = e.changedTouches[0].clientY - touchStart.current.y
    const s  = stateRef.current
    if (!s.running) return
    if (Math.abs(dx) > Math.abs(dy)) {
      const newDir = dx > 0 ? DIR.RIGHT : DIR.LEFT
      if (newDir[0] !== -s.dir[0]) s.nextDir = newDir
    } else {
      const newDir = dy > 0 ? DIR.DOWN : DIR.UP
      if (newDir[1] !== -s.dir[1]) s.nextDir = newDir
    }
    touchStart.current = null
  }

  /* ── Draw on mount ── */
  useEffect(() => { draw() }, [draw])

  /* ── Cleanup ── */
  useEffect(() => () => clearInterval(intervalRef.current), [])

  /* ── Mobile D-pad ── */
  const DPad = () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
      gridTemplateRows: '1fr 1fr 1fr', gap: 4, width: 120, margin: '0.75rem auto 0' }}>
      {[
        { dir: DIR.UP,    label: '↑', col: 2, row: 1 },
        { dir: DIR.LEFT,  label: '←', col: 1, row: 2 },
        { dir: DIR.DOWN,  label: '↓', col: 2, row: 3 },
        { dir: DIR.RIGHT, label: '→', col: 3, row: 2 },
      ].map(({ dir: d, label, col, row }) => (
        <button key={label}
          onTouchStart={(e) => { e.preventDefault(); const s = stateRef.current; if (d[0] !== -s.dir[0] || d[1] !== -s.dir[1]) s.nextDir = d }}
          onClick={() => { const s = stateRef.current; if (d[0] !== -s.dir[0] || d[1] !== -s.dir[1]) s.nextDir = d }}
          style={{
            gridColumn: col, gridRow: row,
            width: 36, height: 36, borderRadius: '0.5rem',
            background: 'var(--card-bg)', border: '1px solid var(--border)',
            color: 'var(--dark)', fontSize: '1rem', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            userSelect: 'none',
          }}>
          {label}
        </button>
      ))}
    </div>
  )

  return (
    <div style={{ textAlign: 'center' }}>
      {/* Score bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        marginBottom: '0.5rem', padding: '0 0.25rem' }}>
        <div style={{ fontSize: '0.75rem', color: 'var(--body-color)' }}>
          <span style={{ fontWeight: 700, color: 'var(--dark)' }}>Score: </span>
          <span style={{ color: 'var(--primary)', fontWeight: 800 }}>{displayScore}</span>
        </div>
        <div style={{ fontSize: '0.75rem', color: 'var(--body-color)' }}>
          <span style={{ fontWeight: 700, color: 'var(--dark)' }}>Best: </span>
          <span style={{ color: '#f59e0b', fontWeight: 800 }}>{hiScore}</span>
        </div>
        {/* Speed selector */}
        {phase !== 'playing' && (
          <div style={{ display: 'flex', gap: 4 }}>
            {Object.keys(SPEEDS).map(s => (
              <button key={s} onClick={() => setSpeed(s)}
                style={{
                  fontSize: '0.6rem', padding: '0.2rem 0.4rem', borderRadius: 4,
                  border: '1px solid var(--border)', cursor: 'pointer',
                  background: speed === s ? 'var(--primary)' : 'var(--bg)',
                  color: speed === s ? '#fff' : 'var(--body-color)',
                  fontWeight: 600, textTransform: 'capitalize',
                }}>
                {s}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Canvas */}
      <div style={{ position: 'relative', display: 'inline-block', borderRadius: '0.75rem',
        overflow: 'hidden', border: '2px solid var(--border)' }}>
        <canvas ref={canvasRef} width={W} height={H}
          style={{ display: 'block', touchAction: 'none' }}
          onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} />

        {/* Overlay: idle / dead */}
        <AnimatePresence>
          {phase !== 'playing' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{
                position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)',
              }}>
              {phase === 'dead' ? (
                <>
                  <motion.p animate={{ scale: [1,1.2,1] }} transition={{ duration: 0.4 }}
                    style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>💀</motion.p>
                  <p style={{ color: '#fff', fontWeight: 800, fontSize: '1.1rem', marginBottom: '0.25rem' }}>
                    Game Over!
                  </p>
                  <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem', marginBottom: '1rem' }}>
                    Score: {displayScore}
                    {displayScore >= hiScore && displayScore > 0 && ' 🎉 New Best!'}
                  </p>
                </>
              ) : (
                <>
                  <p style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🐍</p>
                  <p style={{ color: '#fff', fontWeight: 800, fontSize: '1rem', marginBottom: '0.5rem' }}>
                    Snake Game
                  </p>
                  <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.72rem', marginBottom: '1rem' }}>
                    WASD / Arrow / Swipe
                  </p>
                </>
              )}
              <motion.button onClick={startGame}
                whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.95 }}
                style={{
                  padding: '0.6rem 1.8rem', borderRadius: 9999,
                  background: 'linear-gradient(135deg, var(--primary), #7c3aed)',
                  color: '#fff', fontWeight: 700, fontSize: '0.875rem',
                  border: 'none', cursor: 'pointer',
                  boxShadow: '0 4px 16px rgba(55,88,249,0.4)',
                }}>
                {phase === 'dead' ? 'Main Lagi' : 'Mulai Main'}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* D-pad mobile */}
      <DPad />

      <p style={{ fontSize: '0.6rem', color: 'var(--body-color)', marginTop: '0.5rem', opacity: 0.5 }}>
        Desktop: Arrow / WASD · Mobile: Swipe atau D-pad
      </p>
    </div>
  )
}