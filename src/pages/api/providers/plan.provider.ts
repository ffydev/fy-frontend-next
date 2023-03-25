import { api } from '../apis/api';
import { IPlanTypeInterface } from './plan-type.provider';


export interface IPlanInterface {
  id?: string;
  initDate?: string;
  endDate?: string;
  isActive?: boolean;
  planTypeId?: string;
  planType?: IPlanTypeInterface;
  userId?: string;
}

export async function updatePlan(token: string, id: string, plan: IPlanInterface): Promise<IPlanInterface> {
  try {
    const response = await api.patch<IPlanInterface>(`/plan/${id}`, plan, {
      headers: { Authorization: `Bearer ${token}` },
    });
    
    return response.data;
  } catch (error) {
    console.error('Failed to create user', error);
    throw error;
  }
}