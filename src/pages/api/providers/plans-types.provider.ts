import { backendApi } from '../apis/backendApi'

export interface IPlanType {
  id: string
  name: string
}

export async function findPlansTypes(token: string): Promise<IPlanType[]> {
  try {
    const response = await backendApi.get<IPlanType[]>('/plans-types', {
      headers: { Authorization: `Bearer ${token}` },
    })
    return response.data
  } catch (error) {
    console.error('Failed to find plans types', error)
    throw error
  }
}
