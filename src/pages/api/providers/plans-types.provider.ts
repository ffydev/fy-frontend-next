import { api } from '../apis/api'

export interface IPlanTypeInterface {
  id: string
  name: string
}

export async function findPlanTypes(
  token: string,
): Promise<IPlanTypeInterface[]> {
  try {
    const response = await api.get<IPlanTypeInterface[]>('/plans-types', {
      headers: { Authorization: `Bearer ${token}` },
    })
    return response.data
  } catch (error) {
    console.error('Failed to create user', error)
    throw error
  }
}
