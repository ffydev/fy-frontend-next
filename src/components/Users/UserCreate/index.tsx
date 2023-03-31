import HandleButton from '@/components/Button'
import { getUserToken } from '@/pages/api/providers/auth.provider'
import { IPlanType } from '@/pages/api/providers/plans-types.provider'
import { IUserType } from '@/pages/api/providers/users-types.provider'
import { createUser } from '@/pages/api/providers/users.provider'
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Select,
  Stack,
  useDisclosure,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { Plus } from 'phosphor-react'
import { useRef, useState } from 'react'

interface CreateUserProps {
  fetchUsersData: () => void
  userTypes: IUserType[]
  planTypes: IPlanType[]
}

export default function UserCreate({
  fetchUsersData,
  userTypes,
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
          create: [
            {
              initDate,
              endDate,
              planTypeId,
            },
          ],
        },
      }).then(() => {
        fetchUsersData()
      })
      onClose()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <Stack>
        <Button
          size={'md'}
          variant={'solid'}
          color={'blackAlpha.900'}
          bgColor={'whiteAlpha.900'}
          _hover={{
            bg: 'whiteAlpha.700',
            transition: '0.4s',
          }}
          onClick={onOpen}
          leftIcon={<Plus weight="bold" />}
        >
          Cadastrar usuário
        </Button>
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
              <FormLabel>Tipo de Plano:</FormLabel>
              <Select
                value={planTypeId}
                onChange={(event) => setPlanTypeId(event.target.value)}
              >
                <option value="">Escolha seu plano</option>
                {planTypes.map((planType: IPlanType) => (
                  <option key={planType.id} value={planType.id}>
                    {planType.name}
                  </option>
                ))}
              </Select>
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

            <FormControl mt={4} isRequired>
              <FormLabel>Tipo de usuário:</FormLabel>
              <Flex>
                <Select
                  value={userTypeId}
                  onChange={(event) => setUserTypeId(event.target.value)}
                >
                  <option value=""></option>
                  {userTypes.map((userType: IUserType) => (
                    <option key={userType.id} value={userType.id}>
                      {userType.name}
                    </option>
                  ))}
                </Select>
              </Flex>
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
              onClick={handleCreateUser}
            />
            <Button onClick={onClose}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
