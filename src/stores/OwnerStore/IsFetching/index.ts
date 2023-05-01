import { create } from 'zustand'
import { combine } from 'zustand/middleware'

const initialState = {
  selectedUserId: '',
  selectedWorkoutId: '',
  isFetchingUsers: false,
  isFetchingWorkoutsNames: false,
}

export const useOwnerIsFetchingStore = create(
  combine({ ...initialState }, (set) => ({
    setSelectedUserId: (id: string) => set(() => ({ selectedUserId: id })),
    setSelectedWorkoutId: (id: string) =>
      set(() => ({ selectedWorkoutId: id })),
    setIsFetchingUsers: () =>
      set((state) => ({
        isFetchingUsers: !state.isFetchingUsers,
      })),
    setIsFetchingWorkoutsNames: () =>
      set((state) => ({
        isFetchingWorkoutsNames: !state.isFetchingWorkoutsNames,
      })),
    reset: () => {
      set(initialState)
    },
  })),
)
