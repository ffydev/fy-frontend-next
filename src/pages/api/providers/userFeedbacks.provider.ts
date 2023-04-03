import { api } from '../apis/api'

export interface IUserFeedback {
  id?: string
  diet?: string
  workouts?: string
  weight?: string
  fatigue?: string
  others?: string
  videoLinks?: string
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
    console.log(response.data)
    return response.data
  } catch (error) {
    console.error('Failed to find users', error)
    throw error
  }
}
