import React, { useState } from 'react';
import {
  Box,
  Flex,
  Button,
  SimpleGrid,
  Stack,
  Editable,
  EditablePreview,
  EditableInput,
  CloseButton,
  Spacer,
  useColorModeValue,
  Grid,
  Wrap,
  WrapItem,
  Center,
  Container,
  Text,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import PlanList from '../../PlanList';
import { IPlanTypeInterface } from '@/pages/api/providers/plan-type.provider';
import {
  deleteUser,
  IUserInterface,
  updateUser,
} from '@/pages/api/providers/user.provider';
import Workouts from '@/components/Workouts';

interface ClientListProps {
  fetchUsersData: () => void;
  users: IUserInterface[];
  planTypes: IPlanTypeInterface[];
}

export default function UsersList({
  fetchUsersData,
  users,
  planTypes,
}: ClientListProps) {
  const router = useRouter();
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [workoutsComponents, setWorkoutsComponents] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>('');

  const handleUpdateUser = async (userId: string) => {
    try {
      const token = localStorage.getItem('fyToken');

      if (!token) {
        router.push('/login');
        return;
      }

      await updateUser(token, userId, {
        firstName,
        lastName,
      }).then(() => {
        fetchUsersData();
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleWithDelete = (id: string) => {
    const token = localStorage.getItem('fyToken');

    if (!token) {
      router.push('/login');
      return;
    }
    deleteUser(token, id).then(() => {
      fetchUsersData();
    });
  };

  const handleWithFindWorkoutsByUser = (userId: string) => {
    setUserId(userId);
    setWorkoutsComponents(true);
  };

  const handleWithShowUsers = () => {
    setWorkoutsComponents(false);
  };

  return (
    <>
      {workoutsComponents ? (
        <>
          <Stack>
            <Button
              size={'md'}
              variant={'solid'}
              bgColor={'whiteAlpha.900'}
              color={'blackAlpha.900'}
              _hover={{
                bgColor: 'whiteAlpha.700',
                transition: '0.5s',
              }}
              mt={10}
              mb={3}
              onClick={handleWithShowUsers}
            >
              Voltar
            </Button>
            <Box>
              <Workouts userId={userId} />
            </Box>
          </Stack>
        </>
      ) : (
        <>
          <Container maxW='full'>
            <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={5} mt={12} mb={4}>
              {users.map((user: IUserInterface) => (
                <Box
                  key={user.id}
                  p={4}
                  bgColor={'whiteAlpha.200'}
                  rounded={'lg'}
                  border={'1px'}
                  borderColor={'whiteAlpha.200'}
                  backdropBlur={'1rem'}
                  backdropFilter='blur(15px)'
                  boxShadow={'lg'}
                >
                  <Flex minWidth='max-content'>
                  <Spacer /><CloseButton onClick={() => handleWithDelete(user.id)} size='sm' />
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
          </Container>
        </>
      )}
    </>
  );
}
