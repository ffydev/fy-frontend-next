import { api } from '../apis/api'
import { IExercise } from './exercises.provider'

export interface IWorkoutExerciseName {
  id?: string
  workoutExerciseId?: string
  exerciseId?: string
  exercises?: IExercise
}

export async function createWorkoutsExerciseName(
  token: string,
  workoutExerciseName: IWorkoutExerciseName,
): Promise<IWorkoutExerciseName> {
  try {
    const response = await api.post<IWorkoutExerciseName>(
      `/workouts-exercises-names`,
      workoutExerciseName,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    )

    return response.data
  } catch (error) {
    console.error(
      'Failed to vinculated exercise name at workout exercise',
      error,
    )
    throw error
  }
}

export async function deleteWorkoutExerciseName(
  token: string,
  workoutExerciseNameId: string,
) {
  try {
    const response = await api.delete(
      `/workouts-exercises-names/${workoutExerciseNameId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    )

    return response
  } catch (error) {
    console.error(
      `Failed to delete workout exercise with id ${workoutExerciseNameId}`,
      error,
    )
    throw error
  }
}
