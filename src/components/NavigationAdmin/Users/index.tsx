import UsersHeader from './UsersHeader'
import { useCallback, useEffect, useState } from 'react'
import {
  IPlanType,
  findPlansTypes,
} from '@/pages/api/providers/plans-types.provider'
import { getUserToken } from '@/pages/api/providers/auth.provider'
import { IUserInterface, findUsers } from '@/pages/api/providers/users.provider'
import { useRouter } from 'next/router'
import { UsersList } from './UsersList'

export default function Users() {
  const router = useRouter()
  const [users, setUsers] = useState<IUserInterface[]>([])
  const [userTypeId, setUserTypeId] = useState<string>('')
  const [search, setSearch] = useState<string>('')
  const [isDeleted, setIsDeleted] = useState<string>('')
  const [planTypes, setPlanTypes] = useState<IPlanType[]>([])

  const fetchUsersData = useCallback(async () => {
    try {
      const token = getUserToken()

      if (!token) {
        // Implementar mensagem personalizada
        return router.push('/login')
      }

      const response = await findUsers(token, {
        userTypeId,
        search,
        isDeleted,
      })

      setUsers(response)
    } catch (error) {
      console.error(error)
      router.push('/login')
    }
  }, [router, userTypeId, search, isDeleted])

  const fetchPlanTypeData = useCallback(async () => {
    try {
      const token = getUserToken()

      if (!token) {
        // Implementar mensagem personalizada
        router.push('/login')
        return
      }

      const response = await findPlansTypes(token)

      setPlanTypes(response)
    } catch (error) {
      console.error(error)
      router.push('/login')
    }
  }, [router, setPlanTypes])

  useEffect(() => {
    fetchUsersData()
    fetchPlanTypeData()
  }, [fetchUsersData, fetchPlanTypeData])

  return (
    <>
      <UsersHeader
        fetchUsersData={fetchUsersData}
        planTypes={planTypes}
        search={search}
        setUserTypeId={setUserTypeId}
        setSearch={setSearch}
        setIsDeleted={setIsDeleted}
      />

      <UsersList
        fetchUsersData={fetchUsersData}
        users={users}
        planTypes={planTypes}
      />
    </>
  )
}
