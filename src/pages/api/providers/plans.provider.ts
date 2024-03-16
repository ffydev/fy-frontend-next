import { api } from '../apis/backendApi'
import { IPlanType } from './plans-types.provider'

export interface IPlan {
  id?: string
  initDate?: string
  endDate?: string
  isActive?: boolean
  planTypeId?: string
  planType?: IPlanType
  userId?: string
  planDuration?: number
}

export async function updatePlan(
  token: string,
  id: string,
  plan: IPlan,
): Promise<IPlan> {
  try {
    const response = await api.patch<IPlan>(`/plans/${id}`, plan, {
      headers: { Authorization: `Bearer ${token}` },
    })

    return response.data
  } catch (error) {
    console.error('Failed to update plan', error)
    throw error
  }
}
