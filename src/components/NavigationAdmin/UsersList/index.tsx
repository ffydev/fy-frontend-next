import HandleButton from '@/components/Buttons/HandleButton'
import PlanList from '@/components/NavigationAdmin/PlansList'
import { ContextDashboardAdmin } from '@/hooks/ContextDashboardAdmin'
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
  CloseButton,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  FormLabel,
  SimpleGrid,
  Spacer,
  Stack,
} from '@chakra-ui/react'
import { ArrowArcLeft } from '@phosphor-icons/react'
import { useRouter } from 'next/router'
import { useContext, useState } from 'react'

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
    changeUserId,
    isShowingUsers,
    handleWithShowUsers,
    isShowingWorkouts,
    handleWithShowWorkouts,
    isShowingFeedbacks,
    handleWithShowFeedbacks,
  } = useContext(ContextDashboardAdmin)

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
    changeUserId(userId)
    handleWithShowUsers(!isShowingUsers)
    handleWithShowWorkouts(!isShowingWorkouts)
  }

  const handleWithShowUserFeedbacks = (userId: string) => {
    changeUserId(userId)
    handleWithShowUsers(!isShowingUsers)
    handleWithShowFeedbacks(!isShowingFeedbacks)
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
                <Button
                  mr={2}
                  bgGradient={'gray'}
                  size="xs"
                  onClick={() => handleWithShowUserWorkouts(user.id)}
                >
                  Workouts
                </Button>

                <Button
                  bgGradient={'gray'}
                  size="xs"
                  onClick={() => handleWithShowUserFeedbacks(user.id)}
                >
                  Feedbacks
                </Button>
              </Flex>

              <Editable defaultValue={user.email}>
                <EditablePreview />
                <EditableInput
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  onBlur={() => handleUpdateUser(user.id!)}
                />
              </Editable>

              <Flex justifyContent={'initial'}>
                <Editable
                  mr={2}
                  defaultValue={
                    user.firstName === '' || user.firstName === null
                      ? 'Aguardando registro'
                      : user.firstName
                  }
                >
                  <EditablePreview />
                  <EditableInput
                    value={firstName}
                    onChange={(event) => setFirstName(event.target.value)}
                    onBlur={() => handleUpdateUser(user.id!)}
                  />
                </Editable>

                <Editable
                  defaultValue={
                    user.lastName === '' || user.lastName === null
                      ? 'Aguardando registro'
                      : user.lastName
                  }
                >
                  <EditablePreview />
                  <EditableInput
                    value={lastName}
                    onChange={(event) => setLastName(event.target.value)}
                    onBlur={() => handleUpdateUser(user.id!)}
                  />
                </Editable>
              </Flex>

              <FormLabel>
                Status: {user.isRegistered ? 'Registrado' : 'Não registrado'}
              </FormLabel>

              {user.deletedAt && (
                <Flex>
                  <FormLabel>{`Deletado em ${new Date(
                    user.deletedAt!,
                  ).toLocaleDateString()}`}</FormLabel>

                  <HandleButton
                    text="Ativar"
                    color={'whiteAlpga.900'}
                    _hover={{
                      bg: 'whiteAlpha.700',
                      transition: '0.4s',
                    }}
                    leftIcon={
                      <ArrowArcLeft size={20} color="#DD6B20" weight="fill" />
                    }
                    onClick={() => handleWithActiveUser(user.id)}
                  />
                </Flex>
              )}

              <Box>
                {user.plan && (
                  <PlanList plan={user.plan} planTypes={planTypes} />
                )}
              </Box>
            </Box>
          ))}
        </SimpleGrid>
      </Stack>
    </>
  )
}
