import { useAuthStore } from '@/stores/AuthStore'
import { Box, Center } from '@chakra-ui/react'
import Navigation from './Navigation'
import CompleteOwnerRegistration from './CompleteOwnerRegistration'

export default function CheckOwnerRegister() {
  const { user } = useAuthStore()

  return (
    <>
      <Box>
        {!user?.isRegistered ? (
          <>
            <Center py={[4, 6, 8]}>
              <Box minH={'100vh'}>
                <CompleteOwnerRegistration />
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
