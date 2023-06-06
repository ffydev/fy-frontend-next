import { FormControl, Select, Stack, Text, useToast } from '@chakra-ui/react'
import { getUserToken } from '@/pages/api/providers/auth.provider'
import { createWorkout } from '@/pages/api/providers/workouts.provider'
import { useRouter } from 'next/router'
import HandleButton from '@/components/Buttons/HandleButton'
import { Plus } from '@phosphor-icons/react'
import { z } from 'zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useOwnerIsFetchingStore } from '@/stores/OwnerStore/IsFetching'

const workoutTypes = [
  {
    id: 'A',
    name: 'A',
  },
  {
    id: 'B',
    name: 'B',
  },
  {
    id: 'C',
    name: 'C',
  },
  {
    id: 'D',
    name: 'D',
  },
  {
    id: 'E',
    name: 'E',
  },
  {
    id: 'F',
    name: 'F',
  },
]

const createWorkoutFormSchema = z.object({
  workoutType: z.string().nonempty({ message: 'Selecione o workout' }),
})

type createWorkoutFormSchemaType = z.infer<typeof createWorkoutFormSchema>

export default function WorkoutsHeader() {
  const router = useRouter()

  const { selectedUserId, setIsFetchingWorkoutsNames } =
    useOwnerIsFetchingStore()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<createWorkoutFormSchemaType>({
    resolver: zodResolver(createWorkoutFormSchema),
  })
  const toast = useToast()

  const onSubmit: SubmitHandler<createWorkoutFormSchemaType> = async (data) => {
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

      await createWorkout(token, {
        userId: selectedUserId,
        workoutType: data.workoutType,
      })
    } catch (error) {
      console.error(error)
    } finally {
      setIsFetchingWorkoutsNames()
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack direction={['column', 'row']} spacing={3} w={'full'} mb={3}>
          <FormControl width={'100%'}>
            <Stack>
              <HandleButton
                text="Workout"
                leftIcon={<Plus weight="bold" />}
                type="submit"
              />
            </Stack>
          </FormControl>
          <FormControl width={'100%'} mb={{ base: '4', lg: '0' }}>
            <Select
              bgGradient={'linear(to-r, gray.800, gray.900)'}
              variant={'filled'}
              rounded={'lg'}
              boxShadow={'lg'}
              focusBorderColor={'purple.400'}
              size={'md'}
              defaultValue="" // Adicionar o atributo defaultValue
              {...register('workoutType')}
            >
              <option style={{ backgroundColor: '#322659' }} disabled value="">
                Tipo de Workout
              </option>
              {workoutTypes.map((workoutType: any) => (
                <option
                  style={{ backgroundColor: '#322659' }}
                  key={workoutType.id}
                  value={workoutType.id}
                >
                  {workoutType.name}
                </option>
              ))}
            </Select>
            {errors.workoutType && <Text>{errors.workoutType.message}</Text>}
          </FormControl>
        </Stack>
      </form>
    </>
  )
}
