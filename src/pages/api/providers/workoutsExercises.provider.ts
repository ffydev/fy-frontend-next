import { api } from '../apis/api'
import { IExercise } from './exercises.provider'
import { ISet } from './sets.provider'
import { IWorkout } from './workouts.provider'

export interface IWorkoutsExercises {
  id?: string
  workoutId?: string
  exerciseId?: string
  workout?: IWorkout
  exercise?: IExercise
  sets?: ISet[]
}

export async function createWorkoutsExercise(
  token: string,
  workoutsExcercises: IWorkoutsExercises,
): Promise<IWorkoutsExercises> {
  try {
    const response = await api.post<IWorkoutsExercises>(
      `/workouts-exercises`,
      workoutsExcercises,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    )

    return response.data
  } catch (error) {
    console.error('Failed to create workout exercise', error)
    throw error
  }
}

export async function findWorkoutsExercisesByWorkout(
  token: string,
  workoutId: string,
): Promise<IWorkoutsExercises[]> {
  try {
    const response = await api.get<IWorkoutsExercises[]>(
      `/workouts-exercises/${workoutId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    )
    return response.data
  } catch (error) {
    console.error(
      `Failed to find workouts for user with id ${workoutId}`,
      error,
    )
    throw error
  }
}

export async function deleteWorkoutExercise(
  token: string,
  workoutExerciseId: string,
): Promise<void> {
  try {
    await api.delete(`/workouts-exercises/${workoutExerciseId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
  } catch (error) {
    console.error(
      `Failed to delete workout exercise with id ${workoutExerciseId}`,
      error,
    )
    throw error
  }
}
