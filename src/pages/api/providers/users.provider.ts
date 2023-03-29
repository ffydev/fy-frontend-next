import { api } from '../apis/api'
import { IPlanInterface } from './plans.provider'
import { IUserTypeInterface } from './users-types.provider'
import { IWorkoutInterface } from './workouts.provider'

export interface IUserInterface {
  id: string
  firstName: string | undefined
  lastName: string | undefined
  email: string
  userTypeId: string
  access_token?: string
  plan: IPlanInterface[]
  workout: IWorkoutInterface[]
  userType: IUserTypeInterface
}
export interface ICreateUserWithIPlanInterface {
  email: string
  firstName?: string
  lastName?: string
  password: string
  userTypeId: string
  plan: {
    create: IPlanInterface[]
  }
}
export interface IUpdateUserWithIPlanInterface {
  id?: string
  email?: string
  firstName?: string
  lastName?: string
  password?: string
  userTypeId?: string
}

export interface IUserFilter {
  userTypeId?: string
  searchName?: string
}

export async function createUser(
  token: string,
  user: ICreateUserWithIPlanInterface,
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
      `/users?userTypeId=${query.userTypeId}&searchName=${query.searchName}`,
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
  user: IUpdateUserWithIPlanInterface,
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
