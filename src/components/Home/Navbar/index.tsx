import * as React from 'react'
import { Container, Box, Flex, Heading, Button, HStack } from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'
import { SignIn } from '@phosphor-icons/react'

export default function Navbar() {
  return (
    <>
      <Container maxW="5xl" p={{ base: 5, md: 2 }}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Box p="2">
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
          </Box>
          <Box mr={'2'}>
            <Button
              as={Link}
              href={'/login'}
              size={'md'}
              rightIcon={<SignIn size={24} weight="fill" />}
            >
              Entrar
            </Button>
          </Box>
        </Flex>
      </Container>
    </>
  )
}
