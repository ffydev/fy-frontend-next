import { CloseButtonComponent } from '@/components/Buttons/CloseButtonComponent'
import HandleButton from '@/components/Buttons/HandleButton'
import { getUserToken } from '@/pages/api/providers/auth.provider'
import {
  IExercise,
  createExercise,
  deleteExercise,
  findExerciseByMuscleGroup,
  findMuscleGroup,
} from '@/pages/api/providers/exercises.provider'
import {
  Box,
  Flex,
  FormControl,
  Input,
  Select,
  useToast,
  Text,
  WrapItem,
  Wrap,
} from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { NotePencil, Plus } from '@phosphor-icons/react'
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
  const [isFetching, setIsFetching] = useState<boolean>(false)

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

  return (
    <>
      <Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl mt={3} mb={3}>
            <Flex>
              <Select
                onChange={(e) => setSelectedMuscleGroup(e.target.value)}
                value={selectedMuscleGroup}
              >
                <option disabled value="">
                  Grupo Muscular
                </option>
                {muscleGroups.map((muscleGroup: IExercise) => (
                  <option key={muscleGroup.id} value={muscleGroup.muscleGroup}>
                    {muscleGroup.muscleGroup}
                  </option>
                ))}
              </Select>
              <NotePencil size={32} />
            </Flex>
          </FormControl>

          <Box>
            <Wrap spacing={3}>
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

          <FormControl mt={4}>
            <Input {...register('name')} placeholder="Exercício" />
            {errors.name && <Text>{errors.name.message}</Text>}
          </FormControl>

          <Flex mt={3}>
            <HandleButton
              text="Adicionar Exercício"
              leftIcon={<Plus weight="bold" />}
              w={'full'}
              type="submit"
            />
          </Flex>
        </form>
      </Box>
    </>
  )
}
