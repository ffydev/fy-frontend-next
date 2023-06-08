import { IWorkoutsExercises } from '@/pages/api/providers/workoutsExercises.provider'
import { create } from 'zustand'
import { combine } from 'zustand/middleware'

const initialState = {
  workoutsExercises: [] as IWorkoutsExercises[],
}

export const useWorkoutsExercisesStore = create(
  combine({ ...initialState }, (set) => ({
    setWorkoutsExercises: (workoutsExercises: IWorkoutsExercises[]) =>
      set({ workoutsExercises }),
    reset: () => {
      set(initialState)
    },
  })),
)
