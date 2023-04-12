import { CardButton } from '@/components/Buttons/UserCardButton'
import PlanList from '@/components/NavigationAdmin/PlansList'
import { useAdminProvider } from '@/hooks/ContextDashboardAdmin'
import { getUserToken } from '@/pages/api/providers/auth.provider'
import { IPlanType } from '@/pages/api/providers/plans-types.provider'
import {
  deleteUser,
  IUserInterface,
  updateUser,
} from '@/pages/api/providers/users.provider'
import {
  Box,
  CloseButton,
  Flex,
  FormLabel,
  Input,
  SimpleGrid,
  Spacer,
  Stack,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useState } from 'react'

interface UsersListProps {
  fetchUsersData: () => void
  users: IUserInterface[]
  planTypes: IPlanType[]
}
export function UsersList({
  fetchUsersData,
  users,
  planTypes,
}: UsersListProps) {
  const router = useRouter()
  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [deletedAt, setDeletedAt] = useState<string | null>(null)
  const {
    setuserId,
    isShowingUsers,
    setIsShowingUsers,
    isShowingWorkouts,
    setIsShowingWorkouts,
    isShowingFeedbacks,
    setIsShowingFeedbacks,
  } = useAdminProvider()

  const handleWithDeleteUser = (id: string) => {
    const token = getUserToken()

    if (!token) {
      // Implementar mensagem personalizada
      router.push('/login')
      return
    }
    deleteUser(token, id).then(() => {
      fetchUsersData()
    })
  }

  const handleUpdateUser = async (userId: string) => {
    try {
      const token = getUserToken()

      if (!token) {
        // Implementar mensagem personalizada
        router.push('/login')
        return
      }

      await updateUser(token, userId, {
        email: email !== '' ? email : undefined,
        firstName: firstName !== '' ? firstName : undefined,
        lastName: lastName !== '' ? lastName : undefined,
        deletedAt: deletedAt !== '' ? deletedAt : undefined,
      })
    } catch (error) {
      console.error(error)
    } finally {
      fetchUsersData()
    }
  }

  const handleWithShowUserWorkouts = (userId: string) => {
    setuserId(userId)
    setIsShowingUsers(!isShowingUsers)
    setIsShowingWorkouts(!isShowingWorkouts)
  }

  const handleWithShowUserFeedbacks = (userId: string) => {
    setuserId(userId)
    setIsShowingUsers(!isShowingUsers)
    setIsShowingFeedbacks(!isShowingFeedbacks)
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
      <Stack direction={['column', 'row']} spacing={6} w={'full'}>
        <SimpleGrid
          columns={{ base: 1, sm: 2, md: 3 }}
          spacing={5}
          mt={12}
          mb={4}
          w={'full'}
        >
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
                <CloseButton
                  onClick={() => handleWithDeleteUser(user.id)}
                  size="sm"
                />
              </Flex>

              <Flex justifyContent={'initial'}>
                <CardButton
                  title={'Workouts'}
                  mr={2}
                  background={'purple.700'}
                  size={'xs'}
                  onClick={() => handleWithShowUserWorkouts(user.id)}
                  value={user.id}
                />

                <CardButton
                  title={'Feedbacks'}
                  background={'purple.700'}
                  size={'xs'}
                  onClick={() => handleWithShowUserFeedbacks(user.id)}
                  value={user.id}
                />
              </Flex>

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

              <FormLabel mt={3}>
                Status: {user.isRegistered ? 'Registrado' : 'Não registrado'}
              </FormLabel>

              {user.deletedAt && (
                <Flex>
                  <FormLabel>{`Deletado em ${new Date(
                    user.deletedAt!,
                  ).toLocaleDateString()}`}</FormLabel>

                  <CardButton
                    title={'Ativar'}
                    background={'purple.400'}
                    size={'xs'}
                    onClick={() => handleWithActiveUser(user.id)}
                    value={user.id}
                  />
                </Flex>
              )}

              {user.plan && <PlanList plan={user.plan} planTypes={planTypes} />}
            </Box>
          ))}
        </SimpleGrid>
      </Stack>
    </>
  )
}
