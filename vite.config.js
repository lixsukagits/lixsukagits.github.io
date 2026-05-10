import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      // Cache semua asset penting
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'pwa-192x192.png', 'pwa-512x512.png'],
      manifest: {
        name: 'Felix Raymond — Portfolio',
        short_name: 'Felix',
        description: 'Portfolio pribadi Felix Raymond — IT Enthusiast, peraih 5 medali emas, calon mahasiswa China.',
        theme_color: '#3758F9',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/',
        lang: 'id',
        icons: [
          { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png' },
          { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' },
        ],
        shortcuts: [
          { name: 'Tentang Felix', url: '/about', description: 'Profil & autobiografi' },
          { name: 'Prestasi', url: '/achievement', description: 'Medali & penghargaan' },
          { name: 'Kontak', url: '/contact', description: 'Hubungi Felix' },
        ],
      },
      // Workbox: cache strategi
      workbox: {
        // Cache halaman HTML dengan network-first (selalu coba ambil terbaru)
        navigateFallback: 'index.html',
        // Cache JS/CSS/font dengan stale-while-revalidate
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts',
              expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
            },
          },
          {
            urlPattern: /^https:\/\/i\.imgur\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'imgur-images',
              expiration: { maxEntries: 50, maxAgeSeconds: 60 * 60 * 24 * 30 },
            },
          },
          {
            urlPattern: /^https:\/\/hits\.seeyoufarm\.com\/.*/i,
            handler: 'NetworkOnly', // counter harus selalu fresh, jangan di-cache
          },
        ],
      },
    }),
  ],
  base: '/',
  build: {
    // Pisahkan chunk besar supaya loading lebih optimal
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-motion': ['framer-motion'],
          'vendor-charts': ['recharts'],
          'vendor-i18n': ['react-i18next', 'i18next', 'i18next-browser-languagedetector'],
        },
      },
    },
  },
})