import { api } from '../apis/api'

export interface IUserFeedback {
  id?: string
  diet?: string
  workouts?: string
  weight?: string
  fatigue?: string
  others?: string
  hasVideo?: boolean
  answer?: string
  userId?: string
  doctorId?: string
  isAnswered?: boolean
  createdAt?: string
}

export interface IVideo {
  key?: string
  videoData?: string
}

export interface IFindUserFeedbacks {
  feedbacks: IUserFeedback[]
  videos?: IVideo[]
}

export async function findUserFeedbacks(
  token: string,
  userId: string,
  feedbackVideo?: string,
): Promise<IFindUserFeedbacks> {
  try {
    const response = await api.get<IFindUserFeedbacks>(
      `/user-feedbacks?userId=${userId}&feedbackVideo=${feedbackVideo}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    )

    return response.data
  } catch (error) {
    console.error('Failed to find feedbacks', error)
    throw error
  }
}

export async function createUserFeedback(
  token: string,
  feedback: any,
): Promise<void> {
  try {
    return await api.post('/user-feedbacks', feedback, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    })
  } catch (error) {
    console.error('Failed to create user feedback', error)
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
    console.error('Failed to answer feedback', error)
    throw error
  }
}

export async function updateUserFeedback(
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
    console.error('Failed to update feedback', error)
    throw error
  }
}
