import { useAuth } from '@/hooks/ContextAuth'
import {
  Box,
  BoxProps,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  Stack,
  Text,
} from '@chakra-ui/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

export default function Login() {
  const router = useRouter()
  const { user, signIn, error, setError } = useAuth()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const username = formData.get('username') as string
    const password = formData.get('password') as string

    signIn(username, password)
  }

  useEffect(() => {
    if (user) {
      if (user.userType === 'admin') {
        console.log(user)
        router.push('/dashboard')
      } else if (user.userType === 'client') {
        router.push('/client-dashboard')
      } else {
        setError('Usuário ou senha inválidos')
      }
    }
  }, [user, router])

  const BoxBgImage = (props: BoxProps) => {
    return (
      <Box
        pos={'relative'}
        h={'100%'}
        _before={{
          content: '""',
          bgImage:
            'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
          bgSize: 'cover',
          loading: 'eager',
          pos: 'absolute',
          zIndex: '-1',
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
          opacity: 0.6,
        }}
        {...props}
      />
    )
  }

  return (
    <>
      <BoxBgImage>
        <Flex minH={'100vh'} align={'center'} justify={'center'}>
          <Box
            bgColor={'blackAlpha.600'}
            rounded={'lg'}
            border={'1px'}
            borderColor={'whiteAlpha.200'}
            backdropBlur={'1rem'}
            backdropFilter="blur(10px)"
            boxShadow={'lg'}
            p={8}
            m={4}
          >
            <Stack align={['center', 'center', 'initial']}>
              <Box mb={4}>
                <Image
                  alt="Logo"
                  src="/logo.png"
                  width={50}
                  height={50}
                  loading={'eager'}
                />
              </Box>
            </Stack>
            <form onSubmit={handleSubmit}>
              {error && <p>{error}</p>}
              <Stack spacing={4} w={'full'} maxW={'sm'}>
                <Heading
                  as={'h1'}
                  fontSize={'2xl'}
                  textAlign={{ base: 'center', md: 'left' }}
                >
                  Acesse sua conta
                </Heading>
                <Text
                  as={'h2'}
                  fontSize={'lg'}
                  textAlign={{ base: 'center', md: 'left' }}
                >
                  Se você já possui uma conta, preencha seus dados de acesso à
                  plataforma.
                </Text>
                <FormControl id="email">
                  <FormLabel>Seu E-mail</FormLabel>
                  <Input
                    type="email"
                    name="username"
                    placeholder="Coloque o seu e-mail"
                    required
                  />
                </FormControl>
                <FormControl id="password">
                  <FormLabel>Sua Senha</FormLabel>
                  <InputGroup size="md">
                    <Input
                      type={'password'}
                      name="password"
                      placeholder="Coloque sua senha"
                      required
                    />
                  </InputGroup>
                </FormControl>
                <Stack spacing={6} direction={['column', 'row']} pt={4}>
                  <Button
                    w={'full'}
                    variant={'solid'}
                    colorScheme="teal"
                    type="submit"
                    // rightIcon={'asdsa'}
                  >
                    Acessar sua conta
                  </Button>
                  <Button
                    w={'full'}
                    variant={'outline'}
                    colorScheme="teal"
                    type="reset"
                    // rightIcon={'2121'}
                  >
                    Limpar dados
                  </Button>
                </Stack>
              </Stack>
            </form>
          </Box>
        </Flex>
      </BoxBgImage>
    </>
  )
}
