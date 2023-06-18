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
        setPictures(response.anamnmesisPictures)
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
          minWidth="250px"
        >
          <TableContainer
            display={'block'}
            maxWidth={'100%'}
            overflowX={'auto'}
            overflowY={'hidden'}
            whiteSpace={'nowrap'}
          >
            <Table size={'sm'} variant={'simple'}>
              <Thead>
                <Tr>
                  <Th>Data:</Th>
                  <Th>Idade:</Th>
                  <Th>Gênero:</Th>
                  <Th>Altura:</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>
                    {new Date(anamnesis.createdAt!).toLocaleDateString('pt-BR')}
                  </Td>
                  <Td>{anamnesis.age}</Td>
                  <Td>{anamnesis.gender}</Td>
                  <Td>{anamnesis.height}</Td>
                </Tr>
              </Tbody>
              <Thead>
                <Tr>
                  <Th>Peso:</Th>
                  <Th>Plano alimentar em casa:</Th>
                  <Th>Preferências alimentares:</Th>
                  <Th>Alimentação nas últimas 24 horas:</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>{anamnesis.weight}</Td>
                  <Td>{anamnesis.mealPlanAtHome}</Td>
                  <Td> {anamnesis.foodPreferences}</Td>
                  <Td>{anamnesis.lastDayFoodIntake}</Td>
                </Tr>
              </Tbody>
              <Thead>
                <Tr>
                  <Th>Atividades físicas:</Th>
                  <Th>Dor ou desconforto nas articulações:</Th>
                  <Th>Comorbidades:</Th>
                  <Th>Orçamento para suplementação alimentar:</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>{anamnesis.physicalActivities}</Td>
                  <Td>{anamnesis.jointPainDiscomfort}</Td>
                  <Td>{anamnesis.comorbidities}</Td>
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
          <ViewPictures pictures={pictures} />
        </Box>
      ))}
    </>
  )
}
