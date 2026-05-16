import { lazy, Suspense, useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useThemeStore } from './store/use_theme_store'
import { useColorThemeStore, applyColorTheme } from './store/use_color_theme_store'
import Navbar from './components/layout/navbar'
import Footer from './components/layout/footer'
import ScrollProgress from './components/widgets/scroll_progress'
import BackToTop from './components/widgets/back_to_top'
import CommandPalette from './components/widgets/command_palette'
import WhatsappButton from './components/widgets/whatsapp_button'
import SplashScreen from './components/ui/splash_screen'
import CustomCursor from './components/widgets/custom_cursor'
import EasterEgg from './components/widgets/easter_egg'
import ShareButton from './components/widgets/share_button'
import FontSizeToggle from './components/widgets/font_size_toggle'

// ─── LAZY ROUTES ─────────────────────────────────────────────────
const HomePage        = lazy(() => import('./pages/home_page'))
const AboutPage       = lazy(() => import('./pages/about_page'))
const SkillsPage      = lazy(() => import('./pages/skills_page'))
const AchievementPage = lazy(() => import('./pages/achievement_page'))
const EducationPage   = lazy(() => import('./pages/education_page'))
const ExperiencePage  = lazy(() => import('./pages/experience_page'))
const CertificatePage = lazy(() => import('./pages/certificate_page'))
const GalleryPage     = lazy(() => import('./pages/gallery_page'))
const CvPage          = lazy(() => import('./pages/cv_page'))
const ContactPage     = lazy(() => import('./pages/contact_page'))
const TimelinePage    = lazy(() => import('./pages/timeline_page'))
const NowPage         = lazy(() => import('./pages/now_page'))
const BlogPage        = lazy(() => import('./pages/blog_page'))
const UsesPage        = lazy(() => import('./pages/uses_page'))
const BookshelfPage   = lazy(() => import('./pages/bookshelf_page'))
const NotFoundPage    = lazy(() => import('./pages/not_found_page'))

// ─── PAGE SKELETON ────────────────────────────────────────────────
function PageSkeleton() {
  return (
    <div className="min-h-screen px-6 py-20 max-w-4xl mx-auto" aria-hidden="true">
      <div className="mb-10 text-center space-y-3">
        <div className="skeleton h-3 w-24 mx-auto rounded-full" />
        <div className="skeleton h-8 w-56 mx-auto rounded-xl" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-2xl overflow-hidden border border-[var(--border)]">
            <div className="skeleton h-40 w-full" />
            <div className="p-4 space-y-2">
              <div className="skeleton h-4 w-3/4 rounded-lg" />
              <div className="skeleton h-3 w-1/2 rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── SCROLL TO TOP ON ROUTE CHANGE ───────────────────────────────
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

// ─── FLOATING STACK ───────────────────────────────────────────────
function FloatingStack() {
  const { pathname } = useLocation()
  const isCV = pathname === '/cv'
  return (
    <div className="floating-stack">
      <BackToTop />
      {!isCV && <FontSizeToggle />}
      {!isCV && <ShareButton />}
      {!isCV && <WhatsappButton />}
    </div>
  )
}

// ─── ROOT APP ─────────────────────────────────────────────────────
export default function App() {
  const { theme } = useThemeStore()
  const { colorThemeId } = useColorThemeStore()
  const location = useLocation()

  // Splash: hanya tampil sekali per session
  const [showSplash] = useState(() => {
    try {
      const seen = sessionStorage.getItem('felix-splash')
      if (seen) return false
      sessionStorage.setItem('felix-splash', '1')
      return true
    } catch {
      return false
    }
  })
  const [splashDone, setSplashDone] = useState(!showSplash)

  // Apply dark/light mode via data-theme attribute
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  // Apply color theme CSS variables
  useEffect(() => {
    applyColorTheme(colorThemeId, theme === 'dark')
  }, [colorThemeId, theme])

  return (
    <>
      {showSplash && !splashDone && (
        <SplashScreen onDone={() => setSplashDone(true)} />
      )}

      <CustomCursor />
      <EasterEgg />

      <div
        className="min-h-screen grain flex"
        style={{
          background: 'var(--bg)',
          opacity: splashDone ? 1 : 0,
          transition: 'opacity 0.4s ease',
        }}
      >
        <ScrollToTop />
        <ScrollProgress />
        <Navbar />

        <div className="flex-1 flex flex-col min-w-0 relative z-[1]">
          {/* Mobile topbar spacer */}
          <div className="lg:hidden h-14 shrink-0" aria-hidden="true" />

          <main className="flex-1">
            <Suspense fallback={<PageSkeleton />}>
              <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                  <Route path="/"            element={<HomePage />} />
                  <Route path="/about"       element={<AboutPage />} />
                  <Route path="/skills"      element={<SkillsPage />} />
                  <Route path="/achievement" element={<AchievementPage />} />
                  <Route path="/education"   element={<EducationPage />} />
                  <Route path="/experience"  element={<ExperiencePage />} />
                  <Route path="/certificate" element={<CertificatePage />} />
                  <Route path="/gallery"     element={<GalleryPage />} />
                  <Route path="/cv"          element={<CvPage />} />
                  <Route path="/contact"     element={<ContactPage />} />
                  <Route path="/timeline"    element={<TimelinePage />} />
                  <Route path="/now"         element={<NowPage />} />
                  <Route path="/blog"        element={<BlogPage />} />
                  <Route path="/uses"        element={<UsesPage />} />
                  <Route path="/bookshelf"   element={<BookshelfPage />} />
                  <Route path="*"            element={<NotFoundPage />} />
                </Routes>
              </AnimatePresence>
            </Suspense>
          </main>

          <Footer />
        </div>

        <FloatingStack />
        <CommandPalette />
      </div>
    </>
  )
}