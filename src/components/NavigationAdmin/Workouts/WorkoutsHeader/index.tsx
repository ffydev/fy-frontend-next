import {
  Box,
  Flex,
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
import { Plus } from '@phosphor-icons/react'
import { z } from 'zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

interface WorkoutsHeaderProps {
  userId: string
  fetchWorkoutsNames: () => void
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

export default function WorkoutsHeader({
  userId,
  fetchWorkoutsNames,
}: WorkoutsHeaderProps) {
  const router = useRouter()

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
      fetchWorkoutsNames()
    }
  }

  return (
    <>
      <Box>
        <Heading
          as={'h3'}
          size={'lg'}
          mb={'4'}
          fontWeight={'medium'}
          textAlign={['center', 'left']}
        >
          Workouts
        </Heading>
      </Box>
      <Stack direction={['column', 'row']} spacing={3} w={'100%'} mb={4}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex>
            <FormControl width={'100%'}>
              <Stack>
                <HandleButton
                  text="Cadastrar Workout"
                  color={'blackAlpha.900'}
                  bgColor={'whiteAlpha.900'}
                  _hover={{
                    bg: 'whiteAlpha.700',
                    transition: '0.4s',
                  }}
                  type="submit"
                  leftIcon={<Plus weight="bold" />}
                />
              </Stack>
            </FormControl>

            <FormControl>
              <Select
                bgGradient={'transparent'}
                defaultValue="" // Adicionar o atributo defaultValue
                {...register('workoutType')}
              >
                <option
                  style={{ backgroundColor: '#322659' }}
                  disabled
                  value=""
                >
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
          </Flex>
        </form>
      </Stack>
    </>
  )
}
