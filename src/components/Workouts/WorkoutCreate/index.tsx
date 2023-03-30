import { getUserToken } from '@/pages/api/providers/auth.provider'
import { createWorkout } from '@/pages/api/providers/workouts.provider'
import { Button, Flex, FormControl, Select } from '@chakra-ui/react'
import { useRouter } from 'next/router'
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
      <FormControl isRequired>
        <Flex>
          <Select
            rounded={'md'}
            size="xs"
            w={'3xs'}
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
          <Flex>
            <Button
              ml={3}
              size="xs"
              bgGradient={[
                'linear(to-tr, blue.900 20.17%, purple.900 90.87%)',
                'linear(to-br, blue.900 20.17%, purple.900 90.87%)',
              ]}
              onClick={() => handleCreateWorkout(userId!)}
            >
              Adicionar Treino
            </Button>
          </Flex>
        </Flex>
      </FormControl>
    </>
  )
}
