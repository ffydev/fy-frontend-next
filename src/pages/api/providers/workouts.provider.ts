import { api } from '../apis/api'
import { IExercise } from './exercises.provider'

export interface IWorkout {
  id?: string
  workoutType: string
  userId: string
  isLatest?: boolean
  exercises?: IExercise[]
}

export async function createWorkout(
  token: string,
  workout: IWorkout,
): Promise<IWorkout> {
  try {
    const response = await api.post<IWorkout>('/workouts', workout, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return response.data
  } catch (error) {
    console.error('Failed to create workout', error)
    throw error
  }
}

export async function findWorkoutsNamesByUserId(
  token: string,
  userId: string,
): Promise<IWorkout[]> {
  try {
    const response = await api.get<IWorkout[]>(`/workouts/names/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return response.data
  } catch (error) {
    console.error(`Failed to find workouts for user with id ${userId}`, error)
    throw error
  }
}

export async function findWorkoutsByUserId(
  token: string,
  workoutId: string,
): Promise<IWorkout[]> {
  try {
    const response = await api.get<IWorkout[]>(
      `/workouts/by-user/${workoutId}`,
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

export async function deleteWorkout(token: string, id: string): Promise<void> {
  try {
    await api.delete(`/workouts/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return
  } catch (error) {
    console.error(`Failed to delete user with id ${id}`, error)
    throw error
  }
}
