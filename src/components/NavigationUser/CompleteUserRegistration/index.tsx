import { useAuth } from '@/hooks/ContextAuth'
import {
  findCurrentUser,
  getUserToken,
} from '@/pages/api/providers/auth.provider'
import { useRouter } from 'next/router'
import {
  Box,
  FormControl,
  FormLabel,
  Grid,
  Input,
  Heading,
  Text,
  Stack,
  HStack,
  Button,
} from '@chakra-ui/react'
import { useForm, SubmitHandler } from 'react-hook-form'
import HandleButton from '@/components/Buttons/HandleButton'
import { Plus, X } from '@phosphor-icons/react'
import { updateUserByUser } from '@/pages/api/providers/users.provider'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback } from 'react'

const createUserFormSchema = z
  .object({
    firstName: z
      .string()
      .nonempty({ message: 'Campo obrigatório' })
      .transform((value) =>
        value
          .trim()
          .split(' ')
          .map((word) => word[0].toUpperCase() + word.slice(1))
          .join(' '),
      ),
    lastName: z
      .string()
      .nonempty({ message: 'Campo obrigatório' })
      .transform((value) =>
        value
          .trim()
          .split(' ')
          .map((word) => word[0].toUpperCase() + word.slice(1))
          .join(' '),
      ),
    password: z
      .string()
      .min(8, { message: 'A senha deve ter no mínimo 8 caracteres' })
      .max(200, { message: 'A senha deve ter no máximo 200 caracteres' })
      .nonempty({ message: 'Campo obrigatório' }),
    confirmPassword: z.string().nonempty({ message: 'Campo obrigatório' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  })

type createUserFormSchemaType = z.infer<typeof createUserFormSchema>

export default function CompleteUserRegistration() {
  const router = useRouter()
  const { user, setUser } = useAuth()

  const fetchCurrentUserData = useCallback(
    async (token: string) => {
      try {
        const currentUserData = await findCurrentUser(token)

        if (!currentUserData) {
          // Implementar mensagem personalizada
          router.push('/login')
          return
        }

        setUser(currentUserData)
      } catch (error) {
        console.error(error)
        router.push('/login')
      }
    },
    [router, setUser],
  )

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<createUserFormSchemaType>({
    resolver: zodResolver(createUserFormSchema),
  })

  const onSubmit: SubmitHandler<createUserFormSchemaType> = async (data) => {
    try {
      const token = getUserToken()

      if (!token) {
        router.push('/login')
        return
      }

      const userData = {
        firstName: data.firstName,
        lastName: data.lastName,
        password: data.password,
        isRegistered: true,
      }

      await updateUserByUser(token, user!.id, userData)
      await fetchCurrentUserData(token)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <Box
        mt={3}
        mb={4}
        p={4}
        bgColor={'whiteAlpha.100'}
        rounded={'lg'}
        border={'1px'}
        borderColor={'whiteAlpha.200'}
        backdropBlur={'1rem'}
        backdropFilter="blur(15px)"
        boxShadow={'lg'}
      >
        <Heading>Complete seu cadastro</Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid templateColumns="repeat(1, 1fr)" gap={6} mt={4}>
            <FormControl gridColumn="span 1">
              <FormLabel>Primeiro Nome</FormLabel>
              <Input {...register('firstName')} placeholder="Primeiro Nome" />
              {errors.firstName && <Text>{errors.firstName.message}</Text>}
            </FormControl>

            <FormControl gridColumn="span 1">
              <FormLabel>Último Nome</FormLabel>
              <Input
                {...register('lastName')}
                placeholder="Último Nome"
                isRequired
              />
              {errors.lastName && <Text>{errors.lastName.message}</Text>}
            </FormControl>

            <FormControl gridColumn="span 1">
              <FormLabel>Senha</FormLabel>
              <Input
                type={'password'}
                {...register('password')}
                placeholder="Senha"
                isRequired
              />
              {errors.password && <Text>{errors.password.message}</Text>}
            </FormControl>

            <FormControl gridColumn="span 1">
              <FormLabel>Confirmar senha</FormLabel>
              <Input
                type={'password'}
                {...register('confirmPassword')}
                placeholder="Confirmar senha"
              />
              {errors.confirmPassword && (
                <Text>{errors.confirmPassword.message}</Text>
              )}
            </FormControl>
          </Grid>

          <Stack mt={6} mb={4}>
            <HStack>
              <HandleButton
                text="Enviar"
                leftIcon={<Plus size={30} weight="fill" />}
                w={'full'}
                type={'submit'}
              />
              <Button
                variant={'outline'}
                w={'full'}
                leftIcon={<X size={30} weight="fill" />}
                type="reset"
              >
                Cancelar
              </Button>
            </HStack>
          </Stack>
        </form>
      </Box>
    </>
  )
}
