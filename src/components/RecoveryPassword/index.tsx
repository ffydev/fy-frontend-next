import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react'
import HandleButton from '../Buttons/HandleButton'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { recoveryPassword } from '@/pages/api/providers/auth.provider'
import { useRouter } from 'next/router'

const recoveryFormSchema = z.object({
  username: z.string().email({
    message: 'E-mail inválido',
  }),
})

type recoveryFormSchemaType = z.infer<typeof recoveryFormSchema>

export default function RecoveryPassword() {
  const toast = useToast()
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<recoveryFormSchemaType>({
    resolver: zodResolver(recoveryFormSchema),
  })

  const onSubmitLogin: SubmitHandler<recoveryFormSchemaType> = async (data) => {
    try {
      await recoveryPassword(data.username)

      toast({
        title: 'E-mail enviado com sucesso',
        description: 'Verifique sua caixa de entrada',
        status: 'success',
        duration: 9000,
        isClosable: true,
      })

      router.push('/login')
    } catch (error) {
      toast({
        title: 'Erro ao enviar e-mail',
        description: 'Verifique se o e-mail está correto',
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }
  }

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmitLogin)}>
        <Stack spacing={4} w={'full'} maxW={'sm'}>
          <Heading
            as={'h1'}
            fontSize={'2xl'}
            textAlign={{ base: 'center', md: 'left' }}
          >
            Recuperação de senha
          </Heading>

          <FormControl>
            <FormLabel>Seu E-mail</FormLabel>
            <Input
              placeholder="Coloque o seu e-mail"
              {...register('username')}
            />
            {errors.username && <Text>{errors.username.message}</Text>}
          </FormControl>
          {/* 
                <ReCAPTCHA
                  sitekey="6LexJ9AnAAAAADk0hoK8TODYhKF4sxuqhNul1tqk"
                  onChange={onChange}
                /> */}

          <Stack direction={['column', 'row']}>
            <HandleButton w={'full'} text="Enviar Email" type="submit" />
            <Button
              w={'full'}
              variant={'outline'}
              colorScheme="purple"
              type="reset"
            >
              Limpar
            </Button>
          </Stack>
        </Stack>
      </form>
    </Box>
  )
}
