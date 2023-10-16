import HandleButton from '@/components/Buttons/HandleButton'
import ListAnamnesis from '@/components/OwnerFlow/Anamnesis'
import Feedbacks from '@/components/OwnerFlow/FeedbacksList'
import Navbar from '@/components/OwnerFlow/Navigation/Navbar'
import UsersFetch from '@/components/OwnerFlow/Users'
import { Workouts } from '@/components/OwnerFlow/Workouts'
import Graphics from '@/components/Repports'
import { useOwnerIsFetchingStore } from '@/stores/OwnerStore/IsFetching'
import { useAdminNavigationStore } from '@/stores/OwnerStore/Navigation'
import { useWorkoutsExercisesStore } from '@/stores/OwnerStore/WorkoutsExercises'
import { Box, Container, Flex, Heading, Stack } from '@chakra-ui/react'
import { ArrowLeft } from '@phosphor-icons/react'
import { useRouter } from 'next/router'

export default function Users() {
  const router = useRouter()
  const { setSelectedWorkoutId, setSelectedUserId } = useOwnerIsFetchingStore()
  const { setWorkoutsExercises } = useWorkoutsExercisesStore()

  const {
    isShowingUsers,
    isShowingWorkouts,
    isShowingAnamnesis,
    isShowingFeedbacks,
    isShowingRepports,
    setIsShowingUsers,
    setIsShowingWorkouts,
    setIsShowingAnamnesis,
    setIsShowingFeedbacks,
    setIsShowingRepports,
  } = useAdminNavigationStore()

  const handleWithNavigateToDashboard = () => {
    router.push('/dashboard')
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

  const handleWithHideRepports = () => {
    setIsShowingRepports()
    setIsShowingUsers()
    setSelectedUserId('')
  }

  return (
    <>
      <Box
        bgGradient={[
          'linear(to-tr, gray.900 27.17%, purple.900 85.87%)',
          'linear(to-b, gray.900 27.17%, purple.900 85.87%)',
        ]}
        minH="100vh"
      >
        <Navbar />

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
                  onClick={handleWithNavigateToDashboard}
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
                <UsersFetch />
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

        {isShowingRepports && (
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
                  onClick={handleWithHideRepports}
                />
                <Heading
                  ml={3}
                  as="h3"
                  size="lg"
                  fontWeight="medium"
                  textAlign="center"
                >
                  Relatórios
                </Heading>
              </Flex>
            </Stack>
            <Container maxW={'8xl'}>
              <Graphics />
            </Container>
          </>
        )}
      </Box>
    </>
  )
}
