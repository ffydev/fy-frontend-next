import { api } from '../apis/api'

export interface IExercisesNames {
  id: string
  name: string
}

export async function findExercisesNames(
  token: string,
): Promise<IExercisesNames[]> {
  try {
    const response = await api.get<IExercisesNames[]>('/exercises-names', {
      headers: { Authorization: `Bearer ${token}` },
    })

    return response.data
  } catch (error) {
    console.error('Failed to find users', error)
    throw error
  }
}
