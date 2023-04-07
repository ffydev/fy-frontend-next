import { useAuth } from '@/hooks/ContextAuth'
import { createAnamnesis } from '@/pages/api/providers/anamnesis.provider'
import { getUserToken } from '@/pages/api/providers/auth.provider'
import { useRouter } from 'next/router'
import {
  Box,
  FormControl,
  FormLabel,
  Grid,
  Input,
  Select,
  Text,
} from '@chakra-ui/react'
import { useForm, SubmitHandler } from 'react-hook-form'
import HandleButton from '@/components/Buttons/HandleButton'
import { Plus } from '@phosphor-icons/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const createAnamnesisFormSchema = z.object({
  gender: z.string().nonempty({ message: 'Selecione seu gênero' }),
  age: z.string().nonempty({ message: 'Informe sua idade' }),
  height: z.string().nonempty({ message: 'Informe sua altura' }),
  weight: z.string().nonempty({ message: 'Informe seu peso' }),
  mealPlanAtHome: z.string().optional(),
  foodPreferences: z.string().optional(),
  mealTimes: z.string().optional(),
  lastDayFoodIntake: z.string().optional(),
  allergies: z.string().optional(),
  physicalActivities: z.string().optional(),
  jointPainDiscomfort: z.string().optional(),
  comorbidities: z.string().optional(),
  budgetForDietSupplementation: z.string().optional(),
  supplementsPharmaceuticalsUsed: z.string().optional(),
})

type createAnamnesisFormSchemaType = z.infer<typeof createAnamnesisFormSchema>

export default function AnamnesisCreate() {
  const router = useRouter()
  const { user } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<createAnamnesisFormSchemaType>({
    resolver: zodResolver(createAnamnesisFormSchema),
  })

  const onSubmit: SubmitHandler<createAnamnesisFormSchemaType> = async (
    data,
  ) => {
    try {
      const token = getUserToken()

      if (!token) {
        // Implementar mensagem personalizada
        router.push('/login')
        return
      }

      await createAnamnesis(token, {
        gender: data.gender,
        age: data.age,
        height: data.height,
        weight: data.weight,
        mealPlanAtHome: data.mealPlanAtHome,
        foodPreferences: data.foodPreferences,
        mealTimes: data.mealTimes,
        lastDayFoodIntake: data.lastDayFoodIntake,
        allergies: data.allergies,
        physicalActivities: data.physicalActivities,
        jointPainDiscomfort: data.jointPainDiscomfort,
        comorbidities: data.comorbidities,
        budgetForDietSupplementation: data.budgetForDietSupplementation,
        supplementsPharmaceuticalsUsed: data.supplementsPharmaceuticalsUsed,
        userId: user!.id,
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
        sx={{
          border: '1px solid',
          borderColor: 'grey.400',
          borderRadius: '8px',
          p: 3,
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid templateColumns="repeat(2, 1fr)" gap={6}>
            <FormControl gridColumn="span 1">
              <FormLabel>Gênero</FormLabel>
              <Select
                {...register('gender')}
                placeholder="Selecione seu gênero"
              >
                <option value="masculino">Masculino</option>
                <option value="feminino">Feminino</option>
                <option value="outro">Prefiro não dizer</option>
                {errors.gender && <Text>{errors.gender.message}</Text>}
              </Select>
            </FormControl>

            <FormControl gridColumn="span 1">
              <FormLabel>Idade</FormLabel>
              <Input
                {...register('age')}
                placeholder="Digite sua idade"
                isRequired
              />
              {errors.age && <Text>{errors.age.message}</Text>}
            </FormControl>

            <FormControl gridColumn="span 1">
              <FormLabel>Altura</FormLabel>
              <Input
                {...register('height')}
                placeholder="Digite sua altura em cm"
                isRequired
              />
              {errors.height && <Text>{errors.height.message}</Text>}
            </FormControl>

            <FormControl gridColumn="span 1">
              <FormLabel>Peso</FormLabel>
              <Input
                {...register('weight')}
                placeholder="Digite seu peso em kg"
                isRequired
              />
              {errors.weight && <Text>{errors.weight.message}</Text>}
            </FormControl>

            <FormControl gridColumn="span 1">
              <FormLabel>Plano alimentar em casa</FormLabel>
              <Input
                {...register('mealPlanAtHome')}
                placeholder="Plano alimentar em casa"
              />
            </FormControl>

            <FormControl gridColumn="span 1">
              <FormLabel>Preferências alimentares</FormLabel>
              <Input
                {...register('foodPreferences')}
                placeholder="Preferências alimentares"
              />
            </FormControl>

            <FormControl gridColumn="span 1">
              <FormLabel>Horários das refeições</FormLabel>
              <Input
                {...register('mealTimes')}
                placeholder="Horários de refeição"
              />
            </FormControl>

            <FormControl gridColumn="span 2">
              <FormLabel>Alimentação das últimas 24 horas</FormLabel>
              <Input
                {...register('lastDayFoodIntake')}
                placeholder="Alimentação nas últimas 24 horas"
              />
            </FormControl>

            <FormControl gridColumn="span 2">
              <FormLabel>Alergias</FormLabel>
              <Input {...register('allergies')} placeholder="Alergias" />
            </FormControl>

            <FormControl gridColumn="span 2">
              <FormLabel>Atividades físicas</FormLabel>
              <Input
                {...register('physicalActivities')}
                placeholder="Aividades físicas"
              />
            </FormControl>

            <FormControl gridColumn="span 2">
              <FormLabel>Dor ou desconforto nas articulações</FormLabel>
              <Select
                {...register('jointPainDiscomfort')}
                placeholder="Dor ou desconforto nas articulações?"
              >
                <option value="Não">Não</option>
                <option value="Sim">Sim</option>
              </Select>
            </FormControl>

            <FormControl gridColumn="span 2">
              <FormLabel>Comorbidades</FormLabel>
              <Input
                {...register('comorbidities')}
                placeholder="Comorbidades"
              />
            </FormControl>

            <FormControl gridColumn="span 2">
              <FormLabel>Orçamento para suplementação alimentar</FormLabel>
              <Input
                {...register('budgetForDietSupplementation')}
                placeholder="Orçamento para suplementação alimentar"
              />
            </FormControl>

            <FormControl gridColumn="span 2">
              <FormLabel>Suplementos/Fármacos utilizados</FormLabel>
              <Input
                {...register('supplementsPharmaceuticalsUsed')}
                placeholder="Suplementos/Fármacos utilizados"
              />
            </FormControl>
          </Grid>

          <Box mt={3}>
            <HandleButton
              text="Enviar"
              color={'blackAlpha.900'}
              bgColor={'white'}
              _hover={{ bgColor: 'orange.400', transform: '0.3s' }}
              leftIcon={<Plus size={30} color="black" weight="fill" />}
              w={'full'}
              type={'submit'}
            />
          </Box>
        </form>
      </Box>
    </>
  )
}
