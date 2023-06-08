import { api } from '../apis/api'

export interface ISet {
  id?: string
  weight?: string
  reps?: string
  workoutExerciseId?: string
  rir?: string
  setType?: string
}

export async function createSet(
  token: string,
  workoutExerciseId: string,
): Promise<ISet> {
  try {
    const response = await api.post<ISet>(
      `/sets/${workoutExerciseId}`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    )

    return response.data
  } catch (error) {
    console.error('Failed to create user', error)
    throw error
  }
}

export async function deleteSet(token: string, id: string) {
  try {
    const response = await api.delete(`/sets/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })

    return response
  } catch (error) {
    console.error('Failed to delete set', error)
    throw error
  }
}

export async function updateSet(
  token: string,
  id: string,
  set: ISet,
): Promise<ISet> {
  try {
    const response = await api.patch(`/sets/${id}`, set, {
      headers: { Authorization: `Bearer ${token}` },
    })

    return response.data
  } catch (error) {
    console.error('Failed to delete set', error)
    throw error
  }
}
