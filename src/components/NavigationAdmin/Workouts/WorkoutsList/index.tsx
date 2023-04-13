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
import { findWorkoutsByUserId, IWorkout } from '@/pages/api/providers/workouts.provider'
import { Box, CloseButton, Flex, SimpleGrid, Stack } from '@chakra-ui/react'
import { Plus } from '@phosphor-icons/react'
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
  const [exerciseTypeId, setExerciseTypeId] = useState<string>('')
  const [exerciseNameId, setExerciseNameId] = useState<string>('')
  const [exerciseTypes, setExerciseTypes] = useState<IExerciseType[]>([])
  const [exerciseNames, setExerciseNames] = useState<IExerciseName[]>([])

  const handleCreateExercise = useCallback(
    async (
      workoutId: string,
      exerciseNameId: string,
      exerciseTypeId: string,
    ) => {
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
          exerciseTypeId,
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
    [router],
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
      // Implementar mensagem personalizada
      router.push('/login')
    }
  }, [router])

  const fetchExercisesNamesData = useCallback(async () => {
    try {
      const token = getUserToken()

      if (!token) {
        // Implementar mensagem personalizada
        router.push('/login')
        return
      }

      const response = await findExercisesNames(token)

      setExerciseNames(response)
    } catch (error) {
      console.error(error)
      // Implementar mensagem personalizada
      router.push('/login')
    }
  }, [router])

  useEffect(() => {
    fetchExercisesTypesData()
    fetchExercisesNamesData()
  }, [fetchExercisesNamesData, fetchExercisesTypesData])

  return (
    <>
      {workouts?.map((workout: IWorkout) => (
        <Box
          key={workout.id}
          p={4}
          width="100%"
          rounded={'lg'}
          border={'1px'}
          bgColor={'whiteAlpha.50'}
          borderColor={'whiteAlpha.100'}
          boxShadow={'lg'}
          backdropBlur={'1rem'}
          backdropFilter="blur(5px)"
          minWidth="250px"
        >
          <Flex justifyContent={'end'} mb={3}>
            {' '}
            <CloseButton
              onClick={() => handleWithDeleteWorkout(workout.id!)}
              size="sm"
            />{' '}
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
                  handleCreateExercise(
                    workout.id!,
                    exerciseNameId,
                    exerciseTypeId,
                  )
                }
              />

              <SelectSettingValue
                tag={'Grupo Muscular'}
                setValue={setExerciseTypeId}
                mapValues={exerciseTypes}
                borderColor={'whiteAlpha.900'}
              />

              <SelectSettingValue
                tag={'Nome do Exercício'}
                setValue={setExerciseNameId}
                mapValues={exerciseNames}
                borderColor={'whiteAlpha.900'}
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
