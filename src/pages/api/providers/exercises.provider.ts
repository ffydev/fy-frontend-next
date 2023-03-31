import { IExerciseType } from './exercises-types.provider'
import { IExerciseName } from '@/pages/api/providers/exercises-names.provider'
import { api } from '../apis/api'

export interface IExercise {
  id?: string
  sets?: number
  reps?: number
  describe?: string
  weight?: number
  workoutId?: string
  exerciseNameId?: string
  exerciseTypeId?: string
  exerciseNames?: IExerciseName
  exerciseType?: IExerciseType
}

export async function deleteExercise(token: string, id: string): Promise<void> {
  try {
    await api.delete(`/exercises/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return
  } catch (error) {
    console.error(`Failed to delete user with id ${id}`, error)
    throw error
  }
}

export async function updateExercise(
  token: string,
  id: string,
  exercise: IExercise,
): Promise<IExercise> {
  try {
    const response = await api.patch<IExercise>(`/exercises/${id}`, exercise, {
      headers: { Authorization: `Bearer ${token}` },
    })

    return response.data
  } catch (error) {
    console.error('Failed to create user', error)
    throw error
  }
}

export async function createExercise(
  token: string,
  exercise: IExercise,
): Promise<IExercise> {
  try {
    const response = await api.post<IExercise>(`/exercises`, exercise, {
      headers: { Authorization: `Bearer ${token}` },
    })

    return response.data
  } catch (error) {
    console.error('Failed to create user', error)
    throw error
  }
}
