import { api } from '../apis/api'

export interface IAnamnesis {
  id?: string
  gender?: 'feminino' | 'masculino' | 'outro' | string | undefined
  age?: number
  height?: number
  weight?: number
  mealPlanAtHome?: string
  foodPreferences?: string
  mealTimes?: string
  lastDayFoodIntake?: string
  allergies?: string
  physicalActivities?: string
  jointPainDiscomfort?: string
  comorbidities?: string
  budgetForDietSupplementation?: string
  supplementsPharmaceuticalsUsed?: string
  imagePaths?: string
  userId: string
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
}

export async function createAnamnesis(
  token: string,
  anamnesis: IAnamnesis,
): Promise<IAnamnesis> {
  try {
    const response = await api.post<IAnamnesis>('/anamnesis', anamnesis, {
      headers: { Authorization: `Bearer ${token}` },
    })

    return response.data
  } catch (error) {
    console.error('Failed to create user', error)
    throw error
  }
}

export async function findUserAnamnesis(
  token: string,
  userId: string,
): Promise<IAnamnesis[]> {
  try {
    const response = await api.get<IAnamnesis[]>(
      `/anamnesis/by-user${userId}`,
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
