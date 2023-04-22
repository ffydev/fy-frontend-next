import { IUser } from '@/pages/api/providers/auth.provider'
import { create } from 'zustand'

interface AuthState {
  user: IUser | undefined
  setUser: (by: IUser) => void
  error: string | undefined
  setError: (error: string | undefined) => void
  signOut: () => void
}

export const useAuthStore = create<AuthState>((set) => {
  return {
    user: undefined,
    setUser: (by) => set(() => ({ user: by })),
    error: undefined,
    setError: (error) => set(() => ({ error })),
    signOut: () => set(() => ({ user: undefined })),
    reset: () => set(() => ({ user: {} as IUser })),
  }
})
