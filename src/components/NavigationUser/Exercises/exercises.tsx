import { getUserToken } from '@/pages/api/providers/auth.provider'
import {
  findExerciseById,
  IExercise,
  updateExercise,
} from '@/pages/api/providers/exercises.provider'
import {
  Box,
  chakra,
  Editable,
  EditableInput,
  EditablePreview,
  Stack,
  Text,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

interface WorkoutsProps {
  exercises?: IExercise[]
}

export default function ExercisesList({ exercises }: WorkoutsProps) {
  const router = useRouter()
  const [exercisesState, setExercisesState] = useState<IExercise[]>([])
  const [weight, setWeight] = useState<string | undefined>('')

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
          <Stack direction={'column'} spacing={5} w={'full'}>
            <Text>{exercise.exerciseType?.name}</Text>
            <Text>{exercise.exerciseNames?.name}</Text>

            <chakra.h1 fontSize="lg" lineHeight={6}>
              Séries:
              <Text>{exercise.sets}</Text>
            </chakra.h1>

            <chakra.h1 fontSize="lg" lineHeight={6}>
              Repetições:
              <Text>{exercise.reps}</Text>
            </chakra.h1>

            <chakra.h1 fontSize="lg" lineHeight={6}>
              Carga:
              <Editable defaultValue={`${exercise.weight}`}>
                <EditablePreview />
                <EditableInput
                  value={weight}
                  onChange={(event) => setWeight(event.target.value)}
                  onBlur={() => handleUpdateExercise(exercise.id!)}
                />
              </Editable>
            </chakra.h1>

            <chakra.h1 fontSize="lg" lineHeight={6}>
              Repetições em reserva:
              <Text>{exercise.rir}</Text>
            </chakra.h1>

            <chakra.h1 fontSize="lg" lineHeight={6}>
              Descrição:
              <Text>{exercise.describe}</Text>
            </chakra.h1>
          </Stack>
        </Box>
      ))}
    </>
  )
}
