import PlanList from '@/components/PlanList'
import { WorkoutCreate } from '@/components/Workouts/WorkoutCreate'
import { WorkoutsLists } from '@/components/Workouts/WorkoutsLists'
import { getUserToken } from '@/pages/api/providers/auth.provider'
import {
  findExercisesNames,
  IExercisesNames,
} from '@/pages/api/providers/exercises-names.provider'
import {
  findExerciseTypes,
  IExerciseTypesInterface,
} from '@/pages/api/providers/exercises-types.provider'
import {
  findPlanTypes,
  IPlanTypeInterface,
} from '@/pages/api/providers/plans-types.provider'
import {
  findUserType,
  IUserTypeInterface,
} from '@/pages/api/providers/users-types.provider'
import {
  deleteUser,
  findUsers,
  IUserInterface,
} from '@/pages/api/providers/users.provider'
import {
  findWorkoutsByUserId,
  IWorkoutInterface,
} from '@/pages/api/providers/workouts.provider'
import {
  Box,
  Button,
  CloseButton,
  Container,
  Flex,
  FormControl,
  Heading,
  IconButton,
  Input,
  Select,
  SimpleGrid,
  Spacer,
  Stack,
  Tab,
  TabList,
  Tabs,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { ArrowArcLeft } from 'phosphor-react'
import { useCallback, useEffect, useState } from 'react'
import UserCreate from '../UserCreate'
import { UsersList } from '../UsersList'

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
  const [exerciseTypes, setExerciseTypes] = useState<IExerciseTypesInterface[]>(
    [],
  )
  const [exerciseNames, setExerciseNames] = useState<IExercisesNames[]>([])

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

  const handleWithDeleteUser = (id: string) => {
    const token = getUserToken()

    if (!token) {
      // Implementar mensagem personalizada
      router.push('/login')
      return
    }
    deleteUser(token, id).then(() => {
      fetchUsersData()
    })
  }

  const handleWithFindWorkoutsByUser = (userId: string) => {
    setUserId(userId)
    setWorkoutsComponents(true)
  }

  const handleWithShowUsers = () => {
    setWorkoutsComponents(false)
  }

  const fetchExercisesTypesData = useCallback(async () => {
    try {
      const token = getUserToken()

      if (!token) {
        // Implementar mensagem personalizada
        router.push('/login')
        return
      }

      const response = await findExerciseTypes(token)

      setExerciseTypes(response)
    } catch (error) {
      console.error(error)
      // Implementar mensagem personalizada
      router.push('/login')
    }
  }, [router])

  const fetchExercisesNamesData = useCallback(async () => {
    try {
      const token = getUserToken()

      if (!token) {
        // Implementar mensagem personalizada
        router.push('/login')
        return
      }

      const response = await findExercisesNames(token)

      setExerciseNames(response)
    } catch (error) {
      console.error(error)
      // Implementar mensagem personalizada
      router.push('/login')
    }
  }, [router])

  useEffect(() => {
    fetchExercisesTypesData()
    fetchExercisesNamesData()
  }, [fetchExercisesTypesData, fetchExercisesNamesData])

  return (
    <>
      {workoutsComponents ? (
        <>
          <Box ml={{ base: 0, md: 60 }} minH={'100vh'}>
            <Container maxW='7xl' p={{ base: 3, md: 10 }}>
              <Heading
                as='h3'
                size='lg'
                mb='4'
                fontWeight='medium'
                textAlign='left'
              >
                Workouts
              </Heading>
              <Flex>
                <Stack>
                  <IconButton
                    rounded={'md'}
                    w={'3xs'}
                    aria-label='Voltar'
                    icon={<ArrowArcLeft size={28} weight='bold' />}
                    onClick={handleWithShowUsers}
                  />
                </Stack>

                <WorkoutCreate
                  fetchUserWorkouts={fetchUserWorkouts}
                  userId={userId}
                />
              </Flex>
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
                    exerciseTypes={exerciseTypes}
                    exerciseNames={exerciseNames}
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
            <Container maxW='7xl' p={{ base: 5, md: 10 }}>
              <Heading
                as='h3'
                size='lg'
                mb='4'
                fontWeight='medium'
                textAlign='left'
              >
                Usuários
              </Heading>
              <Stack direction={['column', 'row']} spacing={6} w={'full'}>
                <FormControl width={'100%'} mb={{ base: '4', lg: '0' }}>
                  <UserCreate
                    fetchUsersData={fetchUsersData}
                    userTypes={userType}
                    planTypes={planTypes}
                  />
                </FormControl>
                <FormControl
                  width={'100%'}
                  mb={{ base: '4', lg: '0' }}
                  isRequired
                >
                  <Select
                    size={'md'}
                    border={'1px'}
                    borderColor={'purple.400'}
                    variant={'outline'}
                    value={userTypeId}
                    onChange={(event) => setUserTypeId(event.target.value)}
                    placeholder='Tipo de usuário:'
                  >
                    {userType.map((userType: IUserTypeInterface) => (
                      <option key={userType.id} value={userType.id}>
                        {userType.name}
                      </option>
                    ))}
                  </Select>
                </FormControl>
                <FormControl width={'100%'} mb={{ base: '4', lg: '0' }}>
                  <Input
                    border={'1px'}
                    borderColor={'purple.400'}
                    variant={'outline'}
                    placeholder='Nome do usuário'
                    value={searchName}
                    onChange={(event) => setSearchName(event.target.value)}
                  />
                </FormControl>
              </Stack>
              <Stack direction={['column', 'row']} spacing={6} w={'full'}>
                <SimpleGrid
                  columns={{ base: 1, sm: 2, md: 3 }}
                  spacing={5}
                  mt={12}
                  mb={4}
                  w={'full'}
                >
                  {users.map((user: IUserInterface) => (
                    <Box
                      key={user.id}
                      p={4}
                      bgColor={'whiteAlpha.100'}
                      rounded={'lg'}
                      border={'1px'}
                      borderColor={'whiteAlpha.200'}
                      backdropBlur={'1rem'}
                      backdropFilter='blur(15px)'
                      boxShadow={'lg'}
                    >
                      <Flex minWidth='max-content'>
                        <Spacer />
                        <CloseButton
                          onClick={() => handleWithDeleteUser(user.id)}
                          size='sm'
                        />
                      </Flex>

                      <Flex>
                        <Button
                          bgColor={'purple.400'}
                          size='xs'
                          onClick={() => handleWithFindWorkoutsByUser(user.id)}
                        >
                          Workouts
                        </Button>
                      </Flex>

                      <UsersList fetchUsersData={fetchUsersData} user={user} />

                      <Box>
                        {user.plan && user.plan.length > 0 && (
                          <PlanList plans={user.plan} planTypes={planTypes} />
                        )}
                      </Box>
                    </Box>
                  ))}
                </SimpleGrid>
              </Stack>
            </Container>
          </Box>
        </Box>
      )}
    </>
  )
}
