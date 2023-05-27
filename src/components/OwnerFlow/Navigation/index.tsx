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

  const handleWithHideWorkouts = () => {
    setIsShowingWorkouts()
    setIsShowingUsers()
    setSelectedUserId('')
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
          <Stack direction={['column', 'row']} spacing={6} w={'full'} mt={10}>
            <Container maxW={'7xl'}>
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
            mt={3}
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
          <Container maxW="7xl" p={3}>
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
            mt={3}
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
          <Container maxW="7xl" p={{ base: 3, md: 1 }}>
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
            mt={3}
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
          <Container maxW="7xl" p={{ base: 3, md: 1 }}>
            <Feedbacks />
          </Container>
        </>
      )}
    </>
  )
}
