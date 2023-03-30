import WorkoutsHeader from '@/components/Workouts/WorkoutsHeader'
import { WorkoutsLists } from '@/components/Workouts/WorkoutsList'
import { getUserToken } from '@/pages/api/providers/auth.provider'
import {
  findPlanTypes,
  IPlanTypeInterface,
} from '@/pages/api/providers/plans-types.provider'
import {
  findUserType,
  IUserTypeInterface,
} from '@/pages/api/providers/users-types.provider'
import { findUsers, IUserInterface } from '@/pages/api/providers/users.provider'
import {
  findWorkoutsByUserId,
  IWorkoutInterface,
} from '@/pages/api/providers/workouts.provider'
import { Box, Container, Stack, Tab, TabList, Tabs } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import UsersHeader from './UsersHeader'
import { UsersList } from './UsersList'

export default function Users() {
  const router = useRouter()
  const [users, setUsers] = useState<IUserInterface[]>([])
  const [userType, setUserType] = useState<IUserTypeInterface[]>([])
  const [userTypeId, setUserTypeId] = useState<string>('')
  const [searchName, setSearchName] = useState<string>('')
  const [planTypes, setPlanTypes] = useState<IPlanTypeInterface[]>([])
  const [workoutsComponents, setWorkoutsComponents] = useState<boolean>(false)
  const [userId, setUserId] = useState<string>('')
  const [userWorkouts, setUserWorkouts] = useState<IWorkoutInterface[]>([])

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

      const response = await findPlanTypes(token)

      setPlanTypes(response)
    } catch (error) {
      console.error(error)
      router.push('/login')
    }
  }, [router, setPlanTypes])

  const fetchUserTypeData = useCallback(async () => {
    try {
      const token = getUserToken()

      if (!token) {
        // Implementar mensagem personalizada
        router.push('/login')
        return
      }

      const response = await findUserType(token)

      setUserType(response)
    } catch (error) {
      console.error(error)
      // Implementar mensagem personalizada
      router.push('/login')
    }
  }, [router, setUserType])

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
    fetchUserTypeData()
  }, [fetchPlanTypeData, fetchUserTypeData])

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
            <Container maxW="7xl" p={{ base: 3, md: 10 }}>
              <WorkoutsHeader
                fetchUserWorkouts={fetchUserWorkouts}
                userId={userId}
                handleWithHideWorkouts={handleWithHideWorkouts}
              />
              <Stack maxW={'auto'}>
                <Tabs>
                  <TabList>
                    {userWorkouts?.map((workout: IWorkoutInterface) => (
                      <Tab key={workout.id}>
                        Tipo de treino: {workout.workoutType}
                      </Tab>
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
        <Box
          bgGradient={[
            'linear(to-tr, blackAlpha.50 30.17%, purple.900 99.87%)',
            'linear(to-br, blackAlpha.50 80.17%, purple.900 99.87%)',
          ]}
        >
          <Box ml={{ base: 0, md: 60 }} minH={'100vh'}>
            <Container maxW="7xl" p={{ base: 5, md: 10 }}>
              <UsersHeader
                fetchUsersData={fetchUsersData}
                userType={userType}
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
        </Box>
      )}
    </>
  )
}
