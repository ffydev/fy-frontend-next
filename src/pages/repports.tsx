import Navbar from '@/components/OwnerFlow/Navigation/Navbar'
import { useAuthStore } from '@/stores/AuthStore'
import {
  Box,
  Container,
  Flex,
  Heading,
  Stack,
  useToast,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { findCurrentUser, getUserToken } from './api/providers/auth.provider'
import HandleButton from '@/components/Buttons/HandleButton'
import { ArrowLeft } from '@phosphor-icons/react'
import Graphics from '@/components/Repports'

export default function Repports() {
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
              Exercícios
            </Heading>
          </Flex>
        </Stack>

        <Stack direction={['column', 'row']} spacing={1} w={'full'}>
          <Container maxW={'7xl'}>
            <Graphics />
          </Container>
        </Stack>
      </Box>
    </>
  )
}
