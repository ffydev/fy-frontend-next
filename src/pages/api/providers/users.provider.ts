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
  plan: IPlan
  workout: IWorkout[]
  userType: IUserType
  isRegistered: boolean
  hasAnamnesis: boolean
  deletedAt?: string
}
export interface ICreateUserWithIPlan {
  email: string
  firstName?: string
  lastName?: string
  password: string
  userTypeId: string
  plan?: {
    create: IPlan
  }
}
export interface IUpdateUser {
  id?: string
  email?: string
  firstName?: string
  lastName?: string
  password?: string
  userTypeId?: string
  isRegistered?: boolean
  hasAnamnesis?: boolean
  deletedAt?: string | null
}

export interface IUserFilter {
  userTypeId?: string
  search?: string
  isDeleted?: string // '1' or undefined
  skip: number
  take: number
}

interface usersDataInterface {
  usersData: IUserInterface[]
  usersCount: number
  hasPreviousPage: boolean
  hasNextPage: boolean
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
): Promise<usersDataInterface> {
  try {
    const response = await api.get<usersDataInterface>(
      `/users?userTypeId=${query.userTypeId}&search=${query.search}&isDeleted=${query.isDeleted}&skip=${query.skip}&take=${query.take}`,
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
  user: IUpdateUser,
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

export async function updateUserByUser(
  token: string,
  id: string,
  user: IUpdateUser,
): Promise<IUserInterface> {
  try {
    const response = await api.patch<IUserInterface>(
      `/users/update-by-user/${id}`,
      user,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    )

    return response.data
  } catch (error) {
    console.error('Failed to create user', error)
    throw error
  }
}
