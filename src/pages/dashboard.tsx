import DashboardMenuUser from '@/components/Dashboards/DashboardMenuUser'
import { useAuthStore } from '@/stores/AuthStore'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { findCurrentUser, getUserToken } from './api/providers/auth.provider'
import DashboardMenuOwner from '@/components/Dashboards/DashboardMenuOwner'
import IsLoading from '@/components/IsLoading'
import CompleteUserRegistration from '@/components/CompleteUserRegistration'
import { Box, Center, useToast } from '@chakra-ui/react'

export default function Dashboard() {
  const router = useRouter()
  const {
    user,
    setUser,
    signOut,
    isFetchingCurrentUser,
    setIsLoadingLogin,
    isLoadingLogin,
  } = useAuthStore()
  const toast = useToast()

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

      setIsLoadingLogin(true)
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
      setTimeout(() => {
        setIsLoadingLogin(false)
      }, 700)
    }

    fetchUserData()
  }, [
    router,
    signOut,
    setUser,
    isFetchingCurrentUser,
    setIsLoadingLogin,
    toast,
  ])

  return (
    <>
      {isLoadingLogin ? (
        <IsLoading />
      ) : (
        <>
          {user?.isRegistered === false ? (
            <Center py={[4, 6, 8]}>
              <Box minH={'100vh'}>
                <CompleteUserRegistration />
              </Box>
            </Center>
          ) : (
            <>
              {user?.userType?.name === 'Admin' && <DashboardMenuOwner />}
              {user?.userType?.name === 'Owner' && <DashboardMenuOwner />}
              {user?.userType?.name === 'User' && <DashboardMenuUser />}
            </>
          )}
        </>
      )}
    </>
  )
}
