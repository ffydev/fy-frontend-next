import { CloseButtonComponent } from '@/components/Buttons/CloseButtonComponent'
import HandleButton from '@/components/Buttons/HandleButton'
import UploadVideosStep from '@/components/Videos/UploadVideosStep'
import { getUserToken } from '@/pages/api/providers/auth.provider'
import {
  IExercise,
  createExercise,
  deleteExercise,
  findExerciseByMuscleGroup,
  findMuscleGroup,
} from '@/pages/api/providers/exercises.provider'
import { useVideosStore } from '@/stores/VideoStore'
import {
  Box,
  Flex,
  FormControl,
  Input,
  useToast,
  Text,
  WrapItem,
  Wrap,
} from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

const createExerciseFormSchema = z.object({
  name: z
    .string()
    .nonempty({ message: 'É necessário informar o nome do exercício' })
    .max(50, { message: 'Máximo de 50 caracteres' }),
})

type createExerciseFormSchemaType = z.infer<typeof createExerciseFormSchema>

export default function ExercisesGroups() {
  const router = useRouter()
  const toast = useToast()
  const [muscleGroups, setMuscleGroups] = useState<IExercise[]>([])
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState<string>('')
  const [exercises, setExercises] = useState<IExercise[]>([])
  const { finalVideo, reset: resetFinalVideo } = useVideosStore()
  const [isFetching, setIsFetching] = useState<boolean>(false)
  const [isCreatingOrUpdating, setIsCreatingOrUpdating] =
    useState<boolean>(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<createExerciseFormSchemaType>({
    resolver: zodResolver(createExerciseFormSchema),
  })

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
  }, [toast, router, isFetching])

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

  const onSubmit: SubmitHandler<createExerciseFormSchemaType> = async (
    data,
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

      setIsCreatingOrUpdating(true)

      console.log(finalVideo)

      await createExercise(token, {
        name: data.name,
        muscleGroup: selectedMuscleGroup,
      })

      toast({
        title: 'Exercício Criado.',
        description: 'Exercício criado com sucesso.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
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
      setIsCreatingOrUpdating(false)
      resetFinalVideo()
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
  }

  return (
    <>
      <Box>
        <Box
          mt={3}
          backdropBlur={'1rem'}
          backdropFilter="blur(5px)"
          rounded={'lg'}
          border={'1px'}
          bgColor={'whiteAlpha.50'}
          borderColor={'whiteAlpha.100'}
          boxShadow={'lg'}
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
          </Wrap>

          <Box>
            <Wrap spacing={3} minH={200}>
              {exercises.map((exercise) => (
                <WrapItem key={exercise.id}>
                  <Flex
                    backdropBlur={'1rem'}
                    backdropFilter="blur(5px)"
                    rounded={'lg'}
                    border={'1px'}
                    bgColor={'whiteAlpha.50'}
                    borderColor={'whiteAlpha.100'}
                    boxShadow={'lg'}
                    p={1}
                    align="center"
                  >
                    {exercise.name}
                    <CloseButtonComponent
                      ml={3}
                      onClick={() => handleWithDeleteExerciseName(exercise.id!)}
                    />
                  </Flex>
                </WrapItem>
              ))}
            </Wrap>
          </Box>
        </Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl mt={4}>
            <Input
              defaultValue={selectedMuscleGroup}
              onChange={(e) => handleWithSelecteMuscleGroup(e.target.value)}
              placeholder="Grupo Muscular"
            />
          </FormControl>

          <FormControl mt={4}>
            <Input {...register('name')} placeholder="Exercício" />
            {errors.name && <Text>{errors.name.message}</Text>}
          </FormControl>

          <FormControl gridColumn="span 2" mt={3}>
            <UploadVideosStep
              textButtonSubmit="Criar ou atualizar exercício"
              isSendingForm={isCreatingOrUpdating}
            />
          </FormControl>
        </form>
      </Box>
    </>
  )
}
