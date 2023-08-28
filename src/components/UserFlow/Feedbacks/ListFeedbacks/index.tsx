import { useAuthStore } from '@/stores/AuthStore'
import { getUserToken } from '@/pages/api/providers/auth.provider'
import {
  IUserFeedback,
  IVideo,
  findUserFeedbacks,
  updateUserFeedback,
} from '@/pages/api/providers/user-feedbacks.provider'
import {
  Box,
  chakra,
  useToast,
  FormLabel,
  Input,
  Stack,
  FormControl,
  Textarea,
  Text,
  Flex,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { VideosView } from '@/components/VideosView'
import { z } from 'zod'
import { useVideosStore } from '@/stores/VideoStore'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import UploadVideosStep from '@/components/VideosUpload/UploadVideosStep'

const updateFeedbackFormSchema = z.object({
  diet: z
    .string()
    .min(0)
    .max(200, { message: 'A mensagem deve ter no máximo 200 caracteres' })
    .optional(),
  workouts: z
    .string()
    .min(0)
    .max(200, { message: 'A mensagem deve ter no máximo 200 caracteres' })
    .optional(),
  weight: z.coerce
    .number()
    .min(1, { message: 'O peso deve ser informado' })
    .max(400, { message: 'Peso máximo 400KG' })
    .optional(),
  fatigue: z
    .string()
    .min(0)
    .max(200, { message: 'A mensagem deve ter no máximo 200 caracteres' })
    .optional(),
  others: z
    .string()
    .min(0)
    .max(200, { message: 'A mensagem deve ter no máximo 200 caracteres' })
    .optional(),
})

type updateFeedbackFormSchemaType = z.infer<typeof updateFeedbackFormSchema>

export default function ListFeedbacks() {
  const { user } = useAuthStore()
  const router = useRouter()
  const [feedbacks, setFeedbacks] = useState<IUserFeedback[]>()
  const toast = useToast()
  const [feedbackId, setFeedbackId] = useState<string>('')
  const [feedbackVideo, setFeedbackVideo] = useState('')
  const [videos, setVideos] = useState<IVideo[]>()
  const { finalVideo, reset } = useVideosStore()
  const [isSendingFeedback, setIsSendingFeedback] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<updateFeedbackFormSchemaType>({
    resolver: zodResolver(updateFeedbackFormSchema),
  })

  const onSubmit: SubmitHandler<updateFeedbackFormSchemaType> = async (
    data,
  ) => {
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

      setIsSendingFeedback(true)

      const formData = new FormData()
      formData.append('diet', String(data.diet))
      formData.append('workouts', String(data.workouts))
      formData.append('weight', String(data.weight))
      formData.append('fatigue', String(data.fatigue))
      formData.append('others', String(data.others))
      formData.append('userId', String(user?.id))

      if (finalVideo.length > 0) {
        const files = Object.entries(finalVideo)

        for (const file of files) {
          formData.append('videos', file[1].file)
        }
      }

      await updateUserFeedback(token, feedbackId, formData as any)
      toast({
        title: 'Feedback atualizado com sucesso',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    } catch (error) {
      console.error(error)
      toast({
        title: 'Erro ao atualizar feedback',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    } finally {
      setIsSendingFeedback(false)
      reset()
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

        const response = await findUserFeedbacks(
          token,
          user?.id!,
          feedbackVideo,
        )

        setFeedbacks(response.feedbacks)
        setVideos(response.videos)
      } catch (error) {
        console.error(error)
      }
    }
    fetchFeedbacksData()
  }, [router, user?.id, toast, feedbackVideo])

  const handleWithFindVideos = async (id: string) => {
    setFeedbackVideo(id)
  }

  return (
    <>
      {feedbacks?.map((feedback: IUserFeedback) => (
        <Box
          key={feedback.id}
          p={4}
          rounded={'lg'}
          border={'1px'}
          borderColor={'whiteAlpha.100'}
          minWidth="250px"
          m={3}
        >
          <Flex>
            <chakra.h1 fontSize="lg" lineHeight={6} mb={3} mr={3}>
              Data: {new Date(feedback.createdAt!).toLocaleDateString('pt-BR')}
            </chakra.h1>

            {feedback.hasVideo && (
              <VideosView
                videos={videos}
                handleWithFindVideos={() =>
                  handleWithFindVideos(feedback.userId!)
                }
              />
            )}
          </Flex>

          {feedback.isAnswered ? (
            <>
              <Stack m={3}>
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
              </Stack>
            </>
          ) : (
            <>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Stack m={3}>
                  <FormControl gridColumn="span 1">
                    <FormLabel>Peso</FormLabel>
                    <Input
                      defaultValue={feedback.weight}
                      {...register('weight')}
                      placeholder="Peso"
                      onChange={() => setFeedbackId(feedback.id!)}
                    />
                    {errors.weight && <Text>{errors.weight.message}</Text>}
                  </FormControl>

                  <FormControl gridColumn="span 1">
                    <FormLabel>Dieta</FormLabel>
                    <Textarea
                      defaultValue={feedback.diet}
                      {...register('diet')}
                      placeholder="Dieta"
                      onChange={() => setFeedbackId(feedback.id!)}
                    />
                    {errors.diet && <Text>{errors.diet.message}</Text>}
                  </FormControl>

                  <FormControl gridColumn="span 1">
                    <FormLabel>Treinos</FormLabel>
                    <Textarea
                      defaultValue={feedback.workouts}
                      {...register('workouts')}
                      placeholder="Treinos"
                      onChange={() => setFeedbackId(feedback.id!)}
                    />
                    {errors.workouts && <Text>{errors.workouts.message}</Text>}
                  </FormControl>

                  <FormControl gridColumn="span 1">
                    <FormLabel>Fadiga</FormLabel>
                    <Textarea
                      defaultValue={feedback.fatigue}
                      {...register('fatigue')}
                      placeholder="Fadiga"
                      onChange={() => setFeedbackId(feedback.id!)}
                    />
                    {errors.fatigue && <Text>{errors.fatigue.message}</Text>}
                  </FormControl>

                  <FormControl gridColumn="span 1">
                    <FormLabel>Outros</FormLabel>
                    <Textarea
                      defaultValue={feedback.others}
                      {...register('others')}
                      placeholder="Outros"
                      onChange={() => setFeedbackId(feedback.id!)}
                    />
                    {errors.others && <Text>{errors.others.message}</Text>}
                  </FormControl>

                  <chakra.h1
                    w="fit-content"
                    p={1}
                    bg="red.500"
                    color="red.700"
                    fontSize="lg"
                    lineHeight={6}
                    display="inline-block"
                    borderRadius={4}
                    textColor={'whiteAlpha.900'}
                  >
                    Vídeos enviados anteriormente serão substituídos
                  </chakra.h1>

                  <FormControl gridColumn="span 2" mt={3}>
                    <UploadVideosStep
                      textButtonSubmit="Atualizar Feedback"
                      isSendingForm={isSendingFeedback}
                    />
                  </FormControl>
                </Stack>
              </form>
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
