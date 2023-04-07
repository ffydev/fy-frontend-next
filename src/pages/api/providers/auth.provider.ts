import { api } from '../apis/api'

export interface IUser {
  id: string
  firstName: string
  lastName: string
  email: string
  isRegistered: boolean
  hasAmnesis: boolean
  access_token?: string
  userType: {
    name: string
  }
}

export async function signIn(username: string, password: string) {
  try {
    const response = await api.post(`/login`, { username, password })

    if (response.data) {
      localStorage.setItem('fyToken', response.data.access_token)

      return response.data as IUser
    }
    return null
  } catch (error) {
    return null
  }
}

export async function findCurrentUser(token: string): Promise<IUser | null> {
  try {
    const response = await api.get<IUser>('/users/profile', {
      headers: { Authorization: `Bearer ${token}` },
    })
    return response.data
  } catch (error) {
    console.error('Failed to find current user', error)
    return null
  }
}

export const getUserToken = () => {
  return localStorage.getItem('fyToken')
}
