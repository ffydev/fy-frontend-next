import { IUser } from '@/pages/api/providers/auth.provider'
import { create } from 'zustand'
import { combine } from 'zustand/middleware'

type AuthState = {
  user: IUser | undefined
  error: string | undefined
  isFetchingCurrentUser: boolean
}

const initialState: AuthState = {
  user: undefined,
  error: undefined,
  isFetchingCurrentUser: false,
}

export const useAuthStore = create(
  combine(initialState, (set) => ({
    setUser: (user: IUser) => set(() => ({ user })),
    setError: (error: string | undefined) => set(() => ({ error })),
    setIsFetchingCurrentUser: () =>
      set((state) => ({
        isFetchingCurrentUser: !state.isFetchingCurrentUser,
      })),
    signOut: () => set(() => ({ user: undefined })),
    reset: () => {
      set(initialState)
    },
  })),
)
