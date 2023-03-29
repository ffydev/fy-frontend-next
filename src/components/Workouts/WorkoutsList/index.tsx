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
  Container,
  Flex,
  FormControl,
  FormLabel,
  Select,
  SimpleGrid,
  Spacer,
  Stack,
  Text,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import ExercisesList from '../../Exercises/ExercisesList'
import Feedbacks from '../../Feedbacks'

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
  const [workoutType, setWorkoutType] = useState<string>('')
  const [exerciseTypes, setExerciseTypes] = useState<IExerciseTypesInterface[]>(
    [],
  )
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

  useEffect(() => {
    fetchExercisesTypesData()
  }, [fetchExercisesTypesData])

  const handleCreateExercise = useCallback(
    async (workoutId: string, exerciseTypeId: string) => {
      try {
        const token = getUserToken()

        if (!token) {
          // Implementar mensagem personalizada
          router.push('/login')
          return
        }

        if (exerciseTypeId) {
          await createExercise(token, {
            workoutId,
            exerciseTypeId,
          })
          fetchUserWorkouts()
        }
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
      <Container maxW='full' p={{ base: 5, md: 10 }}>
        <Box mb={{ base: '2.5rem', lg: '4rem' }}>
          <Stack direction={['column', 'row']} spacing={6} w={'full'}>
            <FormControl width={'100%'} mb={{ base: '4', lg: '0' }}>
              <Select
                size={'md'}
                border={'1px'}
                borderColor={'purple.400'}
                variant={'outline'}
                placeholder='Tipo de Treino:'
                value={workoutType}
                onChange={(event) => setWorkoutType(event.target.value)}
              >
                <option value='A'>A</option>
                <option value='B'>B</option>
                <option value='C'>C</option>
                <option value='D'>D</option>
                <option value='E'>E</option>
                <option value='F'>F</option>
              </Select>
            </FormControl>
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
                onClick={() => handleCreateWorkout(userId!)}
              >
                Adicionar treino
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Container>
      {/* <Stack>
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
              <Text fontWeight='bold'>Tipo de treino: {workout.workoutType}</Text>
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
                  {exerciseTypes.map((exerciseType: IExerciseTypesInterface) => (
                    <option key={exerciseType.id} value={exerciseType.id}>
                      {exerciseType.name}
                    </option>
                  ))}
                </Select>
                <Button
                  ml={3}
                  size='xs'
                  bgGradient={[
                    'linear(to-tr, blue.900 20.17%, purple.900 90.87%)',
                    'linear(to-br, blue.900 20.17%, purple.900 90.87%)',
                  ]}
                  onClick={() => handleCreateExercise(workout.id!, exerciseTypeId)}
                >
                  Adicionar
                </Button>
              </Flex>
            </FormControl>

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
              />
            )}
          </Box>
        ))}
      </Stack> */}
    </>
  )
}
