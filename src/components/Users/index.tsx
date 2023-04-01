import { Context } from '@/hooks/Context'
import { getUserToken } from '@/pages/api/providers/auth.provider'
import {
  findPlansTypes,
  IPlanType,
} from '@/pages/api/providers/plans-types.provider'
import { findUsers, IUserInterface } from '@/pages/api/providers/users.provider'
import { Box, Container, Stack } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { ArrowArcLeft } from 'phosphor-react'
import { useCallback, useContext, useEffect, useState } from 'react'
import HandleButton from '../Buttons/HandleButton'
import { Workouts } from '../Workouts'
import UsersHeader from './UsersHeader'
import { UsersList } from './UsersList'

export default function Users() {
  const router = useRouter()
  const [users, setUsers] = useState<IUserInterface[]>([])
  const [userTypeId, setUserTypeId] = useState<string>('')
  const [searchName, setSearchName] = useState<string>('')
  const [planTypes, setPlanTypes] = useState<IPlanType[]>([])
  const { isShowingWorkouts, changeUserId, handleWithShowWorkouts } =
    useContext(Context)

  const fetchUsersData = useCallback(async () => {
    try {
      const token = getUserToken()

      if (!token) {
        // Implementar mensagem personalizada
        return router.push('/login')
      }

      const response = await findUsers(token, {
        userTypeId,
        searchName,
      })
      setUsers(response)
    } catch (error) {
      console.error(error)
      router.push('/login')
    }
  }, [router, userTypeId, searchName, setUsers])

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
    fetchPlanTypeData()
  }, [fetchPlanTypeData])

  useEffect(() => {
    fetchUsersData()
  }, [fetchUsersData])

  const handleWithHideWorkouts = () => {
    handleWithShowWorkouts(!isShowingWorkouts)
    changeUserId('')
  }

  return (
    <>
      {isShowingWorkouts ? (
        <>
          <Box ml={{ base: 0, md: 60 }} minH={'100vh'}>
            <Stack
              direction={'column'}
              align={'start'}
              alignSelf={'center'}
              position={'relative'}
              mt={3}
              ml={3}
            >
              <HandleButton
                text={'Voltar'}
                leftIcon={<ArrowArcLeft size={28} weight="bold" />}
                onClick={handleWithHideWorkouts}
              />
            </Stack>

            <Workouts />
          </Box>
        </>
      ) : (
        <Box ml={{ base: 0, md: 60 }} m={4} minH={'100vh'}>
          <Container maxW="7xl" p={{ base: 5, md: 10 }}>
            <UsersHeader
              fetchUsersData={fetchUsersData}
              planTypes={planTypes}
              userTypeId={userTypeId}
              searchName={searchName}
              setUserTypeId={setUserTypeId}
              setSearchName={setSearchName}
            />

            <UsersList
              fetchUsersData={fetchUsersData}
              users={users}
              planTypes={planTypes}
            />
          </Container>
        </Box>
      )}
    </>
  )
}
