import { ContextDashboardUser } from '@/hooks/ContextDashboardUser'
import { Avatar, Button, Center, Flex, Stack } from '@chakra-ui/react'
import { useContext, useState } from 'react'
import { Workouts } from '../Workouts'
import HandleButton from '@/components/Buttons/HandleButton'
import { ArrowArcLeft } from '@phosphor-icons/react'
import AnamnesisCreate from '../Anamnesis/AnamnesisCreate'

export default function Dashboard() {
  const {
    isShowingWorkouts,
    isShowAnamnesis,
    handleWithShowWorkouts,
    handleWithShowAnamnesis,
  } = useContext(ContextDashboardUser)
  const [isShowingDashboard, setIsShowingDashboard] = useState<boolean>(true)

  const handleWithDashboard = () => {
    handleWithShowWorkouts(false)
    handleWithShowAnamnesis(false)
    setIsShowingDashboard(true)
  }

  const handleWithWorkouts = () => {
    handleWithShowWorkouts(true)
    setIsShowingDashboard(false)
  }

  const handleWithAnamnesis = () => {
    handleWithShowAnamnesis(true)
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

            <Button
              background={'none'}
              _hover={{}}
              _active={{}}
              onClick={() => handleWithAnamnesis()}
            >
              <Avatar
                size={'xl'}
                src={
                  'https://plus.unsplash.com/premium_photo-1661483120409-accf4c0ebd8d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1954&q=80'
                }
                css={{
                  border: '2px solid white',
                }}
              />
            </Button>
          </Flex>
        </Center>
      )}

      {isShowingWorkouts && (
        <>
          <Stack
            direction={'column'}
            align={'start'}
            alignSelf={'center'}
            position={'relative'}
            mt={3}
            ml={3}
          >
            <HandleButton
              text={'Voltar'}
              leftIcon={<ArrowArcLeft size={28} weight="bold" />}
              onClick={() => handleWithDashboard()}
            />
          </Stack>
          <Workouts />
        </>
      )}

      {isShowAnamnesis ? (
        <>
          <Stack
            direction={'column'}
            align={'start'}
            alignSelf={'center'}
            position={'relative'}
            mt={3}
            ml={3}
          >
            <HandleButton
              text={'Voltar'}
              leftIcon={<ArrowArcLeft size={28} weight="bold" />}
              onClick={() => handleWithDashboard()}
            />
          </Stack>
          <AnamnesisCreate />
        </>
      ) : null}
    </>
  )
}
