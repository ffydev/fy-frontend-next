import { api } from '../apis/api'

export interface IWorkoutsExercises {
  id?: string
  workoutId?: string
  exerciseId?: string
}

export async function createWorkoutsExercise(
  token: string,
  workoutsExcercises: IWorkoutsExercises,
): Promise<IWorkoutsExercises> {
  try {
    const response = await api.post<IWorkoutsExercises>(`/workouts-exercises`, workoutsExcercises, {
      headers: { Authorization: `Bearer ${token}` },
    })

    return response.data
  } catch (error) {
    console.error('Failed to create user', error)
    throw error
  }
}

