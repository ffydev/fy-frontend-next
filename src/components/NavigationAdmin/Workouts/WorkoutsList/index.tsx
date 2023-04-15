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
  findWorkoutsByUserId,
  IWorkout,
} from '@/pages/api/providers/workouts.provider'
import { Box, Button, Flex, SimpleGrid, Stack } from '@chakra-ui/react'
import { Plus, X } from '@phosphor-icons/react'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import ExercisesList from '../../ExercisesList'
import { useAdminProvider } from '@/hooks/ContextDashboardAdmin'

interface WorkoutsProps {
  setWorkouts: (workouts: IWorkout[]) => void
  workouts: IWorkout[]
  handleWithDeleteWorkout: (workoutId: string) => void
}

export function WorkoutsLists({
  workouts,
  handleWithDeleteWorkout,
  setWorkouts,
}: WorkoutsProps) {
  const router = useRouter()
  const { userId } = useAdminProvider()
  const [exerciseNameId, setExerciseNameId] = useState<string>('')
  const [exerciseTypes, setExerciseTypes] = useState<IExerciseType[]>([])
  const [exerciseNames, setExerciseNames] = useState<IExerciseName[]>([])
  const [exerciseTypeId, setExerciseTypeId] = useState<string>('')

  const handleCreateExercise = useCallback(
    async (workoutId: string, exerciseNameId: string) => {
      try {
        const token = getUserToken()

        if (!token) {
          // Implementar mensagem personalizada
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
          userId as string,
        )
        setWorkouts(workoutUpdated)
      } catch (error) {
        console.error(error)
      }
    },
    [router, setWorkouts, userId],
  )

  const fetchExercisesTypesData = useCallback(async () => {
    try {
      const token = getUserToken()

      if (!token) {
        // Implementar mensagem personalizada
        router.push('/login')
        return
      }

      const response = await findExercisesTypes(token)

      setExerciseTypes(response)
    } catch (error) {
      console.error(error)
      // Implementar mensagem personalizadaexerciseNames
      router.push('/login')
    }
  }, [router, setExerciseTypes])

  useEffect(() => {
    fetchExercisesTypesData()
  }, [fetchExercisesTypesData])

  const fetchExercisesNamesData = useCallback(async () => {
    try {
      const token = getUserToken()

      if (!token) {
        // Implementar mensagem personalizada
        router.push('/login')
        return
      }

      const response = await findExercisesNames(token, exerciseTypeId)

      setExerciseNames(response)
    } catch (error) {
      console.error(error)
      // Implementar mensagem personalizada
      router.push('/login')
    }
  }, [exerciseTypeId, router, setExerciseNames])

  useEffect(() => {
    fetchExercisesNamesData()
  }, [exerciseTypeId, fetchExercisesNamesData])

  return (
    <>
      <Stack direction={['column', 'row']} spacing={6} w={'full'}>
        {workouts?.map((workout: IWorkout) => (
          <Box key={workout.id} p={4} width="100%">
            <Flex justifyContent={'end'} mb={3}>
              <Button
                variant={'outline'}
                leftIcon={<X weight="bold" />}
                onClick={() => handleWithDeleteWorkout(workout.id!)}
              >
                Excluir Workout
              </Button>
            </Flex>

            <Stack direction={['column', 'row']} spacing={6} w={'full'}>
              <SimpleGrid
                columns={{ base: 1, md: 3 }}
                spacing={3}
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
      </Stack>
    </>
  )
}
