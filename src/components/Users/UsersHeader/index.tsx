import SelectSettingValue from '@/components/Select/SelectSettingValue'
import { getUserToken } from '@/pages/api/providers/auth.provider'
import { IPlanType } from '@/pages/api/providers/plans-types.provider'
import {
  findUsersTypes,
  IUserType,
} from '@/pages/api/providers/users-types.provider'
import { FormControl, Heading, Input, Stack } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import UserCreate from '../UserCreate'

interface UsersHeaderProps {
  fetchUsersData: () => void
  planTypes: IPlanType[]
  userTypeId: string
  searchName: string
  setUserTypeId: (event: string) => void
  setSearchName: (event: string) => void
}

export default function UsersHeader({
  fetchUsersData,
  planTypes,
  userTypeId,
  searchName,
  setUserTypeId,
  setSearchName,
}: UsersHeaderProps) {
  const router = useRouter()
  const [usersTypes, setUsersTypes] = useState<IUserType[]>([])

  const fetchUserTypeData = useCallback(async () => {
    try {
      const token = getUserToken()

      if (!token) {
        // Implementar mensagem personalizada
        router.push('/login')
        return
      }

      const response = await findUsersTypes(token)

      setUsersTypes(response)
    } catch (error) {
      console.error(error)
      // Implementar mensagem personalizada
      router.push('/login')
    }
  }, [router, setUsersTypes])

  useEffect(() => {
    fetchUserTypeData()
  }, [fetchUserTypeData])

  return (
    <>
      <Heading as="h3" size="lg" mb="4" fontWeight="medium" textAlign="left">
        Usuários
      </Heading>
      <Stack direction={['column', 'row']} spacing={6} w={'full'}>
        <FormControl width={'100%'}>
          <UserCreate
            fetchUsersData={fetchUsersData}
            usersTypes={usersTypes}
            planTypes={planTypes}
          />
        </FormControl>

        <SelectSettingValue
          tag={'Tipo de usuário'}
          value={userTypeId}
          setValue={setUserTypeId}
          mapValues={usersTypes}
          borderColor={'whiteAlpha.900'}
        />

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
