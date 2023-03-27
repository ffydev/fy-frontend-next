import { api } from '../apis/api'

export interface IExerciseInterface {
  id?: string
  name?: string
  sets?: number
  reps?: number
  describe?: string
  weight?: number
  workoutId?: string
  exerciseTypeId?: string
}

export async function deleteExercise(token: string, id: string): Promise<void> {
  try {
    await api.delete(`/exercise/${id}`, {
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
  exercise: IExerciseInterface,
): Promise<IExerciseInterface> {
  try {
    const response = await api.patch<IExerciseInterface>(
      `/exercise/${id}`,
      exercise,
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

export async function createExercise(
  token: string,
  exercise: IExerciseInterface,
): Promise<IExerciseInterface> {
  try {
    const response = await api.post<IExerciseInterface>(`/exercise`, exercise, {
      headers: { Authorization: `Bearer ${token}` },
    })

    return response.data
  } catch (error) {
    console.error('Failed to create user', error)
    throw error
  }
}
