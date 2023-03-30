import { Flex, Heading, IconButton, Stack } from '@chakra-ui/react'
import { ArrowArcLeft } from 'phosphor-react'
import { WorkoutCreate } from '../WorkoutCreate'

interface WorkoutsHeaderProps {
  fetchUserWorkouts: () => void
  userId: string
  handleWithShowUsers: () => void
}

export default function WorkoutsHeader({
  fetchUserWorkouts,
  userId,
  handleWithShowUsers,
}: WorkoutsHeaderProps) {
  return (
    <>
      <Heading as='h3' size='lg' mb='4' fontWeight='medium' textAlign='left'>
        Workouts
      </Heading>
      <Flex>
        <Stack>
          <IconButton
            rounded={'md'}
            w={'3xs'}
            aria-label='Voltar'
            icon={<ArrowArcLeft size={28} weight='bold' />}
            onClick={handleWithShowUsers}
          />
        </Stack>

        <WorkoutCreate fetchUserWorkouts={fetchUserWorkouts} userId={userId} />
      </Flex>
    </>
  )
}
