import { getUserToken } from '@/pages/api/providers/auth.provider'
import {
  deleteWorkout,
  findWorkoutsByUserId,
  findWorkoutsNamesByUserId,
  IWorkout,
} from '@/pages/api/providers/workouts.provider'
import {
  CloseButton,
  Container,
  Stack,
  Tab,
  TabList,
  Tabs,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import WorkoutsHeader from './WorkoutsHeader'
import { WorkoutsLists } from './WorkoutsList'
import { useAuth } from '@/hooks/ContextAuth'

export function Workouts() {
  const router = useRouter()
  const { user } = useAuth()
  const [workoutsNames, setWorkoutsNames] = useState<IWorkout[]>([])
  const [selectedWorkoutId, setSelectedWorkoutId] = useState<string>('')
  const [workouts, setWorkouts] = useState<IWorkout[]>([])

  const fetchWorkoutsNames = useCallback(async () => {
    try {
      const token = getUserToken()

      if (!token) {
        // Implementar mensagem personalizada
        router.push('/login')
        return
      }

      const response = await findWorkoutsNamesByUserId(
        token,
        user?.id as string,
      )

      if (response && response.length > 0 && selectedWorkoutId === '') {
        setSelectedWorkoutId(response?.[0].id!)
      }

      setWorkoutsNames(response)
    } catch (error) {
      console.error(error)
      // Implementar mensagem personalizada
      router.push('/login')
    }
  }, [router, user?.id])

  const fetchUserWorkouts = async () => {
    try {
      const token = getUserToken()

      if (!token) {
        // Implementar mensagem personalizada
        router.push('/login')
        return
      }
      const response = await findWorkoutsByUserId(
        token,
        selectedWorkoutId as string,
        user?.id as string,
      )

      setWorkouts(response)
    } catch (error) {
      console.error(error)
      // Implementar mensagem personalizada
      router.push('/login')
    }
  }

  const handleWithSettingWorkoutId = (workoutId: string) => {
    setSelectedWorkoutId(workoutId)
  }

  useEffect(() => {
    fetchWorkoutsNames()
  }, [fetchWorkoutsNames])

  useEffect(() => {
    fetchUserWorkouts()
  }, [selectedWorkoutId, fetchWorkoutsNames])

  const handleWithDeleteWorkout = async (id: string) => {
    const token = getUserToken()

    if (!token) {
      // Implementar mensagem personalizada
      router.push('/login')
      return
    }

    try {
      await deleteWorkout(token, id)
      const updatedWorkouts = updatingWorkoutsState(workoutsNames, id)
      setWorkoutsNames(updatedWorkouts)
      setSelectedWorkoutId(workoutsNames?.[0].id!)
    } catch (error) {
      console.error(error)
    }
  }

  const updatingWorkoutsState = (workouts: IWorkout[], id: string) => {
    return workouts.filter((workout: IWorkout) => workout.id !== id)
  }

  return (
    <>
      <Container maxW="7xl" p={{ base: 3, md: 1 }}>
        <WorkoutsHeader
          userId={user?.id!}
          fetchWorkoutsNames={fetchWorkoutsNames}
        />
        <Stack maxW={'auto'}>
          <Tabs variant="soft-rounded" colorScheme={'whiteAlpha'}>
            <TabList>
              {workoutsNames?.map((workout: IWorkout) => (
                <Tab
                  key={workout.id}
                  onClick={() => handleWithSettingWorkoutId(workout.id!)}
                  mb={4}
                >
                  Workout: {workout.workoutType}
                  <CloseButton
                    onClick={() => handleWithDeleteWorkout(workout.id!)}
                    size="sm"
                  />
                </Tab>
              ))}
            </TabList>
            <WorkoutsLists
              workouts={workouts}
              fetchUserWorkouts={fetchUserWorkouts}
            />
          </Tabs>
        </Stack>
      </Container>
    </>
  )
}
