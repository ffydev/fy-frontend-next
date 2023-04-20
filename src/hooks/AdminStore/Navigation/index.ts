import { create } from 'zustand'
import { combine } from 'zustand/middleware'

const initialState = {
  isShowingUsers: true,
  isShowingWorkouts: false,
  isShowingAnamnesis: false,
  isShowingFeedbacks: false,
}

export const useAdminNavigationStore = create(
  combine({ ...initialState }, (set) => ({
    setIsShowingUsers: () =>
      set((state) => ({ isShowingUsers: !state.isShowingUsers })),
    setIsShowingWorkouts: () =>
      set((state) => ({ isShowingWorkouts: !state.isShowingWorkouts })),
    setIsShowingAnamnesis: () =>
      set((state) => ({ isShowingAnamnesis: !state.isShowingAnamnesis })),
    setIsShowingFeedbacks: () =>
      set((state) => ({ isShowingFeedbacks: !state.isShowingFeedbacks })),
    reset: () => {
      set(initialState)
    },
  })),
)
