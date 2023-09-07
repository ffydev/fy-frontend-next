import { getUserToken } from '@/pages/api/providers/auth.provider'

import { useToast, SimpleGrid, Box } from '@chakra-ui/react'

import { useRouter } from 'next/router'

import { useEffect } from 'react'
import ChartLine from '../Graphics/Line'
import ChartBar from '../Graphics/Bars'
import ChartArea from '../Graphics/Area'
import ChartPie from '../Graphics/Pie'

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
  }, [toast])

  return (
    <div style={{ overflowX: 'auto' }}>
      <SimpleGrid columns={[1, 2]} spacing={10} px={4} py={8}>
        <ChartLine />
        <ChartLine />
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
