import { useAuthStore } from '@/stores/AuthStore'
import {
  Box,
  BoxProps,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
} from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { signIn, validateCaptcha } from './api/providers/auth.provider'
import HandleButton from '@/components/Buttons/HandleButton'
import { AddToHomeScreen } from '@/components/Notification'
import NotificationIos from '@/components/Notification/notificationIos'
import ReCAPTCHA from 'react-google-recaptcha'
import RetrievalPassword from '@/components/RecoveryPassword'

const loginFormSchema = z.object({
  username: z.string().email({
    message: 'E-mail inválido',
  }),
  password: z
    .string()
    .min(8, { message: 'A senha deve ter no mínimo 8 caracteres' })
    .max(200, { message: 'A senha deve ter no máximo 200 caracteres' })
    .nonempty({ message: 'Campo obrigatório' }),
})

type loginFormSchemaType = z.infer<typeof loginFormSchema>

export default function Login() {
  const [isValidCaptcha, setIsValidCaptcha] = useState<boolean | undefined>(
    false,
  )
  const router = useRouter()
  const { setError, error } = useAuthStore()
  const [isRecorveringPassword, setIsRecorveringPassword] =
    useState<boolean>(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginFormSchemaType>({
    resolver: zodResolver(loginFormSchema),
  })

  const onChange = async (value: string | null) => {
    if (!isValidCaptcha) {
      if (typeof value === 'string') {
        const response = await validateCaptcha({
          token: value,
        })
        if (typeof response === 'boolean') {
          setIsValidCaptcha(response)
        }
      }
    }
  }

  const onSubmitLogin: SubmitHandler<loginFormSchemaType> = async (data) => {
    if (process.env.NODE_ENV !== 'development' && !isValidCaptcha) {
      return setError('Captcha is required')
    }
    try {
      const response = await signIn({
        username: data.username,
        password: data.password,
      })

      if (response) {
        router.push('/dashboard')
        return setError(undefined)
      }
      return setError('Usuário ou senha inválidos')
    } catch (error) {
      setError('Usuário ou senha inválidos')
    }
  }

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
      <AddToHomeScreen />
      <BoxBgImage>
        <Flex minH={'100vh'} align={'center'} justify={'center'}>
          <Box
            bgColor={'blackAlpha.600'}
            rounded={'lg'}
            border={'1px'}
            borderColor={'whiteAlpha.200'}
            backdropBlur={'1rem'}
            p={8}
            m={4}
          >
            <Stack align={['center', 'center', 'initial']}>
              <Box mb={4}>
                <Image
                  priority={true}
                  alt="Logo"
                  src="/logo.png"
                  width={50}
                  height={50}
                  loading={'eager'}
                />
              </Box>
            </Stack>
            {isRecorveringPassword ? (
              <RetrievalPassword />
            ) : (
              <>
                <form onSubmit={handleSubmit(onSubmitLogin)}>
                  <Stack spacing={4} w={'full'} maxW={'sm'}>
                    <Heading
                      as={'h1'}
                      fontSize={'2xl'}
                      textAlign={{ base: 'center', md: 'left' }}
                    >
                      Acesse sua conta
                    </Heading>
                    {error && (
                      <>
                        <Text
                          color={'red.400'}
                          as={'h2'}
                          fontSize={'lg'}
                          textAlign={{ base: 'center', md: 'left' }}
                        >
                          {error}
                        </Text>
                      </>
                    )}

                    <FormControl>
                      <FormLabel>Seu E-mail</FormLabel>
                      <Input
                        placeholder="Coloque o seu e-mail"
                        {...register('username')}
                      />
                      {errors.username && (
                        <Text>{errors.username.message}</Text>
                      )}
                    </FormControl>
                    <FormControl>
                      <FormLabel>Sua Senha</FormLabel>
                      <Input
                        type={'password'}
                        placeholder="Coloque sua senha"
                        {...register('password')}
                      />
                      {errors.password && (
                        <Text>{errors.password.message}</Text>
                      )}
                    </FormControl>

                    <ReCAPTCHA
                      sitekey="6LexJ9AnAAAAADk0hoK8TODYhKF4sxuqhNul1tqk"
                      onChange={onChange}
                    />

                    <Stack direction={['column', 'row']}>
                      <HandleButton w={'full'} text="Entrar" type="submit" />
                      <Button
                        w={'full'}
                        variant={'outline'}
                        colorScheme="purple"
                        type="reset"
                      >
                        Limpar
                      </Button>
                      <NotificationIos />
                    </Stack>
                  </Stack>
                </form>
              </>
            )}
            <Stack
              mt={3}
              direction={{ base: 'column', sm: 'row' }}
              align={'start'}
              justify={'space-between'}
            >
              {isRecorveringPassword ? (
                <Button
                  w={'full'}
                  variant={'outline'}
                  colorScheme="purple"
                  type="reset"
                  onClick={() => setIsRecorveringPassword(false)}
                >
                  Voltar
                </Button>
              ) : (
                <Text
                  onClick={() => setIsRecorveringPassword(true)}
                  color={'blue.400'}
                >
                  Esqueci a senha
                </Text>
              )}
            </Stack>
          </Box>
        </Flex>
      </BoxBgImage>
    </>
  )
}
