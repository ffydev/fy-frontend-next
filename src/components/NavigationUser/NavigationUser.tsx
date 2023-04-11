import { useAuth } from '@/hooks/ContextAuth'
import { Box } from '@chakra-ui/react'
import CompleteUserRegistration from './CompleteUserRegistration'
import Dashboard from './Dashboard'

export default function NavigationUser() {
  const { user } = useAuth()

  return (
    <>
      <Box ml={{ base: 0, md: 60 }} m={4} minH={'100vh'}>
        {!user?.isRegistered ? (
          <>
            <CompleteUserRegistration />
          </>
        ) : (
          <>
            <Box minH={'100vh'}>
              <Dashboard />
            </Box>
          </>
        )}
      </Box>
    </>
  )
}
