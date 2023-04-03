import { Box, Flex, FormControl, Heading, Stack } from '@chakra-ui/react'
import { getUserToken } from '@/pages/api/providers/auth.provider'
import { createWorkout } from '@/pages/api/providers/workouts.provider'
import { useState, useCallback } from 'react'
import { useRouter } from 'next/router'
import SelectSettingValue from '@/components/Select/SelectSettingValue'
import HandleButton from '@/components/Buttons/HandleButton'
import { Plus } from 'phosphor-react'

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

export default function WorkoutsHeader({
  userId,
  fetchWorkoutsNames,
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

        await createWorkout(token, {
          userId,
          workoutType,
        })
      } catch (error) {
        console.error(error)
      } finally {
        fetchWorkoutsNames()
      }
    },
    [fetchWorkoutsNames, router, workoutType],
  )
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
        <Flex>
          <FormControl width={'100%'}>
            <Stack>
              <HandleButton
                text="Adicionar Workout"
                color={'blackAlpha.900'}
                bgColor={'whiteAlpha.900'}
                _hover={{
                  bg: 'whiteAlpha.700',
                  transition: '0.4s',
                }}
                leftIcon={<Plus weight="bold" />}
                onClick={() => handleCreateWorkout(userId!)}
              />
            </Stack>
          </FormControl>

          <SelectSettingValue
            tag={'Tipo de workout'}
            value={workoutType}
            setValue={setWorkoutType}
            mapValues={workoutTypes}
            borderColor={'whiteAlpha.900'}
          />
        </Flex>
      </Stack>
    </>
  )
}
