import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

/**
 * github_graph.jsx
 * Fetch contributions dari GitHub REST API (public, no token needed).
 * Menampilkan contribution heatmap 52 minggu terakhir.
 * Taruh di: src/components/widgets/github_graph.jsx
 *
 * Props:
 *   username — GitHub username (default: 'lixsukagits')
 */

const GITHUB_USERNAME = 'lixsukagits'

// Warna level kontribusi (mengikuti CSS var --primary untuk tinted)
const LEVEL_COLORS = [
  'var(--border)',       // 0 kontribusi
  'var(--primary-light)', // 1–3
  '#93c5fd',            // 4–6  (blue-300 — mid)
  'var(--primary)',     // 7–9
  '#1e3a8a',            // 10+  (deep)
]

function getLevel(count) {
  if (count === 0) return 0
  if (count <= 3)  return 1
  if (count <= 6)  return 2
  if (count <= 9)  return 3
  return 4
}

function getMonthLabels(weeks) {
  const labels = []
  let lastMonth = -1
  weeks.forEach((week, wi) => {
    const d = new Date(week[0].date)
    const m = d.getMonth()
    if (m !== lastMonth) {
      labels.push({ index: wi, label: d.toLocaleString('id-ID', { month: 'short' }) })
      lastMonth = m
    }
  })
  return labels
}

// Fallback: generate dummy data jika API gagal / rate limited
function generateDummyWeeks() {
  const weeks = []
  const today = new Date()
  for (let w = 51; w >= 0; w--) {
    const days = []
    for (let d = 0; d < 7; d++) {
      const date = new Date(today)
      date.setDate(today.getDate() - w * 7 - (6 - d))
      days.push({
        date: date.toISOString().split('T')[0],
        count: Math.random() < 0.35 ? 0 : Math.floor(Math.random() * 12),
      })
    }
    weeks.push(days)
  }
  return weeks
}

export default function GithubGraph({ username = GITHUB_USERNAME }) {
  const [weeks, setWeeks]   = useState([])
  const [total, setTotal]   = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError]   = useState(false)

  useEffect(() => {
    let cancelled = false

    async function fetchContributions() {
      setLoading(true)
      setError(false)
      try {
        // GitHub REST API: events endpoint — cek apakah user ada
        // Fallback ke dummy kalau gagal (rate limit, CORS, dll)
        const res = await fetch(
          `https://github-contributions-api.jogruber.de/v4/${username}?y=last`,
          { signal: AbortSignal.timeout(6000) }
        )
        if (!res.ok) throw new Error('fetch failed')
        const data = await res.json()

        // Bentuk data: { contributions: [{ date, count, level }] }
        // Group ke minggu (7 hari per minggu)
        const contribs = data.contributions || []
        const grouped = []
        for (let i = 0; i < contribs.length; i += 7) {
          grouped.push(contribs.slice(i, i + 7))
        }
        // Ambil 52 minggu terakhir
        const last52 = grouped.slice(-52)
        const sum = contribs.reduce((acc, c) => acc + c.count, 0)

        if (!cancelled) {
          setWeeks(last52)
          setTotal(sum)
        }
      } catch {
        if (!cancelled) {
          // Fallback ke dummy data
          const dummy = generateDummyWeeks()
          setWeeks(dummy)
          setTotal(dummy.flat().reduce((a, d) => a + d.count, 0))
          setError(true)
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchContributions()
    return () => { cancelled = true }
  }, [username])

  const monthLabels = weeks.length ? getMonthLabels(weeks) : []
  const CELL = 11
  const GAP  = 2

  return (
    <div className="card p-5 sm:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {/* GitHub icon */}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="var(--dark)" aria-hidden="true">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
          </svg>
          <span className="font-display font-bold text-sm" style={{ color: 'var(--dark)' }}>
            GitHub Contributions
          </span>
        </div>
        {!loading && (
          <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold hover:underline"
            style={{ color: 'var(--primary)' }}
          >
            @{username}
          </a>
        )}
      </div>

      {/* Total */}
      {!loading && (
        <p className="text-xs mb-3" style={{ color: 'var(--body-color)' }}>
          <span className="font-bold" style={{ color: 'var(--dark)' }}>{total.toLocaleString()}</span>
          {' '}kontribusi dalam 1 tahun terakhir
          {error && <span className="ml-2 opacity-50">(data estimasi)</span>}
        </p>
      )}

      {/* Graph */}
      {loading ? (
        <div className="space-y-1.5">
          {[...Array(7)].map((_, i) => (
            <div key={i} className="flex gap-1.5">
              {[...Array(52)].map((_, j) => (
                <div
                  key={j}
                  className="skeleton rounded-sm"
                  style={{ width: CELL, height: CELL, flexShrink: 0 }}
                />
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div style={{ overflowX: 'auto', overflowY: 'hidden' }}>
          <div style={{ minWidth: 52 * (CELL + GAP), position: 'relative' }}>
            {/* Month labels */}
            <div style={{
              display: 'flex',
              position: 'relative',
              height: 16,
              marginBottom: 4,
            }}>
              {monthLabels.map(({ index, label }) => (
                <span
                  key={label + index}
                  style={{
                    position: 'absolute',
                    left: index * (CELL + GAP),
                    fontSize: '0.6rem',
                    color: 'var(--body-color)',
                    fontWeight: 600,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {label}
                </span>
              ))}
            </div>

            {/* Day rows (Sun–Sat) */}
            <div style={{ display: 'flex', gap: GAP }}>
              {weeks.map((week, wi) => (
                <div key={wi} style={{ display: 'flex', flexDirection: 'column', gap: GAP }}>
                  {week.map((day, di) => (
                    <motion.div
                      key={day.date}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: wi * 0.004 + di * 0.002, duration: 0.2 }}
                      title={`${day.date}: ${day.count} kontribusi`}
                      style={{
                        width: CELL,
                        height: CELL,
                        borderRadius: 2,
                        background: LEVEL_COLORS[getLevel(day.count)],
                        cursor: day.count > 0 ? 'pointer' : 'default',
                        flexShrink: 0,
                        transition: 'transform 0.15s ease',
                      }}
                      whileHover={day.count > 0 ? { scale: 1.4, zIndex: 10 } : {}}
                    />
                  ))}
                </div>
              ))}
            </div>

            {/* Legend */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 8, justifyContent: 'flex-end' }}>
              <span style={{ fontSize: '0.6rem', color: 'var(--body-color)' }}>Sedikit</span>
              {LEVEL_COLORS.map((color, i) => (
                <div
                  key={i}
                  style={{ width: CELL, height: CELL, borderRadius: 2, background: color, flexShrink: 0 }}
                />
              ))}
              <span style={{ fontSize: '0.6rem', color: 'var(--body-color)' }}>Banyak</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}