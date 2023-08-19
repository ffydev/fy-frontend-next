import ExercisesGroups from '@/components/OwnerFlow/Exercises/ExercisesGroups'
import Navbar from '@/components/OwnerFlow/Navbar'
import { Box, Container, Stack } from '@chakra-ui/react'

export default function Exercises() {
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
