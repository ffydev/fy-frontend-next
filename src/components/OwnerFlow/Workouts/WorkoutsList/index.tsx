import HandleButton from '@/components/Buttons/HandleButton'
import SelectSettingValue from '@/components/Select/SelectSettingValue'
import { getUserToken } from '@/pages/api/providers/auth.provider'
import {
  findExercisesNames,
  IExerciseName,
} from '@/pages/api/providers/exercises-names.provider'
import {
  findExercisesTypes,
  IExerciseType,
} from '@/pages/api/providers/exercises-types.provider'
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
import { useEffect, useState } from 'react'
import ExercisesList from '../../ExercisesList'
import { useOwnerIsFetchingStore } from '@/stores/OwnerStore/IsFetching'

interface WorkoutsProps {
  setWorkouts: (workouts: IWorkout[]) => void
  workouts: IWorkout[]
}

export function WorkoutsLists({ workouts, setWorkouts }: WorkoutsProps) {
  const router = useRouter()
  const [exerciseNameId, setExerciseNameId] = useState<string>('')
  const [exerciseTypes, setExerciseTypes] = useState<IExerciseType[]>([])
  const [exerciseNames, setExerciseNames] = useState<IExerciseName[]>([])
  const [exerciseTypeId, setExerciseTypeId] = useState<string>('')
  const { selectedUserId, setIsFetchingWorkoutsNames, selectedWorkoutId } =
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
        selectedUserId as string,
      )
      setWorkouts(workoutUpdated)

      toast({
        title: 'Exercício adicionado com sucesso.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    const fetchExercisesTypesData = async () => {
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

        const response = await findExercisesTypes(token)

        setExerciseTypes(response)
      } catch (error) {
        console.error(error)
        toast({
          title: 'Erro ao buscar tipos de exercícios.',
          description: 'Por favor, tente novamente.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
      }
    }

    fetchExercisesTypesData()
  }, [
    router,
    setExerciseTypes,
    selectedUserId,
    setIsFetchingWorkoutsNames,
    toast,
  ])

  useEffect(() => {
    const fetchExercisesNamesData = async () => {
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

        const response = await findExercisesNames(token, exerciseTypeId)

        setExerciseNames(response)
      } catch (error) {
        console.error(error)
        toast({
          title: 'Erro ao buscar nome dos exercícios.',
          description: 'Por favor, tente novamente.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
        router.push('/login')
      }
    }

    fetchExercisesNamesData()
  }, [
    router,
    setExerciseNames,
    exerciseTypeId,
    setIsFetchingWorkoutsNames,
    toast,
  ])

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
      toast({
        title: 'Workout deletado com sucesso.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    } catch (error) {
      console.error(error)
      toast({
        title: 'Erro ao deletar workout.',
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
                  handleCreateExercise(workout.id!, exerciseNameId)
                }
              />

              <SelectSettingValue
                tag={'Grupo Muscular'}
                setValue={setExerciseTypeId}
                mapValues={exerciseTypes}
              />

              <SelectSettingValue
                tag={'Nome do Exercício'}
                setValue={setExerciseNameId}
                mapValues={exerciseNames}
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
