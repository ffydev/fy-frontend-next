import { ContextDashboardAdmin } from '@/hooks/ContextDashboardAdmin'
import { getUserToken } from '@/pages/api/providers/auth.provider'
import { answerFeedback } from '@/pages/api/providers/doctor.feedbacks'
import {
  findUserFeedbacks,
  IUserFeedback,
} from '@/pages/api/providers/user-feedbacks.provider'
import {
  Box,
  chakra,
  CloseButton,
  Flex,
  FormControl,
  Spacer,
  Textarea,
} from '@chakra-ui/react'
import { PaperPlaneTilt } from '@phosphor-icons/react'
import { useRouter } from 'next/router'
import { useCallback, useContext, useEffect, useState } from 'react'
import HandleButton from '../Buttons/HandleButton'

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

  const handleWithAswerFeedback = useCallback(async () => {
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
  }, [router, userId])

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
            Peso: {feedback.weight}
          </chakra.h1>

          <chakra.h1 fontSize="lg" lineHeight={6}>
            Outros: {feedback.others}
          </chakra.h1>

          <FormControl mt={4}>
            <Textarea
              placeholder="Responda aqui"
              value={answer}
              onChange={(event) => setAnswer(event.target.value)}
            />
            <Flex justifyContent={'center'} w={'full'} mt={3}>
              <HandleButton
                text="Responder"
                color={'blackAlpha.900'}
                bgColor={'whiteAlpha.900'}
                _hover={{
                  bg: 'whiteAlpha.700',
                  transition: '0.4s',
                }}
                leftIcon={
                  <PaperPlaneTilt size={30} color="#DD6B20" weight="fill" />
                }
                w={'37%'}
                onClick={() => handleWithAswerFeedback()}
              />
            </Flex>
          </FormControl>
        </Box>
      ))}
    </>
  )
}
