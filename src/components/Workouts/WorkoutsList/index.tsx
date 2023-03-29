import { getUserToken } from '@/pages/api/providers/auth.provider'
import { createExercise } from '@/pages/api/providers/exercises.provider'
import {
  findExerciseTypes,
  IExerciseTypesInterface,
} from '@/pages/api/providers/exercises-types.provider'
import {
  createWorkout,
  deleteWorkout,
  IWorkoutInterface,
} from '@/pages/api/providers/workouts.provider'
import {
  Box,
  Button,
  CloseButton,
  Flex,
  FormControl,
  FormLabel,
  Select,
  Spacer,
  Stack,
  Text,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import ExercisesList from '../../Exercises/ExercisesList'
import Feedbacks from '../../Feedbacks'
import {
  findExercisesNames,
  IExercisesNames,
} from '@/pages/api/providers/exercises-names.provider'

interface WorkoutsProps {
  fetchUserWorkouts: () => void
  workouts?: IWorkoutInterface[]
  userId: string
}

export default function WorkoutsList({
  fetchUserWorkouts,
  workouts,
  userId,
}: WorkoutsProps) {
  const router = useRouter()
  const [exerciseTypeId, setExerciseTypeId] = useState<string>('')
  const [exerciseNameId, setExerciseNameId] = useState<string>('')
  const [workoutType, setWorkoutType] = useState<string>('')
  const [exerciseTypes, setExerciseTypes] = useState<IExerciseTypesInterface[]>(
    [],
  )
  const [exerciseNames, setExerciseNames] = useState<IExercisesNames[]>([])
  const [showFeedback, setShowFeedback] = useState<boolean>(false)

  const fetchExercisesTypesData = useCallback(async () => {
    try {
      const token = getUserToken()

      if (!token) {
        // Implementar mensagem personalizada
        router.push('/login')
        return
      }

      const response = await findExerciseTypes(token)

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

  const handleCreateWorkout = useCallback(
    async (userId: string) => {
      try {
        const token = getUserToken()

        if (!token) {
          // Implementar mensagem personalizada
          router.push('/login')
          return
        }

        if (workoutType) {
          await createWorkout(token, {
            userId,
            workoutType,
          })
          fetchUserWorkouts()
        }
      } catch (error) {
        console.error(error)
      }
    },
    [fetchUserWorkouts, router, workoutType],
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

  const handleWithShowFeedback = () => {
    setShowFeedback(true)
  }

  const handleWithCloseFeedback = () => {
    setShowFeedback(false)
  }

  return (
    <>
      <Stack>
        <FormControl isRequired>
          <FormLabel>Tipo de Treino:</FormLabel>
          <Flex>
            <Select
              rounded={'md'}
              size='xs'
              w={'3xs'}
              value={workoutType}
              onChange={(event) => setWorkoutType(event.target.value)}
            >
              <option></option>
              <option value='A'>A</option>
              <option value='B'>B</option>
              <option value='C'>C</option>
              <option value='D'>D</option>
              <option value='E'>E</option>
              <option value='F'>F</option>
            </Select>
            <Flex>
              <Button
                ml={3}
                size='xs'
                bgGradient={[
                  'linear(to-tr, blue.900 20.17%, purple.900 90.87%)',
                  'linear(to-br, blue.900 20.17%, purple.900 90.87%)',
                ]}
                onClick={() => handleCreateWorkout(userId!)}
              >
                Adicionar Treino
              </Button>
            </Flex>
          </Flex>
        </FormControl>

        {workouts?.map((workout: IWorkoutInterface) => (
          <Box
            key={workout.id}
            p={3}
            m={3}
            bgGradient={[
              'linear(to-tr, gray.900 70.17%, purple.900 90.87%)',
              'linear(to-br, gray.900 50.17%, purple.900 90.87%)',
            ]}
            backdropBlur={'1rem'}
            backdropFilter='blur(5px)'
            border={'1px'}
            borderColor={'whiteAlpha.700'}
            rounded={'lg'}
            width={['100%', '50%', '33.33%', '25%']}
            minWidth='250px'
          >
            <Flex>
              <Text fontWeight='bold'>
                Tipo de treino: {workout.workoutType}
              </Text>
              <Spacer />
              <Flex minWidth='max-content'>
                <CloseButton
                  onClick={() => handleWithDeleteWorkout(workout.id!)}
                  size='sm'
                />
              </Flex>
            </Flex>

            <Button
              size='xs'
              bgGradient={[
                'linear(to-tr, blue.900 20.17%, purple.900 90.87%)',
                'linear(to-br, blue.900 20.17%, purple.900 90.87%)',
              ]}
              onClick={() => handleWithShowFeedback()}
            >
              Feedback
            </Button>

            <FormControl mt={4} isRequired>
              <FormLabel>Tipo de exercício:</FormLabel>
              <Flex>
                <Select
                  size='xs'
                  w={'3xs'}
                  value={exerciseTypeId}
                  onChange={(event) => setExerciseTypeId(event.target.value)}
                >
                  <option value=''></option>
                  {exerciseTypes.map(
                    (exerciseType: IExerciseTypesInterface) => (
                      <option key={exerciseType.id} value={exerciseType.id}>
                        {exerciseType.name}
                      </option>
                    ),
                  )}
                </Select>
              </Flex>
            </FormControl>

            <FormControl mt={4} isRequired>
              <FormLabel>Nome do exercício:</FormLabel>
              <Flex>
                <Select
                  size='xs'
                  w={'3xs'}
                  value={exerciseNameId}
                  onChange={(event) => setExerciseNameId(event.target.value)}
                >
                  <option value=''></option>
                  {exerciseNames.map((exerciseName: IExercisesNames) => (
                    <option key={exerciseName.id} value={exerciseName.id}>
                      {exerciseName.name}
                    </option>
                  ))}
                </Select>
              </Flex>
            </FormControl>

            <Button
              mt={3}
              size='xs'
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
              Adicionar
            </Button>

            {showFeedback ? (
              <Feedbacks
                userId={userId}
                workoutId={workout.id!}
                handleWithCloseFeedback={handleWithCloseFeedback}
              />
            ) : null}

            {workout.exercises && workout.exercises.length > 0 && (
              <ExercisesList
                fetchUserWorkouts={fetchUserWorkouts}
                exercises={workout.exercises}
                exerciseNames={exerciseNames}
              />
            )}
          </Box>
        ))}
      </Stack>
    </>
  )
}
