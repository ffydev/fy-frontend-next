import { getUserToken } from '@/pages/api/providers/auth.provider'
import {
  findWorkoutsByUserId,
  findWorkoutsNamesByUserId,
  IWorkout,
} from '@/pages/api/providers/workouts.provider'
import { Tab, TabList, Tabs } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { WorkoutsLists } from './WorkoutsList'
import { useAdminProvider } from '@/hooks/ContextDashboardAdmin'

export function Workouts() {
  const router = useRouter()
  const {
    userId,
    isFetchingWorkoutsNames,
    selectedWorkoutId,
    setSelectedWorkoutId,
  } = useAdminProvider()
  const [workoutsNames, setWorkoutsNames] = useState<IWorkout[]>([])
  const [workouts, setWorkouts] = useState<IWorkout[]>([])

  const fetchWorkoutsNames = useCallback(async () => {
    try {
      const token = getUserToken()

      if (!token) {
        // Implementar mensagem personalizada
        router.push('/login')
        return
      }

      const response = await findWorkoutsNamesByUserId(token, userId as string)

      setWorkoutsNames(response)
    } catch (error) {
      console.error(error)
      // Implementar mensagem personalizada
      router.push('/login')
    }
  }, [router, userId])

  useEffect(() => {
    fetchWorkoutsNames()
  }, [isFetchingWorkoutsNames, fetchWorkoutsNames])

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
        userId as string,
      )

      setWorkouts(response)
    } catch (error) {
      console.error(error)
      // Implementar mensagem personalizada
      router.push('/login')
    }
  }, [router, userId, selectedWorkoutId])

  useEffect(() => {
    if (workoutsNames.length > 0) {
      if (!selectedWorkoutId) {
        setSelectedWorkoutId(workoutsNames[0]?.id as string)
      }
      fetchUserWorkouts()
    }
  }, [
    fetchUserWorkouts,
    selectedWorkoutId,
    workoutsNames,
    setSelectedWorkoutId,
  ])

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
        <WorkoutsLists setWorkouts={setWorkouts} workouts={workouts} />
      </Tabs>
    </>
  )
}
