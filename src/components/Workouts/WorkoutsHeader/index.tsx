import { Button, FormControl, Heading, Select, Stack } from '@chakra-ui/react'
import { getUserToken } from '@/pages/api/providers/auth.provider'
import { createWorkout } from '@/pages/api/providers/workouts.provider'
import { useState, useCallback } from 'react'
import { useRouter } from 'next/router'
import { ArrowArcLeft, Plus } from 'phosphor-react'
// import { WorkoutCreate } from '../WorkoutCreate'

interface WorkoutsHeaderProps {
  fetchUserWorkouts: () => void
  userId: string
  handleWithHideWorkouts: () => void
}

// interface WorkoutCreateProps {
//   fetchUserWorkouts: () => void
//   userId: string
// }

export default function WorkoutsHeader({
  fetchUserWorkouts,
  userId,
  handleWithHideWorkouts,
}: WorkoutsHeaderProps) {
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
      <Heading as="h3" size="lg" mb="4" fontWeight="medium" textAlign="left">
        Workouts
      </Heading>
      <Stack direction={['column', 'row']} spacing={6} w={'full'} mb={4}>
        <FormControl width={'100%'}>
          {/* <IconButton
            rounded={'md'}
            w={'3xs'}
            aria-label="Voltar"
            leftIcon={<ArrowArcLeft size={28} weight="bold" />}
            onClick={handleWithHideWorkouts}
          /> */}
          <Stack>
            <Button
              size={'md'}
              variant={'solid'}
              leftIcon={<ArrowArcLeft size={28} weight="bold" />}
              onClick={handleWithHideWorkouts}
            >
              Voltar
            </Button>
          </Stack>
        </FormControl>
        <FormControl width={'100%'} mb={{ base: '4', lg: '0' }}>
          {/* <WorkoutCreate
            fetchUserWorkouts={fetchUserWorkouts}
            userId={userId}
          /> */}
          <Select
            size={'md'}
            border={'1px'}
            borderColor={'whiteAlpha.900'}
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
