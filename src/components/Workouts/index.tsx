import WorkoutsList from '@/components/Workouts/WorkoutsList'
import { getUserToken } from '@/pages/api/providers/auth.provider'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import {
  findWorkoutsByUserId,
  IWorkoutInterface,
} from '../../pages/api/providers/workout.provider'

interface WorkoutsListProps {
  userId: string
}

export default function Workouts({ userId }: WorkoutsListProps) {
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
      <WorkoutsList
        fetchUserWorkouts={fetchUserWorkouts}
        workouts={userWorkouts}
        userId={userId}
      />
    </>
  )
}
