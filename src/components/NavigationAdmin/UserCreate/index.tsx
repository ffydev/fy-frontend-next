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
} from '@chakra-ui/react'
import { Plus } from '@phosphor-icons/react'
import { useRef } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

interface CreateUserProps {
  fetchUsersData: () => void
  usersTypes: IUserType[]
  planTypes: IPlanType[]
}

const createUserFormSchema = z.object({
  email: z
    .string()
    .email({ message: 'Email inválido' })
    .nonempty({ message: 'Campo obrigatório' }),
  planTypeId: z.string().nonempty({ message: 'Selecione um plano válido' }),
  userTypeId: z.string().nonempty({ message: 'Selecione um plano válido' }),
  password: z
    .string()
    .min(8, { message: 'A senha deve ter no mínimo 8 caracteres' })
    .max(200, { message: 'A senha deve ter no máximo 200 caracteres' })
    .nonempty({ message: 'Campo obrigatório' }),
  initDate: z.string({
    required_error: 'Campo obrigatório',
    invalid_type_error: 'Data Inválida (YYYY-MM-DD)',
  }),
  endDate: z.string({
    required_error: 'Campo obrigatório',
    invalid_type_error: 'Data Inválida (YYYY-MM-DD)',
  }),
})

type createUserFormSchemaType = z.infer<typeof createUserFormSchema>

export default function UserCreate({
  fetchUsersData,
  usersTypes,
  planTypes,
}: CreateUserProps) {
  const router = useRouter()
  const { isOpen, onOpen, onClose } = useDisclosure()

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
            endDate: data.endDate,
            planTypeId: data.planTypeId,
          },
        },
      })

      fetchUsersData()
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
          color={'blackAlpha.900'}
          bgColor={'whiteAlpha.900'}
          _hover={{
            bg: 'whiteAlpha.700',
            transition: '0.4s',
          }}
          onClick={onOpen}
          leftIcon={<Plus weight="bold" />}
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
                  bgGradient={[
                    'linear(to-tr, gray.900 27.17%, purple.900 85.87%)',
                    'linear(to-b, gray.900 27.17%, purple.900 85.87%)',
                  ]}
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
                <FormLabel>Data Final: </FormLabel>
                <Input
                  type="date"
                  {...register('endDate')}
                  placeholder="Data Final"
                  isRequired
                />
                {errors.endDate && <Text>{errors.endDate.message}</Text>}
              </FormControl>

              <FormControl mt={4}>
                <Select
                  bgGradient={[
                    'linear(to-tr, gray.900 27.17%, purple.900 85.87%)',
                    'linear(to-b, gray.900 27.17%, purple.900 85.87%)',
                  ]}
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
                  {usersTypes.map((userType: IPlanType) => (
                    <option
                      style={{ backgroundColor: '#322659' }}
                      key={userType.id}
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
                text="Criar"
                color={'blackAlpha.900'}
                bgColor={'whiteAlpha.900'}
                _hover={{
                  bg: 'whiteAlpha.600',
                  transition: '0.4s',
                }}
                leftIcon={<Plus size={30} color="black" weight="fill" />}
                w={'full'}
                type={'submit'}
              />
              <HandleButton text={'Cancelar'} onClick={onClose} />
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  )
}
