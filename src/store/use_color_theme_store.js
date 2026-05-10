import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const COLOR_THEMES = [
  { id: 'blue',      label: 'Blue',      labelZh: '蓝色', emoji: '🔵', primary: '#3758F9', primaryDark: '#1B44C8', primaryLight: '#e8ecff', primaryLightDark: '#1a2040' },
  { id: 'violet',    label: 'Violet',    labelZh: '紫色', emoji: '🟣', primary: '#7c3aed', primaryDark: '#5b21b6', primaryLight: '#ede9fe', primaryLightDark: '#1e1040' },
  { id: 'rose',      label: 'Rose',      labelZh: '玫瑰', emoji: '🌸', primary: '#e11d48', primaryDark: '#be123c', primaryLight: '#ffe4e6', primaryLightDark: '#2a0f18' },
  { id: 'emerald',   label: 'Emerald',   labelZh: '翡翠', emoji: '💚', primary: '#059669', primaryDark: '#047857', primaryLight: '#d1fae5', primaryLightDark: '#0a2318' },
  { id: 'amber',     label: 'Amber',     labelZh: '琥珀', emoji: '🟡', primary: '#d97706', primaryDark: '#b45309', primaryLight: '#fef3c7', primaryLightDark: '#2a1f0a' },
  { id: 'china-red', label: 'China Red', labelZh: '中国红', emoji: '🇨🇳', primary: '#dc2626', primaryDark: '#b91c1c', primaryLight: '#fee2e2', primaryLightDark: '#2a0f0f' },
]

export const useColorThemeStore = create(
  persist(
    (set) => ({
      colorThemeId: 'blue',
      setColorTheme: (id) => set({ colorThemeId: id }),
    }),
    { name: 'felix-color-theme' }
  )
)

export function applyColorTheme(themeId, isDark) {
  const theme = COLOR_THEMES.find(t => t.id === themeId) || COLOR_THEMES[0]
  const root = document.documentElement
  root.style.setProperty('--primary',       theme.primary)
  root.style.setProperty('--primary-dark',  theme.primaryDark)
  root.style.setProperty('--primary-light', isDark ? theme.primaryLightDark : theme.primaryLight)
}