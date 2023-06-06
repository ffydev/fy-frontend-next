import { CloseButtonComponent } from '@/components/Buttons/Closed'
import HandleButton from '@/components/Buttons/HandleButton'
import SetsList from '@/components/OwnerFlow/SetsList'
import { getUserToken } from '@/pages/api/providers/auth.provider'
import {
  findExerciseByMuscleGroup,
  findMuscleGroup,
  IExercise,
} from '@/pages/api/providers/exercises.provider'
import { createSet } from '@/pages/api/providers/sets.provider'
import {
  deleteWorkoutExercise,
  IWorkoutsExercises,
} from '@/pages/api/providers/workoutsExercises.provider'
import {
  createWorkoutsExerciseName,
  deleteWorkoutExerciseName,
} from '@/pages/api/providers/workoutsExercisesNames.provider'
import { useOwnerIsFetchingStore } from '@/stores/OwnerStore/IsFetching'
import {
  Box,
  Button,
  Text,
  Flex,
  Spacer,
  Stack,
  useToast,
  Table,
  Thead,
  Tr,
  Th,
  FormControl,
  SimpleGrid,
  Select,
} from '@chakra-ui/react'
import { Plus } from '@phosphor-icons/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

interface WorkoutsProps {
  workoutsExercises?: IWorkoutsExercises[]
}

export default function ExercisesList({ workoutsExercises }: WorkoutsProps) {
  const router = useRouter()
  const toast = useToast()
  const { setIsFetchingWorkouts } = useOwnerIsFetchingStore()
  const [muscleGroups, setMuscleGroups] = useState<IExercise[]>([])
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState<string>('')
  const [exercises, setExercises] = useState<IExercise[]>([])
  const [selectedExerciseNameId, setSelectedExerciseNameId] =
    useState<string>('')

  useEffect(() => {
    const fetchMuscleGroups = async () => {
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

        const response = await findMuscleGroup(token)
        setMuscleGroups(response)
      } catch (error) {
        console.error(error)
        toast({
          title: 'Erro ao buscar grupos musculares.',
          description: 'Por favor, tente novamente.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
      }
    }
    fetchMuscleGroups()
  }, [toast, router])

  useEffect(() => {
    if (!selectedMuscleGroup) return
    const fetchExerciseByMuscleGroup = async () => {
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

        const response = await findExerciseByMuscleGroup(
          token,
          selectedMuscleGroup,
        )
        setExercises(response)
      } catch (error) {
        console.error(error)
        toast({
          title: 'Erro ao buscar exercícios.',
          description: 'Por favor, tente novamente.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
      }
    }
    fetchExerciseByMuscleGroup()
  }, [selectedMuscleGroup, toast, router])

  const handleWithAddExerciseName = async (
    workoutExerciseId: string,
    exerciseNameId: string,
  ) => {
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

      await createWorkoutsExerciseName(token, {
        workoutExerciseId,
        exerciseId: exerciseNameId,
      })

      setIsFetchingWorkouts()
    } catch (error) {
      console.error(error)
    }
  }

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

  const handleWithDeleteExerciseName = async (id: string) => {
    try {
      const token = getUserToken()

      if (!token) {
        router.push('/login')
        return
      }

      await deleteWorkoutExerciseName(token, id)

      setIsFetchingWorkouts()
    } catch (error) {
      console.error(error)
      toast({
        title: 'Não foi possível deletar nome do exercício.',
        description: 'Erro ao deletar nome do exercício.',
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

          {workoutExercise &&
            workoutExercise?.workoutsExercisesNames &&
            workoutExercise?.workoutsExercisesNames?.map(
              (workoutExerciseName) => (
                <>
                  <Flex
                    flexWrap={'wrap'}
                    justifyContent={'start'}
                    alignItems={'center'}
                    mb={3}
                    mt={3}
                  >
                    <Text
                      textAlign={'center'}
                      bgColor={'purple.700'}
                      borderRadius={3}
                      fontSize="sm"
                      p={1}
                    >
                      {workoutExerciseName?.exercises?.muscleGroup}
                    </Text>
                    <Text fontSize="md" p={1}>
                      {workoutExerciseName?.exercises?.name}
                    </Text>

                    <CloseButtonComponent
                      onClick={() =>
                        handleWithDeleteExerciseName(workoutExerciseName.id!)
                      }
                    />
                  </Flex>
                </>
              ),
            )}

          <Stack
            direction={'column'}
            spacing={5}
            w={'full'}
            textColor={'whiteAlpha.800'}
          >
            <Stack direction={['column', 'row']} spacing={6} w={'full'} mt={3}>
              <SimpleGrid
                columns={{ base: 1, md: 3 }}
                spacing={5}
                mb={4}
                w={'full'}
              >
                <FormControl>
                  <Select
                    bgGradient={'transparent'}
                    onChange={(e) => setSelectedMuscleGroup(e.target.value)}
                  >
                    <option
                      style={{ backgroundColor: '#322659' }}
                      disabled
                      value=""
                    >
                      Grupo Mucular
                    </option>
                    {muscleGroups.map((muscleGroup: IExercise) => (
                      <option
                        style={{ backgroundColor: '#322659' }}
                        key={muscleGroup.id}
                        value={muscleGroup.muscleGroup}
                      >
                        {muscleGroup.muscleGroup}
                      </option>
                    ))}
                  </Select>
                </FormControl>

                <FormControl>
                  <Select
                    onChange={(e) => setSelectedExerciseNameId(e.target.value)}
                    bgGradient={'transparent'}
                  >
                    <option
                      style={{ backgroundColor: '#322659' }}
                      disabled
                      value=""
                    >
                      Exercícios
                    </option>
                    {exercises.map((exercise: IExercise) => (
                      <option
                        style={{ backgroundColor: '#322659' }}
                        key={exercise.id}
                        value={exercise.id}
                      >
                        {exercise.name}
                      </option>
                    ))}
                  </Select>
                </FormControl>

                <HandleButton
                  text="Adicionar"
                  leftIcon={<Plus weight="bold" />}
                  onClick={() =>
                    handleWithAddExerciseName(
                      workoutExercise.id!,
                      selectedExerciseNameId!,
                    )
                  }
                />
              </SimpleGrid>
            </Stack>

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
