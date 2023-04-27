import { useAuthStore } from '@/stores/AuthStore'
import { Box, Center } from '@chakra-ui/react'
import Dashboard from './Dashboard'
import CompleteUserRegistration from '../NavigationUser/CompleteUserRegistration'

export default function NavigationOwner() {
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
              <Dashboard />
            </Box>
          </>
        )}
      </Box>
    </>
  )
}
