import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useUserStore = create(
  persist(
    (set) => ({
      userName: null,
      hasVisited: false,
      setUserName: (name) => set({ userName: name, hasVisited: true }),
    }),
    { name: 'felix-user' }
  )
)