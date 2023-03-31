import ExercisesList from '@/components/Exercises/ExercisesList'
import { getUserToken } from '@/pages/api/providers/auth.provider'
import {
  findExercisesNames,
  IExercisesNames,
} from '@/pages/api/providers/exercises-names.provider'
import {
  findExercisesTypes,
  IExerciseTypes,
} from '@/pages/api/providers/exercises-types.provider'
import { createExercise } from '@/pages/api/providers/exercises.provider'
import {
  deleteWorkout,
  IWorkout,
} from '@/pages/api/providers/workouts.provider'
import {
  Box,
  Button,
  CloseButton,
  Flex,
  FormControl,
  Select,
  SimpleGrid,
  Spacer,
  Stack,
  TabPanel,
  TabPanels,
  Tag,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { Plus } from 'phosphor-react'
import { useCallback, useEffect, useState } from 'react'

interface WorkoutsProps {
  fetchUserWorkouts: () => void
  workouts: IWorkout[]
}

export function WorkoutsLists({ fetchUserWorkouts, workouts }: WorkoutsProps) {
  const router = useRouter()
  const [exerciseTypeId, setExerciseTypeId] = useState<string>('')
  const [exerciseNameId, setExerciseNameId] = useState<string>('')
  const [exerciseTypes, setExerciseTypes] = useState<IExerciseTypes[]>([])
  const [exerciseNames, setExerciseNames] = useState<IExercisesNames[]>([])

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
        fetchUserWorkouts()
      } catch (error) {
        console.error(error)
      }
    },
    [fetchUserWorkouts, router],
  )

  const handleWithDeleteWorkout = (id: string) => {
    const token = getUserToken()

    if (!token) {
      // Implementar mensagem personalizada
      router.push('/login')
      return
    }
    deleteWorkout(token, id).then(() => {
      fetchUserWorkouts()
    })
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
                <Tag size={'md'} colorScheme={'orange'} variant={'subtle'}>
                  Tipo de treino: {workout.workoutType}
                </Tag>
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
                  mt={4}
                  mb={4}
                  w={'full'}
                >
                  <Stack>
                    <Button
                      size={'md'}
                      variant={'solid'}
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
                    >
                      Adicionar Exercício
                    </Button>
                  </Stack>
                  <FormControl isRequired>
                    <Select
                      size={'md'}
                      w={'auto'}
                      border={'1px'}
                      borderColor={'whiteAlpha.900'}
                      variant={'outline'}
                      value={exerciseTypeId}
                      onChange={(event) =>
                        setExerciseTypeId(event.target.value)
                      }
                    >
                      <option>Tipo de exercício</option>
                      {exerciseTypes.map((exerciseType: IExerciseTypes) => (
                        <option key={exerciseType.id} value={exerciseType.id}>
                          {exerciseType.name}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl isRequired>
                    <Select
                      size={'md'}
                      w={'auto'}
                      border={'1px'}
                      borderColor={'whiteAlpha.900'}
                      variant={'outline'}
                      value={exerciseNameId}
                      onChange={(event) =>
                        setExerciseNameId(event.target.value)
                      }
                    >
                      <option>Nome do Exercício</option>
                      {exerciseNames.map((exerciseName: IExercisesNames) => (
                        <option key={exerciseName.id} value={exerciseName.id}>
                          {exerciseName.name}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                  {workout.exercises && workout.exercises.length > 0 && (
                    <ExercisesList
                      fetchUserWorkouts={fetchUserWorkouts}
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
