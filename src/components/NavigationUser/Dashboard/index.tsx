import { useUserProvider } from '@/hooks/ContextDashboardUser'
import {
  Box,
  Center,
  Container,
  Heading,
  SimpleGrid,
  Stack,
  VStack,
  chakra,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { Workouts } from '../Workouts'
import HandleButton from '@/components/Buttons/HandleButton'
import { ArrowArcLeft, Barbell, Receipt } from '@phosphor-icons/react'
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
        <Stack direction={['column', 'row']} spacing={6} w={'full'} mt={10}>
          <Container maxW={'7xl'}>
            <SimpleGrid
              columns={{ base: 1, md: 2 }}
              spacing={5}
              mb={4}
              w={'full'}
            >
              <Box
                p={4}
                bgColor={'whiteAlpha.100'}
                rounded={'lg'}
                border={'1px'}
                borderColor={'whiteAlpha.200'}
                backdropBlur={'1rem'}
                backdropFilter="blur(15px)"
                boxShadow={'lg'}
                _hover={{ cursor: 'pointer' }}
                onClick={() => handleWithWorkouts()}
              >
                <VStack spacing={5}>
                  <Box
                    boxShadow="xl"
                    _hover={{ boxShadow: 'lg' }}
                    borderRadius="full"
                    color={'purple.300'}
                  >
                    <Barbell size={96} weight="fill" />
                  </Box>
                  <Heading
                    fontWeight={'medium'}
                    fontSize={'3xl'}
                    textTransform={'capitalize'}
                    textAlign={'center'}
                  >
                    Workouts{' '}
                    <chakra.span
                      fontWeight={'medium'}
                      fontSize={['lg', '2xl']}
                      textTransform={'capitalize'}
                      textAlign={'center'}
                      color={'purple.300'}
                    >
                      Treinos
                    </chakra.span>
                  </Heading>
                </VStack>
              </Box>

              <Box
                p={4}
                bgColor={'whiteAlpha.100'}
                rounded={'lg'}
                border={'1px'}
                borderColor={'whiteAlpha.200'}
                backdropBlur={'1rem'}
                backdropFilter="blur(15px)"
                boxShadow={'lg'}
                _hover={{ cursor: 'pointer' }}
                onClick={() => handleWithAnamnesis()}
              >
                <VStack spacing={5}>
                  <Box
                    boxShadow="xl"
                    _hover={{ boxShadow: 'lg' }}
                    borderRadius="full"
                    color={'purple.300'}
                  >
                    <Receipt size={96} weight="fill" />
                  </Box>
                  <Heading
                    fontWeight={'medium'}
                    fontSize={'3xl'}
                    textTransform={'capitalize'}
                    textAlign={'center'}
                  >
                    Anamnese{' '}
                    <chakra.span
                      fontWeight={'medium'}
                      fontSize={['lg', '2xl']}
                      textTransform={'capitalize'}
                      textAlign={'center'}
                      color={'purple.300'}
                    >
                      Entrevista Médica
                    </chakra.span>
                  </Heading>
                </VStack>
              </Box>
            </SimpleGrid>
          </Container>
        </Stack>
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
