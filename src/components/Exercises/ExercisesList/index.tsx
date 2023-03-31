import { getUserToken } from '@/pages/api/providers/auth.provider'
import { IExercisesNames } from '@/pages/api/providers/exercises-names.provider'
import { IExerciseTypes } from '@/pages/api/providers/exercises-types.provider'
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
  FormControl,
  FormLabel,
  Select,
  Spacer,
  Stack,
  Tag,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useState } from 'react'

interface WorkoutsProps {
  fetchUserWorkouts: () => void
  exercises?: IExercise[]
  exerciseNames?: IExercisesNames[]
  exerciseTypes?: IExerciseTypes[]
}

export default function ExercisesList({
  fetchUserWorkouts,
  exercises,
  exerciseNames,
  exerciseTypes,
}: WorkoutsProps) {
  const router = useRouter()
  const [exerciseNameId, setExerciseNameId] = useState<string>('')
  const [exerciseTypeId, setExerciseTypeId] = useState<string>('')
  const [sets, setSets] = useState<string>('')
  const [reps, setReps] = useState<string>('')
  const [weight, setWeight] = useState<string>('')
  const [describe, setDescribe] = useState<string>('')

  const handleUpdateExercise = async (id: string) => {
    try {
      const token = getUserToken()

      if (!token) {
        // Implementar mensagem personalizada
        router.push('/login')
        return
      }

      await updateExercise(token, id, {
        sets: +sets ? +sets : undefined,
        reps: +reps ? +reps : undefined,
        weight: +weight ? +weight : undefined,
        describe: describe || undefined,
      })
      fetchUserWorkouts()
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
            <FormControl mt={2} isRequired>
              <FormLabel>
                <Tag size={'md'} colorScheme={'orange'} variant={'subtle'}>
                  Tipo de exercício
                </Tag>
              </FormLabel>
              <Select
                size={'sm'}
                rounded={'lg'}
                variant={'filled'}
                value={exerciseTypeId}
                onChange={(event) => setExerciseTypeId(event.target.value)}
                onBlur={() => handleUpdateExercise(exercise.id!)}
              >
                <option>{exercise.exerciseType?.name}</option>
                {exerciseTypes?.map((exerciseType: IExerciseTypes) => (
                  <option
                    key={exerciseType.id}
                    value={
                      exerciseType.id
                        ? exerciseType.id
                        : exercise.exerciseType?.id
                    }
                  >
                    {exerciseType.name}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl mt={2} isRequired>
              <FormLabel>
                <Tag size={'md'} colorScheme={'orange'} variant={'subtle'}>
                  Nome do exercício
                </Tag>
              </FormLabel>
              <Select
                size={'sm'}
                rounded={'lg'}
                variant={'filled'}
                value={exerciseNameId}
                onChange={(event) => setExerciseNameId(event.target.value)}
                onBlur={() => handleUpdateExercise(exercise.id!)}
              >
                <option>{exercise.exerciseName?.name}</option>
                {exerciseNames?.map((exerciseName: IExercisesNames) => (
                  <option
                    key={exerciseName.id}
                    value={
                      exerciseName.id
                        ? exerciseName.id
                        : exercise.exerciseName?.id
                    }
                  >
                    {exerciseName.name}
                  </option>
                ))}
              </Select>
            </FormControl>

            <chakra.h1 fontSize="lg" lineHeight={6}>
              Séries:
              <Editable
                defaultValue={`${exercise.sets}` ? `${exercise.sets}` : '0'}
              >
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
              <Editable
                defaultValue={`${exercise.weight}` ? `${exercise.weight}` : '0'}
              >
                <EditablePreview />
                <EditableInput
                  value={weight}
                  onChange={(event) => setWeight(event.target.value)}
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
