import { api } from '../apis/api'

interface IAnamnesis {
  id?: string
  gender?: 'feminino' | 'masculino' | 'outro' | string | undefined
  age?: string
  height?: string
  weight?: string
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
  anamnesi: IAnamnesis,
): Promise<IAnamnesis> {
  try {
    const response = await api.post<IAnamnesis>('/anamnesis', anamnesi, {
      headers: { Authorization: `Bearer ${token}` },
    })

    return response.data
  } catch (error) {
    console.error('Failed to create user', error)
    throw error
  }
}
