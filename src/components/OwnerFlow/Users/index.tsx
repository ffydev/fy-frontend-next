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
import { useOwnerIsFetchingStore } from '@/stores/OwnerStore/IsFetching'
import { useToast } from '@chakra-ui/react'

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
  const { isFetchingUsers } = useOwnerIsFetchingStore()
  const toast = useToast()

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const token = getUserToken()

        if (!token) {
          toast({
            title: 'Sua sessão expirou.',
            description: 'Por favor, faça login novamente.',
            status: 'error',
            duration: 3000,
            isClosable: true,
          })
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
  }, [
    router,
    userTypeId,
    search,
    isDeleted,
    skip,
    take,
    isFetchingUsers,
    toast,
  ])

  useEffect(() => {
    const fetchPlanTypeData = async () => {
      try {
        const token = getUserToken()

        if (!token) {
          toast({
            title: 'Sua sessão expirou.',
            description: 'Por favor, faça login novamente.',
            status: 'error',
            duration: 3000,
            isClosable: true,
          })
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
  }, [router, toast])

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

      <UsersList users={users} planTypes={planTypes} />

      <Pagination
        hasPreviousPage={hasPreviousPage}
        hasNextPage={hasNextPage}
        handlePreviousPage={handleWithPreviousPage}
        handleNextPage={handleWithNextPage}
        isButtonDisabled={isButtonDisabled}
      />
    </>
  )
}
