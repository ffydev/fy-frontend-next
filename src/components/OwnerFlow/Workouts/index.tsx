import { getUserToken } from '@/pages/api/providers/auth.provider'
import {
  findWorkoutsNamesByUserId,
  IWorkout,
} from '@/pages/api/providers/workouts.provider'
import { Tab, TabList, Tabs, useToast } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { WorkoutsLists } from './WorkoutsList'
import { useOwnerIsFetchingStore } from '@/stores/OwnerStore/IsFetching'
import WorkoutsHeader from './WorkoutsHeader'
import { findWorkoutsExercisesByWorkout } from '@/pages/api/providers/workoutsExercises.provider'
import { useWorkoutsExercisesStore } from '@/stores/OwnerStore/WorkoutsExercises'

export function Workouts() {
  const router = useRouter()
  const {
    selectedUserId,
    selectedWorkoutId,
    setSelectedWorkoutId,
    isFetchingWorkoutsNames,
  } = useOwnerIsFetchingStore()
  const { setWorkoutsExercises } = useWorkoutsExercisesStore()
  const [workoutsNames, setWorkoutsNames] = useState<IWorkout[]>([])
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
          selectedUserId as string,
        )

        setWorkoutsNames(response)
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
    fetchWorkoutsNames()
  }, [isFetchingWorkoutsNames, router, selectedUserId, toast])

  useEffect(() => {
    if (workoutsNames.length > 0) {
      if (!selectedWorkoutId) {
        setSelectedWorkoutId(workoutsNames[0]?.id as string)
      }

      if (selectedWorkoutId) {
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
    }
  }, [
    selectedWorkoutId,
    workoutsNames,
    setSelectedWorkoutId,
    router,
    selectedUserId,
    isFetchingWorkoutsNames,
    toast,
    setWorkoutsExercises,
  ])

  return (
    <>
      <WorkoutsHeader />
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
        {workoutsNames && workoutsNames.length > 0 && <WorkoutsLists />}
      </Tabs>
    </>
  )
}
