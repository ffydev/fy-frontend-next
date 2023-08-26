import { IAvatar, IUser } from '@/pages/api/providers/auth.provider'
import { create } from 'zustand'
import { combine } from 'zustand/middleware'

const initialState = {
  user: {} as IUser,
  error: '',
  isFetchingCurrentUser: false,
  isLoadingLogin: false,
  userAvatar: {} as IAvatar,
}

export const useAuthStore = create(
  combine({ ...initialState }, (set) => ({
    setUser: (user: IUser) => set(() => ({ user })),
    setUserAvatar: (userAvatar: IAvatar) => set(() => ({ userAvatar })),
    setError: (error: string | undefined) => set(() => ({ error })),
    setIsFetchingCurrentUser: () =>
      set((state) => ({
        isFetchingCurrentUser: !state.isFetchingCurrentUser,
      })),
    signOut: () => set(() => ({ user: undefined })),
    setIsLoadingLogin: (isLoadingLogin: boolean) =>
      set(() => ({ isLoadingLogin })),
    reset: () => {
      set(initialState)
    },
  })),
)
