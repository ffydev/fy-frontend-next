import ExercisesList from '@/components/Exercises/ExercisesList'
import { getUserToken } from '@/pages/api/providers/auth.provider'
import { IExercisesNames } from '@/pages/api/providers/exercises-names.provider'
import { IExerciseTypesInterface } from '@/pages/api/providers/exercises-types.provider'
import { createExercise } from '@/pages/api/providers/exercises.provider'
import {
  deleteWorkout,
  IWorkoutInterface,
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
  Text,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'

interface WorkoutsProps {
  fetchUserWorkouts: () => void
  workouts: IWorkoutInterface[]
  exerciseTypes: IExerciseTypesInterface[]
  exerciseNames: IExercisesNames[]
}

export function WorkoutsLists({
  fetchUserWorkouts,
  workouts,
  exerciseTypes,
  exerciseNames,
}: WorkoutsProps) {
  const router = useRouter()
  const [exerciseTypeId, setExerciseTypeId] = useState<string>('')
  const [exerciseNameId, setExerciseNameId] = useState<string>('')

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

  return (
    <>
      <TabPanels>
        {workouts?.map((workout: IWorkoutInterface) => (
          <TabPanel key={workout.id}>
            <Box
              p={3}
              m={3}
              width='100%'
              rounded={'lg'}
              border={'1px'}
              bgColor={'whiteAlpha.50'}
              borderColor={'whiteAlpha.100'}
              boxShadow={'lg'}
              backdropBlur={'1rem'}
              backdropFilter='blur(5px)'
              minWidth='250px'
            >
              <Flex>
                <Text fontWeight='bold'>
                  Tipo de treino: {workout.workoutType}
                </Text>
                <Spacer />
                <CloseButton
                  onClick={() => handleWithDeleteWorkout(workout.id!)}
                  size='sm'
                />
              </Flex>

              <Stack direction={['column', 'row']} spacing={6} w={'full'}>
                <SimpleGrid
                  columns={{ base: 1, sm: 2, md: 3 }}
                  spacing={5}
                  mt={12}
                  mb={4}
                  w={'full'}
                >
                  <FormControl isRequired>
                    <Select
                      rounded={'lg'}
                      variant={'filled'}
                      bgColor={'blackAlpha.600'}
                      _hover={{
                        bgColor: 'blackAlpha.500',
                        transform: '0.3s',
                      }}
                      size={'md'}
                      w={'auto'}
                      value={exerciseTypeId}
                      onChange={(event) =>
                        setExerciseTypeId(event.target.value)
                      }
                    >
                      <option>Tipo de exercício</option>
                      {exerciseTypes.map(
                        (exerciseType: IExerciseTypesInterface) => (
                          <option key={exerciseType.id} value={exerciseType.id}>
                            {exerciseType.name}
                          </option>
                        ),
                      )}
                    </Select>
                  </FormControl>

                  <FormControl isRequired>
                    <Select
                      rounded={'lg'}
                      variant={'filled'}
                      bgColor={'blackAlpha.600'}
                      _hover={{
                        bgColor: 'blackAlpha.500',
                        transform: '0.3s',
                      }}
                      size={'md'}
                      w={'auto'}
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

                  <Stack>
                    <Button
                      ml={3}
                      size='md'
                      bgGradient={[
                        'linear(to-tr, blue.900 20.17%, purple.900 90.87%)',
                        'linear(to-br, blue.900 20.17%, purple.900 90.87%)',
                      ]}
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
