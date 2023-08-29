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
  useToast,
} from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import HandleButton from '@/components/Buttons/HandleButton'
import { AddToHomeScreen } from '@/components/Notification'
import NotificationIos from '@/components/Notification/notificationIos'
import { useSearchParams } from 'next/navigation'

const retrievalPasswordFormSchema = z
  .object({
    password: z.string().nonempty(),

    confirmPassword: z.string().nonempty(),
  })
  .refine(
    (data) => {
      if (
        data.password !== undefined &&
        data.password !== null &&
        data.password !== ''
      ) {
        if (data.password.length >= 8 && data.password.length <= 72) {
          return true
        } else {
          return false
        }
      }
      return true
    },
    {
      message: 'A senha deve ter no mínimo 8 caracteres e no máximo 72',
      path: ['password'],
    },
  )
  .refine(
    (data) => {
      if (data.password && data.confirmPassword) {
        return data.password === data.confirmPassword
      }
      return true
    },
    {
      message: 'As senhas não coincidem',
      path: ['confirmPassword'],
    },
  )

type retrievalPasswordFormSchemaType = z.infer<
  typeof retrievalPasswordFormSchema
>

export default function Retrieval() {
  const router = useRouter()
  const { error } = useAuthStore()
  const toast = useToast()
  const searchParams = useSearchParams()

  const email = searchParams.get('email')
  const token = searchParams.get('token')

  console.log(email, token)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<retrievalPasswordFormSchemaType>({
    resolver: zodResolver(retrievalPasswordFormSchema),
  })

  // const onSubmitLogin: SubmitHandler<retrievalPasswordFormSchemaType> = async (
  //   data,
  // ) => {
  //   try {
  //     const response = await retrievalPassword({
  //       email: router.query.email as string,
  //       password: data.password,
  //     })

  //     if (response) {
  //       router.push('/login')
  //     }
  //     toast({
  //       title: 'Senha atualizada com sucesso!',
  //       status: 'success',
  //       duration: 3000,
  //       isClosable: true,
  //     })
  //   } catch (error) {
  //     toast({
  //       title: 'Ocorreu um erro ao atualizar a senha',
  //       status: 'error',
  //       duration: 3000,
  //       isClosable: true,
  //     })
  //   }
  // }

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
            {/* <form onSubmit={handleSubmit(onSubmitLogin)}> */}
            <Stack spacing={4} w={'full'} maxW={'sm'}>
              <Heading
                as={'h1'}
                fontSize={'2xl'}
                textAlign={{ base: 'center', md: 'left' }}
              >
                Recupere sua senha
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
                <FormLabel>Sua Senha</FormLabel>
                <Input
                  type={'password'}
                  placeholder="Coloque sua senha"
                  {...register('password')}
                />
                {errors.password && <Text>{errors.password.message}</Text>}
              </FormControl>

              <FormControl gridColumn="span 1" mb={3}>
                <FormLabel>Confirmar senha</FormLabel>
                <Input
                  defaultValue={undefined}
                  type={'password'}
                  {...register('confirmPassword')}
                  placeholder="Confirmar senha"
                />
                {errors.confirmPassword && (
                  <Text>{errors.confirmPassword.message}</Text>
                )}
              </FormControl>

              <Stack spacing={6} direction={['column', 'row']} pt={4}>
                <HandleButton w={'full'} text="Atualizar" type="submit" />
                <Button
                  w={'full'}
                  variant={'outline'}
                  colorScheme="purple"
                  type="reset"
                >
                  Cancelar
                </Button>
                <NotificationIos />
              </Stack>
            </Stack>
            {/* </form> */}
          </Box>
        </Flex>
      </BoxBgImage>
    </>
  )
}
