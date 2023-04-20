import { create } from 'zustand'
import { combine } from 'zustand/middleware'

const initialState = {
  isFetchingUsers: false,
  isFetchingWorkoutsNames: false,
  selectedUserId: '',
  selectedWorkoutId: '',
}

export const useAdminIsFetchingStore = create(
  combine({ ...initialState }, (set) => ({
    setIsFetchingUsers: () =>
      set((state) => ({
        isFetchingUsers: !state.isFetchingUsers,
      })),
    setIsFetchingWorkoutsNames: () =>
      set((state) => ({
        isFetchingWorkoutsNames: !state.isFetchingWorkoutsNames,
      })),
    setSelectedUserId: (id: string) => set(() => ({ selectedUserId: id })),
    setSelectedWorkoutId: (id: string) =>
      set(() => ({ selectedWorkoutId: id })),
    reset: () => {
      set(initialState)
    },
  })),
)
