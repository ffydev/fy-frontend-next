import { api } from '../apis/api'
export interface ILoginResponse {
  id?: string
  name?: string
  email?: string
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

      return response.data as ILoginResponse
    }
    return null
  } catch (error) {
    return null
  }
}

export const getUserToken = () => {
  return localStorage.getItem('fyToken')
}
