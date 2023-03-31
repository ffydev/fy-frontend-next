import { api } from '../apis/api'

export interface IExerciseName {
  id: string
  name: string
}

export async function findExercisesNames(
  token: string,
): Promise<IExerciseName[]> {
  try {
    const response = await api.get<IExerciseName[]>('/exercises-names', {
      headers: { Authorization: `Bearer ${token}` },
    })

    return response.data
  } catch (error) {
    console.error('Failed to find users', error)
    throw error
  }
}
