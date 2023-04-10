import HandleButton from '@/components/Buttons/HandleButton'
import SelectSettingValue from '@/components/Select/SelectSettingValue'
import { getUserToken } from '@/pages/api/providers/auth.provider'
import { IPlanType } from '@/pages/api/providers/plans-types.provider'
import { IUserType } from '@/pages/api/providers/users-types.provider'
import { createUser } from '@/pages/api/providers/users.provider'
import { useRouter } from 'next/router'
import {
  Button,
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
} from '@chakra-ui/react'
import { Plus } from '@phosphor-icons/react'
import { useRef, useState } from 'react'

interface CreateUserProps {
  fetchUsersData: () => void
  usersTypes: IUserType[]
  planTypes: IPlanType[]
}

export default function UserCreate({
  fetchUsersData,
  usersTypes,
  planTypes,
}: CreateUserProps) {
  const router = useRouter()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [userTypeId, setUserTypeId] = useState<string>('')
  const [initDate, setInitDate] = useState<string>('')
  const [endDate, setEndDate] = useState<string>('')
  const [planTypeId, setPlanTypeId] = useState<string>('')

  const handleWithGenPassword = () => {
    setPassword('123')
  }

  const initialRef = useRef<HTMLInputElement>(null)

  const handleCreateUser = async () => {
    try {
      const token = getUserToken()

      if (!token) {
        // Implementar mensagem personalizada
        router.push('/login')
        return
      }

      await createUser(token, {
        email,
        password,
        userTypeId,
        plan: {
          create: {
            initDate,
            endDate,
            planTypeId,
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
          border={'1px'}
          borderColor={'whiteAlpha.200'}
          backdropFilter={'auto'}
          backdropBlur={'1rem'}
          boxShadow={'lg'}
        >
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl mt={4} isRequired>
              <FormLabel>Email: </FormLabel>
              <Input
                placeholder="Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </FormControl>

            <FormControl mt={4} isRequired>
              <SelectSettingValue
                tag={'Tipo de Plano'}
                value={planTypeId}
                setValue={setPlanTypeId}
                mapValues={planTypes}
                borderColor={'whiteAlpha.900'}
              />
            </FormControl>

            <FormControl mt={4} isRequired>
              <FormLabel>Data de Início: </FormLabel>
              <Input
                type="date"
                placeholder="Data de Início"
                value={initDate}
                onChange={(event) => setInitDate(event.target.value)}
              />
            </FormControl>

            <FormControl mt={4} isRequired>
              <FormLabel>Data Final: </FormLabel>
              <Input
                type="date"
                placeholder="Data Final"
                value={endDate}
                onChange={(event) => setEndDate(event.target.value)}
              />
            </FormControl>

            <FormControl mt={6}>
              <SelectSettingValue
                tag={'Tipo de usuário'}
                value={userTypeId}
                setValue={setUserTypeId}
                mapValues={usersTypes}
              />
            </FormControl>

            <FormControl mt={4} isRequired>
              <FormLabel>Senha</FormLabel>
              <Button mb={2} onClick={handleWithGenPassword}>
                Gerar Senha
              </Button>
              <Input
                placeholder={'Opcional'}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <HandleButton
              text="Criar"
              color={'white'}
              _hover={{ bgColor: 'orange.400', transform: '0.3s' }}
              onClick={handleCreateUser}
            />
            <HandleButton text={'Cancelar'} onClick={onClose} />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
