import { api } from '../apis/backendApi'
import { IUserInterface } from './users.provider'

export interface IUserType {
  id: string
  name: string
  user: IUserInterface[]
}

export async function findUsersTypes(token: string): Promise<IUserType[]> {
  try {
    const response = await api.get<IUserType[]>('/users-types', {
      headers: { Authorization: `Bearer ${token}` },
    })
    return response.data
  } catch (error) {
    console.error('Failed to find users types', error)
    throw error
  }
}
