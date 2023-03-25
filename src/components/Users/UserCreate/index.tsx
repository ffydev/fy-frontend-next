import React, { useState } from 'react';
import {
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalCloseButton,
  ModalContent,
  FormLabel,
  ModalBody,
  FormControl,
  Input,
  Stack,
  ModalFooter,
  Select,
  Flex,
} from '@chakra-ui/react';
import { useRouter } from 'next/router'
import { IUserTypeInterface } from '@/pages/api/providers/user-type.provider';
import { IPlanTypeInterface } from '@/pages/api/providers/plan-type.provider';
import { createUser } from '@/pages/api/providers/user.provider';

interface CreateUserProps {
  fetchUsersData: () => void;
  userTypes: IUserTypeInterface[];
  planTypes: IPlanTypeInterface[];
}

export default function UserCreate({ fetchUsersData, userTypes, planTypes }: CreateUserProps) {
  const navigate = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [ email, setEmail ] = useState<string>('');
  const [ password, setPassword ] = useState<string>('');
  const [ userTypeId, setUserTypeId ] = useState<string>('');
  const [ initDate, setInitDate ] = useState<string>('');
  const [ endDate, setEndDate ] = useState<string>('');
  const [ planTypeId, setPlanTypeId ] = useState<string>('');

  const handleWithGenPassword = () => {
    setPassword('123');
  };

  const initialRef = React.useRef<HTMLInputElement>(null);

  const handleCreateUser = async () => {
    try {
      const token = localStorage.getItem('fyToken');

      if (!token) {
        navigate.push('/login');
        return;
      }

      await createUser(token, {
        email, 
        password,
        userTypeId,
        plan: {
          create: [
            {
              initDate: initDate,
              endDate: endDate,
              planTypeId: planTypeId,
            },
          ],
        },
      }).then(() => {
        fetchUsersData();
      });
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Stack spacing={2} direction={['column', 'row']} mt={4} pb={4}>
        <Button   
          bgGradient={[
            'linear(to-tr, blue.900 20.17%, purple.900 90.87%)',
            'linear(to-br, blue.900 20.17%, purple.900 90.87%)'
          ]} 
          onClick={onOpen}
            >
          {/* <AddIcon mr={2} /> */}
          Cadastrar usuário
        </Button>
      </Stack>

      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>     
          <ModalCloseButton />
          <ModalBody pb={6}>      

            <FormControl mt={4} isRequired>
              <FormLabel>Email: </FormLabel>
              <Input
                placeholder='Email'
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </FormControl>

            <FormControl mt={4} isRequired>
              <FormLabel>Tipo de Plano:</FormLabel>
              <Select
                value={planTypeId}
                onChange={(event) => setPlanTypeId(event.target.value)}
              >
                <option value=''>Escolha seu plano</option>
                {planTypes.map((planType: IPlanTypeInterface) => (
                  <option key={planType.id} value={planType.id}>
                    {planType.name}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl mt={4} isRequired>
              <FormLabel>Data de Início: </FormLabel>
              <Input
                type='date'
                placeholder='Data de Início'
                value={initDate}
                onChange={(event) => setInitDate(event.target.value)}
              />
            </FormControl>

            <FormControl mt={4} isRequired>
              <FormLabel>Data Final: </FormLabel>
              <Input
                type='date'
                placeholder='Data Final '
                value={endDate}
                onChange={(event) => setEndDate(event.target.value)}
              />
            </FormControl>

            <FormControl mt={4} isRequired>
              <FormLabel>Tipo de usuário:</FormLabel>
              <Flex>
                <Select
                  value={userTypeId}
                  onChange={(event) => setUserTypeId(event.target.value)}
                >
                  <option value=''></option>
                  {userTypes.map((userType: IUserTypeInterface) => (
                    <option key={userType.id} value={userType.id}>
                      {userType.name}
                    </option>
                  ))}
                </Select>
              </Flex>
            </FormControl>

            <FormControl mt={4} isRequired>
              <FormLabel>Senha</FormLabel>
              <Button mb={2} onClick={handleWithGenPassword}>
                Gerar Senha
              </Button>
              <Input
                placeholder={'Opcional'}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={handleCreateUser}>
              Criar
            </Button>
            <Button onClick={onClose}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
