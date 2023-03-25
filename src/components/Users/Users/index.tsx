import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import {
  Box,
  Heading,
  FormControl,
  Select,
  Stack,
  Input,
} from '@chakra-ui/react';
import UsersList from '../UsersList';
import UserCreate from '../UserCreate';
import { findUsers, IUserInterface } from '@/pages/api/providers/user.provider';
import { findUserType, IUserTypeInterface } from '@/pages/api/providers/user-type.provider';
import { findPlanTypes, IPlanTypeInterface } from '@/pages/api/providers/plan-type.provider';

export default function Users() {
  const navigate = useRouter();  
  const [users, setUsers] = useState<IUserInterface[]>([]);
  const [userType, setUserType] = useState<IUserTypeInterface[]>([]);
  const [userTypeId, setUserTypeId] = useState<string>('');
  const [searchName, setSearchName] = useState<string>('');
  const [planTypes, setPlanTypes] = useState<IPlanTypeInterface[]>([]);

  const fetchUsersData = async () => {
    try {
      const token = localStorage.getItem('fyToken');

      if (!token) {
        navigate.push('/login');
        return;
      }

      const usersData = await findUsers(token, {
        userTypeId,
        searchName,
      });
      setUsers(usersData);
    } catch (error) {
      console.error(error);
      navigate.push('/login');
    }
  };

  const fetchPlanTypeData = async () => {
    try {
      const token = localStorage.getItem('fyToken');

      if (!token) {
        navigate.push('/login');
        return;
      }

      const response = await findPlanTypes(token);

      setPlanTypes(response);
    } catch (error) {
      console.error(error);
      navigate.push('/login');
    }
  };

  const fetchUserTypeData = async () => {
    try {
      const token = localStorage.getItem('fyToken');

      if (!token) {
        navigate.push('/login');
        return;
      }

      const response = await findUserType(token);

      setUserType(response);
    } catch (error) {
      console.error(error);
      navigate.push('/login');
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
      <Box ml={{ base: 0, md: 60 }}>
        <Box borderBottom={'1px'} borderColor={'whiteAlpha.200'} p={4}>
          <Heading>Usuários</Heading>
        </Box>
        <Stack spacing={2} direction={['column', 'row']}>
          <Box p={4}>
            <UserCreate
              fetchUsersData={fetchUsersData}
              userTypes={userType}
              planTypes={planTypes}
            />
          </Box>
          <Box p={4}>
            <FormControl mt={4} isRequired>
              <Select
                size={'md'}
                border={'1px solid'}
                borderColor={'whiteAlpha.700'}
                w={'3xs'}
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
          </Box>
          <Box p={4}>
            <Input
              borderColor={'whiteAlpha.700'}
              mt={4}
              placeholder='Nome do usuário'
              value={searchName}
              onChange={(event) => setSearchName(event.target.value)}
            />
          </Box>
        </Stack>
        <Box p={4}>
          <UsersList
            fetchUsersData={fetchUsersData}
            users={users}         
            planTypes={planTypes}
          />
        </Box>   
    </Box>
    </>  
  );
}

