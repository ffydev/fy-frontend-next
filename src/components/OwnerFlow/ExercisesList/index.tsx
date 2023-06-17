import { CloseButtonComponent } from '@/components/Buttons/CloseButtonComponent'
import HandleButton from '@/components/Buttons/HandleButton'
import SetsList from '@/components/OwnerFlow/SetsList'
import { getUserToken } from '@/pages/api/providers/auth.provider'
import {
  findExerciseByMuscleGroup,
  findMuscleGroup,
  IExercise,
} from '@/pages/api/providers/exercises.provider'
import { createSet, ISet } from '@/pages/api/providers/sets.provider'
import {
  deleteWorkoutExercise,
  IWorkoutsExercises,
} from '@/pages/api/providers/workoutsExercises.provider'
import {
  createWorkoutsExerciseName,
  deleteWorkoutExerciseName,
} from '@/pages/api/providers/workoutsExercisesNames.provider'
import { useWorkoutsExercisesStore } from '@/stores/OwnerStore/WorkoutsExercises'
import {
  Box,
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
  Select,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react'
import { Plus } from '@phosphor-icons/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function ExercisesList() {
  const router = useRouter()
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { workoutsExercises, setWorkoutsExercises } =
    useWorkoutsExercisesStore()
  const [muscleGroups, setMuscleGroups] = useState<IExercise[]>([])
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState<string>('')
  const [exercises, setExercises] = useState<IExercise[]>([])
  const [selectedExerciseNameId, setSelectedExerciseNameId] =
    useState<string>('')
  const [selectedExercise, setSelectedExercise] = useState<string>('')

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

  const handleWithAddExerciseName = async (exerciseNameId: string) => {
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

      const response = await createWorkoutsExerciseName(token, {
        workoutExerciseId: selectedExercise,
        exerciseId: exerciseNameId,
      })

      if (response) {
        addExerciseNameAtWorkoutExercise(selectedExercise, response)
      }

      toast({
        title: 'Exercício adicionado.',
        description: 'Exercício adicionado com sucesso.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    } catch (error) {
      console.error(error)
    }
  }

  const addExerciseNameAtWorkoutExercise = (
    workoutExerciseId: string,
    exercise: IExercise,
  ) => {
    for (const workoutExercise of workoutsExercises) {
      if (workoutExercise.id === workoutExerciseId) {
        workoutExercise?.workoutsExercisesNames?.push(exercise)
      }
    }

    setWorkoutsExercises(workoutsExercises)
  }

  const handleWithCreateSet = async (workoutExerciseId: string) => {
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

      const response = await createSet(token, workoutExerciseId)

      if (response) {
        createSetAtWorkoutExercise(
          workoutsExercises,
          workoutExerciseId,
          response,
        )
      }
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

  const createSetAtWorkoutExercise = (
    workoutsExercises: IWorkoutsExercises[],
    workoutExerciseId: string,
    newSet: ISet,
  ) => {
    for (const workoutExercise of workoutsExercises) {
      if (workoutExercise.id === workoutExerciseId) {
        workoutExercise?.sets?.push(newSet)
      }
    }
    setWorkoutsExercises(workoutsExercises)
  }

  const handleWithDeleteExercise = async (id: string) => {
    try {
      const token = getUserToken()

      if (!token) {
        router.push('/login')
        return
      }

      const response = await deleteWorkoutExercise(token, id)

      if (response) {
        deleteExerciseAtWorkoutExercise(id)
      }
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

  const deleteExerciseAtWorkoutExercise = (id: string) => {
    const updatedExercises = workoutsExercises.filter(
      (workoutExercise) => workoutExercise.id !== id,
    )
    setWorkoutsExercises(updatedExercises)
  }

  const handleWithDeleteExerciseName = async (id: string) => {
    try {
      const token = getUserToken()

      if (!token) {
        router.push('/login')
        return
      }

      const response = await deleteWorkoutExerciseName(token, id)

      if (response) {
        deleteExerciseNameAtWorkoutExercise(id)
      }
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

  const deleteExerciseNameAtWorkoutExercise = (id: string) => {
    const updatedExercises = workoutsExercises.map((workoutExercise) => {
      const updatedNames = workoutExercise.workoutsExercisesNames?.filter(
        (exercise) => exercise.id !== id,
      )
      return {
        ...workoutExercise,
        workoutsExercisesNames: updatedNames,
      }
    })
    setWorkoutsExercises(updatedExercises)
  }

  const handleWithSelectedWorkoutExercise = (
    selectedWorkoutExerciseId: string,
  ) => {
    setSelectedExercise(selectedWorkoutExerciseId)
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
                    key={workoutExerciseName.id}
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
            mt={3}
          >
            <Box>
              <HandleButton
                text="Tipo de exercício"
                leftIcon={<Plus weight="bold" />}
                size={'xs'}
                onClick={() => {
                  onOpen()
                  handleWithSelectedWorkoutExercise(workoutExercise.id!)
                }}
              />
            </Box>

            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
              <ModalContent
                bgGradient={[
                  'linear(to-tr, gray.900 27.17%, purple.900 85.87%)',
                  'linear(to-b, gray.900 27.17%, purple.900 85.87%)',
                ]}
                border={'1px'}
                borderColor={'whiteAlpha.200'}
                backdropFilter={'auto'}
                backdropBlur={'1rem'}
                boxShadow={'lg'}
              >
                <ModalHeader>
                  <ModalCloseButton />
                </ModalHeader>
                <ModalBody>
                  <FormControl mb={3} mt={3}>
                    <Select
                      bgGradient={'transparent'}
                      onChange={(e) => setSelectedMuscleGroup(e.target.value)}
                      value={selectedMuscleGroup}
                      defaultValue=""
                    >
                      <option
                        style={{ backgroundColor: '#322659' }}
                        disabled
                        value=""
                      >
                        Grupo Muscular
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
                      onChange={(e) =>
                        setSelectedExerciseNameId(e.target.value)
                      }
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
                </ModalBody>

                <ModalFooter>
                  <HandleButton
                    text="Tipo de exercício"
                    leftIcon={<Plus weight="bold" />}
                    onClick={() =>
                      handleWithAddExerciseName(selectedExerciseNameId!)
                    }
                  />
                </ModalFooter>
              </ModalContent>
            </Modal>

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
            <HandleButton
              text="Série"
              leftIcon={<Plus weight="bold" />}
              onClick={() => handleWithCreateSet(workoutExercise.id!)}
              size={'xs'}
            />
          </Flex>
        </Box>
      ))}
    </>
  )
}
