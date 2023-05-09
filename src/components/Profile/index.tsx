import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  Text,
  Grid,
  useToast,
} from '@chakra-ui/react'
import { useAuthStore } from '@/stores/AuthStore'
import HandleButton from '../Buttons/HandleButton'
import { Plus } from '@phosphor-icons/react'
import { updateUserByUser } from '@/pages/api/providers/users.provider'
import { getUserToken } from '@/pages/api/providers/auth.provider'
import { useRouter } from 'next/router'
import { useForm, SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const updateUserFormSchema = z
  .object({
    firstName: z.string().nonempty({ message: 'Campo obrigatório' }),
    lastName: z.string(),
    password: z.string().optional(),
    confirmPassword: z.string().optional(),
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

type updateUserFormSchemaType = z.infer<typeof updateUserFormSchema>

export default function Profile() {
  const { user, setIsFetchingCurrentUser } = useAuthStore()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<updateUserFormSchemaType>({
    resolver: zodResolver(updateUserFormSchema),
  })
  const toast = useToast()

  const onSubmit: SubmitHandler<updateUserFormSchemaType> = async (data) => {
    try {
      const token = getUserToken()

      if (!token) {
        toast({
          title: 'Sua sessão expirou.',
          description: 'Por favor, faça login novamente.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
        router.push('/login')
        return
      }

      await updateUserByUser(token, user?.id!, {
        firstName: data.firstName,
        lastName: data.lastName,
        password: data.password,
      })
      onClose()
      toast({
        title: 'Perfil atualizado com sucesso!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    } catch (error) {
      console.error(error)
      toast({
        title: 'Erro ao atualizar perfil.',
        description: 'Por favor, tente novamente.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    } finally {
      reset()
      setIsFetchingCurrentUser()
    }
  }

  return (
    <>
      <Button
        _hover={{}}
        w={'full'}
        variant={'ghost'}
        onClick={onOpen}
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}
      >
        Perfil
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
        <ModalContent
          bgGradient={[
            'linear(to-tr, gray.900 27.17%, purple.900 85.87%)',
            'linear(to-b, gray.900 27.17%, purple.900 85.87%)',
          ]}
          border={'1px'}
          borderColor={'whiteAlpha.200'}
          backdropFilter={'auto'}
          backdropBlur={'1rem'}
          boxShadow={'lg'}
        >
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid templateColumns="repeat(1, 1fr)" gap={6} mt={4}>
                <FormControl gridColumn="span 1">
                  <FormLabel>Primeiro Nome</FormLabel>
                  <Input
                    defaultValue={user?.firstName}
                    {...register('firstName')}
                    placeholder="Primeiro Nome"
                  />
                  {errors.firstName && <Text>{errors.firstName.message}</Text>}
                </FormControl>

                <FormControl gridColumn="span 1">
                  <FormLabel>Último Nome</FormLabel>
                  <Input
                    defaultValue={user?.lastName}
                    {...register('lastName')}
                    placeholder="Último Nome"
                  />
                  {errors.lastName && <Text>{errors.lastName.message}</Text>}
                </FormControl>

                <FormControl gridColumn="span 1">
                  <FormLabel>Alterar Senha</FormLabel>
                  <Input
                    defaultValue={undefined}
                    type={'password'}
                    {...register('password')}
                    placeholder="Senha"
                  />
                  {errors.password && <Text>{errors.password.message}</Text>}
                </FormControl>

                <FormControl gridColumn="span 1">
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
              </Grid>
              <ModalFooter>
                <HandleButton
                  mr={3}
                  text="Atualizar dados"
                  leftIcon={<Plus weight="bold" />}
                  type="submit"
                />
                <Button variant={'outline'} onClick={onClose}>
                  Cancelar
                </Button>
              </ModalFooter>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
