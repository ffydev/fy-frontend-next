import UsersHeader from './UsersHeader'
import { useEffect, useState } from 'react'
import {
  IPlanType,
  findPlansTypes,
} from '@/pages/api/providers/plans-types.provider'
import { getUserToken } from '@/pages/api/providers/auth.provider'
import { IUserInterface, findUsers } from '@/pages/api/providers/users.provider'
import { useRouter } from 'next/router'
import { UsersList } from './UsersList'
import Pagination from '@/components/Pagination'
import { useAdminIsFetchingStore } from '@/hooks/AdminStore/IsFetching/'

export default function Users() {
  const router = useRouter()
  const [users, setUsers] = useState<IUserInterface[]>([])
  const [usersCount, setUsersCount] = useState<number>(0)
  const [skip, setSkip] = useState<number>(0)
  const take = 9
  const [hasPreviousPage, setHasPreviousPage] = useState<boolean>(false)
  const [hasNextPage, setHasNextPage] = useState<boolean>(false)
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false)
  const [userTypeId, setUserTypeId] = useState<string>('')
  const [search, setSearch] = useState<string>('')
  const [isDeleted, setIsDeleted] = useState<string>('')
  const [planTypes, setPlanTypes] = useState<IPlanType[]>([])
  const { isFetchingUsers } = useAdminIsFetchingStore()

  useEffect(() => {
    const fetchUsersData = async () => {
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
          skip,
          take,
        })

        setUsers(response.usersData)
        setUsersCount(response.usersCount)
        setHasPreviousPage(response.hasPreviousPage)
        setHasNextPage(response.hasNextPage)
      } catch (error) {
        console.error(error)
        router.push('/login')
      } finally {
        setIsButtonDisabled(false)
      }
    }

    fetchUsersData()
  }, [router, userTypeId, search, isDeleted, skip, take, isFetchingUsers])

  useEffect(() => {
    const fetchPlanTypeData = async () => {
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
    }
    fetchPlanTypeData()
  }, [router])

  const handleWithPreviousPage = () => {
    if (!isButtonDisabled) {
      setIsButtonDisabled(true)

      setSkip(skip - 9)
    }
  }

  const handleWithNextPage = () => {
    if (!isButtonDisabled) {
      setIsButtonDisabled(true)

      setSkip(skip + 9)
    }
  }

  return (
    <>
      <UsersHeader
        planTypes={planTypes}
        search={search}
        setUserTypeId={setUserTypeId}
        setSearch={setSearch}
        setIsDeleted={setIsDeleted}
        usersCount={usersCount}
      />

      <Pagination
        hasPreviousPage={hasPreviousPage}
        hasNextPage={hasNextPage}
        handlePreviousPage={handleWithPreviousPage}
        handleNextPage={handleWithNextPage}
        isButtonDisabled={isButtonDisabled}
      />

      <UsersList users={users} planTypes={planTypes} />
    </>
  )
}
