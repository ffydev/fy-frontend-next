import { Context } from '@/hooks/Context'
import { getUserToken } from '@/pages/api/providers/auth.provider'
import {
  findWorkoutsByUserId,
  IWorkout,
} from '@/pages/api/providers/workouts.provider'
import { Container, Stack, Tab, TabList, Tabs } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useCallback, useContext, useEffect, useState } from 'react'
import WorkoutsHeader from './WorkoutsHeader'
import { WorkoutsLists } from './WorkoutsList'

export function Workouts() {
  const router = useRouter()
  const { userId } = useContext(Context)
  const [workouts, setWorkouts] = useState<IWorkout[]>([])

  const fetchUserWorkouts = useCallback(async () => {
    try {
      const token = getUserToken()

      if (!token) {
        // Implementar mensagem personalizada
        router.push('/login')
        return
      }

      const response = await findWorkoutsByUserId(token, userId as string)

      setWorkouts(response)
    } catch (error) {
      console.error(error)
      // Implementar mensagem personalizada
      router.push('/login')
    }
  }, [router, userId])

  useEffect(() => {
    fetchUserWorkouts()
  }, [fetchUserWorkouts])

  return (
    <>
      <Container maxW="7xl" p={{ base: 3, md: 1 }}>
        <WorkoutsHeader fetchUserWorkouts={fetchUserWorkouts} userId={userId} />
        <Stack maxW={'auto'}>
          <Tabs>
            <TabList>
              {workouts?.map((workout: IWorkout) => (
                <Tab key={workout.id}>Workout: {workout.workoutType}</Tab>
              ))}
            </TabList>
            <WorkoutsLists workouts={workouts} />
          </Tabs>
        </Stack>
      </Container>
    </>
  )
}
