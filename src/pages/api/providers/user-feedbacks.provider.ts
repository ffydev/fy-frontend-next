import { api } from '../apis/api'

export interface IUserFeedback {
  id?: string
  diet?: string
  workouts?: string
  weight?: number
  fatigue?: string
  others?: string
  videoLinks?: string
  answer?: string
  userId?: string
  doctorId?: string
  isAnswered?: boolean
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

export async function answerFeedback(
  token: string,
  id: string,
  feedback: IUserFeedback,
): Promise<IUserFeedback> {
  try {
    const response = await api.patch(`/user-feedbacks/${id}`, feedback, {
      headers: { Authorization: `Bearer ${token}` },
    })

    return response.data
  } catch (error) {
    console.error('Failed to create user', error)
    throw error
  }
}
