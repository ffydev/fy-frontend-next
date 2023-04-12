import { IWorkout } from '@/pages/api/providers/workouts.provider'
import { Box, SimpleGrid, Stack } from '@chakra-ui/react'
import ExercisesList from '../Exercises/exercises'

interface WorkoutsProps {
  workouts: IWorkout[]
}

export function WorkoutsList({ workouts }: WorkoutsProps) {
  return (
    <>
      {workouts?.map((workout: IWorkout) => (
        <Box
          key={workout.id}
          p={4}
          width="100%"
          rounded={'lg'}
          border={'1px'}
          bgColor={'whiteAlpha.50'}
          borderColor={'whiteAlpha.100'}
          boxShadow={'lg'}
          backdropBlur={'1rem'}
          backdropFilter="blur(5px)"
          minWidth="250px"
        >
          <Stack direction={['column', 'row']} w={'full'}>
            <SimpleGrid columns={{ base: 1, md: 5 }} spacing={5} w={'full'}>
              {workout.exercises && workout.exercises.length > 0 && (
                <ExercisesList exercises={workout.exercises} />
              )}
            </SimpleGrid>
          </Stack>
        </Box>
      ))}
    </>
  )
}
