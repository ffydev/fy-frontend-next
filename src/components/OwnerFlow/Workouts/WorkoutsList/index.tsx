import HandleButton from '@/components/Buttons/HandleButton'
import { getUserToken } from '@/pages/api/providers/auth.provider'
import { deleteWorkout } from '@/pages/api/providers/workouts.provider'
import { Flex, SimpleGrid, Stack, useToast } from '@chakra-ui/react'
import { Plus } from '@phosphor-icons/react'
import { useRouter } from 'next/router'
import ExercisesList from '../../ExercisesList'
import { useOwnerIsFetchingStore } from '@/stores/OwnerStore/IsFetching'
import {
  createWorkoutsExercise,
  IWorkoutsExercises,
} from '@/pages/api/providers/workoutsExercises.provider'
import { CloseButtonComponent } from '@/components/Buttons/Closed'

interface WorkoutsProps {
  workoutsExercises: IWorkoutsExercises[]
}

export function WorkoutsLists({ workoutsExercises }: WorkoutsProps) {
  const router = useRouter()
  const {
    setIsFetchingWorkoutsNames,
    selectedWorkoutId,
    setSelectedWorkoutId,
    setIsFetchingWorkouts,
  } = useOwnerIsFetchingStore()
  const toast = useToast()

  const handleCreateExercise = async (workoutId: string) => {
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

      await createWorkoutsExercise(token, {
        workoutId,
      })

      setIsFetchingWorkouts()
    } catch (error) {
      console.error(error)
    }
  }

  const handleWithDeleteWorkout = async (id: string) => {
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

    try {
      await deleteWorkout(token, id)
      setSelectedWorkoutId('')
      setIsFetchingWorkoutsNames()
    } catch (error) {
      console.error(error)
      toast({
        title: 'Erro ao deletar treino.',
        description: 'Por favor, tente novamente.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  return (
    <>
      <Flex justifyContent={'flex-end'} mt={3}>
        <CloseButtonComponent
          onClick={() => handleWithDeleteWorkout(selectedWorkoutId!)}
        />
      </Flex>

      <Stack direction={['column', 'row']} spacing={6} w={'full'} mt={3}>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={5} mb={4} w={'full'}>
          <HandleButton
            text="Exercício"
            leftIcon={<Plus weight="bold" />}
            onClick={() => handleCreateExercise(selectedWorkoutId)}
          />
        </SimpleGrid>
      </Stack>

      <Stack direction={['column', 'row']} spacing={3} w={'full'} mt={3}>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={3} mb={4} w={'full'}>
          {workoutsExercises && (
            <ExercisesList workoutsExercises={workoutsExercises} />
          )}
        </SimpleGrid>
      </Stack>
    </>
  )
}
