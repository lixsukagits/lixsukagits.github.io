import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Guard: window mungkin tidak ada saat SSR / Vite cold start
const getSystemTheme = () => {
  try {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  } catch {
    return 'light'
  }
}

export const useThemeStore = create(
  persist(
    (set) => ({
      theme: getSystemTheme(),
      toggleTheme: () => set((s) => ({ theme: s.theme === 'light' ? 'dark' : 'light' })),
      setTheme: (theme) => set({ theme }),
    }),
    { name: 'felix-theme' }
  )
)