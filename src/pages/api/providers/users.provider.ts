import { api } from '../apis/api'
import { IPlan } from './plans.provider'
import { IUserType } from './users-types.provider'
import { IWorkout } from './workouts.provider'

export interface IUserInterface {
  id: string
  firstName: string | undefined
  lastName: string | undefined
  email: string
  userTypeId: string
  access_token?: string
  plan: IPlan[]
  workout: IWorkout[]
  userType: IUserType
  isRegistered: boolean
}
export interface ICreateUserWithIPlan {
  email: string
  firstName?: string
  lastName?: string
  password: string
  userTypeId: string
  plan: {
    create: IPlan[]
  }
}
export interface IUpdateUserWithIPlan {
  id?: string
  email?: string
  firstName?: string
  lastName?: string
  password?: string
  userTypeId?: string
}

export interface IUserFilter {
  userTypeId?: string
  search?: string
}

export async function createUser(
  token: string,
  user: ICreateUserWithIPlan,
): Promise<IUserInterface> {
  try {
    const response = await api.post<IUserInterface>('/users', user, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return response.data
  } catch (error) {
    console.error('Failed to create user', error)
    throw error
  }
}

export async function findUsers(
  token: string,
  query: IUserFilter,
): Promise<IUserInterface[]> {
  try {
    const response = await api.get<IUserInterface[]>(
      `/users?userTypeId=${query.userTypeId}&searchName=${query.search}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    )
    return response.data
  } catch (error) {
    console.error('Failed to find users', error)
    throw error
  }
}

export async function findCurrentUser(
  token: string,
): Promise<IUserInterface | null> {
  try {
    const response = await api.get<IUserInterface>('/users/profile', {
      headers: { Authorization: `Bearer ${token}` },
    })
    return response.data
  } catch (error) {
    console.error('Failed to find current user', error)
    return null
  }
}

export async function deleteUser(token: string, id: string): Promise<void> {
  try {
    await api.delete(`/users/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return
  } catch (error) {
    console.error(`Failed to delete user with id ${id}`, error)
    throw error
  }
}

export async function updateUser(
  token: string,
  id: string,
  user: IUpdateUserWithIPlan,
): Promise<IUserInterface> {
  try {
    const response = await api.patch<IUserInterface>(`/users/${id}`, user, {
      headers: { Authorization: `Bearer ${token}` },
    })

    return response.data
  } catch (error) {
    console.error('Failed to create user', error)
    throw error
  }
}
