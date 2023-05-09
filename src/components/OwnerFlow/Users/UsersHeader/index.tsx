import { getUserToken } from '@/pages/api/providers/auth.provider'
import { IPlanType } from '@/pages/api/providers/plans-types.provider'
import {
  findUsersTypes,
  IUserType,
} from '@/pages/api/providers/users-types.provider'
import {
  Box,
  Checkbox,
  FormControl,
  Heading,
  Input,
  Select,
  Stack,
  useToast,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import UserCreate from '../UserCreate'

interface UsersHeaderProps {
  planTypes: IPlanType[]
  search: string
  setUserTypeId: (event: string) => void
  setSearch: (event: string) => void
  setIsDeleted: (event: string) => void
  usersCount: number
}

export default function UsersHeader({
  planTypes,
  search,
  setUserTypeId,
  setSearch,
  setIsDeleted,
  usersCount,
}: UsersHeaderProps) {
  const router = useRouter()
  const [usersTypes, setUsersTypes] = useState<IUserType[]>([])
  const toast = useToast()

  useEffect(() => {
    const fetchUserTypeData = async () => {
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

        const response = await findUsersTypes(token)

        setUsersTypes(response)
      } catch (error) {
        console.error(error)
        toast({
          title: 'Sua sessão expirou.',
          description: 'Por favor, faça login novamente.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
        router.push('/login')
      }
    }
    fetchUserTypeData()
  }, [router, toast])

  return (
    <>
      <Heading as="h3" size="lg" pb="6" fontWeight="medium" textAlign="left">
        Usuários {usersCount > 0 && `(${usersCount})`}
      </Heading>
      <Stack direction={['column', 'row']} spacing={6} w={'full'}>
        <FormControl width={'100%'}>
          <UserCreate usersTypes={usersTypes} planTypes={planTypes} />
        </FormControl>

        <FormControl width={'100%'} mb={{ base: '4', lg: '0' }}>
          <Select
            bgGradient={'linear(to-r, gray.800, gray.900)'}
            variant={'filled'}
            rounded={'lg'}
            boxShadow={'lg'}
            focusBorderColor={'purple.400'}
            size={'md'}
            onChange={(event) => setUserTypeId(event.target.value)}
          >
            {usersTypes.map((userType: IUserType) => (
              <option
                style={{ backgroundColor: '#322659' }}
                key={userType.id}
                value={userType.id}
                defaultValue={''}
              >
                {userType.name === 'Owner' ? 'Funcionários' : ''}
                {userType.name === 'User' ? 'Pacientes' : ''}
              </option>
            ))}
          </Select>
        </FormControl>

        <FormControl width={'100%'} mb={{ base: '4', lg: '0' }}>
          <Input
            bgGradient={'linear(to-r, gray.800, gray.900)'}
            variant={'filled'}
            rounded={'lg'}
            boxShadow={'lg'}
            focusBorderColor={'purple.400'}
            _placeholder={{ opacity: 1, color: 'whiteAlpha.900' }}
            placeholder="Pesquisar"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </FormControl>

        <FormControl>
          <Stack spacing={5} direction="row">
            <Box
              bgGradient={'linear(to-r, gray.800, gray.900)'}
              rounded={'lg'}
              boxShadow={'lg'}
              p={'2'}
              w={'full'}
            >
              <Checkbox
                colorScheme="purple"
                value={'1'}
                onChange={(event) =>
                  setIsDeleted(event.target.checked ? event.target.value : '')
                }
              >
                Buscar Deletados
              </Checkbox>
            </Box>
          </Stack>
        </FormControl>
      </Stack>
    </>
  )
}
