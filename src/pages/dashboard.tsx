import DashboardMenuUser from '@/components/Dashboards/DashboardMenuUser'
import { useAuthStore } from '@/stores/AuthStore'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { findCurrentUser, getUserToken } from './api/providers/auth.provider'
import DashboardMenuOwner from '@/components/Dashboards/DashboardMenuOwner'
import IsLoading from '@/components/IsLoading'
import CompleteUserRegistration from '@/components/CompleteUserRegistration'
import { Box, Center } from '@chakra-ui/react'

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

  useEffect(() => {
    const fetchUserData = async () => {
      const token = getUserToken()
      if (!token) {
        router.push('/login')
        return
      }

      setIsLoadingLogin(true)
      const currentUserData = await findCurrentUser(token)

      if (!currentUserData) {
        // Implementar mensagem personalizada
        router.push('/login')
        return
      }

      setUser(currentUserData)
      setIsLoadingLogin(false)
    }

    fetchUserData()
  }, [router, signOut, setUser, isFetchingCurrentUser, setIsLoadingLogin])

  return (
    <>
      {isLoadingLogin ? (
        <IsLoading />
      ) : (
        <>
          {!user?.isRegistered ? (
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
