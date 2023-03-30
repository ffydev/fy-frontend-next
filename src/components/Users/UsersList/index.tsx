import PlanList from '@/components/PlanList'
import { getUserToken } from '@/pages/api/providers/auth.provider'
import { IPlanTypeInterface } from '@/pages/api/providers/plans-types.provider'
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
  SimpleGrid,
  Spacer,
  Stack,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useState } from 'react'

interface UsersListProps {
  fetchUsersData: () => void
  users: IUserInterface[]
  handleWithFindWorkoutsByUser: (userId: string) => void
  planTypes: IPlanTypeInterface[]
}
export function UsersList({
  fetchUsersData,
  users,
  handleWithFindWorkoutsByUser,
  planTypes,
}: UsersListProps) {
  const router = useRouter()
  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [email, setEmail] = useState<string>('')

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
        firstName,
        lastName,
      }).then(() => {
        fetchUsersData()
      })
    } catch (error) {
      console.error(error)
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
              backdropFilter='blur(15px)'
              boxShadow={'lg'}
            >
              <Flex minWidth='max-content'>
                <Spacer />
                <CloseButton
                  onClick={() => handleWithDeleteUser(user.id)}
                  size='sm'
                />
              </Flex>

              <Flex>
                <Button
                  bgColor={'purple.400'}
                  size='xs'
                  onClick={() => handleWithFindWorkoutsByUser(user.id)}
                >
                  Workouts
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

              <Editable defaultValue={user.firstName}>
                <EditablePreview />
                <EditableInput
                  value={firstName}
                  onChange={(event) => setFirstName(event.target.value)}
                  onBlur={() => handleUpdateUser(user.id!)}
                />
              </Editable>

              <Editable defaultValue={user.lastName}>
                <EditablePreview />
                <EditableInput
                  value={lastName}
                  onChange={(event) => setLastName(event.target.value)}
                  onBlur={() => handleUpdateUser(user.id!)}
                />
              </Editable>

              <Box>
                {user.plan && user.plan.length > 0 && (
                  <PlanList plans={user.plan} planTypes={planTypes} />
                )}
              </Box>
            </Box>
          ))}
        </SimpleGrid>
      </Stack>
    </>
  )
}
