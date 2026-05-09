import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useThemeStore } from './store/use_theme_store'
import Navbar from './components/layout/navbar'
import Footer from './components/layout/footer'
import ScrollProgress from './components/widgets/scroll_progress'
import BackToTop from './components/widgets/back_to_top'
import CommandPalette from './components/widgets/command_palette'
import WhatsappButton from './components/widgets/whatsapp_button'
import HomePage from './pages/home_page'
import AboutPage from './pages/about_page'
import SkillsPage from './pages/skills_page'
import AchievementPage from './pages/achievement_page'
import EducationPage from './pages/education_page'
import ExperiencePage from './pages/experience_page'
import CertificatePage from './pages/certificate_page'
import GalleryPage from './pages/gallery_page'
import CvPage from './pages/cv_page'
import ContactPage from './pages/contact_page'
import TimelinePage from './pages/timeline_page'
import NowPage from './pages/now_page'
import NotFoundPage from './pages/not_found_page'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export default function App() {
  const { theme } = useThemeStore()
  const location = useLocation()

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  return (
    <div className="min-h-screen grain flex" style={{ background: 'var(--bg)' }}>
      <ScrollToTop />
      <ScrollProgress />

      {/* Sidebar (desktop) — fixed, 240px wide */}
      <Navbar />

      {/* Main content — offset by sidebar width on desktop, full width on mobile */}
      <div className="flex-1 flex flex-col min-w-0 lg:ml-60">
        {/* Mobile top bar spacer */}
        <div className="lg:hidden h-14" />

        <main className="flex-1">
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
              <Route path="*"            element={<NotFoundPage />} />
            </Routes>
          </AnimatePresence>
        </main>

        <Footer />
      </div>

      <BackToTop />
      <CommandPalette />
      {/* Sembunyikan WA button di halaman CV */}
      {location.pathname !== '/cv' && <WhatsappButton />}
    </div>
  )
}