import WorkoutsHeader from '@/components/Workouts/WorkoutsHeader'
import { WorkoutsLists } from '@/components/Workouts/WorkoutsList'
import { getUserToken } from '@/pages/api/providers/auth.provider'
import {
  findPlansTypes,
  IPlanType,
} from '@/pages/api/providers/plans-types.provider'
import { findUsers, IUserInterface } from '@/pages/api/providers/users.provider'
import {
  findWorkoutsByUserId,
  IWorkout,
} from '@/pages/api/providers/workouts.provider'
import { Box, Container, Stack, Tab, TabList, Tabs } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { ArrowArcLeft } from 'phosphor-react'
import { useCallback, useEffect, useState } from 'react'
import HandleButton from '../Buttons/HandleButton'
import UsersHeader from './UsersHeader'
import { UsersList } from './UsersList'

export default function Users() {
  const router = useRouter()
  const [users, setUsers] = useState<IUserInterface[]>([])
  const [userTypeId, setUserTypeId] = useState<string>('')
  const [searchName, setSearchName] = useState<string>('')
  const [planTypes, setPlanTypes] = useState<IPlanType[]>([])
  const [workoutsComponents, setWorkoutsComponents] = useState<boolean>(false)
  const [userId, setUserId] = useState<string>('')
  const [userWorkouts, setUserWorkouts] = useState<IWorkout[]>([])

  const fetchUsersData = useCallback(async () => {
    try {
      const token = getUserToken()

      if (!token) {
        // Implementar mensagem personalizada
        return router.push('/login')
      }

      const usersData = await findUsers(token, {
        userTypeId,
        searchName,
      })
      setUsers(usersData)
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

  const fetchUserWorkouts = useCallback(async () => {
    try {
      const token = getUserToken()

      if (!token) {
        // Implementar mensagem personalizada
        router.push('/login')
        return
      }

      const workoutsByUser = await findWorkoutsByUserId(token, userId as string)

      setUserWorkouts(workoutsByUser)
    } catch (error) {
      console.error(error)
      // Implementar mensagem personalizada
      router.push('/login')
    }
  }, [router, userId])

  useEffect(() => {
    if (userId) {
      fetchUserWorkouts()
    }
  }, [fetchUserWorkouts])

  useEffect(() => {
    fetchPlanTypeData()
  }, [fetchPlanTypeData])

  useEffect(() => {
    fetchUsersData()
  }, [fetchUsersData])

  const handleWithFindWorkoutsByUser = (userId: string) => {
    setUserId(userId)
    setWorkoutsComponents(true)
  }

  const handleWithHideWorkouts = () => {
    setWorkoutsComponents(false)
  }

  return (
    <>
      {workoutsComponents ? (
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

            <Container maxW="7xl" p={{ base: 3, md: 1 }}>
              <WorkoutsHeader
                fetchUserWorkouts={fetchUserWorkouts}
                userId={userId}
                handleWithHideWorkouts={handleWithHideWorkouts}
              />
              <Stack maxW={'auto'}>
                <Tabs>
                  <TabList>
                    {userWorkouts?.map((workout: IWorkout) => (
                      <Tab key={workout.id}>Workout: {workout.workoutType}</Tab>
                    ))}
                  </TabList>
                  <WorkoutsLists
                    fetchUserWorkouts={fetchUserWorkouts}
                    workouts={userWorkouts}
                  />
                </Tabs>
              </Stack>
            </Container>
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
              handleWithFindWorkoutsByUser={handleWithFindWorkoutsByUser}
              planTypes={planTypes}
            />
          </Container>
        </Box>
      )}
    </>
  )
}
