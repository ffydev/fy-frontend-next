import { api } from '../apis/api'
import { IPlanType } from './plans-types.provider'

export interface IPlanInterface {
  id?: string
  initDate?: string
  endDate?: string
  isActive?: boolean
  planTypeId?: string
  planType?: IPlanType
  userId?: string
}

export async function updatePlan(
  token: string,
  id: string,
  plan: IPlanInterface,
): Promise<IPlanInterface> {
  try {
    const response = await api.patch<IPlanInterface>(`/plans/${id}`, plan, {
      headers: { Authorization: `Bearer ${token}` },
    })

    return response.data
  } catch (error) {
    console.error('Failed to create user', error)
    throw error
  }
}
