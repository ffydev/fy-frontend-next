import { CloseButtonComponent } from '@/components/Buttons/CloseButtonComponent'
import HandleButton from '@/components/Buttons/HandleButton'
import { getUserToken } from '@/pages/api/providers/auth.provider'
import {
  IExercise,
  createExercise,
  deleteExercise,
  findExerciseByMuscleGroup,
  findMuscleGroup,
  updateExercise,
} from '@/pages/api/providers/exercises.provider'
import {
  Box,
  Flex,
  FormControl,
  Input,
  useToast,
  WrapItem,
  Wrap,
  Button,
  Text,
} from '@chakra-ui/react'
import { PenIcon } from 'lucide-react'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { MuscleGroupUpdate } from './MuscleGroupUpdate'
import ExternalVideoView from '@/components/ExternalVideoView'

import { Plus } from '@phosphor-icons/react'

export default function ExercisesGroups() {
  const router = useRouter()
  const toast = useToast()
  const [muscleGroups, setMuscleGroups] = useState<IExercise[]>([])
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState<string>('')
  const [selectedExercise, setSelectedExercise] = useState<string>('')
  const [link, setLink] = useState<string>('')
  const [exercises, setExercises] = useState<IExercise[]>([])
  const [isFetching, setIsFetching] = useState<boolean>(false)
  const [isSendingForm, setIsSendingForm] = useState<boolean>(false)
  const [exerciseId, setExerciseId] = useState<string>('')
  const [isUpdatingExerciseName, setIsUpdatingExerciseName] =
    useState<boolean>(false)

  const { handleSubmit, reset } = useForm()

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
  }, [toast, router, isFetching, selectedMuscleGroup])

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
  }, [selectedMuscleGroup, toast, router, isFetching])

  function extractSrcFromIframe(link: string) {
    const srcMatch = link.match(/src="([^"]*)"/)

    if (srcMatch && srcMatch.length >= 2) {
      const srcValue = srcMatch[1]

      return srcValue.replace(/^"|"$/g, '')
    } else {
      return ''
    }
  }

  const onSubmit = async () => {
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

      setIsSendingForm(true)

      const filteredLink = extractSrcFromIframe(link)

      if (isUpdatingExerciseName) {
        await updateExercise(token, exerciseId, {
          name: selectedExercise,
          muscleGroup: selectedMuscleGroup,
          link: filteredLink,
        } as IExercise)
        toast({
          title: 'Exercício Atualizado.',
          description: 'Exercício Atualizado com sucesso.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
      }

      if (!isUpdatingExerciseName) {
        await createExercise(token, {
          name: selectedExercise,
          muscleGroup: selectedMuscleGroup,
          link: filteredLink,
        } as IExercise)
        toast({
          title: 'Exercício Criado.',
          description: 'Exercício criado com sucesso.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
      }
    } catch (error) {
      console.error(error)

      toast({
        title: 'Exercício já cadastrado.',
        description: 'Erro ao criar Exercício.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    } finally {
      reset()
      setIsFetching(!isFetching)
      setIsSendingForm(false)
      setIsUpdatingExerciseName(false)
    }
  }

  const handleWithDeleteExerciseName = async (id: string) => {
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

      await deleteExercise(token, id)

      toast({
        title: 'Exercício excluído.',
        description: 'Exercício excluído com sucesso.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    } catch (error) {
      console.error(error)

      toast({
        title: 'Erro ao excluir Exercício.',
        description: 'Por favor, tente novamente.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    } finally {
      setIsFetching(!isFetching)
    }
  }

  const handleWithSelecteMuscleGroup = (muscleGroup: string) => {
    setSelectedMuscleGroup(muscleGroup)
    setSelectedExercise('')
    setExerciseId('')
  }

  const handleWithSelecteExerciseName = (exerciseName: string) => {
    setSelectedExercise(exerciseName)
  }

  const handleWithUpdatingExerciseName = (id: string, exerciseName: string) => {
    setExerciseId(id)
    setSelectedExercise(exerciseName)
    setIsUpdatingExerciseName(true)
  }

  return (
    <>
      <Box
        mt={3}
        rounded={'lg'}
        border={'1px'}
        borderColor={'whiteAlpha.100'}
        p={1}
      >
        <Wrap mb={3}>
          {muscleGroups.map((muscleGroup) => (
            <WrapItem key={muscleGroup.id}>
              <HandleButton
                text={muscleGroup.muscleGroup}
                onClick={() =>
                  handleWithSelecteMuscleGroup(muscleGroup.muscleGroup!)
                }
              />
            </WrapItem>
          ))}
          <MuscleGroupUpdate
            oldName={selectedMuscleGroup}
            setIsFetching={setIsFetching}
          />
        </Wrap>
      </Box>

      <Box
        mt={3}
        rounded={'lg'}
        border={'1px'}
        borderColor={'whiteAlpha.100'}
        p={1}
      >
        <Wrap spacing={3}>
          {exercises.map((exercise) => (
            <WrapItem key={exercise.id}>
              <Flex
                rounded={'lg'}
                border={'1px'}
                borderColor={'whiteAlpha.100'}
                p={1}
                align="center"
              >
                <Text
                  cursor="pointer"
                  color={exercise.id === exerciseId ? 'purple.400' : 'white'}
                  mr={3}
                >
                  {exercise.name}
                </Text>

                {exercise.hasVideo && <ExternalVideoView src={exercise.link} />}

                <Button
                  onClick={() =>
                    handleWithUpdatingExerciseName(exercise.id!, exercise.name!)
                  }
                  ml={3}
                  _hover={{
                    bgGradient: 'linear(to-r, red.500, red.600)',
                    transition: '0.8s',
                  }}
                  size="xs"
                  border={'1px'}
                  borderColor={'whiteAlpha.300'}
                >
                  <PenIcon size={14} />
                </Button>

                <CloseButtonComponent
                  ml={3}
                  onClick={() => handleWithDeleteExerciseName(exercise.id!)}
                />
              </Flex>
            </WrapItem>
          ))}
        </Wrap>

        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl mt={4} isRequired>
            <Input
              defaultValue={selectedMuscleGroup}
              onChange={(e) => handleWithSelecteMuscleGroup(e.target.value)}
              placeholder="Grupo Muscular"
            />
          </FormControl>

          <FormControl mt={4} isRequired>
            <Input
              defaultValue={selectedExercise}
              onChange={(e) => handleWithSelecteExerciseName(e.target.value)}
              placeholder="Exercício"
            />
          </FormControl>

          <FormControl gridColumn="span 2" mt={3} mb={3}>
            <Input
              defaultValue={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="Link do vídeo"
            />
          </FormControl>
          <HandleButton
            loading={isSendingForm}
            w={'full'}
            mt={3}
            mb={3}
            text="Criar ou Atualizar"
            leftIcon={<Plus weight="bold" />}
            type="submit"
          />
        </form>
      </Box>
    </>
  )
}
