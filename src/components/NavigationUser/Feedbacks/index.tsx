import { useAuth } from '@/hooks/ContextAuth'
import { getUserToken } from '@/pages/api/providers/auth.provider'
import { useRouter } from 'next/router'
import {
  Box,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  Text,
  Stack,
  HStack,
  Button,
  Textarea,
  Input,
} from '@chakra-ui/react'
import { useForm, SubmitHandler } from 'react-hook-form'
import HandleButton from '@/components/Buttons/HandleButton'
import { Plus, X } from '@phosphor-icons/react'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { createUserFeedback } from '@/pages/api/providers/user-feedbacks.provider'

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
  const { user } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<createFeedbackFormSchemaType>({
    resolver: zodResolver(createFeedbackFormSchema),
  })

  console.log(errors)

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
    }
  }

  return (
    <>
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
        <Heading>Criar Feedback</Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid templateColumns="repeat(1, 1fr)" gap={6} mt={4}>
            <FormControl gridColumn="span 1">
              <FormLabel>Dieta</FormLabel>
              <Textarea {...register('diet')} placeholder="Dieta" />
              {errors.diet && <Text>{errors.diet.message}</Text>}
            </FormControl>

            <FormControl gridColumn="span 1">
              <FormLabel>Treinos</FormLabel>
              <Textarea
                {...register('workouts')}
                placeholder="Treinos"
                isRequired
              />
              {errors.workouts && <Text>{errors.workouts.message}</Text>}
            </FormControl>

            <FormControl gridColumn="span 1">
              <FormLabel>Peso</FormLabel>
              <Input {...register('weight')} placeholder="Peso" isRequired />
              {errors.weight && <Text>{errors.weight.message}</Text>}
            </FormControl>

            <FormControl gridColumn="span 1">
              <FormLabel>Fadiga</FormLabel>
              <Textarea
                {...register('fatigue')}
                placeholder="Fadiga"
                isRequired
              />
              {errors.fatigue && <Text>{errors.fatigue.message}</Text>}
            </FormControl>

            <FormControl gridColumn="span 1">
              <FormLabel>Outros</FormLabel>
              <Textarea
                {...register('others')}
                placeholder="Outros"
                isRequired
              />
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
              >
                Cancelar
              </Button>
            </HStack>
          </Stack>
        </form>
      </Box>
    </>
  )
}