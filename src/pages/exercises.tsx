import ExercisesGroups from '@/components/OwnerFlow/Exercises/ExercisesGroups'
import Navbar from '@/components/OwnerFlow/Navbar'
import { Container, Stack } from '@chakra-ui/react'

export default function Exercises() {
  return (
    <>
      <Navbar />
      <Stack direction={['column', 'row']} spacing={6} w={'full'} mt={10}>
        <Container maxW={'7xl'}>
          <ExercisesGroups />
        </Container>
      </Stack>
    </>
  )
}
