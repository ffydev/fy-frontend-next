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
import { useEffect } from 'react'
import { Workouts } from '../Workouts'
import HandleButton from '@/components/Buttons/HandleButton'
import {
  ArrowArcLeft,
  Barbell,
  Receipt,
  UserList,
  WechatLogo,
} from '@phosphor-icons/react'
import AnamnesisCreate from '../Anamnesis/AnamnesisCreate'
import CreatingFeedback from '../Feedbacks/CreateFeedback'
import ListFeedbacks from '../Feedbacks/ListFeedbacks'
import { useAuth } from '@/hooks/ContextAuth'
import { useUserNavigationStore } from '@/hooks/UserStore/Navigation/'

export default function Dashboard() {
  const { user } = useAuth()
  const {
    isShowingDashboard,
    isShowingWorkouts,
    isShowingCreateAnamnesis,
    isShowingFeedbacks,
    isShowingCreateFeedbacks,
    setIsShowingWorkouts,
    setIsShowingCreateAnamnesis,
    setIsShowingFeedbacks,
    setIsShowingCreateFeedbacks,
    setIsShowingDashboard,
    reset,
  } = useUserNavigationStore()

  const handleWithWorkouts = () => {
    setIsShowingWorkouts()
    setIsShowingDashboard()
  }

  const handleWithCreateAnamnesis = () => {
    setIsShowingCreateAnamnesis()
    setIsShowingDashboard()
  }

  const handleWithShowFeedbacks = () => {
    setIsShowingFeedbacks()
    setIsShowingDashboard()
  }

  const handleWithCreateFeedbacks = () => {
    setIsShowingCreateFeedbacks()
    setIsShowingDashboard()
  }

  useEffect(() => {
    return () => {
      reset()
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
                onClick={() => handleWithCreateFeedbacks()}
              >
                <VStack spacing={5}>
                  <Box
                    boxShadow="xl"
                    _hover={{ boxShadow: 'lg' }}
                    borderRadius="full"
                    color={'purple.300'}
                  >
                    <WechatLogo size={96} weight="fill" />
                  </Box>
                  <Heading
                    fontWeight={'medium'}
                    fontSize={'3xl'}
                    textTransform={'capitalize'}
                    textAlign={'center'}
                  >
                    Feedbacks{' '}
                    <chakra.span
                      fontWeight={'medium'}
                      fontSize={['lg', '2xl']}
                      textTransform={'capitalize'}
                      textAlign={'center'}
                      color={'purple.300'}
                    >
                      Criar Feedback
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
                onClick={() => handleWithShowFeedbacks()}
              >
                <VStack spacing={5}>
                  <Box
                    boxShadow="xl"
                    _hover={{ boxShadow: 'lg' }}
                    borderRadius="full"
                    color={'purple.300'}
                  >
                    <UserList size={96} weight="fill" />
                  </Box>
                  <Heading
                    fontWeight={'medium'}
                    fontSize={'3xl'}
                    textTransform={'capitalize'}
                    textAlign={'center'}
                  >
                    Feedbacks{' '}
                    <chakra.span
                      fontWeight={'medium'}
                      fontSize={['lg', '2xl']}
                      textTransform={'capitalize'}
                      textAlign={'center'}
                      color={'purple.300'}
                    >
                      Listar Feedbacks
                    </chakra.span>
                  </Heading>
                </VStack>
              </Box>

              {!user?.hasAnamnesis && (
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
                  onClick={() => handleWithCreateAnamnesis()}
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
              )}
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
              onClick={() => handleWithWorkouts()}
            />
          </Stack>

          <Container maxW="7xl" p={{ base: 3, md: 1 }}>
            <Stack maxW={'auto'}>
              <Workouts />
            </Stack>
          </Container>
        </>
      )}

      {isShowingFeedbacks && (
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
              onClick={handleWithShowFeedbacks}
            />
          </Stack>

          <Container maxW="7xl" p={{ base: 3, md: 1 }}>
            <Stack maxW={'auto'}>
              <ListFeedbacks />
            </Stack>
          </Container>
        </>
      )}

      {isShowingCreateFeedbacks ? (
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
              onClick={() => handleWithCreateFeedbacks()}
            />
          </Stack>
          <Center>
            <CreatingFeedback />
          </Center>
        </>
      ) : null}

      {isShowingCreateAnamnesis ? (
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
              onClick={() => handleWithCreateAnamnesis()}
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
