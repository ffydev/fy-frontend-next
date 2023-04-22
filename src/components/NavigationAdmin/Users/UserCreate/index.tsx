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
} from '@chakra-ui/react'
import { Plus } from '@phosphor-icons/react'
import { useRef } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useAdminIsFetchingStore } from '@/Stores/AdminStore/IsFetching'

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
  userTypeId: z.string().nonempty({ message: 'Selecione um usuário' }),
  password: z
    .string()
    .min(8, { message: 'A senha deve ter no mínimo 8 caracteres' })
    .max(200, { message: 'A senha deve ter no máximo 200 caracteres' })
    .nonempty({ message: 'Campo obrigatório' }),
  initDate: z.string({
    required_error: 'Campo obrigatório',
    invalid_type_error: 'Data Inválida (YYYY-MM-DD)',
  }),
  planDuration: z.coerce
    .number()
    .min(1, { message: 'Insira no mínimo 1 mês' })
    .max(24, { message: 'Insira no máximo 24 meses' }),
})

type createUserFormSchemaType = z.infer<typeof createUserFormSchema>

export default function UserCreate({ usersTypes, planTypes }: CreateUserProps) {
  const router = useRouter()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { setIsFetchingUsers } = useAdminIsFetchingStore()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<createUserFormSchemaType>({
    resolver: zodResolver(createUserFormSchema),
  })

  const initialRef = useRef<HTMLInputElement>(null)

  const onSubmit: SubmitHandler<createUserFormSchemaType> = async (data) => {
    try {
      const token = getUserToken()

      if (!token) {
        // Implementar mensagem personalizada
        router.push('/login')
        return
      }

      await createUser(token, {
        email: data.email,
        password: data.password,
        userTypeId: data.userTypeId,
        plan: {
          create: {
            initDate: data.initDate,
            planDuration: data.planDuration,
            planTypeId: data.planTypeId,
          },
        },
      })

      setIsFetchingUsers()
      onClose()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <Stack>
        <HandleButton
          text="Cadastrar usuário"
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
                <Select
                  bgGradient={'transparent'}
                  defaultValue="" // Adicionar o atributo defaultValue
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
                {errors.planTypeId && <Text>{errors.planTypeId.message}</Text>}
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Data de Início: </FormLabel>
                <Input
                  type="date"
                  {...register('initDate')}
                  placeholder="Data de Início"
                  isRequired
                />
                {errors.initDate && <Text>{errors.initDate.message}</Text>}
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Duração em meses: </FormLabel>
                <Input
                  type="number"
                  {...register('planDuration')}
                  placeholder="Duração em meses"
                  isRequired
                />
                {errors.planDuration && (
                  <Text>{errors.planDuration.message}</Text>
                )}
              </FormControl>

              <FormControl mt={4}>
                <Select
                  bgGradient={'transparent'}
                  defaultValue="" // Adicionar o atributo defaultValue
                  {...register('userTypeId')}
                >
                  <option
                    style={{ backgroundColor: '#322659' }}
                    disabled
                    value=""
                  >
                    Tipo de Usuário
                  </option>
                  {usersTypes.map((userType: IUserType) => (
                    <option
                      style={{ backgroundColor: '#322659' }}
                      key={userType.id}
                      value={userType.id}
                    >
                      {userType.name}
                    </option>
                  ))}
                </Select>
                {errors.userTypeId && <Text>{errors.userTypeId.message}</Text>}
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Senha</FormLabel>
                <Input {...register('password')} placeholder="Senha" />
                {errors.password && <Text>{errors.password.message}</Text>}
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <HandleButton
                mr={3}
                text="Cadastrar Usuário"
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
