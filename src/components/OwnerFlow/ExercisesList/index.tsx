import SetsList from '@/components/SetsList'
import { getUserToken } from '@/pages/api/providers/auth.provider'
import { createSet } from '@/pages/api/providers/sets.provider'
import {
  deleteWorkoutExercise,
  IWorkoutsExercises,
} from '@/pages/api/providers/workoutsExercises.provider'
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

interface WorkoutsProps {
  workoutsExercises?: IWorkoutsExercises[]
}

export default function ExercisesList({ workoutsExercises }: WorkoutsProps) {
  const router = useRouter()
  const { setIsFetchingWorkouts } = useOwnerIsFetchingStore()
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
      setIsFetchingWorkouts()

      setIsFetchingWorkouts()
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

  const handleWithDeleteExercise = async (id: string) => {
    try {
      const token = getUserToken()

      if (!token) {
        router.push('/login')
        return
      }

      await deleteWorkoutExercise(token, id)

      setIsFetchingWorkouts()
    } catch (error) {
      console.error(error)
      toast({
        title: 'Não foi possível deletar exercício.',
        description: 'Erro ao deletar exercício.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
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
              onClick={() => handleWithDeleteExercise(workoutExercise?.id!)}
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

            <Flex>
              <Button
                onClick={() => handleWithCreatingSet(workoutExercise.id!)}
                background={'purple.700'}
                size={'xs'}
              >
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
