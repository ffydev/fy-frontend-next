import { IUser } from '@/pages/api/providers/auth.provider'
import { create } from 'zustand'
import { combine } from 'zustand/middleware'

type AuthState = {
  user: IUser | undefined
  error: string | undefined
}

const initialState: AuthState = {
  user: undefined,
  error: undefined,
}

export const useAuthStore = create(
  combine(initialState, (set) => ({
    setUser: (user: IUser) => set(() => ({ user })),
    setError: (error: string) => set(() => ({ error })),
    signOut: () => set(() => ({ user: undefined })),
    reset: () => {
      set(initialState)
    },
  })),
)
