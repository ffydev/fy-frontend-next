import { getUserToken } from '@/pages/api/providers/auth.provider'
import {
  findExerciseById,
  IExercise,
  updateExercise,
} from '@/pages/api/providers/exercises.provider'
import { Box, chakra, Flex, Input, Stack, Text } from '@chakra-ui/react'
import { Eye, Pen } from '@phosphor-icons/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

interface WorkoutsProps {
  exercises?: IExercise[]
}

export default function ExercisesList({ exercises }: WorkoutsProps) {
  const router = useRouter()
  const [exercisesState, setExercisesState] = useState<IExercise[]>([])
  const [weight, setWeight] = useState<string | undefined>('')
  const [isHovering, setIsHovering] = useState(false)

  const handleUpdateExercise = async (id: string) => {
    const token = getUserToken()

    if (!token) {
      // Implementar mensagem personalizada
      router.push('/login')
      return
    }

    try {
      await updateExercise(token, id, {
        weight: weight ? +weight : undefined,
      })

      const exerciseUpdated = await findExerciseById(token, id)

      setWeight(undefined)

      setExercisesState((prevExercisesState) => {
        const updatedExercisesState = prevExercisesState.map((exercise) =>
          exercise.id === id ? exerciseUpdated : exercise,
        )
        return updatedExercisesState
      })
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    setExercisesState(exercises!)
  }, [exercises])

  return (
    <>
      {exercisesState?.map((exercise) => (
        <Box
          key={exercise.id}
          p={4}
          backdropBlur={'1rem'}
          backdropFilter="blur(5px)"
          rounded={'lg'}
          border={'1px'}
          bgColor={'whiteAlpha.50'}
          borderColor={'whiteAlpha.100'}
          boxShadow={'lg'}
        >
          <Stack
            direction={'column'}
            spacing={5}
            w={'full'}
            textColor={'whiteAlpha.800'}
          >
            <chakra.h1
              fontWeight={'medium'}
              fontSize="md"
              lineHeight={6}
              textTransform={'uppercase'}
            >
              {exercise.exerciseType?.name}
            </chakra.h1>
            <chakra.h1
              fontWeight={'medium'}
              fontSize="md"
              lineHeight={6}
              textTransform={'uppercase'}
            >
              {exercise.exerciseNames?.name}
            </chakra.h1>

            <chakra.h1
              fontWeight={'medium'}
              fontSize="md"
              lineHeight={6}
              textTransform={'uppercase'}
            >
              SÉRIES:
              <Text>{exercise.sets}</Text>
            </chakra.h1>

            <chakra.h1
              fontWeight={'medium'}
              fontSize="md"
              lineHeight={6}
              textTransform={'uppercase'}
            >
              Repetições:
              <Text>{exercise.reps}</Text>
            </chakra.h1>

            <chakra.h1
              fontWeight={'medium'}
              fontSize="md"
              lineHeight={6}
              textTransform={'uppercase'}
            >
              <Flex>
                Carga: <Pen size={20} />
              </Flex>
              <Input
                defaultValue={exercise.weight}
                onChange={(event) => setWeight(event.target.value)}
                onBlur={() => handleUpdateExercise(exercise.id!)}
              />
            </chakra.h1>

            <chakra.h1
              fontWeight={'medium'}
              fontSize="md"
              lineHeight={6}
              textTransform={'uppercase'}
            >
              Repetições em reserva:
              <Text>{exercise.rir}</Text>
            </chakra.h1>

            <chakra.h1
              fontWeight={'medium'}
              fontSize="sm"
              lineHeight={6}
              textTransform={'uppercase'}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              Descrição:{' '}
              <Box minH={30}>
                {exercise.describe && (
                  <>
                    {!isHovering ? (
                      <Eye size={25} />
                    ) : (
                      <>
                        <Text
                          fontWeight={'thin'}
                          visibility={isHovering ? 'visible' : 'hidden'}
                        >
                          {exercise.describe}
                        </Text>
                      </>
                    )}
                  </>
                )}
              </Box>
            </chakra.h1>
          </Stack>
        </Box>
      ))}
    </>
  )
}
