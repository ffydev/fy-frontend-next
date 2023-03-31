import { IExercise } from './exercises.provider'
import { api } from '../apis/api'

export interface IExerciseTypes {
  id?: string
  name?: string
  exercises?: IExercise[]
}

export async function findExercisesTypes(
  token: string,
): Promise<IExerciseTypes[]> {
  try {
    const response = await api.get<IExerciseTypes[]>('/exercises-types', {
      headers: { Authorization: `Bearer ${token}` },
    })
    return response.data
  } catch (error) {
    console.error('Failed to find users', error)
    throw error
  }
}
