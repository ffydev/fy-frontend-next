import HandleButton from '@/components/Buttons/HandleButton'
import { ContextDashboardAdmin } from '@/hooks/ContextDashboardAdmin'
import { getUserToken } from '@/pages/api/providers/auth.provider'
import { answerFeedback } from '@/pages/api/providers/doctor.feedbacks'
import {
  findUserFeedbacks,
  IUserFeedback,
} from '@/pages/api/providers/user-feedbacks.provider'
import { Box, chakra, Flex, FormControl, Textarea } from '@chakra-ui/react'
import { Plus } from '@phosphor-icons/react'
import { useRouter } from 'next/router'
import { useCallback, useContext, useEffect, useState } from 'react'

export default function Feedbacks() {
  const router = useRouter()
  const { userId } = useContext(ContextDashboardAdmin)
  const [feedbacks, setFeedbacks] = useState<IUserFeedback[]>()
  const [answer, setAnswer] = useState<string>('')

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

  const handleWithAswerFeedback = async () => {
    try {
      const token = getUserToken()

      if (!token) {
        // Implementar mensagem personalizada
        router.push('/login')
        return
      }

      await answerFeedback(token, {
        userId,
        answer,
      })
    } catch (error) {
      console.error(error)
    } finally {
      fetchFeedbacksData()
      setAnswer('')
    }
  }

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

          <FormControl mt={4}>
            <Textarea
              placeholder="Responda aqui"
              onChange={(event) => setAnswer(event.target.value)}
            />
            <Flex justifyContent={'center'} w={'full'} mt={3}>
              <HandleButton
                text={'Responder'}
                leftIcon={<Plus size={28} weight="bold" />}
                onClick={handleWithAswerFeedback}
              />
            </Flex>
          </FormControl>
        </Box>
      ))}
    </>
  )
}
