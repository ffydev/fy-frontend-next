import { api } from '../apis/api'
import { IUserInterface } from './user.provider'

export interface IUserTypeInterface {
  id: string
  name: string
  user: IUserInterface[]
}

export async function findUserType(
  token: string,
): Promise<IUserTypeInterface[]> {
  try {
    const response = await api.get<IUserTypeInterface[]>('/user-types', {
      headers: { Authorization: `Bearer ${token}` },
    })
    return response.data
  } catch (error) {
    console.error('Failed to find users', error)
    throw error
  }
}
