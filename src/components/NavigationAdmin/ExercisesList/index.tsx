import { SelectUpdate } from '@/components/Select/SelectUpdate'
import { getUserToken } from '@/pages/api/providers/auth.provider'
import { IExerciseName } from '@/pages/api/providers/exercises-names.provider'
import { IExerciseType } from '@/pages/api/providers/exercises-types.provider'
import {
  deleteExercise,
  findExerciseById,
  IExercise,
  updateExercise,
} from '@/pages/api/providers/exercises.provider'
import {
  Box,
  CloseButton,
  Flex,
  FormLabel,
  Input,
  Spacer,
  Stack,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

interface WorkoutsProps {
  exercises?: IExercise[]
  exerciseNames?: IExerciseName[]
  exerciseTypes?: IExerciseType[]
}

export default function ExercisesList({
  exercises,
  exerciseNames,
  exerciseTypes,
}: WorkoutsProps) {
  const router = useRouter()
  const [exercisesState, setExercisesState] = useState<IExercise[]>([])
  const [exerciseNameId, setExerciseNameId] = useState<string | undefined>()
  const [exerciseTypeId, setExerciseTypeId] = useState<string | undefined>()
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
        exerciseNameId: exerciseNameId !== '' ? exerciseNameId : undefined,
        exerciseTypeId: exerciseTypeId !== '' ? exerciseTypeId : undefined,
      })

      const exerciseUpdated = await findExerciseById(token, id)

      setSets(undefined)
      setReps(undefined)
      setWeight(undefined)
      setRir(undefined)
      setDescribe(undefined)
      setExerciseNameId(undefined)
      setExerciseTypeId(undefined)

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
          <Stack
            direction={'column'}
            spacing={1}
            w={'full'}
            textColor={'whiteAlpha.800'}
          >
            <Flex minW="auto">
              <Spacer />{' '}
              <CloseButton
                onClick={() => handleWithDeleteExercise(exercise.id!)}
                size="sm"
              />
            </Flex>

            <SelectUpdate
              tag={'Grupo Muscular'}
              value={exercise.exerciseType?.id!}
              id={exercise.id!}
              setValue={setExerciseTypeId}
              onBlurAction={() => handleUpdateExercise(exercise.id!)}
              defaultName={exercise.exerciseType?.name!}
              valuesMap={exerciseTypes}
            />

            <SelectUpdate
              tag={'Nome'}
              value={exercise.exerciseNames?.id!}
              id={exercise.id!}
              setValue={setExerciseNameId}
              onBlurAction={() => handleUpdateExercise(exercise.id!)}
              defaultName={exercise.exerciseNames?.name!}
              valuesMap={exerciseNames}
            />

            <FormLabel>
              SÉRIES
              <Input
                mb={2}
                placeholder="Séries"
                defaultValue={exercise.sets}
                onChange={(event) => setSets(event.target.value)}
                onMouseLeave={() => handleUpdateExercise(exercise.id!)}
              />
            </FormLabel>

            <FormLabel>
              REPETIÇÕES
              <Input
                mb={2}
                placeholder="Repetições"
                defaultValue={exercise.reps}
                onChange={(event) => setReps(event.target.value)}
                onMouseLeave={() => handleUpdateExercise(exercise.id!)}
              />
            </FormLabel>

            <FormLabel>
              CARGA
              <Input
                mb={2}
                placeholder="Carga"
                defaultValue={exercise.weight}
                onChange={(event) => setWeight(event.target.value)}
                onMouseLeave={() => handleUpdateExercise(exercise.id!)}
              />
            </FormLabel>

            <FormLabel>
              REPETIÇÕES EM RESERVA
              <Input
                mb={2}
                placeholder="REPETIÇÕES EM RESERVA"
                defaultValue={exercise.rir}
                onChange={(event) => setRir(event.target.value)}
                onMouseLeave={() => handleUpdateExercise(exercise.id!)}
              />
            </FormLabel>

            <FormLabel>
              DESCRIÇÃO
              <Input
                placeholder="DESCRIÇÃO"
                defaultValue={exercise.describe}
                onChange={(event) => setDescribe(event.target.value)}
                onMouseLeave={() => handleUpdateExercise(exercise.id!)}
              />
            </FormLabel>
          </Stack>
        </Box>
      ))}
    </>
  )
}
