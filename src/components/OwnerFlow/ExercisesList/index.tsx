import SetsList from '@/components/SetsList'
import { getUserToken } from '@/pages/api/providers/auth.provider'
import {
  deleteExercise,
  findExerciseById,
  IExercise,
  updateExercise,
} from '@/pages/api/providers/exercises.provider'
import { createSet } from '@/pages/api/providers/sets.provider'
import { IWorkoutsExercises } from '@/pages/api/providers/workoutsExercises.provider'
import { useOwnerIsFetchingStore } from '@/stores/OwnerStore/IsFetching'
import {
  Box,
  Button,
  Center,
  chakra,
  CloseButton,
  Flex,
  Spacer,
  Stack,
  useToast,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

interface WorkoutsProps {
  workoutsExercises?: IWorkoutsExercises[]
}

export default function ExercisesList({ workoutsExercises }: WorkoutsProps) {
  const router = useRouter()
  const [exercisesState, setExercisesState] = useState<IExercise[]>([])
  const [sets, setSets] = useState<string | undefined>('')
  const [reps, setReps] = useState<string | undefined>('')
  const [weight, setWeight] = useState<string | undefined>('')
  const [rir, setRir] = useState<string | undefined>('')
  const [describe, setDescribe] = useState<string | undefined>('')
  const { setIsFetchingWorkoutsNames } = useOwnerIsFetchingStore()
  const [workoutExerciseId, setWorkoutExerciseId] = useState<string | undefined>('')
  const toast = useToast()

  const handleWithCreatingSet = async (workoutExerciseId: string) => {
    try {
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

      await createSet(token, workoutExerciseId)

    } catch (error) {
      console.error(error)

      toast({
        title: 'Não foi possível adicionar série.',
        description: 'Erro ao adicionar série.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  // const handleUpdateExercise = async (id: string) => {
  //   const token = getUserToken()

  //   if (!token) {
  //     toast({
  //       title: 'Sua sessão expirou.',
  //       description: 'Por favor, faça login novamente.',
  //       status: 'error',
  //       duration: 3000,
  //       isClosable: true,
  //     })
  //     router.push('/login')
  //     return
  //   }

  //   try {
  //     await updateExercise(token, id, {
  //       reps: reps ? +reps : undefined,
  //       weight: weight ? +weight : undefined,
  //       rir: rir !== '' ? rir : undefined,
  //       describe: describe !== '' ? describe : undefined,
  //     })

  //     const exerciseUpdated = await findExerciseById(token, id)

  //     setSets(undefined)
  //     setReps(undefined)
  //     setWeight(undefined)
  //     setRir(undefined)

  //     setExercisesState((prevExercisesState) => {
  //       const updatedExercisesState = prevExercisesState.map((exercise) =>
  //         exercise.id === id ? exerciseUpdated : exercise,
  //       )

  //       return updatedExercisesState
  //     })
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }

  const handleWithDeleteExercise = (id: string) => {
    try {
      const token = getUserToken()

      if (!token) {
        router.push('/login')
        return
      }

    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      {workoutsExercises?.map((workoutExercise: IWorkoutsExercises) => (
        <Box
          key={workoutExercise.id}
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
              onClick={() => handleWithDeleteExercise(workoutExercise?.exercise?.id!)}
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
                {workoutExercise?.exercise?.muscleGroup}
              </chakra.h1>
            </Center>

            <chakra.h1 fontWeight={'medium'} fontSize="md" lineHeight={6}>
              {workoutExercise?.exercise?.name}
            </chakra.h1>

            {/* <chakra.h1 fontWeight={'medium'} fontSize="md" lineHeight={6}>
              Séries
              <Input
                placeholder="Séries"
                defaultValue={exercise.sets}
                onChange={(event) => setSets(event.target.value)}
                onBlur={() => handleUpdateExercise(exercise.id!)}
              />
            </chakra.h1> */}
            {/* 
            <chakra.h1 fontWeight={'medium'} fontSize="md" lineHeight={6}>
              Repetições
              <Input
                placeholder="Repetições"
                defaultValue={exercise.reps}
                onChange={(event) => setReps(event.target.value)}
                onBlur={() => handleUpdateExercise(exercise.id!)}
              />
            </chakra.h1> */}

            {/* <chakra.h1 fontWeight={'medium'} fontSize="md" lineHeight={6}>
              Carga
              <Input
                placeholder="Carga"
                defaultValue={exercise.weight}
                onChange={(event) => setWeight(event.target.value)}
                onBlur={() => handleUpdateExercise(exercise.id!)}
              />
            </chakra.h1> */}

            {/* <chakra.h1 fontWeight={'medium'} fontSize="md" lineHeight={6}>
              Repetições em reserva
              <Input
                placeholder="Repetições em reserva"
                defaultValue={exercise.rir}
                onChange={(event) => setRir(event.target.value)}
                onBlur={() => handleUpdateExercise(exercise.id!)}
              />
            </chakra.h1> */}

            {/* <chakra.h1 fontWeight={'medium'} fontSize="md" lineHeight={6}>
              Descrição
              <Input
                placeholder="Descrição"
                defaultValue={exercise.describe}
                onChange={(event) => setDescribe(event.target.value)}
                onBlur={() => handleUpdateExercise(exercise.id!)}
              />
            </chakra.h1> */}

            <Flex>
              <Button
                onClick={() => handleWithCreatingSet(workoutExercise.id!)}
                background={'purple.700'}
                size={'xs'}>
                Adicionar série
              </Button>
            </Flex>

            <Flex justifyContent={'space-between'}>
              <chakra.h1 fontWeight={'thin'}>Repetições</chakra.h1>
              <chakra.h1 fontWeight={'thin'}>Carga</chakra.h1>
              <chakra.h1 fontWeight={'thin'}>Tipo</chakra.h1>
              <chakra.h1 fontWeight={'thin'}>Reserva</chakra.h1>
            </Flex>

            {workoutsExercises?.length > 0 && (
              <SetsList sets={workoutExercise.sets} />
            )}
          </Stack>
        </Box>
      ))}
    </>
  )
}
