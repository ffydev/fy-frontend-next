import { api } from '../apis/api'

export interface IExercise {
  id?: string
  name?: string
  muscleGroup?: string
  videos?: any
}

export async function deleteExercise(token: string, id: string): Promise<void> {
  try {
    await api.delete(`/exercises/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return
  } catch (error) {
    console.error(`Failed to delete exercise with id ${id}`, error)
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
    console.error('Failed to update exercise', error)
    throw error
  }
}

export async function updateExerciseByUser(
  token: string,
  id: string,
  exercise: IExercise,
): Promise<IExercise> {
  try {
    const response = await api.patch<IExercise>(
      `/exercises/exercise-by-user/${id}`,
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
  exercise: IExercise,
): Promise<IExercise> {
  try {
    const response = await api.post<IExercise>(`/exercises`, exercise, {
      headers: { Authorization: `Bearer ${token}` },
    })

    return response.data
  } catch (error) {
    console.error('Failed to create exercise', error)
    throw error
  }
}

export async function findMuscleGroup(token: string): Promise<IExercise[]> {
  try {
    const response = await api.get<IExercise[]>('/exercises/muscle-groups', {
      headers: { Authorization: `Bearer ${token}` },
    })

    return response.data
  } catch (error) {
    console.error('Failed to find muscle groups', error)
    throw error
  }
}

export async function findExerciseByMuscleGroup(
  token: string,
  muscleGroup: string,
  exerciseId?: string,
): Promise<any> {
  try {
    const response = await api.get<any>(
      `/exercises/by-muscle-group?muscleGroup=${muscleGroup}&exerciseId=${exerciseId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    )

    return response.data
  } catch (error) {
    console.error('Failed to find exercises by muscle group', error)
    throw error
  }
}

export async function findExerciseById(
  token: string,
  id: string,
): Promise<IExercise> {
  try {
    const response = await api.get<IExercise>(`/exercises/exercise/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })

    return response.data
  } catch (error) {
    console.error('Failed to find exercise by id', error)
    throw error
  }
}
