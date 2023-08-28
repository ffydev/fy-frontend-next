import HandleButton from '@/components/Buttons/HandleButton'
import { VideosView } from '@/components/VideosView'
import { getUserToken } from '@/pages/api/providers/auth.provider'
import {
  IUserFeedback,
  IVideo,
  answerFeedback,
  findUserFeedbackById,
} from '@/pages/api/providers/user-feedbacks.provider'
import { useAuthStore } from '@/stores/AuthStore'
import {
  Box,
  Button,
  Flex,
  FormControl,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Textarea,
  chakra,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import { Eye, Plus } from '@phosphor-icons/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

interface IFeedbackPendingProps {
  userFeedbackId: string
  setIsFetchingFeedbacks: (isFetching: boolean) => void
}

export function FeedbackPending({
  userFeedbackId,
  setIsFetchingFeedbacks,
}: IFeedbackPendingProps) {
  const { user } = useAuthStore()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()
  const router = useRouter()
  const [feedback, setFeedback] = useState<IUserFeedback>()
  const [videos, setVideos] = useState<IVideo[]>()
  const [feedbackVideo, setFeedbackVideo] = useState('')
  const [answer, setAnswer] = useState('')

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

        const response = await findUserFeedbackById(
          token,
          userFeedbackId,
          feedbackVideo,
        )

        setFeedback(response.feedback)

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
  }, [router, toast, userFeedbackId, feedbackVideo])

  const handleWithFindVideos = async (feedbackVideo: string) => {
    setFeedbackVideo(feedbackVideo)
  }

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

      toast({
        title: 'Feedback respondido com sucesso.',
        description: 'O feedback foi respondido com sucesso.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
      setIsFetchingFeedbacks(true)
      onClose()
    } catch (error) {
      console.error(error)
      toast({
        title: 'Erro ao responder feedback.',
        description: 'Por favor, tente novamente.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  return (
    <>
      <Button leftIcon={<Eye size={24} />} onClick={onOpen}></Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay bg="blackAlpha.300" />
        <ModalContent
          bgGradient={[
            'linear(to-tr, gray.900 27.17%, purple.900 85.87%)',
            'linear(to-b, gray.900 27.17%, purple.900 85.87%)',
          ]}
          border={'1px'}
          borderColor={'whiteAlpha.200'}
          backdropBlur={'1rem'}
        >
          <ModalCloseButton />
          <ModalBody>
            <Box
              p={4}
              backdropBlur={'1rem'}
              rounded={'lg'}
              border={'1px'}
              bgColor={'whiteAlpha.50'}
              borderColor={'whiteAlpha.100'}
              m={4}
            >
              <chakra.h1 fontSize="lg" lineHeight={6} mb={3}>
                Data:{' '}
                {new Date(feedback?.createdAt!).toLocaleDateString('pt-BR')}
              </chakra.h1>

              <chakra.h1 fontSize="lg" lineHeight={6} mb={3}>
                Peso: {feedback?.weight}
              </chakra.h1>

              <chakra.h1 fontSize="lg" lineHeight={6} mb={3}>
                Dieta: {feedback?.diet}
              </chakra.h1>

              <chakra.h1 fontSize="lg" lineHeight={6} mb={3}>
                Treinos: {feedback?.workouts}
              </chakra.h1>

              <chakra.h1 fontSize="lg" lineHeight={6} mb={3}>
                Fadiga: {feedback?.fatigue}
              </chakra.h1>

              <chakra.h1 fontSize="lg" lineHeight={6} mb={3}>
                Outros: {feedback?.others}
              </chakra.h1>

              {feedback?.hasVideo && (
                <VideosView
                  videos={videos}
                  handleWithFindVideos={() =>
                    handleWithFindVideos(feedback?.id!)
                  }
                />
              )}

              <FormControl mt={4}>
                <Textarea
                  placeholder="Responda aqui"
                  onChange={(event) => setAnswer(event.target.value)}
                />
                <Flex justifyContent={'center'} w={'full'} mt={3}>
                  <HandleButton
                    text={'Responder'}
                    leftIcon={<Plus size={28} weight="bold" />}
                    onClick={() => handleWithAswerFeedback(feedback?.id!)}
                  />
                </Flex>
              </FormControl>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
