import HandleButton from '@/components/Buttons/HandleButton'
import { getUserToken } from '@/pages/api/providers/auth.provider'
import { IPlanType } from '@/pages/api/providers/plans-types.provider'
import { IUserType } from '@/pages/api/providers/users-types.provider'
import { createUser } from '@/pages/api/providers/users.provider'
import { useRouter } from 'next/router'
import {
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Stack,
  useDisclosure,
  Text,
  Select,
  Button,
  RadioGroup,
  Radio,
  Flex,
  useToast,
} from '@chakra-ui/react'
import { Key, Plus } from '@phosphor-icons/react'
import { useRef, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useOwnerIsFetchingStore } from '@/stores/OwnerStore/IsFetching'
import { generate } from '@wcj/generate-password'

interface CreateUserProps {
  usersTypes: IUserType[]
  planTypes: IPlanType[]
}

const createUserFormSchema = z.object({
  email: z
    .string()
    .email({ message: 'Email inválido' })
    .nonempty({ message: 'Campo obrigatório' }),
  planTypeId: z.string().nonempty({ message: 'Selecione um plano' }),
  userTypeId: z.string().nonempty({ message: 'Selecione um tipo de usuário' }),
  password: z
    .string()
    .min(8, { message: 'A senha deve ter no mínimo 8 caracteres' })
    .max(72, { message: 'A senha deve ter no máximo 72 caracteres' })
    .nonempty({ message: 'Campo obrigatório' }),
  initDate: z
    .string({
      required_error: 'Campo obrigatório',
      invalid_type_error: 'Data Inválida (YYYY-MM-DD)',
    })
    .nonempty({ message: 'Informe a data de início' }),
  planDuration: z.coerce
    .number()
    .min(1, { message: 'Insira no mínimo 1 mês' })
    .max(24, { message: 'Insira no máximo 24 meses' }),
})

const createOwnerFormSchema = z.object({
  email: z
    .string()
    .email({ message: 'Email inválido' })
    .nonempty({ message: 'Campo obrigatório' }),
  userTypeId: z.string().nonempty({ message: 'Selecione um tipo de usuário' }),
  password: z
    .string()
    .min(8, { message: 'A senha deve ter no mínimo 8 caracteres' })
    .max(120, { message: 'A senha deve ter no máximo 120 caracteres' })
    .nonempty({ message: 'Campo obrigatório' }),
})

type createUserFormSchemaType = z.infer<typeof createUserFormSchema>

export default function UserCreate({ usersTypes, planTypes }: CreateUserProps) {
  const router = useRouter()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { setIsFetchingUsers } = useOwnerIsFetchingStore()
  const [isCreatingOwnerAccount, setIsCreatingOwnerAccount] =
    useState<boolean>(false)
  const [generatedPassword, setGeneratedPassword] = useState<string>(
    generate({ length: 23 }),
  )
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<createUserFormSchemaType>({
    resolver: zodResolver(
      isCreatingOwnerAccount ? createOwnerFormSchema : createUserFormSchema,
    ),
  })

  const initialRef = useRef<HTMLInputElement>(null)

  const toast = useToast()

  const onSubmit: SubmitHandler<createUserFormSchemaType> = async (data) => {
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

      const planInput = isCreatingOwnerAccount
        ? {}
        : {
            plan: {
              create: {
                initDate: data.initDate,
                planDuration: data.planDuration,
                planTypeId: data.planTypeId,
              },
            },
          }

      await createUser(token, {
        email: data.email,
        password: data.password,
        userTypeId: data.userTypeId,
        plan: planInput?.plan,
      })

      setIsFetchingUsers()
      onClose()

      toast({
        title: 'Usuário Criado.',
        description: 'Usuário criado com sucesso.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    } catch (error) {
      console.error(error)

      toast({
        title: 'Email já cadastrado.',
        description: 'Erro ao criar usuário.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    } finally {
      reset()
      setGeneratedPassword(generate({ length: 23 }))
    }
  }

  const handleWithCreatingUserType = (userType: string) => {
    userType === 'Owner'
      ? setIsCreatingOwnerAccount(true)
      : setIsCreatingOwnerAccount(false)
  }

  return (
    <>
      <Stack>
        <HandleButton
          text="Usuário"
          leftIcon={<Plus weight="bold" />}
          onClick={onOpen}
        />
      </Stack>
      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl mt={4}>
                <FormLabel>Email: </FormLabel>
                <Input {...register('email')} placeholder="Email" />
                {errors.email && <Text>{errors.email.message}</Text>}
              </FormControl>

              <FormControl mt={4}>
                <RadioGroup>
                  {usersTypes.map((userType: IUserType) => (
                    <Radio
                      key={userType.id}
                      value={userType.id}
                      borderRadius={4}
                      colorScheme="purple"
                      mr={3}
                      onChange={() => {
                        handleWithCreatingUserType(userType.name)
                        register('userTypeId', {
                          value: userType.id,
                        })
                      }}
                    >
                      {userType.name === 'Owner' ? 'Funcionário' : 'Paciente'}
                    </Radio>
                  ))}
                  {errors.userTypeId && (
                    <Text>{errors.userTypeId.message}</Text>
                  )}
                </RadioGroup>
              </FormControl>

              {!isCreatingOwnerAccount && (
                <>
                  <FormControl mt={4}>
                    <Select
                      bgGradient={'transparent'}
                      {...register('planTypeId')}
                    >
                      <option
                        style={{ backgroundColor: '#322659' }}
                        disabled
                        value=""
                      >
                        Tipo de Plano
                      </option>
                      {planTypes.map((planType: IPlanType) => (
                        <option
                          style={{ backgroundColor: '#322659' }}
                          key={planType.id}
                          value={planType.id}
                        >
                          {planType.name}
                        </option>
                      ))}
                    </Select>
                    {errors.planTypeId && (
                      <Text>{errors.planTypeId.message}</Text>
                    )}
                  </FormControl>

                  <FormControl mt={4}>
                    <FormLabel>Data de Início: </FormLabel>
                    <Input
                      type="date"
                      {...register('initDate')}
                      placeholder="Data de Início"
                    />
                    {errors.initDate && <Text>{errors.initDate.message}</Text>}
                  </FormControl>

                  <FormControl mt={4}>
                    <FormLabel>Duração em meses: </FormLabel>
                    <Input
                      type="number"
                      {...register('planDuration')}
                      placeholder="Duração em meses"
                    />
                    {errors.planDuration && (
                      <Text>{errors.planDuration.message}</Text>
                    )}
                  </FormControl>
                </>
              )}

              <FormControl mt={4}>
                <Flex>
                  <FormLabel>Senha</FormLabel>{' '}
                  <Button
                    size="xs"
                    leftIcon={<Key weight="bold" />}
                    onClick={() =>
                      setGeneratedPassword(generate({ length: 23 }))
                    }
                  >
                    Gerar Senha
                  </Button>
                </Flex>
                <Input
                  isReadOnly
                  {...register('password')}
                  value={generatedPassword}
                  placeholder="Senha"
                />
                {errors.password && <Text>{errors.password.message}</Text>}
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <HandleButton
                mr={3}
                text="Usuário"
                leftIcon={<Plus weight="bold" />}
                type="submit"
              />
              <Button variant={'outline'} onClick={onClose}>
                Cancelar
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  )
}
