import { Context } from '@/hooks/Context'
import { getUserToken } from '@/pages/api/providers/auth.provider'
import {
  findUserFeedbacks,
  IUserFeedback,
} from '@/pages/api/providers/userFeedbacks.provider'
import { Box, chakra, CloseButton, Flex, Spacer } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useCallback, useContext, useEffect, useState } from 'react'

export default function Feedbacks() {
  const router = useRouter()
  const { userId } = useContext(Context)
  const [feedbacks, setFeedbacks] = useState<IUserFeedback[]>()

  const fetchFeedbacksData = useCallback(async () => {
    try {
      const token = getUserToken()

      if (!token) {
        // Implementar mensagem personalizada
        router.push('/login')
        return
      }

      const response = await findUserFeedbacks(token, userId)

      setFeedbacks(response)
    } catch (error) {
      console.error(error)
    }
  }, [router, userId])

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
        >
          <Flex minWidth="max-content">
            <Spacer /> <CloseButton size="sm" />
          </Flex>

          <chakra.h1 fontSize="lg" lineHeight={6}>
            Dieta: {feedback.diet}
          </chakra.h1>

          <chakra.h1 fontSize="lg" lineHeight={6}>
            Treinos: {feedback.workouts}
          </chakra.h1>

          <chakra.h1 fontSize="lg" lineHeight={6}>
            Fadiga: {feedback.fatigue}
          </chakra.h1>

          <chakra.h1 fontSize="lg" lineHeight={6}>
            Pesos: {feedback.weight}
          </chakra.h1>

          <chakra.h1 fontSize="lg" lineHeight={6}>
            Outros: {feedback.others}
          </chakra.h1>
        </Box>
      ))}
    </>
  )
}
