import { useOwnerIsFetchingStore } from '@/stores/OwnerStore/IsFetching'
import { useAdminNavigationStore } from '@/stores/OwnerStore/Navigation'
import { getUserToken } from '@/pages/api/providers/auth.provider'
import { IPlanType } from '@/pages/api/providers/plans-types.provider'
import {
  deleteUser,
  IUserInterface,
  updateUser,
} from '@/pages/api/providers/users.provider'
import {
  Box,
  Button,
  Flex,
  FormLabel,
  Input,
  SimpleGrid,
  Spacer,
  Stack,
  useToast,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import PlanList from '../../PlansList'
import { CloseButtonComponent } from '@/components/Buttons/CloseButtonComponent'

interface UsersListProps {
  users: IUserInterface[]
  planTypes: IPlanType[]
}
export function UsersList({ users, planTypes }: UsersListProps) {
  const router = useRouter()
  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [deletedAt, setDeletedAt] = useState<string | null>(null)
  const {
    setIsShowingUsers,
    setIsShowingWorkouts,
    setIsShowingAnamnesis,
    setIsShowingFeedbacks,
  } = useAdminNavigationStore()
  const { setIsFetchingUsers, setSelectedUserId } = useOwnerIsFetchingStore()
  const toast = useToast()

  const handleWithDeleteUser = (id: string) => {
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
    deleteUser(token, id).then(() => {
      setIsFetchingUsers()
    })
  }

  const handleUpdateUser = async (userId: string) => {
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

      await updateUser(token, userId, {
        email: email !== '' ? email : undefined,
        firstName: firstName !== '' ? firstName : undefined,
        lastName: lastName !== '' ? lastName : undefined,
        deletedAt: deletedAt !== '' ? deletedAt : undefined,
      })

      toast({
        title: 'Usuário atualizado com sucesso.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })

      setIsFetchingUsers()
    } catch (error) {
      console.error(error)
    }
  }

  const handleWithActiveUserAnamnesis = async (userId: string) => {
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

      await updateUser(token, userId, {
        hasAnamnesis: false,
      })

      setIsFetchingUsers()

      toast({
        title: 'Anamnese ativada com sucesso.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    } catch (error) {
      console.error(error)
    }
  }

  const handleWithShowUserWorkouts = (userId: string) => {
    setSelectedUserId(userId)
    setIsShowingUsers()
    setIsShowingWorkouts()
  }

  const handleWithShowUserFeedbacks = (userId: string) => {
    setSelectedUserId(userId)
    setIsShowingUsers()
    setIsShowingFeedbacks()
  }

  const handleWithShowAnamnesis = (userId: string) => {
    setSelectedUserId(userId)
    setIsShowingUsers()
    setIsShowingAnamnesis()
  }

  const handleWithActiveUser = async (userId: string) => {
    try {
      setDeletedAt('Ativar')
    } catch (error) {
      console.log(error)
    } finally {
      await handleUpdateUser(userId)
    }
  }

  return (
    <>
      <Stack direction={['column', 'row']} spacing={6} w={'full'} mt={10}>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={5} mb={4} w={'full'}>
          {users.map((user: IUserInterface) => (
            <Box
              key={user.id}
              p={4}
              bgColor={'whiteAlpha.100'}
              rounded={'lg'}
              border={'1px'}
              borderColor={'whiteAlpha.200'}
              backdropBlur={'1rem'}
              backdropFilter="blur(15px)"
              boxShadow={'lg'}
            >
              <Flex minWidth="max-content">
                <Spacer />
                <CloseButtonComponent
                  onClick={() => handleWithDeleteUser(user.id)}
                />
              </Flex>
              {user?.userType.name === 'User' && (
                <Flex justifyContent={'initial'}>
                  <Button
                    mr={2}
                    background={'purple.700'}
                    size={'xs'}
                    onClick={() => handleWithShowUserWorkouts(user.id)}
                    value={user.id}
                  >
                    Workouts
                  </Button>

                  <Button
                    mr={2}
                    background={'purple.700'}
                    size={'xs'}
                    onClick={() => handleWithShowUserFeedbacks(user.id)}
                    value={user.id}
                  >
                    Feedbacks
                  </Button>

                  <Button
                    mr={2}
                    background={'purple.700'}
                    size={'xs'}
                    onClick={() => handleWithShowAnamnesis(user.id)}
                    value={user.id}
                  >
                    Anamnese
                  </Button>
                </Flex>
              )}

              <Input
                mt={2}
                defaultValue={user.email}
                onChange={(event) => setEmail(event.target.value)}
                onBlur={() => handleUpdateUser(user.id!)}
              />

              <Input
                placeholder="Primeiro Nome"
                mt={2}
                defaultValue={user.firstName}
                onChange={(event) => setFirstName(event.target.value)}
                onBlur={() => handleUpdateUser(user.id!)}
              />

              <Input
                placeholder="Último Nome"
                mt={2}
                defaultValue={user.lastName}
                onChange={(event) => setLastName(event.target.value)}
                onBlur={() => handleUpdateUser(user.id!)}
              />

              {user?.userType.name === 'User' && (
                <>
                  <Flex mt={3}>
                    {!user.hasAnamnesis ? null : (
                      <Button
                        background={'purple.700'}
                        size={'xs'}
                        onClick={() => handleWithActiveUserAnamnesis(user.id)}
                        value={user.id}
                      >
                        Ativar Anamnese
                      </Button>
                    )}
                  </Flex>

                  {user.deletedAt && (
                    <Flex>
                      <FormLabel>{`Data de exclusão: ${new Date(
                        user.deletedAt!,
                      ).toLocaleDateString('pt-BR')}`}</FormLabel>

                      <Button
                        title={'Ativar'}
                        background={'whiteAlpha.400'}
                        size={'xs'}
                        onClick={() => handleWithActiveUser(user.id)}
                        value={user.id}
                      >
                        Ativar
                      </Button>
                    </Flex>
                  )}
                  <>
                    {user.plan && (
                      <PlanList plan={user.plan} planTypes={planTypes} />
                    )}
                  </>
                </>
              )}
            </Box>
          ))}
        </SimpleGrid>
      </Stack>
    </>
  )
}
