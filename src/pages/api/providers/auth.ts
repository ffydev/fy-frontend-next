import { backendApi } from '../backendApi'

export interface IAvatar {
  imageKey: string
  imageData: string
}

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
  avatar: IAvatar
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

export async function signIn(login: ILogin) {
  try {
    const response = await backendApi.post(`/login`, login)

    if (response && response.data) {
      localStorage.setItem('fyToken', response.data.access_token)
      return response
    }
    return response
  } catch (error) {
    return null
  }
}

export async function findCurrentUser(
  token: string,
): Promise<ICurrentUser | null> {
  try {
    const response = await backendApi.get<ICurrentUser>('/users/profile', {
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
    const response = await backendApi.post(`/validate-captcha`, captcha)
    return response.data
  } catch (error) {
    return null
  }
}

export async function initRecoveryPassword(email: string): Promise<void> {
  try {
    return await backendApi.post(`/retrieval/${email}`)
  } catch (error) {
    console.error('Failed to recovery password', error)
    throw error
  }
}
