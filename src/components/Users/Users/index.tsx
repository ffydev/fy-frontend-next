import PlanList from '@/components/PlanList'
import Workouts from '@/components/Workouts'
import { getUserToken } from '@/pages/api/providers/auth.provider'
import {
  findPlanTypes,
  IPlanTypeInterface,
} from '@/pages/api/providers/plans-types.provider'
import {
  findUserType,
  IUserTypeInterface,
} from '@/pages/api/providers/users-types.provider'
import {
  deleteUser,
  findUsers,
  IUserInterface,
  updateUser,
} from '@/pages/api/providers/users.provider'
import {
  Box,
  Button,
  CloseButton,
  Container,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  FormControl,
  Heading,
  IconButton,
  Input,
  Select,
  SimpleGrid,
  Spacer,
  Stack,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { ArrowArcLeft } from 'phosphor-react'
import { useCallback, useEffect, useState } from 'react'
import UserCreate from '../UserCreate'

export default function Users() {
  const router = useRouter()
  const [users, setUsers] = useState<IUserInterface[]>([])
  const [userType, setUserType] = useState<IUserTypeInterface[]>([])
  const [userTypeId, setUserTypeId] = useState<string>('')
  const [searchName, setSearchName] = useState<string>('')
  const [planTypes, setPlanTypes] = useState<IPlanTypeInterface[]>([])
  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [workoutsComponents, setWorkoutsComponents] = useState<boolean>(false)
  const [userId, setUserId] = useState<string>('')

  const fetchUsersData = useCallback(async () => {
    try {
      const token = getUserToken()

      if (!token) {
        // Implementar mensagem personalizada
        return router.push('/login')
      }

      const usersData = await findUsers(token, {
        userTypeId,
        searchName,
      })
      setUsers(usersData)
    } catch (error) {
      console.error(error)
      router.push('/login')
    }
  }, [router, userTypeId, searchName, setUsers])

  const fetchPlanTypeData = useCallback(async () => {
    try {
      const token = getUserToken()

      if (!token) {
        // Implementar mensagem personalizada
        router.push('/login')
        return
      }

      const response = await findPlanTypes(token)

      setPlanTypes(response)
    } catch (error) {
      console.error(error)
      router.push('/login')
    }
  }, [router, setPlanTypes])

  const fetchUserTypeData = useCallback(async () => {
    try {
      const token = getUserToken()

      if (!token) {
        // Implementar mensagem personalizada
        router.push('/login')
        return
      }

      const response = await findUserType(token)

      setUserType(response)
    } catch (error) {
      console.error(error)
      // Implementar mensagem personalizada
      router.push('/login')
    }
  }, [router, setUserType])

  useEffect(() => {
    fetchPlanTypeData()
    fetchUserTypeData()
  }, [fetchPlanTypeData, fetchUserTypeData])

  useEffect(() => {
    fetchUsersData()
  }, [fetchUsersData])

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
          <Box ml={{ base: 0, md: 60 }} minH={'100vh'}>
            <Container maxW="7xl" p={{ base: 3, md: 10 }}>
              <Heading
                as="h3"
                size="lg"
                mb="4"
                fontWeight="medium"
                textAlign="left"
              >
                Workouts
              </Heading>
              <Flex>
                <Stack>
                  <IconButton
                    aria-label="Voltar"
                    icon={<ArrowArcLeft size={28} weight="bold" />}
                    onClick={handleWithShowUsers}
                  />
                </Stack>
              </Flex>
              <Workouts userId={userId} />
            </Container>
          </Box>
        </>
      ) : (
        <Box
          bgGradient={[
            'linear(to-tr, blackAlpha.50 30.17%, purple.900 99.87%)',
            'linear(to-br, blackAlpha.50 80.17%, purple.900 99.87%)',
          ]}
        >
          <Box ml={{ base: 0, md: 60 }} minH={'100vh'}>
            <Container maxW="7xl" p={{ base: 5, md: 10 }}>
              <Heading
                as="h3"
                size="lg"
                mb="4"
                fontWeight="medium"
                textAlign="left"
              >
                Usuários
              </Heading>
              <Stack direction={['column', 'row']} spacing={6} w={'full'}>
                <FormControl width={'100%'} mb={{ base: '4', lg: '0' }}>
                  <UserCreate
                    fetchUsersData={fetchUsersData}
                    userTypes={userType}
                    planTypes={planTypes}
                  />
                </FormControl>
                <FormControl
                  width={'100%'}
                  mb={{ base: '4', lg: '0' }}
                  isRequired
                >
                  <Select
                    size={'md'}
                    border={'1px'}
                    borderColor={'purple.400'}
                    variant={'outline'}
                    value={userTypeId}
                    onChange={(event) => setUserTypeId(event.target.value)}
                    placeholder="Tipo de usuário:"
                  >
                    {userType.map((userType: IUserTypeInterface) => (
                      <option key={userType.id} value={userType.id}>
                        {userType.name}
                      </option>
                    ))}
                  </Select>
                </FormControl>
                <FormControl width={'100%'} mb={{ base: '4', lg: '0' }}>
                  <Input
                    border={'1px'}
                    borderColor={'purple.400'}
                    variant={'outline'}
                    placeholder="Nome do usuário"
                    value={searchName}
                    onChange={(event) => setSearchName(event.target.value)}
                  />
                </FormControl>
              </Stack>
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
                          onClick={() => handleWithDelete(user.id)}
                          size="sm"
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
                          size="xs"
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
              </Stack>
            </Container>
          </Box>
        </Box>
      )}
    </>
  )
}
