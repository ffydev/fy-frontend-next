import { useAuthStore } from '@/stores/AuthStore'
import { getUserToken } from '@/pages/api/providers/auth.provider'
import {
  IUserFeedback,
  findUserFeedbacks,
  updateUserFeedback,
} from '@/pages/api/providers/user-feedbacks.provider'
import { Box, chakra, useToast, FormLabel, Input } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function ListFeedbacks() {
  const { user } = useAuthStore()
  const router = useRouter()
  const [feedbacks, setFeedbacks] = useState<IUserFeedback[]>()
  const toast = useToast()
  const [diet, setDiet] = useState<string>('')
  const [workouts, setWorkouts] = useState<string>('')
  const [fatigue, setFatigue] = useState<string>('')
  const [weight, setWeight] = useState<string>('')
  const [others, setOthers] = useState<string>('')

  const handleUpdateUserFeedback = async (feedbackId: string) => {
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

      await updateUserFeedback(token, feedbackId, {
        diet: diet !== '' ? diet : undefined,
        workouts: workouts !== '' ? workouts : undefined,
        fatigue: fatigue !== '' ? fatigue : undefined,
        weight: weight !== '' ? weight : undefined,
        others: others !== '' ? others : undefined,
      })

      toast({
        title: 'Feedback atualizado com sucesso.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    const fetchFeedbacksData = async () => {
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

        const response = await findUserFeedbacks(token, user?.id!)

        setFeedbacks(response.feedbacks)
      } catch (error) {
        console.error(error)
      }
    }
    fetchFeedbacksData()
  }, [router, user?.id, toast])

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
          backdropBlur={'1rem'}
          minWidth="250px"
          m={3}
        >
          <chakra.h1 fontSize="lg" lineHeight={6} mb={3}>
            Data: {new Date(feedback.createdAt!).toLocaleDateString('pt-BR')}
          </chakra.h1>

          {feedback.isAnswered ? (
            <>
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
            </>
          ) : (
            <>
              <FormLabel>Dieta</FormLabel>
              <Input
                defaultValue={feedback.diet}
                mb={3}
                onChange={(event) => setDiet(event.target.value)}
                onBlur={() => handleUpdateUserFeedback(feedback.id!)}
              />

              <FormLabel>Treinos</FormLabel>
              <Input
                contentEditable={!feedback.isAnswered}
                value={feedback.workouts}
                mb={3}
                onChange={(event) => setWorkouts(event.target.value)}
                onBlur={() => handleUpdateUserFeedback(feedback.id!)}
              />

              <FormLabel>Fadiga</FormLabel>
              <Input
                contentEditable={!feedback.isAnswered}
                defaultValue={feedback.fatigue}
                mb={3}
                onChange={(event) => setFatigue(event.target.value)}
                onBlur={() => handleUpdateUserFeedback(feedback.id!)}
              />

              <FormLabel>Peso</FormLabel>
              <Input
                contentEditable={!feedback.isAnswered}
                value={feedback.weight}
                mb={3}
                onChange={(event) => setWeight(event.target.value)}
                onBlur={() => handleUpdateUserFeedback(feedback.id!)}
              />

              <FormLabel>Outros</FormLabel>
              <Input
                contentEditable={!feedback.isAnswered}
                value={feedback.others}
                mb={3}
                onChange={(event) => setOthers(event.target.value)}
                onBlur={() => handleUpdateUserFeedback(feedback.id!)}
              />
            </>
          )}

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
