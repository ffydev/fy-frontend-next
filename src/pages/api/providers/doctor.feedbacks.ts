import { api } from '../apis/api'

export interface IDoctorFeedbacks {
  userId: string
  answer: string
}

export async function answerFeedback(
  token: string,
  feedback: IDoctorFeedbacks,
): Promise<IDoctorFeedbacks> {
  try {
    const response = await api.post('/doctor-feedbacks', feedback, {
      headers: { Authorization: `Bearer ${token}` },
    })

    return response.data
  } catch (error) {
    console.error('Failed to create user', error)
    throw error
  }
}
