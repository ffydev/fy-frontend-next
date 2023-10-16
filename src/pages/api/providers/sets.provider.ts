import { api } from '../apis/api'

export interface ISet {
  id?: string
  weight?: string
  reps?: string
  workoutExerciseId?: string
  rir?: string
  setType?: string
  exerciseId?: string
}

export async function createSet(
  token: string,
  workoutExerciseId: string,
  exerciseId: string,
): Promise<ISet> {
  try {
    const response = await api.post<ISet>(
      `/sets/${workoutExerciseId}`,
      { exerciseId },
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    )

    return response.data
  } catch (error) {
    console.error('Failed to create set', error)
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
    console.error('Failed to update set', error)
    throw error
  }
}

export async function getHistory(
  period: string,
  exerciseId: string,
  userId: string,
): Promise<any> {
  try {
    const response = await api.get<any>(
      `/sets/repport?days=${period}&exerciseId=${exerciseId}&userId=${userId}`,
    )

    return response.data
  } catch (error) {
    console.error('Failed to find exercise by id', error)
    throw error
  }
}
