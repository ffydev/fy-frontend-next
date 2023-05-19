import HandleButton from '@/components/Buttons/HandleButton'
import { getUserToken } from '@/pages/api/providers/auth.provider'
import {
  deleteWorkout,
  findWorkoutsByUserId,
} from '@/pages/api/providers/workouts.provider'
import {
  Box,
  CloseButton,
  Flex,
  FormControl,
  Select,
  SimpleGrid,
  Spacer,
  Stack,
  useToast,
} from '@chakra-ui/react'
import { Plus } from '@phosphor-icons/react'
import { useRouter } from 'next/router'
import ExercisesList from '../../ExercisesList'
import { useOwnerIsFetchingStore } from '@/stores/OwnerStore/IsFetching'
import { createWorkoutsExercise, IWorkoutsExercises } from '@/pages/api/providers/workoutsExercises.provider'
import { findExerciseByMuscleGroup, findMuscleGroup, IExercise } from '@/pages/api/providers/exercises.provider'
import { useEffect, useState } from 'react'

interface WorkoutsProps {
  setWorkoutsExercises: (workoutsExercises: IWorkoutsExercises[]) => void
  workoutsExercises: IWorkoutsExercises[]
}

export function WorkoutsLists({ workoutsExercises, setWorkoutsExercises }: WorkoutsProps) {
  const router = useRouter()
  const { setIsFetchingWorkoutsNames, selectedWorkoutId } =
    useOwnerIsFetchingStore()
  const [muscleGroups, setMuscleGroups] = useState<IExercise[]>([])
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState<string>('')
  const [exercises, setExercises] = useState<IExercise[]>([])
  const [selectedExerciseId, setSelectedExerciseId] = useState<string>('')
  const toast = useToast()

  const handleCreateExercise = async (
    workoutId: string,
    exerciseId: string,
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

      await createWorkoutsExercise(token, {
        workoutId,
        exerciseId,
      })

      const workoutUpdated = await findWorkoutsByUserId(
        token,
        workoutId as string,
      )
      setWorkoutsExercises(workoutUpdated)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    const fetchMuscleGroups = async () => {
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

        const response = await findMuscleGroup(token)
        setMuscleGroups(response)

      } catch (error) {
        console.error(error)
        toast({
          title: 'Erro ao buscar grupos musculares.',
          description: 'Por favor, tente novamente.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
      }
    }
    fetchMuscleGroups()
  }, [toast, router])

  useEffect(() => {
    if (!selectedMuscleGroup) return
    const fetchExerciseByMuscleGroup = async () => {
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

        const response = await findExerciseByMuscleGroup(token, selectedMuscleGroup)
        setExercises(response)

      } catch (error) {
        console.error(error)
        toast({
          title: 'Erro ao buscar exercícios.',
          description: 'Por favor, tente novamente.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
      }
    }
    fetchExerciseByMuscleGroup()
  }, [selectedMuscleGroup])

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
      {workoutsExercises?.map((workout: IWorkoutsExercises) => (
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

              <FormControl>
                <Select
                  bgGradient={'transparent'}
                  onChange={(e) => setSelectedMuscleGroup(e.target.value)}
                >
                  <option
                    style={{ backgroundColor: '#322659' }}
                    disabled
                    value=""
                  >
                    Grupo Mucular
                  </option>
                  {muscleGroups.map((muscleGroup: IExercise) => (
                    <option
                      style={{ backgroundColor: '#322659' }}
                      key={muscleGroup.id}
                      value={muscleGroup.muscleGroup}
                    >
                      {muscleGroup.muscleGroup}
                    </option>
                  ))}
                </Select>
              </FormControl>

              <FormControl>
                <Select
                  bgGradient={'transparent'}
                  onChange={(e) => setSelectedExerciseId(e.target.value)}
                >
                  <option
                    style={{ backgroundColor: '#322659' }}
                    disabled
                    value=""
                  >
                    Exercícios
                  </option>
                  {exercises.map((exercise: IExercise) => (
                    <option
                      style={{ backgroundColor: '#322659' }}
                      key={exercise.id}
                      value={exercise.id}
                    >
                      {exercise.name}
                    </option>
                  ))}
                </Select>

              </FormControl>

              <HandleButton
                text="Adicionar Exercício"
                leftIcon={<Plus weight="bold" />}
                onClick={() =>
                  handleCreateExercise(selectedWorkoutId, selectedExerciseId)
                }
              />

              {workoutsExercises && (
                <ExercisesList workoutsExercises={workoutsExercises} />
              )}
            </SimpleGrid>
          </Stack>
        </Box>
      ))
      }
    </>
  )
}
