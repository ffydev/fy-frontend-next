import {
  Box,
  Container,
  Flex,
  Heading,
  SimpleGrid,
  Stack,
  VStack,
  chakra,
} from '@chakra-ui/react'
import { ArrowLeft, Users as UsersIcon } from '@phosphor-icons/react'
import { useEffect } from 'react'
import { useAdminNavigationStore } from '@/stores/OwnerStore/Navigation'
import { useOwnerIsFetchingStore } from '@/stores/OwnerStore/IsFetching'
import HandleButton from '@/components/Buttons/HandleButton'
import { Workouts } from '../Workouts'
import ListAnamnesis from '../Anamnesis'
import Feedbacks from '../FeedbacksList'
import Users from '../Users'
import { useWorkoutsExercisesStore } from '@/stores/OwnerStore/WorkoutsExercises'

export default function Navigation() {
  const {
    isShowingOwnerDashboard,
    isShowingUsers,
    isShowingWorkouts,
    isShowingAnamnesis,
    isShowingFeedbacks,
    setIsShowingOwnerDashboard,
    setIsShowingUsers,
    setIsShowingWorkouts,
    setIsShowingAnamnesis,
    setIsShowingFeedbacks,
    reset,
  } = useAdminNavigationStore()
  const { setSelectedUserId } = useOwnerIsFetchingStore()
  const { setSelectedWorkoutId } = useOwnerIsFetchingStore()
  const { setWorkoutsExercises } = useWorkoutsExercisesStore()

  const handleWithShowUsers = () => {
    setIsShowingOwnerDashboard()
    setIsShowingUsers()
  }

  const handleWithHideUsers = () => {
    setIsShowingOwnerDashboard()
    setIsShowingUsers()
  }

  const handleWithHideWorkouts = () => {
    setIsShowingWorkouts()
    setIsShowingUsers()
    setSelectedUserId('')
    setSelectedWorkoutId('')
    setWorkoutsExercises([])
  }

  const handleWithHideFeedbacks = () => {
    setIsShowingFeedbacks()
    setIsShowingUsers()
    setSelectedUserId('')
  }

  const handleWithHideAnamnesis = () => {
    setIsShowingAnamnesis()
    setIsShowingUsers()
    setSelectedUserId('')
  }

  useEffect(() => {
    return () => {
      reset()
    }
  }, [reset])

  return (
    <>
      {isShowingOwnerDashboard && (
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
                _hover={{ cursor: 'pointer' }}
                onClick={() => handleWithShowUsers()}
              >
                <VStack spacing={5}>
                  <Box
                    boxShadow="xl"
                    _hover={{ boxShadow: 'lg' }}
                    borderRadius="full"
                    color={'purple.300'}
                  >
                    <UsersIcon size={96} weight="fill" />
                  </Box>
                  <Heading
                    fontWeight={'medium'}
                    fontSize={'3xl'}
                    textTransform={'capitalize'}
                    textAlign={'center'}
                  >
                    Usuários{' '}
                    <chakra.span
                      fontWeight={'medium'}
                      fontSize={['lg', '2xl']}
                      textTransform={'capitalize'}
                      textAlign={'center'}
                      color={'purple.300'}
                    >
                      Listar Usuários
                    </chakra.span>
                  </Heading>
                </VStack>
              </Box>
            </SimpleGrid>
          </Container>
        </Stack>
      )}

      {isShowingUsers && (
        <>
          <Stack
            direction={'column'}
            align={'start'}
            alignSelf={'center'}
            position={'relative'}
            ml={3}
            pt={6}
            pb={6}
          >
            <Flex>
              <HandleButton
                leftIcon={<ArrowLeft size={20} weight="bold" />}
                onClick={handleWithHideUsers}
              />

              <Heading
                ml={3}
                as="h3"
                size="lg"
                fontWeight="medium"
                textAlign="center"
              >
                Usuários
              </Heading>
            </Flex>
          </Stack>
          <Stack direction={['column', 'row']} spacing={6} w={'full'}>
            <Container maxW={'8xl'}>
              <Users />
            </Container>
          </Stack>
        </>
      )}

      {isShowingWorkouts && (
        <>
          <Stack
            direction={'column'}
            align={'start'}
            alignSelf={'center'}
            position={'relative'}
            ml={3}
            pt={6}
            pb={6}
          >
            <Flex>
              <HandleButton
                leftIcon={<ArrowLeft size={20} weight="bold" />}
                onClick={handleWithHideWorkouts}
              />

              <Heading
                ml={3}
                as="h3"
                size="lg"
                fontWeight="medium"
                textAlign="center"
              >
                Workouts
              </Heading>
            </Flex>
          </Stack>
          <Container maxW={'8xl'}>
            <Workouts />
          </Container>
        </>
      )}

      {isShowingAnamnesis && (
        <>
          <Stack
            direction={'column'}
            align={'start'}
            alignSelf={'center'}
            position={'relative'}
            ml={3}
            pt={6}
            pb={6}
          >
            <Flex>
              <HandleButton
                leftIcon={<ArrowLeft size={28} weight="bold" />}
                onClick={handleWithHideAnamnesis}
              />

              <Heading
                ml={3}
                as="h3"
                size="lg"
                fontWeight="medium"
                textAlign="center"
              >
                Anamnese
              </Heading>
            </Flex>
          </Stack>
          <Container maxW={'8xl'}>
            <ListAnamnesis />
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
            ml={3}
            pt={6}
            pb={6}
          >
            <Flex>
              <HandleButton
                leftIcon={<ArrowLeft size={28} weight="bold" />}
                onClick={handleWithHideFeedbacks}
              />
              <Heading
                ml={3}
                as="h3"
                size="lg"
                fontWeight="medium"
                textAlign="center"
              >
                Feedbacks
              </Heading>
            </Flex>
          </Stack>
          <Container maxW={'8xl'}>
            <Feedbacks />
          </Container>
        </>
      )}
    </>
  )
}
