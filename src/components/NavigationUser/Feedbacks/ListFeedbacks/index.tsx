import { useAuthStore } from '@/hooks/AuthStore'
import { getUserToken } from '@/pages/api/providers/auth.provider'
import {
  IUserFeedback,
  findUserFeedbacks,
} from '@/pages/api/providers/user-feedbacks.provider'
import { Box, chakra } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function ListFeedbacks() {
  const { user } = useAuthStore()
  const router = useRouter()
  const [feedbacks, setFeedbacks] = useState<IUserFeedback[]>()

  useEffect(() => {
    const fetchFeedbacksData = async () => {
      try {
        const token = getUserToken()

        if (!token) {
          // Implementar mensagem personalizada
          router.push('/login')
          return
        }

        const response = await findUserFeedbacks(token, user?.id!)

        setFeedbacks(response)
      } catch (error) {
        console.error(error)
      }
    }
    fetchFeedbacksData()
  }, [router, user?.id])

  return (
    <>
      {feedbacks?.map((feedback: IUserFeedback) => (
        <Box
          key={feedback.id}
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
            Data: {new Date(feedback.createdAt!).toLocaleDateString('pt-BR')}
          </chakra.h1>

          <chakra.h1 fontSize="lg" lineHeight={6} mb={3}>
            Dieta: {feedback.diet}
          </chakra.h1>

          <chakra.h1 fontSize="lg" lineHeight={6} mb={3}>
            Treinos: {feedback.workouts}
          </chakra.h1>

          <chakra.h1 fontSize="lg" lineHeight={6} mb={3}>
            Fadiga: {feedback.fatigue}
          </chakra.h1>

          <chakra.h1 fontSize="lg" lineHeight={6} mb={3}>
            Peso: {feedback.weight}
          </chakra.h1>

          <chakra.h1 fontSize="lg" lineHeight={6} mb={3}>
            Outros: {feedback.others}
          </chakra.h1>

          {feedback.isAnswered ? (
            <>
              <chakra.h1 fontSize="lg" lineHeight={6} mb={3}>
                Feedback: {feedback.answer}
              </chakra.h1>
            </>
          ) : (
            <>
              <chakra.h1 fontSize="lg" lineHeight={6} mb={3}>
                Status: Não respondido
              </chakra.h1>
            </>
          )}
        </Box>
      ))}
    </>
  )
}
