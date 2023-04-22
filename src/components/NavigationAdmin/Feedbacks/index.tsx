import HandleButton from '@/components/Buttons/HandleButton'
import { useAuthStore } from '@/Stores/AuthStore'
import { getUserToken } from '@/pages/api/providers/auth.provider'
import {
  answerFeedback,
  findUserFeedbacks,
  IUserFeedback,
} from '@/pages/api/providers/user-feedbacks.provider'
import { Box, chakra, Flex, FormControl, Textarea } from '@chakra-ui/react'
import { Plus } from '@phosphor-icons/react'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { useAdminNavigationStore } from '@/Stores/AdminStore/Navigation'
import { useAdminIsFetchingStore } from '@/Stores/AdminStore/IsFetching'

export default function Feedbacks() {
  const router = useRouter()
  const { user } = useAuthStore()
  const { setIsShowingFeedbacks, setIsShowingUsers } = useAdminNavigationStore()
  const { selectedUserId } = useAdminIsFetchingStore()
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

      const response = await findUserFeedbacks(token, selectedUserId)

      setFeedbacks(response)
    } catch (error) {
      console.error(error)
    }
  }, [router, selectedUserId])

  useEffect(() => {
    fetchFeedbacksData()
  }, [fetchFeedbacksData])

  const handleWithAswerFeedback = async (id: string) => {
    try {
      const token = getUserToken()

      if (!token) {
        // Implementar mensagem personalizada
        router.push('/login')
        return
      }

      await answerFeedback(token, id, {
        doctorId: user?.id,
        isAnswered: true,
        answer,
      })
    } catch (error) {
      console.error(error)
    } finally {
      setIsShowingFeedbacks()
      setIsShowingUsers()
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
                Status: Respondido
              </chakra.h1>
            </>
          ) : (
            <>
              <FormControl mt={4}>
                <Textarea
                  placeholder="Responda aqui"
                  onChange={(event) => setAnswer(event.target.value)}
                />
                <Flex justifyContent={'center'} w={'full'} mt={3}>
                  <HandleButton
                    text={'Responder'}
                    leftIcon={<Plus size={28} weight="bold" />}
                    onClick={() => handleWithAswerFeedback(feedback.id!)}
                  />
                </Flex>
              </FormControl>
            </>
          )}
        </Box>
      ))}
    </>
  )
}
