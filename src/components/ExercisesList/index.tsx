import { getUserToken } from '@/pages/api/providers/auth.provider'
import { IExerciseName } from '@/pages/api/providers/exercises-names.provider'
import { IExerciseType } from '@/pages/api/providers/exercises-types.provider'
import {
  deleteExercise,
  IExercise,
  updateExercise,
} from '@/pages/api/providers/exercises.provider'
import {
  Box,
  chakra,
  CloseButton,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  Spacer,
  Stack,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { SelectUpdate } from '../Select/SelectUpdate'

interface WorkoutsProps {
  fetchUserWorkouts: () => void
  exercises?: IExercise[]
  exerciseNames?: IExerciseName[]
  exerciseTypes?: IExerciseType[]
}

export default function ExercisesList({
  fetchUserWorkouts,
  exercises,
  exerciseNames,
  exerciseTypes,
}: WorkoutsProps) {
  const router = useRouter()
  const [exerciseNameId, setExerciseNameId] = useState<string | undefined>()
  const [exerciseTypeId, setExerciseTypeId] = useState<string | undefined>()
  const [sets, setSets] = useState<string | undefined>('')
  const [reps, setReps] = useState<string | undefined>('')
  const [weight, setWeight] = useState<string | undefined>('')
  const [rir, setRir] = useState<string | undefined>('')
  const [describe, setDescribe] = useState<string | undefined>('')

  const handleUpdateExercise = async (id: string) => {
    try {
      const token = getUserToken()

      if (!token) {
        // Implementar mensagem personalizada
        router.push('/login')
        return
      }

      await updateExercise(token, id, {
        sets: sets ? +sets : undefined,
        reps: reps ? +reps : undefined,
        weight: weight ? +weight : undefined,
        rir: rir !== '' ? rir : undefined,
        describe: describe !== '' ? describe : undefined,
        exerciseNameId: exerciseNameId !== '' ? exerciseNameId : undefined,
        exerciseTypeId: exerciseTypeId !== '' ? exerciseTypeId : undefined,
      })
      fetchUserWorkouts()
      setSets(undefined)
      setReps(undefined)
      setWeight(undefined)
      setRir(undefined)
      setDescribe(undefined)
      setExerciseNameId(undefined)
      setExerciseTypeId(undefined)
    } catch (error) {
      console.error(error)
    }
  }

  const handleWithDeleteExercise = (id: string) => {
    const token = getUserToken()

    if (!token) {
      // Implementar mensagem personalizada
      router.push('/login')
      return
    }
    deleteExercise(token, id).then(() => {
      fetchUserWorkouts()
    })
  }

  return (
    <>
      {exercises?.map((exercise: IExercise) => (
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
          <Stack direction={'column'} spacing={6} w={'full'}>
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

            <chakra.h1 fontSize="lg" lineHeight={6}>
              Séries:
              <Editable defaultValue={`${exercise.sets}`}>
                <EditablePreview />
                <EditableInput
                  value={sets}
                  onChange={(event) => setSets(event.target.value)}
                  onBlur={() => handleUpdateExercise(exercise.id!)}
                />
              </Editable>
            </chakra.h1>

            <chakra.h1 fontSize="lg" lineHeight={6}>
              Repetições:
              <Editable defaultValue={`${exercise.reps}`}>
                <EditablePreview />
                <EditableInput
                  value={reps}
                  onChange={(event) => setReps(event.target.value)}
                  onBlur={() => handleUpdateExercise(exercise.id!)}
                />
              </Editable>
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
              <Editable
                defaultValue={exercise.rir ? exercise.rir : 'falha/falha/falha'}
              >
                <EditablePreview />
                <EditableInput
                  value={rir}
                  onChange={(event) => setRir(event.target.value)}
                  onBlur={() => handleUpdateExercise(exercise.id!)}
                />
              </Editable>
            </chakra.h1>

            <chakra.h1 fontSize="lg" lineHeight={6}>
              Descrição:
              <Editable
                defaultValue={
                  exercise.describe ? exercise.describe : 'Sem descrição'
                }
              >
                <EditablePreview />
                <EditableInput
                  value={describe}
                  onChange={(event) => setDescribe(event.target.value)}
                  onBlur={() => handleUpdateExercise(exercise.id!)}
                />
              </Editable>
            </chakra.h1>
          </Stack>
        </Box>
      ))}
    </>
  )
}
