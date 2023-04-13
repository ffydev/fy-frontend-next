import { getUserToken } from '@/pages/api/providers/auth.provider'
import {
  deleteWorkout,
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
  const { userId, isFetchingWorkoutsNames } = useAdminProvider()
  const [workoutsNames, setWorkoutsNames] = useState<IWorkout[]>([])
  const [workouts, setWorkouts] = useState<IWorkout[]>([])
  const [selectedWorkoutId, setSelectedWorkoutId] = useState<string>('')

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
    fetchUserWorkouts()
  }, [selectedWorkoutId, fetchUserWorkouts])

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
    } catch (error) {
      console.error(error)
    }
  }

  const updatingWorkoutsState = (workouts: IWorkout[], id: string) => {
    return workouts.filter((workout: IWorkout) => workout.id !== id)
  }

  return (
    <>
      <Tabs variant="soft-rounded" colorScheme={'whiteAlpha'}>
        <TabList>
          {workoutsNames?.map((workout: IWorkout) => (
            <Tab
              key={workout.id}
              onClick={() => setSelectedWorkoutId(workout.id!)}
              mb={4}
            >
              Workout: {workout.workoutType}
            </Tab>
          ))}
        </TabList>
        <WorkoutsLists
          setWorkouts={setWorkouts}
          workouts={workouts}
          handleWithDeleteWorkout={handleWithDeleteWorkout}
        />
      </Tabs>
    </>
  )
}
