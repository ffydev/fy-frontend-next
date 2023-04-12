import { getUserToken } from '@/pages/api/providers/auth.provider'
import {
  findWorkoutsByUserId,
  findWorkoutsNamesByUserId,
  IWorkout,
} from '@/pages/api/providers/workouts.provider'
import { Container, Stack, Tab, TabList, Tabs } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { useAuth } from '@/hooks/ContextAuth'
import { WorkoutsList } from './WorkoutsList'

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
  }, [router, user?.id, selectedWorkoutId])

  const fetchUserWorkouts = useCallback(async () => {
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
  }, [router, selectedWorkoutId, user?.id])

  const handleWithSettingWorkoutId = (workoutId: string) => {
    setSelectedWorkoutId(workoutId)
  }

  useEffect(() => {
    fetchWorkoutsNames()
  }, [fetchWorkoutsNames])

  useEffect(() => {
    fetchUserWorkouts()
  }, [selectedWorkoutId, fetchWorkoutsNames, fetchUserWorkouts])

  return (
    <>
      <Container maxW="7xl" p={{ base: 3, md: 1 }}>
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
                </Tab>
              ))}
            </TabList>
            <WorkoutsList workouts={workouts} />
          </Tabs>
        </Stack>
      </Container>
    </>
  )
}
