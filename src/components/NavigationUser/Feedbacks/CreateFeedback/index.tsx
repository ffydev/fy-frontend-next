import { useAuthStore } from '@/Stores/AuthStore'
import { getUserToken } from '@/pages/api/providers/auth.provider'
import { useRouter } from 'next/router'
import {
  Box,
  FormControl,
  FormLabel,
  Grid,
  Text,
  Stack,
  HStack,
  Button,
  Textarea,
  Input,
  Container,
} from '@chakra-ui/react'
import { useForm, SubmitHandler } from 'react-hook-form'
import HandleButton from '@/components/Buttons/HandleButton'
import { Plus, X } from '@phosphor-icons/react'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { createUserFeedback } from '@/pages/api/providers/user-feedbacks.provider'
import { useUserNavigationStore } from '@/Stores/UserStore/Navigation'

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
    } catch (error) {
      console.error(error)
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
          p={4}
          bgColor={'whiteAlpha.100'}
          rounded={'lg'}
          border={'1px'}
          borderColor={'whiteAlpha.200'}
          backdropBlur={'1rem'}
          backdropFilter="blur(15px)"
          boxShadow={'lg'}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl gridColumn="span 1" mt={3} w={'-webkit-fit-content'}>
              <FormLabel>Peso</FormLabel>
              <Input {...register('weight')} placeholder="Peso" isRequired />
              {errors.weight && <Text>{errors.weight.message}</Text>}
            </FormControl>
            <Grid templateColumns="repeat(2, 1fr)" gap={6} mt={3}>
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
            </Grid>

            <Stack mt={6} mb={4}>
              <HStack>
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
              </HStack>
            </Stack>
          </form>
        </Box>
      </Container>
    </>
  )
}
