import { IPlanType } from '@/pages/api/providers/plans-types.provider'
import { IUserType } from '@/pages/api/providers/users-types.provider'
import { FormControl, Heading, Input, Select, Stack } from '@chakra-ui/react'
import UserCreate from '../UserCreate'

interface UsersHeaderProps {
  fetchUsersData: () => void
  userType: IUserType[]
  planTypes: IPlanType[]
  userTypeId: string
  searchName: string
  setUserTypeId: (event: string) => void
  setSearchName: (event: string) => void
}

export default function UsersHeader({
  fetchUsersData,
  userType,
  planTypes,
  userTypeId,
  searchName,
  setUserTypeId,
  setSearchName,
}: UsersHeaderProps) {
  return (
    <>
      <Heading as="h3" size="lg" mb="4" fontWeight="medium" textAlign="left">
        Usuários
      </Heading>
      <Stack direction={['column', 'row']} spacing={6} w={'full'}>
        <FormControl width={'100%'}>
          <UserCreate
            fetchUsersData={fetchUsersData}
            userTypes={userType}
            planTypes={planTypes}
          />
        </FormControl>
        <FormControl width={'100%'} mb={{ base: '4', lg: '0' }} isRequired>
          <Select
            size={'md'}
            border={'1px'}
            borderColor={'whiteAlpha.900'}
            variant={'outline'}
            value={userTypeId}
            onChange={(event) => setUserTypeId(event.target.value)}
            placeholder="Tipo de usuário:"
          >
            {userType.map((userType: IUserType) => (
              <option key={userType.id} value={userType.id}>
                {userType.name}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl width={'100%'} mb={{ base: '4', lg: '0' }}>
          <Input
            border={'1px'}
            borderColor={'whiteAlpha.900'}
            variant={'outline'}
            placeholder="Nome do usuário"
            value={searchName}
            onChange={(event) => setSearchName(event.target.value)}
          />
        </FormControl>
      </Stack>
    </>
  )
}
