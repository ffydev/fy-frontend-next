import { getUserToken } from '@/pages/api/providers/auth.provider'
import {
  deleteExercise,
  findExerciseById,
  IExercise,
  updateExercise,
} from '@/pages/api/providers/exercises.provider'
import {
  Box,
  Center,
  chakra,
  CloseButton,
  Flex,
  Input,
  Spacer,
  Stack,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

interface WorkoutsProps {
  exercises?: IExercise[]
}

export default function ExercisesList({ exercises }: WorkoutsProps) {
  const router = useRouter()
  const [exercisesState, setExercisesState] = useState<IExercise[]>([])
  const [sets, setSets] = useState<string | undefined>('')
  const [reps, setReps] = useState<string | undefined>('')
  const [weight, setWeight] = useState<string | undefined>('')
  const [rir, setRir] = useState<string | undefined>('')
  const [describe, setDescribe] = useState<string | undefined>('')

  const handleUpdateExercise = async (id: string) => {
    const token = getUserToken()

    if (!token) {
      // Implementar mensagem personalizada
      router.push('/login')
      return
    }

    try {
      await updateExercise(token, id, {
        sets: sets ? +sets : undefined,
        reps: reps ? +reps : undefined,
        weight: weight ? +weight : undefined,
        rir: rir !== '' ? rir : undefined,
        describe: describe !== '' ? describe : undefined,
      })

      const exerciseUpdated = await findExerciseById(token, id)

      setSets(undefined)
      setReps(undefined)
      setWeight(undefined)
      setRir(undefined)

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

  const handleWithDeleteExercise = (id: string) => {
    const token = getUserToken()

    if (!token) {
      router.push('/login')
      return
    }

    deleteExercise(token, id).then(() => {
      const updatedExercises = updatingExercisesState(exercisesState, id)
      setExercisesState(updatedExercises)
    })
  }

  const updatingExercisesState = (exercises: IExercise[], id: string) => {
    return exercises.filter((exercise: IExercise) => exercise.id !== id)
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
          <Flex minW="auto">
            <Spacer />
            <CloseButton
              onClick={() => handleWithDeleteExercise(exercise.id!)}
              size="sm"
            />
          </Flex>

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
                {exercise.exerciseType?.name}
              </chakra.h1>
            </Center>

            <chakra.h1 fontWeight={'medium'} fontSize="md" lineHeight={6}>
              {exercise.exerciseNames?.name}
            </chakra.h1>

            <chakra.h1 fontWeight={'medium'} fontSize="md" lineHeight={6}>
              Séries
              <Input
                placeholder="Séries"
                defaultValue={exercise.sets}
                onChange={(event) => setSets(event.target.value)}
                onBlur={() => handleUpdateExercise(exercise.id!)}
              />
            </chakra.h1>

            <chakra.h1 fontWeight={'medium'} fontSize="md" lineHeight={6}>
              Repetições
              <Input
                placeholder="Repetições"
                defaultValue={exercise.reps}
                onChange={(event) => setReps(event.target.value)}
                onBlur={() => handleUpdateExercise(exercise.id!)}
              />
            </chakra.h1>

            <chakra.h1 fontWeight={'medium'} fontSize="md" lineHeight={6}>
              Carga
              <Input
                placeholder="Carga"
                defaultValue={exercise.weight}
                onChange={(event) => setWeight(event.target.value)}
                onBlur={() => handleUpdateExercise(exercise.id!)}
              />
            </chakra.h1>

            <chakra.h1 fontWeight={'medium'} fontSize="md" lineHeight={6}>
              Repetições em reserva
              <Input
                placeholder="Repetições em reserva"
                defaultValue={exercise.rir}
                onChange={(event) => setRir(event.target.value)}
                onBlur={() => handleUpdateExercise(exercise.id!)}
              />
            </chakra.h1>

            <chakra.h1 fontWeight={'medium'} fontSize="md" lineHeight={6}>
              Descrição
              <Input
                placeholder="Descrição"
                defaultValue={exercise.describe}
                onChange={(event) => setDescribe(event.target.value)}
                onBlur={() => handleUpdateExercise(exercise.id!)}
              />
            </chakra.h1>
          </Stack>
        </Box>
      ))}
    </>
  )
}
