import { useUserProvider } from '@/hooks/ContextDashboardUser'
import { Box, Center, Flex, Stack, Stat, StatLabel } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { Workouts } from '../Workouts'
import HandleButton from '@/components/Buttons/HandleButton'
import { ArrowArcLeft } from '@phosphor-icons/react'
import AnamnesisCreate from '../Anamnesis/AnamnesisCreate'

export default function Dashboard() {
  const {
    isShowingWorkouts,
    isShowAnamnesis,
    setIsShowingWorkouts,
    setIsShowAnamnesis,
  } = useUserProvider()
  const [isShowingDashboard, setIsShowingDashboard] = useState<boolean>(true)

  const handleWithDashboard = () => {
    setIsShowingWorkouts(false)
    setIsShowAnamnesis(false)
    setIsShowingDashboard(true)
  }

  const handleWithWorkouts = () => {
    setIsShowingWorkouts(true)
    setIsShowingDashboard(false)
  }

  const handleWithAnamnesis = () => {
    setIsShowAnamnesis(true)
    setIsShowingDashboard(false)
  }

  interface StatsCardProps {
    title: string
  }
  function StatsCard(props: StatsCardProps) {
    const { title } = props
    return (
      <Stat
        px={{ base: 4, md: 8 }}
        textAlign={'center'}
        alignContent={'center'}
      >
        <StatLabel
          background={'blackAlpha.800'}
          fontWeight={'extrabold'}
          fontSize={'3xl'}
          textTransform={'uppercase'}
        >
          {title}
        </StatLabel>
      </Stat>
    )
  }

  useEffect(() => {
    return () => {
      setIsShowingWorkouts(false)
      setIsShowAnamnesis(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  console.log('teste')
  return (
    <>
      {isShowingDashboard && (
        <Center py={[4, 6, 8]}>
          <Flex
            flexWrap={['wrap', 'nowrap']}
            justifyContent={['center', 'space-between']}
            alignItems={['center', 'flex-start']}
            mt={3}
          >
            <Box
              m={3}
              flex={['1 0 100%', '0 0 auto']}
              maxWidth={['100%', '300px']}
              maxHeight={['350px', 'none']}
              height={['350px', 'none']}
              bgImage={{
                base: `url(https://images.unsplash.com/photo-1576678927484-cc907957088c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80)`,
                md: `url(https://images.unsplash.com/photo-1576678927484-cc907957088c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80)`,
              }}
              bgPosition="center"
              bgRepeat="no-repeat"
              bgSize="cover"
              borderRadius="md"
              p={4}
              mb={6}
              _hover={{ cursor: 'pointer' }}
              onClick={() => handleWithWorkouts()}
            >
              <StatsCard title={'WORKOUTS'} />
            </Box>

            <Box
              m={3}
              flex={['1 0 100%', '0 0 auto']}
              maxWidth={['100%', '300px']}
              maxHeight={['350px', 'none']}
              height={['350px', 'none']}
              bgImage={{
                base: `url(https://plus.unsplash.com/premium_photo-1661483120409-accf4c0ebd8d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1954&q=80)`,
                md: `url(https://plus.unsplash.com/premium_photo-1661483120409-accf4c0ebd8d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1954&q=80)`,
              }}
              bgPosition="center"
              bgRepeat="no-repeat"
              bgSize="cover"
              borderRadius="md"
              p={4}
              mb={6}
              _hover={{ cursor: 'pointer' }}
              onClick={() => handleWithAnamnesis()}
            >
              <StatsCard title={'ANAMNESE'} />
            </Box>
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

          <Center>
            <Workouts />
          </Center>
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
          <Center>
            <AnamnesisCreate />
          </Center>
        </>
      ) : null}
    </>
  )
}
