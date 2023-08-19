import { Box } from '@chakra-ui/react'
import Navbar from '../OwnerFlow/Navbar'
import Navigation from '../OwnerFlow/Navigation'

export default function DashboardMenuOwner() {
  return (
    <>
      <Box
        bgGradient={[
          'linear(to-tr, gray.900 27.17%, purple.900 85.87%)',
          'linear(to-b, gray.900 27.17%, purple.900 85.87%)',
        ]}
      >
        <Navbar />
        <Navigation />
      </Box>
    </>
  )
}
