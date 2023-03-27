import { getUserToken } from '@/pages/api/providers/auth.provider'
import {
  deleteExercise,
  IExerciseInterface,
  updateExercise,
} from '@/pages/api/providers/exercise.provider'
import {
  Box,
  chakra,
  CloseButton,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  Spacer,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useState } from 'react'

interface WorkoutsProps {
  fetchUserWorkouts: () => void
  exercises?: IExerciseInterface[]
}

export default function ExercisesList({
  fetchUserWorkouts,
  exercises,
}: WorkoutsProps) {
  const router = useRouter()
  const [name, setName] = useState<string>('')
  const [sets, setSets] = useState<string>('')
  const [reps, setReps] = useState<string>('')
  const [weight, setWeight] = useState<string>('')
  const [describe, setDescribe] = useState<string>('')

  const handleUpdateExercise = async (id: string) => {
    try {
      const token = getUserToken()

      if (!token) {
        router.push('/login')
        return
      }

      await updateExercise(token, id, {
        name: name || undefined,
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
      router.push('/login')
      return
    }
    deleteExercise(token, id).then(() => {
      fetchUserWorkouts()
    })
  }

  return (
    <>
      {exercises?.map((exercise: IExerciseInterface) => (
        <Box
          key={exercise.id}
          p={3}
          m={3}
          backdropBlur={'1rem'}
          backdropFilter='blur(5px)'
          border={'1px'}
          borderColor={'whiteAlpha.700'}
          rounded={'lg'}
          bgGradient={[
            'linear(to-tr, gray.900 70.17%, purple.900 90.87%)',
            'linear(to-br, gray.900 50.17%, purple.900 90.87%)',
          ]}
        >
          <Flex minWidth='max-content'>
            <Spacer />{' '}
            <CloseButton
              onClick={() => handleWithDeleteExercise(exercise.id!)}
              size='sm'
            />
          </Flex>

          <chakra.h1 fontSize='lg' lineHeight={6}>
            Nome:
            <Editable defaultValue={exercise.name ? exercise.name : 'Sem Nome'}>
              <EditablePreview />
              <EditableInput
                value={name}
                onChange={(event) => setName(event.target.value)}
                onBlur={() => handleUpdateExercise(exercise.id!)}
              />
            </Editable>
          </chakra.h1>

          <chakra.h1 fontSize='lg' lineHeight={6}>
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

          <chakra.h1 fontSize='lg' lineHeight={6}>
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

          <chakra.h1 fontSize='lg' lineHeight={6}>
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

          <chakra.h1 fontSize='lg' lineHeight={6}>
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
        </Box>
      ))}
    </>
  )
}
