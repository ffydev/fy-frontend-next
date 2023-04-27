import { Box, Container, Stack } from '@chakra-ui/react'
import { ArrowArcLeft } from '@phosphor-icons/react'
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
          <Box ml={{ base: 0, md: 60 }} minH={'100vh'}>
            <Container maxW="7xl" p={{ base: 5, md: 10 }}>
              <Users />
            </Container>
          </Box>
        </>
      )}

      {isShowingWorkouts && (
        <>
          <Box ml={{ base: 0, md: 60 }} minH={'300vh'}>
            <Container maxW="7xl" p={{ base: 5, md: 10 }}>
              <Stack
                direction={'column'}
                align={'start'}
                alignSelf={'center'}
                position={'relative'}
                mb={6}
              >
                <HandleButton
                  text={'Voltar'}
                  leftIcon={<ArrowArcLeft size={28} weight="bold" />}
                  onClick={handleWithHideWorkouts}
                />
              </Stack>
              <Container maxW="7xl" p={{ base: 3, md: 1 }}>
                <Stack maxW={'auto'}>
                  <Workouts />
                </Stack>
              </Container>
            </Container>
          </Box>
        </>
      )}

      {isShowingAnamnesis && (
        <>
          <Box ml={{ base: 0, md: 60 }} minH={'100vh'}>
            <Container maxW="7xl" p={{ base: 5, md: 10 }}>
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
                  onClick={handleWithHideAnamnesis}
                />
              </Stack>
              <Container maxW="7xl" p={{ base: 5, md: 10 }}>
                <ListAnamnesis />
              </Container>
            </Container>
          </Box>
        </>
      )}

      {isShowingFeedbacks && (
        <>
          <Box ml={{ base: 0, md: 60 }} minH={'100vh'}>
            <Container maxW="7xl" p={{ base: 5, md: 10 }}>
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
                  onClick={handleWithHideFeedbacks}
                />
              </Stack>
              <Container maxW="7xl" p={{ base: 5, md: 10 }}>
                <Feedbacks />
              </Container>
            </Container>
          </Box>
        </>
      )}
    </>
  )
}
