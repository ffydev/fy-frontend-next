import { getUserToken } from '@/pages/api/providers/auth.provider'
import { createWorkout } from '@/pages/api/providers/workouts.provider'
import { Button, FormControl, Select, Stack } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { Plus } from 'phosphor-react'
import { useState, useCallback } from 'react'

interface WorkoutCreateProps {
  fetchUserWorkouts: () => void
  userId: string
}

export function WorkoutCreate({
  fetchUserWorkouts,
  userId,
}: WorkoutCreateProps) {
  const router = useRouter()
  const [workoutType, setWorkoutType] = useState<string>('')

  const handleCreateWorkout = useCallback(
    async (userId: string) => {
      try {
        const token = getUserToken()

        if (!token) {
          // Implementar mensagem personalizada
          router.push('/login')
          return
        }

        if (workoutType) {
          await createWorkout(token, {
            userId,
            workoutType,
          })
          fetchUserWorkouts()
        }
      } catch (error) {
        console.error(error)
      }
    },
    [fetchUserWorkouts, router, workoutType],
  )
  return (
    <>
      <Stack direction={['column', 'row']} spacing={6} w={'full'}>
        <FormControl width={'100%'} mb={{ base: '4', lg: '0' }} isRequired>
          <Select
            size={'md'}
            border={'1px'}
            borderColor={'purple.400'}
            variant={'outline'}
            value={workoutType}
            onChange={(event) => setWorkoutType(event.target.value)}
          >
            <option>Tipo de treino</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
            <option value="E">E</option>
            <option value="F">F</option>
          </Select>
        </FormControl>
        <FormControl width={'100%'} mb={{ base: '4', lg: '0' }}>
          <Stack>
            <Button
              size={'md'}
              variant={'solid'}
              color={'blackAlpha.900'}
              bgColor={'whiteAlpha.900'}
              _hover={{
                bg: 'whiteAlpha.700',
                transition: '0.4s',
              }}
              leftIcon={<Plus weight="bold" />}
              onClick={() => handleCreateWorkout(userId!)}
            >
              Adicionar Treino
            </Button>
          </Stack>
        </FormControl>
      </Stack>
    </>
  )
}
