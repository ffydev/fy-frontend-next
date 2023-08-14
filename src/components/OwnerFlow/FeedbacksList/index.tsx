import HandleButton from '@/components/Buttons/HandleButton'
import { useAuthStore } from '@/stores/AuthStore'
import { getUserToken } from '@/pages/api/providers/auth.provider'
import {
  answerFeedback,
  findUserFeedbacks,
  IUserFeedback,
  IVideo,
} from '@/pages/api/providers/user-feedbacks.provider'
import {
  Box,
  chakra,
  Flex,
  FormControl,
  Textarea,
  useToast,
} from '@chakra-ui/react'
import { Plus } from '@phosphor-icons/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useAdminNavigationStore } from '@/stores/OwnerStore/Navigation'
import { useOwnerIsFetchingStore } from '@/stores/OwnerStore/IsFetching'
import { VideosView } from '@/components/VideosView'

export default function Feedbacks() {
  const router = useRouter()
  const { user } = useAuthStore()
  const { setIsShowingFeedbacks, setIsShowingUsers } = useAdminNavigationStore()
  const { selectedUserId } = useOwnerIsFetchingStore()
  const [feedbacks, setFeedbacks] = useState<IUserFeedback[]>()
  const [videos, setVideos] = useState<IVideo[]>()
  const [answer, setAnswer] = useState<string>('')
  const toast = useToast()
  const [feedbackVideo, setFeedbackVideo] = useState('')

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

        const response = await findUserFeedbacks(
          token,
          selectedUserId,
          feedbackVideo,
        )

        setFeedbacks(response.feedbacks)

        setVideos(response.videos)
      } catch (error) {
        console.error(error)
        toast({
          title: 'Erro ao buscar feedbacks.',
          description: 'Por favor, tente novamente.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
      }
    }
    fetchFeedbacksData()
  }, [router, selectedUserId, toast, feedbackVideo])

  const handleWithAswerFeedback = async (id: string) => {
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

  const handleWithFindVideos = async (id: string) => {
    setFeedbackVideo(id)
  }

  return (
    <>
      {feedbacks?.map((feedback: IUserFeedback) => (
        <Box
          p={4}
          backdropBlur={'1rem'}
          backdropFilter="blur(5px)"
          rounded={'lg'}
          border={'1px'}
          bgColor={'whiteAlpha.50'}
          borderColor={'whiteAlpha.100'}
          boxShadow={'lg'}
          m={4}
          key={feedback.id}
        >
          <chakra.h1 fontSize="lg" lineHeight={6} mb={3}>
            Data: {new Date(feedback.createdAt!).toLocaleDateString('pt-BR')}
          </chakra.h1>

          <chakra.h1 fontSize="lg" lineHeight={6} mb={3}>
            Peso: {feedback.weight}
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
            Outros: {feedback.others}
          </chakra.h1>

          {feedback.hasVideo && (
            <VideosView
              videos={videos}
              handleWithFindVideos={() =>
                handleWithFindVideos(feedback.userId!)
              }
            />
          )}

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
