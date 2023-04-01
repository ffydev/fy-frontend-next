import HandleButton from '@/components/Buttons/HandleButton'
import ExercisesList from '@/components/ExercisesList'
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
  IWorkout,
} from '@/pages/api/providers/workouts.provider'
import {
  Box,
  CloseButton,
  Flex,
  SimpleGrid,
  Spacer,
  Stack,
  TabPanel,
  TabPanels,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { Plus } from 'phosphor-react'
import { useCallback, useEffect, useState } from 'react'

interface WorkoutsProps {
  workouts: IWorkout[]
}

export function WorkoutsLists({ workouts }: WorkoutsProps) {
  const router = useRouter()
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
      } catch (error) {
        console.error(error)
      }
    },
    [router],
  )

  const handleWithDeleteWorkout = (id: string) => {
    const token = getUserToken()

    if (!token) {
      // Implementar mensagem personalizada
      router.push('/login')
      return
    }
    deleteWorkout(token, id)
  }

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
  }, [fetchExercisesTypesData, fetchExercisesNamesData])

  return (
    <>
      <TabPanels>
        {workouts?.map((workout: IWorkout) => (
          <TabPanel key={workout.id}>
            <Box
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
              <Flex>
                <Spacer />
                <CloseButton
                  onClick={() => handleWithDeleteWorkout(workout.id!)}
                  size="sm"
                />
              </Flex>
              <Stack direction={['column', 'row']} spacing={6} w={'full'}>
                <SimpleGrid
                  columns={{ base: 1, md: 3 }}
                  spacing={5}
                  mb={4}
                  w={'full'}
                >
                  <HandleButton
                    text="Adicionar Exercício"
                    color={'blackAlpha.900'}
                    bgColor={'whiteAlpha.900'}
                    _hover={{
                      bg: 'whiteAlpha.700',
                      transition: '0.4s',
                    }}
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
                    value={exerciseTypeId}
                    setValue={setExerciseTypeId}
                    mapValues={exerciseTypes}
                    borderColor={'whiteAlpha.900'}
                  />

                  <SelectSettingValue
                    tag={'Nome do Exercício'}
                    value={exerciseNameId}
                    setValue={setExerciseNameId}
                    mapValues={exerciseNames}
                    borderColor={'whiteAlpha.900'}
                  />

                  {workout.exercises && workout.exercises.length > 0 && (
                    <ExercisesList
                      exercises={workout.exercises}
                      exerciseNames={exerciseNames}
                      exerciseTypes={exerciseTypes}
                    />
                  )}
                </SimpleGrid>
              </Stack>
            </Box>
          </TabPanel>
        ))}
      </TabPanels>
    </>
  )
}
