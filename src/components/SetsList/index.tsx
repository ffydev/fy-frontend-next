import { getUserToken } from '@/pages/api/providers/auth.provider'
import { ISet, deleteSet, updateSet } from '@/pages/api/providers/sets.provider'
import { useOwnerIsFetchingStore } from '@/stores/OwnerStore/IsFetching'
import {
  Box,
  Input,
  CloseButton,
  useToast,
  Select,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Flex,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useState } from 'react'

interface SetsListProps {
  sets?: ISet[]
}

export default function SetsList({ sets }: SetsListProps) {
  const toast = useToast()
  const router = useRouter()
  const { setIsFetchingWorkouts } = useOwnerIsFetchingStore()
  const [reps, setReps] = useState<string | undefined>('')
  const [weight, setWeight] = useState<string | undefined>('')
  const [rir, setRir] = useState<string | undefined>('')
  const [setType, setSetType] = useState<string | undefined>('')

  const handleWithDeleteSet = async (id: string) => {
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

      await deleteSet(token, id)
      setIsFetchingWorkouts()
    } catch (error) {
      console.log(error)

      toast({
        title: 'Erro ao deletar série.',
        description: 'Não foi possível deletar a série.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  const handleWithUpdateSet = async (id: string) => {
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

      await updateSet(token, id, {
        reps: reps || undefined,
        weight: weight || undefined,
        setType: setType || undefined,
        rir: rir || undefined,
      })

      setIsFetchingWorkouts()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      {sets?.map((set: ISet) => [
        <Box key={set.id}>
          <Flex>
            <TableContainer>
              <Table variant="simple" size={'sm'}>
                <Thead>
                  <Tr>
                    <Th>Repetições</Th>
                    <Th>Carga</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>
                      <Input
                        size={'sm'}
                        defaultValue={set.reps}
                        textColor={'whiteAlpha.800'}
                        border={'1px'}
                        borderColor={'whiteAlpha.300'}
                        rounded={'lg'}
                        fontWeight={'medium'}
                        fontSize="sm"
                        onChange={(event) => setReps(event.target.value)}
                        onBlur={() => handleWithUpdateSet(set.id!)}
                      />
                    </Td>
                    <Td>
                      <Input
                        size={'sm'}
                        defaultValue={set.weight}
                        textColor={'whiteAlpha.800'}
                        border={'1px'}
                        borderColor={'whiteAlpha.300'}
                        rounded={'lg'}
                        fontWeight={'medium'}
                        fontSize="sm"
                        onChange={(event) => setWeight(event.target.value)}
                        onBlur={() => handleWithUpdateSet(set.id!)}
                      />
                    </Td>
                  </Tr>
                </Tbody>
                <Thead>
                  <Tr>
                    <Th>Tipo</Th>
                    <Th>Reserva</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>
                      <Select
                        size={'sm'}
                        bgGradient={'transparent'}
                        border={'1px'}
                        borderColor={'whiteAlpha.300'}
                        rounded={'lg'}
                        onChange={(event) => setSetType(event.target.value)}
                        onBlur={() => handleWithUpdateSet(set.id!)}
                        defaultValue={set.setType}
                      >
                        <option
                          style={{ backgroundColor: '#322659' }}
                          value=""
                          disabled
                        >
                          {set.setType}
                        </option>
                        <option
                          style={{ backgroundColor: '#322659' }}
                          value="REGULAR"
                        >
                          Regular
                        </option>
                        <option
                          style={{ backgroundColor: '#322659' }}
                          value="DROP_SET"
                        >
                          Drop_Set
                        </option>
                        <option
                          style={{ backgroundColor: '#322659' }}
                          value="BI_SET"
                        >
                          Bi_Set
                        </option>
                      </Select>
                    </Td>
                    <Td>
                      <Input
                        size={'sm'}
                        defaultValue={set.rir}
                        textColor={'whiteAlpha.800'}
                        border={'1px'}
                        borderColor={'whiteAlpha.300'}
                        rounded={'lg'}
                        fontWeight={'medium'}
                        fontSize="sm"
                        onChange={(event) => setRir(event.target.value)}
                        onBlur={() => handleWithUpdateSet(set.id!)}
                      />
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
            <CloseButton
              border={'1px'}
              borderColor={'whiteAlpha.300'}
              onClick={() => handleWithDeleteSet(set.id!)}
              size="sm"
            />
          </Flex>
        </Box>,
      ])}
    </>
  )
}
