import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Heading,
  FormControl,
  Select,
  Stack,
  Input,
  Container,
} from '@chakra-ui/react';
import UsersList from '../UsersList';
import UserCreate from '../UserCreate';
import { findUsers, IUserInterface } from '@/pages/api/providers/user.provider';
import {
  findUserType,
  IUserTypeInterface,
} from '@/pages/api/providers/user-type.provider';
import {
  findPlanTypes,
  IPlanTypeInterface,
} from '@/pages/api/providers/plan-type.provider';
import { getUserToken } from '@/pages/api/providers/auth.provider';

export default function Users() {
  const router = useRouter();
  const [users, setUsers] = useState<IUserInterface[]>([]);
  const [userType, setUserType] = useState<IUserTypeInterface[]>([]);
  const [userTypeId, setUserTypeId] = useState<string>('');
  const [searchName, setSearchName] = useState<string>('');
  const [planTypes, setPlanTypes] = useState<IPlanTypeInterface[]>([]);

  const fetchUsersData = async () => {
    try {
      const token = getUserToken();

      if (!token) {
        return router.push('/login')
      }

      const usersData = await findUsers(token, {
        userTypeId,
        searchName,
      });
      setUsers(usersData);
    } catch (error) {
      console.error(error);
      router.push('/login');
    }
  };

  const fetchPlanTypeData = async () => {
    try {
      const token = getUserToken();

      if (!token) {
        router.push('/login');
        return;
      }

      const response = await findPlanTypes(token);

      setPlanTypes(response);
    } catch (error) {
      console.error(error);
      router.push('/login');
    }
  };

  const fetchUserTypeData = async () => {
    try {
      const token = getUserToken();

      if (!token) {
        router.push('/login');
        return;
      }

      const response = await findUserType(token);

      setUserType(response);
    } catch (error) {
      console.error(error);
      router.push('/login');
    }
  };

  useEffect(() => {
    fetchPlanTypeData();
    fetchUserTypeData();
  }, []);

  useEffect(() => {
    fetchUsersData();
  }, [userTypeId, searchName]);

  return (
    <>
      <Box
        bgImage={'/dashboard.jpg'}
        bgSize={'cover'}
        bgRepeat={'no-repeat'}
        bgPosition={'center'}
      >
        <Box ml={{ base: 0, md: 60 }} bgColor={'blackAlpha.400'} minH={'100vh'}>
          <Container maxW='full' p={{ base: 5, md: 10 }}>
            <Heading as='h3' size='lg' mb='4' fontWeight='medium' textAlign='left'>
              Usuários
            </Heading>
            <Box mb={{ base: '2.5rem', lg: '4rem' }}>
              <Stack direction={['column', 'row']} spacing={6} w={'full'}>
                <FormControl width={'100%'} mb={{ base: '4', lg: '0' }}>
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
                    borderColor={'purple.400'}
                    variant={'outline'}
                    value={userTypeId}
                    onChange={(event) => setUserTypeId(event.target.value)}
                    placeholder='Tipo de usuário:'
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
                    placeholder='Nome do usuário'
                    value={searchName}
                    onChange={(event) => setSearchName(event.target.value)}
                  />
                </FormControl>
              </Stack>
              <Stack direction={['column', 'row']}>
                <UsersList
                  fetchUsersData={fetchUsersData}
                  users={users}
                  planTypes={planTypes}
                />
              </Stack>
            </Box>
          </Container>
        </Box>
      </Box>
    </>
  );
}
