import { IExerciseInterface } from './exercise.provider'
import { api } from '../apis/api'

export interface IExerciseTypesInterface {
  id?: string
  name?: string
  exercises?: IExerciseInterface[]
}

export async function findExerciseTypes(
  token: string,
): Promise<IExerciseTypesInterface[]> {
  try {
    const response = await api.get<IExerciseTypesInterface[]>(
      '/exercise-type',
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    )
    return response.data
  } catch (error) {
    console.error('Failed to find users', error)
    throw error
  }
}
