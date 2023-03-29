import { api } from '../apis/api'
import { IExerciseInterface } from './exercises.provider'

export interface IWorkoutInterface {
  id?: string
  workoutType: string
  userId: string
  isLatest?: boolean
  exercises?: IExerciseInterface[]
}

export async function createWorkout(
  token: string,
  workout: IWorkoutInterface,
): Promise<IWorkoutInterface> {
  try {
    const response = await api.post<IWorkoutInterface>('/workouts', workout, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return response.data
  } catch (error) {
    console.error('Failed to create workout', error)
    throw error
  }
}

export async function findWorkoutsByUserId(
  token: string,
  userId: string,
): Promise<IWorkoutInterface[]> {
  try {
    const response = await api.get<IWorkoutInterface[]>(
      `/workouts/by-user/${userId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    )
    return response.data
  } catch (error) {
    console.error(`Failed to find workouts for user with id ${userId}`, error)
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
