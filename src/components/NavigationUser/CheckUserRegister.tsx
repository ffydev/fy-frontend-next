import { useAuthStore } from '@/stores/AuthStore'
import { Box, Center } from '@chakra-ui/react'
import CompleteUserRegistration from './CompleteUserRegistration'
import Navigation from './Navigation'

export default function CheckUserRegister() {
  const { user } = useAuthStore()

  return (
    <>
      <Box ml={{ base: 0, md: 60 }} minH={'100vh'}>
        {!user?.isRegistered ? (
          <>
            <Center py={[4, 6, 8]}>
              <Box minH={'100vh'}>
                <CompleteUserRegistration />
              </Box>
            </Center>
          </>
        ) : (
          <>
            <Box minH={'100vh'}>
              <Navigation />
            </Box>
          </>
        )}
      </Box>
    </>
  )
}
