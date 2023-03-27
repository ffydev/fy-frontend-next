import { getUserToken } from '@/pages/api/providers/auth.provider'
import {
  findFeedbacks,
  IUserFeedbackInterface
} from '@/pages/api/providers/userFeedback.provider'
import { Box, chakra, CloseButton, Flex, Spacer } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

interface feedbacksProps {
  userId: string
  workoutId: string
  handleWithCloseFeedback: () => void
}

export default function Feedbacks({
  userId,
  workoutId,
  handleWithCloseFeedback,
}: feedbacksProps) {
  const router = useRouter()
  const [feedbacks, setFeedbacks] = useState<IUserFeedbackInterface[]>()

  const fetchFeedbacksData = async (userId: string, workoutId: string) => {
    try {
      const token = getUserToken()

      if (!token) {
        router.push('/login')
        return
      }

      const response = await findFeedbacks(token, { userId, workoutId })

      setFeedbacks(response)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchFeedbacksData(userId, workoutId)
  }, [userId, workoutId])

  return (
    <>
      {feedbacks?.map((feedback: IUserFeedbackInterface) => (
        <Box
          key={feedback.id}
          p={3}
          m={3}
          backdropBlur={'1rem'}
          backdropFilter='blur(5px)'
          border={'1px'}
          borderColor={'whiteAlpha.700'}
          rounded={'lg'}
          bgGradient={[
            'linear(to-tr, gray.900 70.17%, purple.900 90.87%)',
            'linear(to-br, gray.900 50.17%, purple.900 90.87%)',
          ]}
        >
          <Flex minWidth='max-content'>
            <Spacer />{' '}
            <CloseButton onClick={() => handleWithCloseFeedback()} size='sm' />
          </Flex>

          <chakra.h1 fontSize='lg' lineHeight={6}>
            Dieta: {feedback.diet}
          </chakra.h1>

          <chakra.h1 fontSize='lg' lineHeight={6}>
            Treinos: {feedback.workouts}
          </chakra.h1>

          <chakra.h1 fontSize='lg' lineHeight={6}>
            Fadiga: {feedback.fatigue}
          </chakra.h1>

          <chakra.h1 fontSize='lg' lineHeight={6}>
            Pesos: {feedback.weight}
          </chakra.h1>

          <chakra.h1 fontSize='lg' lineHeight={6}>
            Outros: {feedback.others}
          </chakra.h1>
        </Box>
      ))}
    </>
  )
}
