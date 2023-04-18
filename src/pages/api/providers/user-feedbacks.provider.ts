import { api } from '../apis/api'

export interface IUserFeedback {
  id?: string
  diet?: string
  workouts?: string
  weight?: number
  fatigue?: string
  others?: string
  videoLinks?: string
  userId?: string
  createdAt?: string
}

export async function findUserFeedbacks(
  token: string,
  userId: string,
): Promise<IUserFeedback[]> {
  try {
    const response = await api.get<IUserFeedback[]>(
      `/user-feedbacks?userId=${userId}`,
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

export async function createUserFeedback(
  token: string,
  feedback: IUserFeedback,
): Promise<IUserFeedback[]> {
  try {
    const response = await api.post<IUserFeedback[]>(
      '/user-feedbacks',
      feedback,
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
