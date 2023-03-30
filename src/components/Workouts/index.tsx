import { getUserToken } from '@/pages/api/providers/auth.provider'
import {
  findWorkoutsByUserId,
  IWorkoutInterface,
} from '@/pages/api/providers/workouts.provider'
import { Box, Container, Stack, Tab, TabList, Tabs } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import WorkoutsHeader from './WorkoutsHeader'
import { WorkoutsLists } from './WorkoutsList'

interface WorkoutsProps {
  userId: string
  handleWithHideWorkouts: () => void
}
export function Workouts({ userId, handleWithHideWorkouts }: WorkoutsProps) {
  const router = useRouter()
  const [userWorkouts, setUserWorkouts] = useState<IWorkoutInterface[]>([])

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
    fetchUserWorkouts()
  }, [fetchUserWorkouts])

  return (
    <>
      <Box ml={{ base: 0, md: 60 }} minH={'100vh'}>
        <Container maxW="7xl" p={{ base: 3, md: 10 }}>
          <WorkoutsHeader
            fetchUserWorkouts={fetchUserWorkouts}
            userId={userId}
            handleWithHideWorkouts={handleWithHideWorkouts}
          />
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
              />
            </Tabs>
          </Stack>
        </Container>
      </Box>
    </>
  )
}
