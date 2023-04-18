import { useAuth } from '@/hooks/ContextAuth'
import { getUserToken } from '@/pages/api/providers/auth.provider'
import {
  IUserFeedback,
  findUserFeedbacks,
} from '@/pages/api/providers/user-feedbacks.provider'
import { Box, chakra } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'

export default function ListFeedbacks() {
  const { user } = useAuth()
  const router = useRouter()
  const [feedbacks, setFeedbacks] = useState<IUserFeedback[]>()

  const fetchFeedbacksData = useCallback(async () => {
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
  }, [router, user?.id])

  useEffect(() => {
    fetchFeedbacksData()
  }, [fetchFeedbacksData])

  return (
    <>
      {feedbacks?.map((feedback: IUserFeedback) => (
        <Box
          key={feedback.id}
          p={4}
          backdropBlur={'1rem'}
          backdropFilter="blur(5px)"
          rounded={'lg'}
          border={'1px'}
          bgColor={'whiteAlpha.50'}
          borderColor={'whiteAlpha.100'}
          boxShadow={'lg'}
          m={4}
        >
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
                Status: Respondido
              </chakra.h1>
            </>
          ) : null}
        </Box>
      ))}
    </>
  )
}
