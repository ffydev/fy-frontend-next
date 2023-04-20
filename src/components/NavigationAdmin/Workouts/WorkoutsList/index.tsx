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
import { Box, SimpleGrid, Stack } from '@chakra-ui/react'
import { Plus } from '@phosphor-icons/react'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import ExercisesList from '../../ExercisesList'
import { useAdminIsFetchingStore } from '@/hooks/AdminIsFetching/admin.isFetching.store'

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
  const { selectedUserId } = useAdminIsFetchingStore()

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
          selectedUserId as string,
        )
        setWorkouts(workoutUpdated)
      } catch (error) {
        console.error(error)
      }
    },
    [router, setWorkouts, selectedUserId],
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
      {workouts?.map((workout: IWorkout) => (
        <Box key={workout.id} p={4} width="100%">
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
