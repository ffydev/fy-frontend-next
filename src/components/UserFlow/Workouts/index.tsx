import { getUserToken } from '@/pages/api/providers/auth.provider'
import {
  IWorkout,
  findWorkoutsNamesByUserId,
} from '@/pages/api/providers/workouts.provider'
import {
  Box,
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
import ExercisesList from '../Exercises'

export function Workouts() {
  const router = useRouter()
  const { user } = useAuthStore()
  const [workoutsNames, setWorkoutsNames] = useState<IWorkout[]>([])
  const [selectedWorkoutId, setSelectedWorkoutId] = useState<string>('')
  const [workoutsExercises, setWorkoutsExercises] = useState<
    IWorkoutsExercises[]
  >([])
  const toast = useToast()

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

  return (
    <>
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
        <Box p={4} width="100%">
          <Stack direction={['column', 'row']} w={'full'}>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} w={'full'}>
              <ExercisesList workoutsExercises={workoutsExercises} />
            </SimpleGrid>
          </Stack>
        </Box>
      </Tabs>
    </>
  )
}
