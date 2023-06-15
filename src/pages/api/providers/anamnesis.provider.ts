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
  pictures?: any
  userId: string
  createdAt?: string
  updatedAt?: string
  deletedAt?: string
}

export interface IFindUserAnamnesis {
  anamnesis: IAnamnesis[]
  anamnmesisPictures: {
    Key: string
  }
}

export async function createAnamnesis(
  token: string,
  anamnesis: any,
): Promise<any> {
  try {
    const response = await api.post<any>('/anamnesis', anamnesis, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    })

    return response.data
  } catch (error) {
    console.error('Failed to create anamnesis', error)
    throw error
  }
}

export async function findUserAnamnesis(
  token: string,
  userId: string,
): Promise<IFindUserAnamnesis> {
  try {
    const response = await api.get<IFindUserAnamnesis>(
      `/anamnesis/by-user?userId=${userId}`,
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
