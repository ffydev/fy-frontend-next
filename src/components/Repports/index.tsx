import { getUserToken } from '@/pages/api/providers/auth.provider'

import { useToast, SimpleGrid, Stack, Select, Flex } from '@chakra-ui/react'

import { useRouter } from 'next/router'

import { useEffect } from 'react'
import { ChartLine, ChartArea, ChartBar, ChartPie } from '../Graphics'

export default function Graphics() {
  const router = useRouter()
  const toast = useToast()

  useEffect(() => {
    const fetchMuscleGroups = async () => {
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
      } catch (error) {
        console.error(error)
        toast({
          title: 'Erro ao buscar grupos musculares.',
          description: 'Por favor, tente novamente.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
      }
    }
    fetchMuscleGroups()
  }, [router, toast])

  return (
    <div style={{ overflowX: 'auto' }}>
      <Flex flexDirection="row" marginStart={8}>
        <Stack spacing={2} mr={4}>
          <Select placeholder="Selecione o Período">
            <option value="7">7</option>
            <option value="15">15</option>
            <option value="30">30</option>
          </Select>
        </Stack>
        <Stack spacing={2} mr={4}>
          <Select placeholder="Selecione o grupo">
            <option value="7">Peito</option>
            <option value="15">Braços</option>
            <option value="30">Resto</option>
          </Select>
        </Stack>
        <Stack spacing={2}>
          <Select placeholder="Selecione o excercicio">
            <option value="7">Peito</option>
            <option value="15">Braços</option>
            <option value="30">Resto</option>
          </Select>
        </Stack>
      </Flex>
      <SimpleGrid columns={[1, 2]} spacing={10} px={4} py={8}>
        <ChartLine />
        <ChartLine />
        <ChartLine />
        <ChartBar />
        <ChartPie />
        <ChartArea />
      </SimpleGrid>
    </div>
  )
}
