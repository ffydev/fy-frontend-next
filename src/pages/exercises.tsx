import ExercisesGroups from '@/components/OwnerFlow/Exercises/ExercisesGroups'
import Navbar from '@/components/OwnerFlow/Navigation/Navbar'
import { useAuthStore } from '@/stores/AuthStore'
import { Box, Container, Stack, useToast } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { findCurrentUser, getUserToken } from './api/providers/auth.provider'

export default function Exercises() {
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

      setUser(currentUserData)
    }

    fetchUserData()
  }, [router, signOut, setUser, isFetchingCurrentUser, toast])
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
        <Stack direction={['column', 'row']} spacing={6} w={'full'} mt={10}>
          <Container maxW={'7xl'}>
            <ExercisesGroups />
          </Container>
        </Stack>
      </Box>
    </>
  )
}
