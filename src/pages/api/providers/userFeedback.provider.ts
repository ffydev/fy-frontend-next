import { api } from '../apis/api';

export interface IUserFeedbackInterface {
  id?: string;
  diet?: string;
  workouts?: string;
  weight?: string; 
  fatigue?: string;
  others?: string;
  videoLinks?: string;
  userId: string;
  workoutId: string;
  createdAt?: string;
}

export async function findFeedbacks(token: string, feedback: IUserFeedbackInterface): Promise<IUserFeedbackInterface[]> {
  try {    
    const response = await api.get<IUserFeedbackInterface[]>(`/user-feedback?userId=${feedback.userId}&wokoutId=${feedback.workoutId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error('Failed to find users', error);
    throw error;
  }
}

