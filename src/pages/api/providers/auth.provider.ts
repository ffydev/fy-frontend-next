import { api } from '../apis/api'

export interface IUser {
  id: string
  firstName: string
  lastName: string
  email: string
  isRegistered: boolean
  hasAnamnesis: boolean
  access_token?: string
  hasAvatar: boolean
  userType: {
    name: string
  }
}

export interface IAvatar {
  imageKey: string
  imageData: string
}

interface ICurrentUser {
  user: IUser
  avatar: {
    imageKey: string
    imageData: string
  }
}

export interface ILogin {
  username: string
  password: string
}

export interface ICaptcha {
  token: string
}

export async function signIn(login: ILogin): Promise<IUser | null> {
  try {
    const response = await api.post(`/login`, login)

    if (response.data) {
      localStorage.setItem('fyToken', response.data.access_token)
      return response.data as IUser
    }
    return null
  } catch (error) {
    return null
  }
}

export async function findCurrentUser(
  token: string,
): Promise<ICurrentUser | null> {
  try {
    const response = await api.get<ICurrentUser>('/users/profile', {
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

export async function validateCaptcha(
  captcha: ICaptcha,
): Promise<Boolean | null> {
  try {
    const response = await api.post(`/validate-captcha`, captcha)

    if (response.data) {
      return response.data
    }
    return response.data
  } catch (error) {
    return null
  }
}
