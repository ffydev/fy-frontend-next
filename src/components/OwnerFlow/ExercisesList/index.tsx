import { CloseButtonComponent } from '@/components/Buttons/Closed'
import SetsList from '@/components/OwnerFlow/SetsList'
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
  Text,
  Flex,
  Spacer,
  Stack,
  useToast,
  Table,
  Thead,
  Tr,
  Th,
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
            <CloseButtonComponent
              onClick={() => handleWithDeleteExercise(workoutExercise?.id!)}
            />
          </Flex>

          <Stack
            direction={'column'}
            spacing={5}
            w={'full'}
            textColor={'whiteAlpha.800'}
          >
            <Center justifyContent={'center'} flexDirection={'column'}>
              <Text
                textAlign={'center'}
                bgColor={'purple.700'}
                borderRadius={3}
                fontSize="sm"
                p={1}
              >
                {workoutExercise?.exercise?.muscleGroup}
              </Text>
              <Text fontSize="md" p={1}>
                {workoutExercise?.exercise?.name}
              </Text>
            </Center>

            <Table variant="unstyled" size={'sm'}>
              <Thead>
                <Tr borderBottom={'1px solid grey'}>
                  <Th textAlign={'center'} p={0} maxW={'2rem'} minW={'2rem'}>
                    REPS
                  </Th>
                  <Th textAlign={'center'} p={0} maxW={'2rem'} minW={'2rem'}>
                    Carga
                  </Th>
                  <Th textAlign={'center'} p={0} maxW={'2rem'} minW={'2rem'}>
                    Tipo
                  </Th>
                  <Th textAlign={'center'} p={0} maxW={'2rem'} minW={'2rem'}>
                    Reserva
                  </Th>
                  <Th
                    textAlign={'center'}
                    p={0}
                    maxW={'1rem'}
                    minW={'1rem'}
                  ></Th>
                </Tr>
              </Thead>
            </Table>

            {workoutsExercises?.length > 0 && (
              <SetsList sets={workoutExercise.sets} />
            )}
          </Stack>

          <Flex mt={3}>
            <Button
              onClick={() => handleWithCreatingSet(workoutExercise.id!)}
              background={'purple.700'}
              size={'xs'}
            >
              + Adicionar série
            </Button>
          </Flex>
        </Box>
      ))}
    </>
  )
}
