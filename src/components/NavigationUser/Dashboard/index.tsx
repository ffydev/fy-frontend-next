import { Box, Heading } from '@chakra-ui/react'

export default function Dashboard() {
  return (
    <>
      <Box ml={{ base: 0, md: 60 }} m={4} minH={'100vh'}>
        <Heading as="h3" size="lg" mb="4" fontWeight="medium" textAlign="left">
          Dashboard
        </Heading>
      </Box>
    </>
  )
}
