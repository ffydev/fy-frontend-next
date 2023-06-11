import { useEffect, useState } from 'react'
import { Box, chakra, useToast } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import {
  IAnamnesis,
  findUserAnamnesis,
} from '@/pages/api/providers/anamnesis.provider'
import { getUserToken } from '@/pages/api/providers/auth.provider'
import { useOwnerIsFetchingStore } from '@/stores/OwnerStore/IsFetching'

export default function ListAnamnesis() {
  const router = useRouter()
  const [anamnesis, setAnamnesis] = useState<IAnamnesis[]>()
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
          p={4}
          rounded={'lg'}
          border={'1px'}
          bgColor={'whiteAlpha.50'}
          borderColor={'whiteAlpha.100'}
          boxShadow={'lg'}
          backdropBlur={'1rem'}
          backdropFilter="blur(5px)"
          minWidth="250px"
        >
          <chakra.h1 fontSize="lg" lineHeight={6} mb={3}>
            Data: {new Date(anamnesis.createdAt!).toLocaleDateString('pt-BR')}
          </chakra.h1>

          <chakra.h1 fontSize="lg" lineHeight={6} mb={3}>
            Idade: {anamnesis.age}
          </chakra.h1>

          <chakra.h1 fontSize="lg" lineHeight={6} mb={3}>
            Gênero: {anamnesis.gender}
          </chakra.h1>

          <chakra.h1 fontSize="lg" lineHeight={6} mb={3}>
            Altura: {anamnesis.height}
          </chakra.h1>

          <chakra.h1 fontSize="lg" lineHeight={6} mb={3}>
            Peso: {anamnesis.weight}
          </chakra.h1>

          <chakra.h1 fontSize="lg" lineHeight={6} mb={3}>
            Plano alimentar em casa : {anamnesis.mealPlanAtHome}
          </chakra.h1>

          <chakra.h1 fontSize="lg" lineHeight={6} mb={3}>
            Preferências alimentares : {anamnesis.foodPreferences}
          </chakra.h1>

          <chakra.h1 fontSize="lg" lineHeight={6} mb={3}>
            Alimentação nas últimas 24 horas : {anamnesis.lastDayFoodIntake}
          </chakra.h1>

          <chakra.h1 fontSize="lg" lineHeight={6} mb={3}>
            Atividades físicas : {anamnesis.physicalActivities}
          </chakra.h1>

          <chakra.h1 fontSize="lg" lineHeight={6} mb={3}>
            Dor ou desconforto nas articulações :{' '}
            {anamnesis.jointPainDiscomfort}
          </chakra.h1>

          <chakra.h1 fontSize="lg" lineHeight={6} mb={3}>
            Comorbidades : {anamnesis.comorbidities}
          </chakra.h1>

          <chakra.h1 fontSize="lg" lineHeight={6} mb={3}>
            Orçamento para suplementação alimentar :{' '}
            {anamnesis.budgetForDietSupplementation}
          </chakra.h1>

          <chakra.h1 fontSize="lg" lineHeight={6} mb={3}>
            Suplementos/Fármacos utilizados :{' '}
            {anamnesis.supplementsPharmaceuticalsUsed}
          </chakra.h1>
        </Box>
      ))}
    </>
  )
}
