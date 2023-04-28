import { IUser } from '@/pages/api/providers/auth.provider'
import { create } from 'zustand'
import { combine } from 'zustand/middleware'

const initialState = {
  user: {} as IUser,
  error: '',
  isFetchingCurrentUser: false,
  isLoading: true,
}

export const useAuthStore = create(
  combine({ ...initialState }, (set) => ({
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
