import { getUserToken } from '@/pages/api/providers/auth.provider'
import {
  findWorkoutsByUserId,
  findWorkoutsNamesByUserId,
  IWorkout,
} from '@/pages/api/providers/workouts.provider'
import { Tab, TabList, Tabs } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useAuthStore } from '@/Stores/AuthStore'
import { WorkoutsList } from './WorkoutsList'

export function Workouts() {
  const router = useRouter()
  const { user } = useAuthStore()
  const [workoutsNames, setWorkoutsNames] = useState<IWorkout[]>([])
  const [selectedWorkoutId, setSelectedWorkoutId] = useState<string>('')
  const [workouts, setWorkouts] = useState<IWorkout[]>([])

  useEffect(() => {
    const fetchWorkoutsNames = async () => {
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

        setWorkoutsNames(response)
      } catch (error) {
        console.error(error)
        // Implementar mensagem personalizada
        router.push('/login')
      }
    }
    fetchWorkoutsNames()
  }, [router, user?.id])

  useEffect(() => {
    if (workoutsNames.length > 0) {
      if (!selectedWorkoutId) {
        setSelectedWorkoutId(workoutsNames[0]?.id as string)
      }
      const fetchUserWorkouts = async () => {
        try {
          const token = getUserToken()

          if (!token) {
            // Implementar mensagem personalizada
            router.push('/login')
            return
          }

          if (!selectedWorkoutId) {
            setSelectedWorkoutId(workoutsNames[0]?.id as string)
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
      fetchUserWorkouts()
    }
  }, [selectedWorkoutId, workoutsNames, router, user?.id])

  return (
    <>
      <Tabs size="lg" isLazy variant="enclosed" colorScheme={'whiteAlpha'}>
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
        <WorkoutsList workouts={workouts} />
      </Tabs>
    </>
  )
}
