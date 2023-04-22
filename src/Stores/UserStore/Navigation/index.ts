import { create } from 'zustand'
import { combine } from 'zustand/middleware'

const initialState = {
  isShowingDashboard: true,
  isShowingWorkouts: false,
  isShowingCreateAnamnesis: false,
  isShowingFeedbacks: false,
  isShowingCreateFeedbacks: false,
}

export const useUserNavigationStore = create(
  combine({ ...initialState }, (set) => ({
    setIsShowingDashboard: () =>
      set((state) => ({ isShowingDashboard: !state.isShowingDashboard })),
    setIsShowingWorkouts: () =>
      set((state) => ({ isShowingWorkouts: !state.isShowingWorkouts })),
    setIsShowingCreateAnamnesis: () =>
      set((state) => ({
        isShowingCreateAnamnesis: !state.isShowingCreateAnamnesis,
      })),
    setIsShowingFeedbacks: () =>
      set((state) => ({ isShowingFeedbacks: !state.isShowingFeedbacks })),
    setIsShowingCreateFeedbacks: () =>
      set((state) => ({
        isShowingCreateFeedbacks: !state.isShowingCreateFeedbacks,
      })),
    reset: () => {
      set(initialState)
    },
  })),
)
