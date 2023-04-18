import { useCallback, useEffect, useState } from 'react'
import { Box, chakra } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import {
  IAnamnesis,
  findUserAnamnesis,
} from '@/pages/api/providers/anamnesis.provider'
import { getUserToken } from '@/pages/api/providers/auth.provider'
import { useAdminProvider } from '@/hooks/ContextDashboardAdmin'

export default function ListAnamnesis() {
  const router = useRouter()
  const [anamnesis, setAnamnesis] = useState<IAnamnesis[]>()
  const { userId } = useAdminProvider()

  const fetchAnamnesisData = useCallback(async () => {
    try {
      const token = getUserToken()

      if (!token) {
        // Implementar mensagem personalizada
        router.push('/login')
        return
      }

      const response = await findUserAnamnesis(token, userId)

      setAnamnesis(response)
    } catch (error) {
      console.error(error)
    }
  }, [router, userId])

  useEffect(() => {
    fetchAnamnesisData()
  }, [fetchAnamnesisData])

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
