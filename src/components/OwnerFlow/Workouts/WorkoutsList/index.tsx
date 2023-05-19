import HandleButton from '@/components/Buttons/HandleButton'
import { getUserToken } from '@/pages/api/providers/auth.provider'
import { createExercise } from '@/pages/api/providers/exercises.provider'
import {
  deleteWorkout,
  findWorkoutsByUserId,
  IWorkout,
} from '@/pages/api/providers/workouts.provider'
import {
  Box,
  CloseButton,
  Flex,
  SimpleGrid,
  Spacer,
  Stack,
  useToast,
} from '@chakra-ui/react'
import { Plus } from '@phosphor-icons/react'
import { useRouter } from 'next/router'
import ExercisesList from '../../ExercisesList'
import { useOwnerIsFetchingStore } from '@/stores/OwnerStore/IsFetching'

interface WorkoutsProps {
  setWorkouts: (workouts: IWorkout[]) => void
  workouts: IWorkout[]
}

export function WorkoutsLists({ workouts, setWorkouts }: WorkoutsProps) {
  const router = useRouter()
  const { setIsFetchingWorkoutsNames, selectedWorkoutId } =
    useOwnerIsFetchingStore()
  const toast = useToast()

  const handleCreateExercise = async (
    workoutId: string,
    exerciseNameId: string,
  ) => {
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

      await createExercise(token, {
        workoutId,
        exerciseNameId,
      })

      const workoutUpdated = await findWorkoutsByUserId(
        token,
        workoutId as string,
      )
      setWorkouts(workoutUpdated)
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
    } catch (error) {
      console.error(error)
      toast({
        title: 'Erro ao deletar treino.',
        description: 'Por favor, tente novamente.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    } finally {
      setIsFetchingWorkoutsNames()
    }
  }

  return (
    <>
      {workouts?.map((workout: IWorkout) => (
        <Box key={workout.id} p={4} width="100%">
          <Flex minW="auto">
            <Spacer />
            <CloseButton
              onClick={() => handleWithDeleteWorkout(selectedWorkoutId!)}
              size="sm"
            />
          </Flex>

          <Stack direction={['column', 'row']} spacing={6} w={'full'} mt={10}>
            <SimpleGrid
              columns={{ base: 1, md: 3 }}
              spacing={5}
              mb={4}
              w={'full'}
            >
              <HandleButton
                text="Adicionar Exercício"
                leftIcon={<Plus weight="bold" />}
                onClick={() =>
                  handleCreateExercise(workout.id!, 'teste')
                }
              />

              {workout.exercises && workout.exercises.length > 0 && (
                <ExercisesList exercises={workout.exercises} />
              )}
            </SimpleGrid>
          </Stack>
        </Box>
      ))}
    </>
  )
}
