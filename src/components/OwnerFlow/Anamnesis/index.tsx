import { useEffect, useState } from 'react'
import {
  Box,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import {
  IAnamnesis,
  findUserAnamnesis,
} from '@/pages/api/providers/anamnesis.provider'
import { getUserToken } from '@/pages/api/providers/auth.provider'
import { useOwnerIsFetchingStore } from '@/stores/OwnerStore/IsFetching'
import { ViewPictures } from './viewPictures'

export default function ListAnamnesis() {
  const router = useRouter()
  const [anamnesis, setAnamnesis] = useState<IAnamnesis[]>()
  const [pictures, setPictures] = useState<any>()
  const { selectedUserId } = useOwnerIsFetchingStore()
  const toast = useToast()

  useEffect(() => {
    const fetchAnamnesisData = async () => {
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

        const response = await findUserAnamnesis(token, selectedUserId)
        setAnamnesis(response.anamnesis)
        setPictures(response.pictures)
      } catch (error) {
        console.error(error)
      }
    }
    fetchAnamnesisData()
  }, [selectedUserId, router, toast])

  return (
    <>
      {anamnesis?.map((anamnesis: IAnamnesis) => (
        <Box
          key={anamnesis.id}
          p={6}
          rounded={'lg'}
          border={'1px'}
          bgColor={'whiteAlpha.50'}
          borderColor={'whiteAlpha.100'}
          boxShadow={'lg'}
          backdropBlur={'1rem'}
          backdropFilter="blur(5px)"
          maxWidth={'lg'}
        >
          <Box overflowY="auto" maxHeight="300px">
            <TableContainer
              display={'block'}
              overflowY={'hidden'}
              overflowX={'auto'}
              whiteSpace={'nowrap'}
            >
              <Table>
                <Thead>
                  <Tr>
                    <Th>Data:</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>
                      {new Date(anamnesis.createdAt!).toLocaleDateString(
                        'pt-BR',
                      )}
                    </Td>
                  </Tr>
                </Tbody>
                <Thead>
                  <Tr>
                    <Th>Idade:</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>{anamnesis.age}</Td>
                  </Tr>
                </Tbody>
                <Thead>
                  <Tr>
                    <Th>Gênero:</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>{anamnesis.gender}</Td>
                  </Tr>
                </Tbody>
                <Thead>
                  <Tr>
                    <Th>Altura:</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>{anamnesis.height}</Td>
                  </Tr>
                </Tbody>
                <Thead>
                  <Tr>
                    <Th>Peso:</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>{anamnesis.weight}</Td>
                  </Tr>
                </Tbody>
                <Thead>
                  <Tr>
                    <Th>Plano alimentar em casa:</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>{anamnesis.mealPlanAtHome}</Td>
                  </Tr>
                </Tbody>
                <Thead>
                  <Tr>
                    <Th>Preferências alimentares:</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td> {anamnesis.foodPreferences}</Td>
                  </Tr>
                </Tbody>
                <Thead>
                  <Tr>
                    <Th>Alimentação nas últimas 24 horas:</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>{anamnesis.lastDayFoodIntake}</Td>
                  </Tr>
                </Tbody>
                <Thead>
                  <Tr>
                    <Th>Atividades físicas:</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>{anamnesis.physicalActivities}</Td>
                  </Tr>
                </Tbody>
                <Thead>
                  <Tr>
                    <Th>Dor ou desconforto nas articulações:</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>{anamnesis.jointPainDiscomfort}</Td>
                  </Tr>
                </Tbody>
                <Thead>
                  <Tr>
                    <Th>Comorbidades:</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>{anamnesis.comorbidities}</Td>
                  </Tr>
                </Tbody>
                <Thead>
                  <Tr>
                    <Th>Orçamento para suplementação alimentar:</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>{anamnesis.budgetForDietSupplementation}</Td>
                  </Tr>
                </Tbody>
                <Thead>
                  <Tr>
                    <Th>Suplementos/Fármacos utilizados:</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>{anamnesis.supplementsPharmaceuticalsUsed}</Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
          <ViewPictures pictures={pictures} />
        </Box>
      ))}
    </>
  )
}
