import * as React from 'react'
import {
  Container,
  Box,
  Flex,
  // Spacer,
  Heading,
  HStack,
  Stack,
  // useColorMode,
  // Button,
} from '@chakra-ui/react'
import Link from 'next/link'
import Image from 'next/image'
// import { Sun, Moon } from '@phosphor-icons/react'

export default function Navbar() {
  // const { colorMode, toggleColorMode } = useColorMode()
  return (
    <>
      <Container maxW="6xl" p={{ base: 5, md: 2 }} zIndex={999}>
        <Stack align={'center'}>
          <Flex h={16} align="center">
            <HStack>
              <Link href="#" passHref>
                <Box p="2">
                  <Image
                    alt="logo v do Next"
                    src="/logo.png"
                    width={40}
                    height={40}
                    loading={'eager'}
                  />
                </Box>
              </Link>
              <Link href="#" passHref>
                <Box p="2">
                  <Heading
                    as="h1"
                    fontSize={{ base: '2xl', sm: '4xl' }}
                    textShadow={'dark-lg'}
                    _focus={{ boxShadow: 'none', outline: 'none' }}
                    _hover={{
                      textDecoration: 'none',
                      color: 'purple.400',
                      transiiton: '0.3s',
                    }}
                  >
                    André Sena
                  </Heading>
                </Box>
              </Link>
            </HStack>
            {/* <Spacer />
          <Button onClick={toggleColorMode}>
            {colorMode === 'light' ? <Moon /> : <Sun />}
          </Button> */}
          </Flex>
        </Stack>
      </Container>
    </>
  )
}
