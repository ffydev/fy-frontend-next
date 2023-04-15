import {
  Button,
  FormControl,
  Heading,
  Select,
  Stack,
  Text,
} from '@chakra-ui/react'
import { getUserToken } from '@/pages/api/providers/auth.provider'
import { createWorkout } from '@/pages/api/providers/workouts.provider'
import { useRouter } from 'next/router'
import HandleButton from '@/components/Buttons/HandleButton'
import { Plus, X } from '@phosphor-icons/react'
import { z } from 'zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAdminProvider } from '@/hooks/ContextDashboardAdmin'

interface WorkoutsHeaderProps {
  userId: string
}

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

const createUserFormSchema = z.object({
  workoutType: z.string().nonempty({ message: 'Selecione o workout' }),
})

type createUserFormSchemaType = z.infer<typeof createUserFormSchema>

export default function WorkoutsHeader({ userId }: WorkoutsHeaderProps) {
  const router = useRouter()
  const { isFetchingWorkoutsNames, setIsFetchingWorkoutsNames } =
    useAdminProvider()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<createUserFormSchemaType>({
    resolver: zodResolver(createUserFormSchema),
  })

  const onSubmit: SubmitHandler<createUserFormSchemaType> = async (data) => {
    try {
      const token = getUserToken()

      if (!token) {
        // Implementar mensagem personalizada
        router.push('/login')
        return
      }

      await createWorkout(token, {
        userId,
        workoutType: data.workoutType,
      })
    } catch (error) {
      console.error(error)
    } finally {
      setIsFetchingWorkoutsNames(!isFetchingWorkoutsNames)
    }
  }

  return (
    <>
      <Heading as="h3" size="lg" pb="6" fontWeight="medium" textAlign="left">
        Workouts
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack direction={['column', 'row']} spacing={6} w={'full'}>
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
          <FormControl width={'100%'}>
            <Stack>
              <Button
                bgGradient={'linear(to-r, gray.800, gray.900)'}
                rounded={'lg'}
                boxShadow={'lg'}
                leftIcon={<X weight="bold" />}
                // onClick={() => handleWithDeleteWorkout(workout.id!)}
              >
                Excluir Workout
              </Button>
            </Stack>
          </FormControl>
        </Stack>
      </form>
    </>
  )
}
