import { Container, Flex, Heading, Stack } from '@chakra-ui/react'
import { ArrowLeft } from '@phosphor-icons/react'
import { useEffect } from 'react'
import { useAdminNavigationStore } from '@/stores/OwnerStore/Navigation'
import { useOwnerIsFetchingStore } from '@/stores/OwnerStore/IsFetching'
import HandleButton from '@/components/Buttons/HandleButton'
import { Workouts } from '../Workouts'
import ListAnamnesis from '../Anamnesis'
import Feedbacks from '../FeedbacksList'
import Users from '../Users'

export default function Navigation() {
  const {
    isShowingUsers,
    isShowingWorkouts,
    isShowingAnamnesis,
    isShowingFeedbacks,
    setIsShowingUsers,
    setIsShowingWorkouts,
    setIsShowingAnamnesis,
    setIsShowingFeedbacks,
    reset,
  } = useAdminNavigationStore()
  const { setSelectedUserId } = useOwnerIsFetchingStore()
  const { setSelectedWorkoutId } = useOwnerIsFetchingStore()

  const handleWithHideWorkouts = () => {
    setIsShowingWorkouts()
    setIsShowingUsers()
    setSelectedUserId('')
    setSelectedWorkoutId('')
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
      {isShowingUsers && (
        <>
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
