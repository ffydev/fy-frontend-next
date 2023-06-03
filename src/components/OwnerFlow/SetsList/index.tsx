import { getUserToken } from '@/pages/api/providers/auth.provider'
import { ISet, deleteSet, updateSet } from '@/pages/api/providers/sets.provider'
import { useOwnerIsFetchingStore } from '@/stores/OwnerStore/IsFetching'
import {
  Box,
  Input,
  useToast,
  Select,
  Table,
  Tr,
  Tbody,
  Td,
  Center,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { CloseButtonComponent } from '../../Buttons/Closed'

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
          <Table variant="unstyled" size={'sm'}>
            <Tbody>
              <Tr>
                <Td textAlign={'center'} p={0} maxW={'2rem'} minW={'2rem'}>
                  <Input
                    p={0}
                    m={0}
                    border={'none'}
                    w={'20'}
                    textAlign={'center'}
                    defaultValue={set.reps}
                    onChange={(event) => setReps(event.target.value)}
                    onBlur={() => handleWithUpdateSet(set.id!)}
                  />
                </Td>
                <Td textAlign={'center'} p={0} maxW={'2rem'} minW={'2rem'}>
                  <Input
                    p={0}
                    m={0}
                    border={'none'}
                    w={'20'}
                    textAlign={'center'}
                    defaultValue={set.weight}
                    onChange={(event) => setWeight(event.target.value)}
                    onBlur={() => handleWithUpdateSet(set.id!)}
                  />
                </Td>

                <Td textAlign={'center'} p={0} maxW={'2rem'} minW={'2rem'}>
                  <Center>
                    <Select
                      p={0}
                      m={0}
                      border={'none'}
                      textAlign={'center'}
                      defaultValue={set.setType}
                      onChange={(event) => setSetType(event.target.value)}
                      onBlur={() => handleWithUpdateSet(set.id!)}
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
                        REGULAR
                      </option>
                      <option
                        style={{ backgroundColor: '#322659' }}
                        value="DROP_SET"
                      >
                        DROP_SET
                      </option>
                      <option
                        style={{ backgroundColor: '#322659' }}
                        value="BI_SET"
                      >
                        BI_SET
                      </option>
                    </Select>
                  </Center>
                </Td>

                <Td textAlign={'center'} p={0} maxW={'2rem'} minW={'2rem'}>
                  <Input
                    p={0}
                    m={0}
                    border={'none'}
                    w={'20'}
                    textAlign={'center'}
                    defaultValue={set.rir}
                    onChange={(event) => setRir(event.target.value)}
                    onBlur={() => handleWithUpdateSet(set.id!)}
                  />
                </Td>

                <Td
                  borderRadius={3}
                  textAlign={'center'}
                  p={0}
                  maxW={'1rem'}
                  minW={'1rem'}
                >
                  <CloseButtonComponent
                    onClick={() => handleWithDeleteSet(set.id!)}
                  />
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </Box>,
      ])}
    </>
  )
}
