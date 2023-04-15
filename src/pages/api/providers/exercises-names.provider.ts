import { api } from '../apis/api'
import { IExerciseType } from './exercises-types.provider'

export interface IExerciseName {
  id: string
  name: string
  exerciseTypeId: string
  exerciseType?: IExerciseType
}

export async function findExercisesNames(
  token: string,
  exerciseTypeId?: string,
): Promise<IExerciseName[]> {
  try {
    const response = await api.get<IExerciseName[]>(
      `/exercises-names?exerciseTypeId=${exerciseTypeId}`,
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
