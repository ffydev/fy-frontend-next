import Navbar from '@/components/OwnerFlow/Navigation/Navbar'
import { useAuthStore } from '@/stores/AuthStore'
import {
  Box,
  Container,
  Flex,
  Heading,
  Stack,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  useToast,
  Avatar,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { findCurrentUser, getUserToken } from './api/providers/auth.provider'
import HandleButton from '@/components/Buttons/HandleButton'
import { ArrowLeft } from '@phosphor-icons/react'
import {
  IUserFeedback,
  IVideo,
  findPendingUsersFeedbacks,
} from './api/providers/user-feedbacks.provider'

export default function Feedbacks() {
  const router = useRouter()
  const toast = useToast()
  const {
    user,
    setUser,
    signOut,
    isFetchingCurrentUser,
    setIsLoadingLogin,
    isLoadingLogin,
  } = useAuthStore()
  const [feedbacks, setFeedbacks] = useState<IUserFeedback[]>()
  const [videos, setVideos] = useState<IVideo[]>()
  const [feedbackVideo, setFeedbackVideo] = useState('')

  useEffect(() => {
    if (!isLoadingLogin && !user) {
      setIsLoadingLogin(true)
    }

    if (user) {
      setIsLoadingLogin(false)
    }
  }, [user, setIsLoadingLogin, isLoadingLogin])

  useEffect(() => {
    const fetchUserData = async () => {
      const token = getUserToken()
      if (!token) {
        toast({
          title: 'Sua sessão expirou.',
          description: 'Por favor, faça login novamente.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
        router.push('/login')
        return
      }

      const currentUserData = await findCurrentUser(token)

      if (!currentUserData) {
        toast({
          title: 'Sua sessão expirou.',
          description: 'Por favor, faça login novamente.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
        router.push('/login')
        return
      }

      setUser(currentUserData.user)
    }

    fetchUserData()
  }, [router, signOut, setUser, isFetchingCurrentUser, toast])

  useEffect(() => {
    const fetchFeedbacksData = async () => {
      try {
        const token = getUserToken()

        if (!token) {
          toast({
            title: 'Sua sessão expirou.',
            description: 'Por favor, faça login novamente.',
            status: 'error',
            duration: 3000,
            isClosable: true,
          })

          router.push('/login')
          return
        }

        const response = await findPendingUsersFeedbacks(token, feedbackVideo)

        setFeedbacks(response.feedbacks)

        setVideos(response.videos)
      } catch (error) {
        console.error(error)
        toast({
          title: 'Erro ao buscar feedbacks.',
          description: 'Por favor, tente novamente.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
      }
    }
    fetchFeedbacksData()
  }, [router, toast, feedbackVideo])

  const handleWithNavigateToDashboard = () => {
    router.push('/dashboard')
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
              onClick={() => handleWithNavigateToDashboard()}
              leftIcon={<ArrowLeft size={28} weight="bold" />}
            />
            <Heading
              ml={3}
              as="h3"
              size="lg"
              fontWeight="medium"
              textAlign="center"
            >
              Feedbacks pendentes
            </Heading>
          </Flex>
        </Stack>

        <Stack direction={['column', 'row']} spacing={6} w={'full'}>
          <Container maxW={'7xl'}>
            <Stack m={3}>
              <TableContainer>
                <Table variant="simple">
                  <TableCaption>
                    Imperial to metric conversion factors
                  </TableCaption>
                  <Thead>
                    <Tr>
                      <Th></Th>
                      <Th>Nome</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {feedbacks?.map((feedback) => (
                      <Tr key={feedback.id}>
                        <Td>
                          <Avatar
                            name="Avatar"
                            size={'lg'}
                            src={
                              feedback?.User?.hasAvatar
                                ? `data:image/jpeg;base64,${feedback?.User?.avatar?.imageData}`
                                : 'logo.png'
                            }
                          />
                        </Td>
                        <Td>{feedback?.User?.firstName}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            </Stack>
          </Container>
        </Stack>
      </Box>
    </>
  )
}
