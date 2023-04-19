import {
  Button,
  FormControl,
  Heading,
  Select,
  Stack,
  Text,
} from '@chakra-ui/react'
import { getUserToken } from '@/pages/api/providers/auth.provider'
import {
  createWorkout,
  deleteWorkout,
} from '@/pages/api/providers/workouts.provider'
import { useRouter } from 'next/router'
import HandleButton from '@/components/Buttons/HandleButton'
import { Plus, X } from '@phosphor-icons/react'
import { z } from 'zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAdminNavigationStore } from '@/components/store/admin.navigation.store'

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

  const { selectedUserId, selectedWorkoutId, setIsFetchingWorkoutsNames } =
    useAdminNavigationStore()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<createWorkoutFormSchemaType>({
    resolver: zodResolver(createWorkoutFormSchema),
  })

  const onSubmit: SubmitHandler<createWorkoutFormSchemaType> = async (data) => {
    try {
      const token = getUserToken()

      if (!token) {
        // Implementar mensagem personalizada
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

  const handleWithDeleteWorkout = async (id: string) => {
    const token = getUserToken()

    if (!token) {
      // Implementar mensagem personalizada
      router.push('/login')
      return
    }

    try {
      await deleteWorkout(token, id)
    } catch (error) {
      console.error(error)
    } finally {
      setIsFetchingWorkoutsNames()
    }
  }

  return (
    <>
      <Heading as="h3" size="lg" pb="6" fontWeight="medium" textAlign="left">
        Workouts
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack direction={['column', 'row']} spacing={6} w={'full'} mb={6}>
          <FormControl width={'100%'}>
            <Stack>
              <HandleButton
                text="Cadastrar Workout"
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

          <Stack>
            <Button
              bgGradient={'linear(to-r, gray.800, gray.900)'}
              rounded={'lg'}
              boxShadow={'lg'}
              leftIcon={<X weight="bold" />}
              onClick={() => handleWithDeleteWorkout(selectedWorkoutId!)}
            >
              Excluir Workout
            </Button>
          </Stack>
        </Stack>
      </form>
    </>
  )
}
