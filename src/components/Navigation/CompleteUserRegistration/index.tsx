import { useAuth } from '@/hooks/ContextAuth'
import { getUserToken } from '@/pages/api/providers/auth.provider'
import { useRouter } from 'next/router'
import {
  Box,
  FormControl,
  FormLabel,
  Grid,
  Input,
  Heading,
  Text,
} from '@chakra-ui/react'
import { useForm, SubmitHandler } from 'react-hook-form'
import HandleButton from '@/components/Buttons/HandleButton'
import { Plus } from '@phosphor-icons/react'
import { updateUser } from '@/pages/api/providers/users.provider'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

interface IFormInput {
  firstName: string
  lastName: string
  password: string
  confirmPassword: string
}

const createUserFormSchema = z
  .object({
    firstName: z.string().nonempty({ message: 'Campo obrigatório' }),
    lastName: z.string().nonempty({ message: 'Campo obrigatório' }),
    password: z.string().nonempty({ message: 'Campo obrigatório' }),
    confirmPassword: z.string().nonempty({ message: 'Campo obrigatório' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  })

export default function CompleteUserRegistration() {
  const router = useRouter()
  const { user } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: zodResolver(createUserFormSchema),
  })

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const token = getUserToken()

      if (!token) {
        // Implementar mensagem personalizada
        router.push('/login')
        return
      }

      await updateUser(token, user!.id, {
        firstName: JSON.stringify(data.firstName),
        lastName: JSON.stringify(data.lastName),
        password: JSON.stringify(data.password),
      })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <Box
        mt={3}
        mb={4}
        sx={{
          border: '1px solid',
          borderColor: 'grey.400',
          borderRadius: '8px',
          p: 3,
        }}
      >
        <Heading m={3}>Complete Seu Cadastro</Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid templateColumns="repeat(2, 1fr)" gap={6}>
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
                placeholder="senha"
                isRequired
              />
              {errors.password && <Text>{errors.password.message}</Text>}
            </FormControl>

            <FormControl gridColumn="span 1">
              <FormLabel>Confirmar senha</FormLabel>
              <Input
                type={'password'}
                {...register('confirmPassword')}
                placeholder="confirmar senha"
              />
              {errors.confirmPassword && (
                <Text>{errors.confirmPassword.message}</Text>
              )}
            </FormControl>
          </Grid>

          <Box mt={3}>
            <HandleButton
              text="Enviar"
              color={'blackAlpha.900'}
              bgColor={'white'}
              _hover={{ bgColor: 'orange.400', transform: '0.3s' }}
              leftIcon={<Plus size={30} color="black" weight="fill" />}
              w={'full'}
              type={'submit'}
            />
          </Box>
        </form>
      </Box>
    </>
  )
}