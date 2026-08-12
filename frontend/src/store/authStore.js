import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAuthStore = create(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      loading: true,

      login: async (username, password, apiKey) => {
        const response = await fetch('http://localhost:8000/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password, apiKey })
        })
        const data = await response.json()
        set({ token: data.token, user: data.user })
        return data
      },

      logout: () => {
        set({ token: null, user: null })
      },

      initializeAuth: async () => {
        const stored = localStorage.getItem('auth-storage')
        if (stored) {
          const { state } = JSON.parse(stored)
          set({ token: state.token, user: state.user })
        }
        set({ loading: false })
      }
    }),
    {
      name: 'auth-storage',
    }
  )
)
