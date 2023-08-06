import { Container, Stack } from '@chakra-ui/react'
import ExercisesGroups from './ExercisesGroups'

export default function Exercises() {
  return (
    <>
      <Stack direction={['column', 'row']} spacing={6} w={'full'} mt={10}>
        <Container maxW={'7xl'}>
          <ExercisesGroups />
        </Container>
      </Stack>
    </>
  )
}
