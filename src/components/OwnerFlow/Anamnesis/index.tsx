import { useEffect, useState } from 'react'
import { Box, Text, useToast } from '@chakra-ui/react'
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
          backdropBlur={'1rem'}
          backdropFilter="blur(5px)"
        >
          <Text m={3}>
            Data: {new Date(anamnesis.createdAt!).toLocaleDateString('pt-BR')}
          </Text>
          <Text m={3}>Idade: {anamnesis.age}</Text>
          <Text m={3}>Gênero: {anamnesis.gender}</Text>
          <Text m={3}>Altura: {anamnesis.height}</Text>
          <Text m={3}>Peso: {anamnesis.weight}</Text>
          <Text m={3}>Plano alimentar em casa: {anamnesis.mealPlanAtHome}</Text>
          <Text m={3}>
            Preferências alimentares: {anamnesis.foodPreferences}
          </Text>
          <Text m={3}>
            Alimentação nas últimas 24 horas: {anamnesis.lastDayFoodIntake}
          </Text>
          <Text m={3}>Atividades físicas: {anamnesis.physicalActivities}</Text>
          <Text m={3}>
            Dor ou desconforto nas articulações: {anamnesis.jointPainDiscomfort}
          </Text>
          <Text m={3}>Comorbidades: {anamnesis.comorbidities}</Text>
          <Text m={3}>
            Orçamento para suplementação alimentar:{' '}
            {anamnesis.budgetForDietSupplementation}
          </Text>
          <Text m={3}>
            Suplementos/Fármacos utilizados:{' '}
            {anamnesis.supplementsPharmaceuticalsUsed}
          </Text>

          <ViewPictures pictures={pictures} />
        </Box>
      ))}
    </>
  )
}
