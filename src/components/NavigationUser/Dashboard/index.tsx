import { ContextDashboardUser } from '@/hooks/ContextDashboardUser'
import { Avatar, Button, Center, Flex } from '@chakra-ui/react'
import { useContext, useState } from 'react'
import { Workouts } from '../Workouts'

export default function Dashboard() {
  const { isShowingWorkouts, handleWithShowWorkouts } =
    useContext(ContextDashboardUser)
  const [isShowingDashboard, setIsShowingDashboard] = useState<boolean>(true)

  const handleWithWorkouts = () => {
    handleWithShowWorkouts(true)
    setIsShowingDashboard(false)
  }

  return (
    <>
      {isShowingDashboard && (
        <Center py={6}>
          <Flex justify={'center'} mt={3}>
            <Button
              background={'none'}
              _hover={{}}
              _active={{}}
              onClick={() => handleWithWorkouts()}
            >
              <Avatar
                size={'xl'}
                src={
                  'https://images.unsplash.com/photo-1576678927484-cc907957088c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
                }
                css={{
                  border: '2px solid white',
                }}
              />
            </Button>
          </Flex>
        </Center>
      )}

      {isShowingWorkouts && <Workouts />}
    </>
  )
}
