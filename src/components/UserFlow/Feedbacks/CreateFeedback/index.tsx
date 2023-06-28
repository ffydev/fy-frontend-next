import { useAuthStore } from '@/stores/AuthStore'
import { getUserToken } from '@/pages/api/providers/auth.provider'
import { useRouter } from 'next/router'
import {
  Box,
  FormControl,
  FormLabel,
  Text,
  Stack,
  Button,
  Textarea,
  Input,
  Container,
  useToast,
} from '@chakra-ui/react'
import { useForm, SubmitHandler } from 'react-hook-form'
import HandleButton from '@/components/Buttons/HandleButton'
import { Plus, X } from '@phosphor-icons/react'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { createUserFeedback } from '@/pages/api/providers/user-feedbacks.provider'
import { useUserNavigationStore } from '@/stores/UserStore/Navigation'
import { MdCloudUpload } from 'react-icons/md'

const maxFileSize = 300 * 1024 * 1024
const imageTypes = ['videos/mp4', 'videos/3gp', 'videos/quicktime']

const createFeedbackFormSchema = z.object({
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
  videos: z
    .any()
    .refine(
      (obj) => {
        Object.entries(obj)
        for (const file of obj) {
          if (file.size > maxFileSize) {
            return false
          }
        }
        return true
      },
      { message: 'O tamanho de cada vídeo deve ser no máximo 300 megabytes.' },
    )
    .refine(
      (obj) => {
        Object.entries(obj)
        for (const file of obj) {
          if (!imageTypes.includes(file.type)) {
            return false
          }
        }
        return true
      },
      { message: 'Por favor, selecione apenas vídeos.' },
    ),
})

type createFeedbackFormSchemaType = z.infer<typeof createFeedbackFormSchema>

export default function CreatingFeedback() {
  const router = useRouter()
  const { user } = useAuthStore()
  const { setIsShowingDashboard, setIsShowingCreateFeedbacks } =
    useUserNavigationStore()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<createFeedbackFormSchemaType>({
    resolver: zodResolver(createFeedbackFormSchema),
  })
  const toast = useToast()

  const onSubmit: SubmitHandler<createFeedbackFormSchemaType> = async (
    data,
  ) => {
    try {
      const token = getUserToken()

      if (!token) {
        router.push('/login')
        return
      }

      await createUserFeedback(token, {
        diet: data.diet,
        workouts: data.workouts,
        weight: data.weight,
        fatigue: data.fatigue,
        others: data.others,
        userId: user?.id,
      })
      toast({
        title: 'Feedback criado com sucesso',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    } catch (error) {
      console.error(error)
      toast({
        title: 'Erro ao criar feedback',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    } finally {
      setIsShowingCreateFeedbacks()
      setIsShowingDashboard()
    }
  }

  const handleWithCancelCreatingFeedback = () => {
    setIsShowingCreateFeedbacks()
    setIsShowingDashboard()
  }

  return (
    <>
      <Container maxW="7xl" p={{ base: 3, md: 1 }} m={3}>
        <Box
          mt={3}
          mb={4}
          p={8}
          bgColor={'whiteAlpha.100'}
          rounded={'lg'}
          border={'1px'}
          borderColor={'whiteAlpha.200'}
          backdropBlur={'1rem'}
          backdropFilter="blur(15px)"
          boxShadow={'lg'}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack m={3}>
              <FormControl gridColumn="span 1">
                <FormLabel>Peso</FormLabel>
                <Input {...register('weight')} placeholder="Peso" isRequired />
                {errors.weight && <Text>{errors.weight.message}</Text>}
              </FormControl>

              <FormControl gridColumn="span 1">
                <FormLabel>Dieta</FormLabel>
                <Textarea {...register('diet')} placeholder="Dieta" />
                {errors.diet && <Text>{errors.diet.message}</Text>}
              </FormControl>

              <FormControl gridColumn="span 1">
                <FormLabel>Treinos</FormLabel>
                <Textarea {...register('workouts')} placeholder="Treinos" />
                {errors.workouts && <Text>{errors.workouts.message}</Text>}
              </FormControl>

              <FormControl gridColumn="span 1">
                <FormLabel>Fadiga</FormLabel>
                <Textarea {...register('fatigue')} placeholder="Fadiga" />
                {errors.fatigue && <Text>{errors.fatigue.message}</Text>}
              </FormControl>

              <FormControl gridColumn="span 1">
                <FormLabel>Outros</FormLabel>
                <Textarea {...register('others')} placeholder="Outros" />
                {errors.others && <Text>{errors.others.message}</Text>}
              </FormControl>

              <FormControl gridColumn="span 2" mt={3}>
                <label>
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    p={4}
                    minW={'full'}
                    border="2px dashed"
                    borderColor="gray.300"
                    borderRadius="md"
                    textAlign="center"
                    cursor="pointer"
                    _hover={{
                      bgGradient: 'linear(to-r, purple.500, purple.600)',
                      transition: '0.8s',
                    }}
                  >
                    <MdCloudUpload size={24} />
                    <Text mt={2} fontSize="sm" fontWeight="bold">
                      Arraste os vídeos ou clique para fazer o upload
                    </Text>
                    <Input
                      id="fileInput"
                      onChange={(event) => {
                        register('videos', {
                          value: event.target.files,
                        })
                        // handleFileChange(event)
                      }}
                      type="file"
                      accept=".mp4, .3gp, .quicktime"
                      multiple
                      style={{ display: 'none' }}
                    />
                  </Box>
                </label>
              </FormControl>

              <Stack
                direction={['column', 'row']}
                mt={3}
                justifyContent={'space-between'}
              >
                <HandleButton
                  text="Criar Feedback"
                  leftIcon={<Plus weight="bold" />}
                  w={'full'}
                  type={'submit'}
                />
                <Button
                  variant={'outline'}
                  w={'full'}
                  leftIcon={<X weight="bold" />}
                  type="reset"
                  onClick={handleWithCancelCreatingFeedback}
                >
                  Cancelar
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Container>
    </>
  )
}
