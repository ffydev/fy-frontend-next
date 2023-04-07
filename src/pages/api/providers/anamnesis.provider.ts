import { api } from '../apis/api'

interface IAnamnesi {
  id?: string
  gender?: 'feminino' | 'masculino' | 'outro' | string | undefined
  age?: string
  height?: string
  weight?: string
  mealPlanAtHome?: string
  foodPreferences?: string
  mealTimes?: string
  last24hFoodIntake?: string
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

export async function createAnamnesi(
  token: string,
  anamnesi: IAnamnesi,
): Promise<IAnamnesi> {
  try {
    const response = await api.post<IAnamnesi>('/anamnesis', anamnesi, {
      headers: { Authorization: `Bearer ${token}` },
    })

    return response.data
  } catch (error) {
    console.error('Failed to create user', error)
    throw error
  }
}
