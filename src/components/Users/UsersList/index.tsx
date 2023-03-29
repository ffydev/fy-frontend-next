import Workouts from '@/components/Workouts'
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
import PlanList from '../../PlanList'

interface ClientListProps {
  fetchUsersData: () => void
  users: IUserInterface[]
  planTypes: IPlanTypeInterface[]
}

export default function UsersList({
  fetchUsersData,
  users,
  planTypes,
}: ClientListProps) {
  const router = useRouter()
  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [workoutsComponents, setWorkoutsComponents] = useState<boolean>(false)
  const [userId, setUserId] = useState<string>('')

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

  const handleWithDelete = (id: string) => {
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

  const handleWithFindWorkoutsByUser = (userId: string) => {
    setUserId(userId)
    setWorkoutsComponents(true)
  }

  const handleWithShowUsers = () => {
    setWorkoutsComponents(false)
  }

  return (
    <>
      {workoutsComponents ? (
        <>
          <Stack direction={['row', 'column']}>
            <Button
              size={'md'}
              variant={'solid'}
              color={'blackAlpha.900'}
              bgColor={'whiteAlpha.900'}
              _hover={{
                bg: 'whiteAlpha.700',
                transition: '0.4s',
              }}
              onClick={handleWithShowUsers}
            >
              Voltar
            </Button>
            <Workouts userId={userId} />
          </Stack>
        </>
      ) : (
        <>
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
                    onClick={() => handleWithDelete(user.id)}
                    size='sm'
                  />
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

                <Stack spacing={2} direction={['column', 'row']} mt={3}>
                  <Button
                    bgColor={'purple.400'}
                    size='xs'
                    onClick={() => handleWithFindWorkoutsByUser(user.id)}
                  >
                    Workouts
                  </Button>
                </Stack>
                <Box>
                  {user.plan && user.plan.length > 0 && (
                    <PlanList plans={user.plan} planTypes={planTypes} />
                  )}
                </Box>
              </Box>
            ))}
          </SimpleGrid>
        </>
      )}
    </>
  )
}
