import { IWorkout } from '@/pages/api/providers/workouts.provider'
import { Box, SimpleGrid, Stack } from '@chakra-ui/react'
import ExercisesList from '../Exercises/'

interface WorkoutsProps {
  workouts: IWorkout[]
}

export function WorkoutsList({ workouts }: WorkoutsProps) {
  return (
    <>
      {workouts?.map((workout: IWorkout) => (
        <Box key={workout.id} p={4} width="100%">
          <Stack direction={['column', 'row']} w={'full'}>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} w={'full'}>
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