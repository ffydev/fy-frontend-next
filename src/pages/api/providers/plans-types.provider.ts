import { api } from '../apis/api'

export interface IPlanType {
  id: string
  name: string
}

export async function findPlansTypes(token: string): Promise<IPlanType[]> {
  try {
    const response = await api.get<IPlanType[]>('/plans-types', {
      headers: { Authorization: `Bearer ${token}` },
    })
    return response.data
  } catch (error) {
    console.error('Failed to create user', error)
    throw error
  }
}
