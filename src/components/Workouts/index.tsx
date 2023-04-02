import { Context } from '@/hooks/Context'
import { getUserToken } from '@/pages/api/providers/auth.provider'
import {
  findWorkoutsByUserId,
  findWorkoutsNamesByUserId,
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

      const response = await findWorkoutsNamesByUserId(token, userId as string)

      if (response && response.length > 0 && selectedWorkoutId === '') {
        setSelectedWorkoutId(response?.[0].id!)
      }

      setWorkoutsNames(response)
    } catch (error) {
      console.error(error)
      // Implementar mensagem personalizada
      router.push('/login')
    }
  }, [router, userId])

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
        userId as string,
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

  return (
    <>
      <Container maxW="7xl" p={{ base: 3, md: 1 }}>
        <WorkoutsHeader
          userId={userId}
          fetchWorkoutsNames={fetchWorkoutsNames}
        />
        <Stack maxW={'auto'}>
          <Tabs>
            <TabList>
              {workoutsNames?.map((workout: IWorkout) => (
                <Tab
                  key={workout.id}
                  onClick={() => handleWithSettingWorkoutId(workout.id!)}
                >
                  Workout: {workout.workoutType}
                </Tab>
              ))}
            </TabList>
            <WorkoutsLists
              workouts={workouts}
              fetchWorkoutsNames={fetchWorkoutsNames}
              fetchUserWorkouts={fetchUserWorkouts}
            />
          </Tabs>
        </Stack>
      </Container>
    </>
  )
}
