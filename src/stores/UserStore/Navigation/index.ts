import { create } from 'zustand'
import { combine } from 'zustand/middleware'

const initialState = {
  isShowingDashboard: true,
  isShowingCreateAnamnesis: false,
  isShowingFeedbacks: false,
  isShowingCreateFeedbacks: false,
  isShowingRepports: false,
}

export const useUserNavigationStore = create(
  combine({ ...initialState }, (set) => ({
    setIsShowingDashboard: () =>
      set((state) => ({ isShowingDashboard: !state.isShowingDashboard })),
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
    setIsShowingRepports: () => {
      set((state) => ({ isShowingRepports: !state.isShowingRepports }))
    },
    reset: () => {
      set(initialState)
    },
  })),
)
