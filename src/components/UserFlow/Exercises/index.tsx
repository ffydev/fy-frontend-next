import { getUserToken } from '@/pages/api/providers/auth.provider'
import {
  findExerciseById,
  IExercise,
  updateExerciseByUser,
} from '@/pages/api/providers/exercises.provider'
import {
  Box,
  Center,
  chakra,
  Flex,
  Input,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react'
import { Eye, Pen } from '@phosphor-icons/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { z } from 'zod'

interface WorkoutsProps {
  exercises?: IExercise[]
}

export default function ExercisesList({ exercises }: WorkoutsProps) {
  const router = useRouter()
  const [exercisesState, setExercisesState] = useState<IExercise[]>([])
  const [isHovering, setIsHovering] = useState<boolean>(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const schema = z.object({
    weight: z.coerce
      .number({
        invalid_type_error: 'Valor Inválido',
      })
      .positive()
      .min(0)
      .max(800, { message: 'Valor Inválido' }),
  })
  const toast = useToast()

  const handleUpdateExercise = async (weight: string, id: string) => {
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
      const parsedWeight = schema.parse({ weight })

      await updateExerciseByUser(token, id, {
        weight: parsedWeight.weight,
      })

      const exerciseUpdated = await findExerciseById(token, id)

      setExercisesState((prevExercisesState) => {
        const updatedExercisesState = prevExercisesState.map((exercise) =>
          exercise.id === id ? exerciseUpdated : exercise,
        )
        return updatedExercisesState
      })

      setErrors((prevErrors) => ({ ...prevErrors, [id]: '' }))

      toast({
        title: 'Peso atualizado com sucesso.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [id]: (error as z.ZodError).errors[0].message,
        }))
      } else {
        console.error(error)
        toast({
          title: 'Erro ao atualizar peso.',
          description: 'Por favor, tente novamente.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
      }
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
            <Center>
              <chakra.h1
                textColor={'whiteAlpha.800'}
                bgColor={'purple.700'}
                borderRadius={3}
                px={2}
                fontWeight={'medium'}
                fontSize="sm"
                lineHeight={6}
              >
                {exercise.exerciseNames?.exerciseType?.name}
              </chakra.h1>
            </Center>

            <chakra.h1 fontWeight={'medium'} fontSize="md" lineHeight={6}>
              {exercise.exerciseNames?.name}
            </chakra.h1>

            <chakra.h1 fontWeight={'medium'} fontSize="md" lineHeight={6}>
              Séries:
              <Text>{exercise.sets}</Text>
            </chakra.h1>

            <chakra.h1 fontWeight={'medium'} fontSize="md" lineHeight={6}>
              Repetições:
              <Text>{exercise.reps}</Text>
            </chakra.h1>

            <chakra.h1 fontWeight={'medium'} fontSize="md" lineHeight={6}>
              <Flex>
                Carga: <Pen size={20} />
              </Flex>
              <Input
                key={exercise.id}
                defaultValue={exercise.weight}
                onChange={(event) =>
                  handleUpdateExercise(event.target.value, exercise.id!)
                }
              />
              {errors[exercise.id!] && (
                <Text color={'red.500'} mt={3}>
                  {errors[exercise.id!]}
                </Text>
              )}
            </chakra.h1>

            <chakra.h1 fontWeight={'medium'} fontSize="md" lineHeight={6}>
              Repetições em reserva:
              <Text>{exercise.rir}</Text>
            </chakra.h1>

            <chakra.h1
              fontWeight={'medium'}
              fontSize="md"
              lineHeight={6}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              Descrição:{' '}
              <Box minH={30}>
                {exercise.describe && (
                  <>
                    {!isHovering ? (
                      <>
                        <Center>
                          <Eye size={23} />
                        </Center>
                      </>
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
