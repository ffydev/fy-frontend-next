import { api } from '../apis/api'
import { IExercise } from './exercises.provider'
import { IWorkout } from './workouts.provider'

export interface IWorkoutsExercises {
  id?: string
  workoutId?: string
  exerciseId?: string
  workout?: IWorkout
  exercise?: IExercise
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

export async function findWorkoutsExercisesByWorkout(
  token: string,
  workoutId: string,
): Promise<IWorkoutsExercises[]> {
  try {
    const response = await api.get<IWorkoutsExercises[]>(`/workouts-exercises/${workoutId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return response.data
  } catch (error) {
    console.error(`Failed to find workouts for user with id ${workoutId}`, error)
    throw error
  }
}

