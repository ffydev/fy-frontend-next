import { useUserProvider } from '@/hooks/ContextDashboardUser'
import {
  Box,
  Center,
  Container,
  Flex,
  Stack,
  Stat,
  StatLabel,
} from '@chakra-ui/react'
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
    subtitle: string
  }
  function StatsCard(props: StatsCardProps) {
    const { title, subtitle } = props
    return (
      <Stat
        px={{ base: 4, md: 8 }}
        textAlign={'center'}
        alignContent={'center'}
        boxShadow={'lg'}
        bgColor={'blackAlpha.500'}
        backdropBlur={'1rem'}
        backdropFilter="blur(10px)"
        border={'1px'}
        borderColor={'whiteAlpha.200'}
        rounded={'lg'}
      >
        <StatLabel
          fontWeight={'medium'}
          fontSize={'3xl'}
          textTransform={'capitalize'}
        >
          {title}
        </StatLabel>
        <StatLabel
          fontWeight={'normal'}
          fontSize={'2xl'}
          textTransform={'capitalize'}
        >
          {subtitle}
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

  return (
    <>
      {isShowingDashboard && (
        <Container maxW={'7xl'}>
          <Center py={[4, 6, 8]}>
            <Flex
              flexWrap={['wrap', 'nowrap']}
              justifyContent={['center', 'space-between']}
              alignItems={['center', 'flex-start']}
              mt={3}
            >
              <Stack spacing={6} direction={['column', 'row']}>
                <Box
                  maxWidth={['100%', '350px']}
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
                  <StatsCard title={'Workouts'} subtitle={'Treinos'} />
                </Box>

                <Box
                  maxWidth={['100%', '350px']}
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
                  <StatsCard
                    title={'Anamnese'}
                    subtitle={'Entrevista Médica'}
                  />
                </Box>
              </Stack>
            </Flex>
          </Center>
        </Container>
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

          <Container maxW="7xl" p={{ base: 3, md: 1 }}>
            <Stack maxW={'auto'}>
              <Workouts />
            </Stack>
          </Container>
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
