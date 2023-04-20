import { create } from 'zustand'
import { combine } from 'zustand/middleware'

const initialState = {
  isFetchingUsers: false,
}

export const useAdminIsFetchingStore = create(
  combine({ ...initialState }, (set) => ({
    setIsFetchingUsers: () =>
      set((state) => ({
        isFetchingUsers: !state.isFetchingUsers,
      })),
    reset: () => {
      set(initialState)
    },
  })),
)
