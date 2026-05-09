import { useEffect, useRef } from 'react'
import { useThemeStore } from '../../store/use_theme_store'

/**
 * GuestbookGiscus — embed Giscus komentar sebagai guestbook
 *
 * SETUP (lakukan sekali):
 * 1. Buka https://giscus.app
 * 2. Masukkan repo: lixsukagits/lixsukagits.github.io (atau repo portfolio kamu)
 * 3. Pilih "Discussions" → category "General" (atau buat category "Guestbook")
 * 4. Salin nilai data-repo, data-repo-id, data-category, data-category-id
 * 5. Ganti 4 konstanta di bawah ini dengan nilai dari giscus.app
 *
 * PASTIKAN di GitHub repo:
 * - Settings → Features → Discussions: ✅ enabled
 * - Repo harus PUBLIC
 * - Install Giscus GitHub App: https://github.com/apps/giscus
 */

const GISCUS_REPO          = 'lixsukagits/lixsukagits.github.io' // ganti jika berbeda
const GISCUS_REPO_ID       = 'GANTI_REPO_ID'                      // dari giscus.app
const GISCUS_CATEGORY      = 'General'                             // nama category discussions
const GISCUS_CATEGORY_ID   = 'GANTI_CATEGORY_ID'                  // dari giscus.app

export default function GuestbookGiscus() {
  const containerRef = useRef(null)
  const { theme } = useThemeStore()
  const giscusTheme = theme === 'dark' ? 'dark_dimmed' : 'light'

  useEffect(() => {
    if (!containerRef.current) return

    // Hapus script lama jika ada (saat theme berubah)
    const existing = containerRef.current.querySelector('script')
    if (existing) existing.remove()
    // Hapus iframe yang di-render giscus
    const iframe = containerRef.current.querySelector('iframe.giscus-frame')
    if (iframe) iframe.remove()

    const script = document.createElement('script')
    script.src              = 'https://giscus.app/client.js'
    script.setAttribute('data-repo',              GISCUS_REPO)
    script.setAttribute('data-repo-id',           GISCUS_REPO_ID)
    script.setAttribute('data-category',          GISCUS_CATEGORY)
    script.setAttribute('data-category-id',       GISCUS_CATEGORY_ID)
    script.setAttribute('data-mapping',           'specific')
    script.setAttribute('data-term',              'Guestbook')      // semua komentar di 1 thread
    script.setAttribute('data-strict',            '0')
    script.setAttribute('data-reactions-enabled', '1')
    script.setAttribute('data-emit-metadata',     '0')
    script.setAttribute('data-input-position',    'top')
    script.setAttribute('data-theme',             giscusTheme)
    script.setAttribute('data-lang',              'id')
    script.setAttribute('data-loading',           'lazy')
    script.crossOrigin = 'anonymous'
    script.async = true

    containerRef.current.appendChild(script)
  }, [giscusTheme])

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 md:px-10 py-16">
      {/* Header */}
      <div className="mb-8 text-center">
        <span className="section-label">Say Hello</span>
        <h2
          className="font-display text-3xl font-extrabold mt-2"
          style={{ color: 'var(--dark)' }}
        >
          Guestbook
        </h2>
        <p className="mt-2 text-sm" style={{ color: 'var(--body-color)' }}>
          Tinggalkan pesan, kesan, atau sapa Felix di sini! Login GitHub untuk berkomentar.
        </p>
      </div>

      {/* Giscus embed */}
      <div
        ref={containerRef}
        className="giscus-container"
        style={{
          background: 'var(--card-bg)',
          border: '1px solid var(--border)',
          borderRadius: '1rem',
          padding: '1.5rem',
          minHeight: 200,
        }}
      />

      {/* Info note */}
      <p className="mt-4 text-xs text-center" style={{ color: 'var(--body-color)' }}>
        Komentar ditenagai oleh{' '}
        <a
          href="https://giscus.app"
          target="_blank"
          rel="noopener noreferrer"
          className="link-underline"
          style={{ color: 'var(--primary)' }}
        >
          Giscus
        </a>{' '}
        & GitHub Discussions — gratis, tanpa iklan.
      </p>
    </div>
  )
}