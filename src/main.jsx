import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { Toaster } from 'react-hot-toast'
import './i18n/i18n'
import './styles/index.css'
import App from './app.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <HashRouter>
        <App />
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: 'var(--card-bg)',
              color: 'var(--dark)',
              border: '1px solid var(--border)',
              borderRadius: '0.75rem',
              fontSize: '0.875rem',
            },
          }}
        />
      </HashRouter>
    </HelmetProvider>
  </StrictMode>,
)