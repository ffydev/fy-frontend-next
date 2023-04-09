import { Box } from '@chakra-ui/react'

export function StudentDepoiment() {
  return (
    <>
      <Box
        as="button"
        p={4}
        w={60}
        color="white"
        fontWeight="bold"
        borderRadius="md"
        boxShadow={'lg'}
        bgGradient="linear(to-r, teal.500, green.500)"
        _hover={{
          bgGradient: 'linear(to-r, teal.400, green.400)',
          transform: 'scale(1.1)',
          transition: '0.5s',
        }}
      >
        Click here
      </Box>
    </>
  )
}
