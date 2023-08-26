import {
  findCurrentUser,
  getUserToken,
} from '@/pages/api/providers/auth.provider'
import {
  IWorkout,
  findWorkoutsNamesByUserId,
} from '@/pages/api/providers/workouts.provider'
import {
  Box,
  Container,
  Flex,
  Heading,
  SimpleGrid,
  Stack,
  Tab,
  TabList,
  Tabs,
  useToast,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useAuthStore } from '@/stores/AuthStore'
import {
  findWorkoutsExercisesByWorkout,
  IWorkoutsExercises,
} from '@/pages/api/providers/workoutsExercises.provider'
import ExercisesList from '@/components/UserFlow/Exercises'
import Navbar from '@/components/UserFlow/NavBar'
import HandleButton from '@/components/Buttons/HandleButton'
import { ArrowLeft } from '@phosphor-icons/react'

export default function Workouts() {
  const router = useRouter()
  const { user, setIsLoadingLogin, setUser, isLoadingLogin } = useAuthStore()
  const [workoutsNames, setWorkoutsNames] = useState<IWorkout[]>([])
  const [selectedWorkoutId, setSelectedWorkoutId] = useState<string>('')
  const [workoutsExercises, setWorkoutsExercises] = useState<
    IWorkoutsExercises[]
  >([])
  const toast = useToast()

  useEffect(() => {
    if (!isLoadingLogin && !user) {
      setIsLoadingLogin(true)
    }

    if (user) {
      setIsLoadingLogin(false)
    }
  }, [user, setIsLoadingLogin, isLoadingLogin])

  useEffect(() => {
    const fetchUserData = async () => {
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

      const currentUserData = await findCurrentUser(token)

      if (!currentUserData) {
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

      setUser(currentUserData.user)
    }

    if (!user) {
      fetchUserData()
    }
  }, [router, setUser, toast, user])

  useEffect(() => {
    const fetchWorkoutsNames = async () => {
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

        const response = await findWorkoutsNamesByUserId(
          token,
          user?.id as string,
        )

        setWorkoutsNames(response)
      } catch (error) {
        console.error(error)
        toast({
          title: 'Sua sessão expirou.',
          description: 'Por favor, faça login novamente.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
        router.push('/login')
      }
    }
    fetchWorkoutsNames()
  }, [router, user?.id, toast])

  useEffect(() => {
    if (workoutsNames.length > 0) {
      if (!selectedWorkoutId) {
        setSelectedWorkoutId(workoutsNames[0]?.id as string)
      }

      if (!selectedWorkoutId) {
        return
      }

      const fetchUserWorkouts = async () => {
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

          const response = await findWorkoutsExercisesByWorkout(
            token,
            selectedWorkoutId as string,
          )

          setWorkoutsExercises(response)
        } catch (error) {
          console.error(error)
          toast({
            title: 'Erro ao buscar workouts.',
            description: 'Por favor, tente novamente.',
            status: 'error',
            duration: 3000,
            isClosable: true,
          })
        }
      }
      fetchUserWorkouts()
    }
  }, [selectedWorkoutId, workoutsNames, router, user?.id, toast])

  const handleWithNavigateToDashboard = () => {
    router.push('/dashboard')
  }

  return (
    <>
      <Box
        bgGradient={[
          'linear(to-tr, gray.900 27.17%, purple.900 85.87%)',
          'linear(to-b, gray.900 27.17%, purple.900 85.87%)',
        ]}
        minH="100vh"
      >
        <Navbar />
        <Stack
          direction={'column'}
          align={'start'}
          alignSelf={'center'}
          position={'relative'}
          ml={3}
          pt={6}
          pb={6}
        >
          <Flex>
            <HandleButton
              onClick={() => handleWithNavigateToDashboard()}
              leftIcon={<ArrowLeft size={28} weight="bold" />}
            />
            <Heading
              ml={3}
              as="h3"
              size="lg"
              fontWeight="medium"
              textAlign="center"
            >
              Workouts
            </Heading>
          </Flex>
        </Stack>

        <Stack direction={['column', 'row']} w={'full'}>
          <Container maxW={'7xl'}>
            <Tabs size="md" variant="enclosed" colorScheme={'purple'} isLazy>
              <TabList>
                {workoutsNames?.map((workout: IWorkout) => (
                  <Tab
                    key={workout.id}
                    onClick={() => setSelectedWorkoutId(workout.id!)}
                    mb={4}
                  >
                    {workout.workoutType}
                  </Tab>
                ))}
              </TabList>

              <Stack direction={['column', 'row']} w={'full'} mt={3}>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} w={'full'}>
                  <ExercisesList workoutsExercises={workoutsExercises} />
                </SimpleGrid>
              </Stack>
            </Tabs>
          </Container>
        </Stack>
      </Box>
    </>
  )
}
