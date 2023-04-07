import { useAuth } from '@/hooks/ContextAuth'
import { createAnamnesi } from '@/pages/api/providers/anamnesis.provider'
import { getUserToken } from '@/pages/api/providers/auth.provider'
import { useRouter } from 'next/router'
import {
  Box,
  FormControl,
  FormLabel,
  Grid,
  Input,
  Select,
} from '@chakra-ui/react'
import { useForm, SubmitHandler } from 'react-hook-form'
import HandleButton from '@/components/Buttons/HandleButton'
import { Plus } from '@phosphor-icons/react'

interface IFormInput {
  gender: 'feminino' | 'masculino' | 'outro' | undefined
  dateOfBirth?: string
  age?: string
  height?: string
  weight?: string
  mealPlanAtHome?: string
  foodPreferences?: string
  mealTimes?: string
  last24hFoodIntake?: string
  allergies?: string
  physicalActivities?: string
  jointPainDiscomfort?: boolean
  comorbidities?: string
  budgetForDietSupplementation?: string
  supplementsPharmaceuticalsUsed?: string
  imagePaths?: string
}

export default function AnamnesisCreate() {
  const router = useRouter()
  const { user } = useAuth()

  const { register, handleSubmit } = useForm<IFormInput>()

  function stringifyData(data: Record<string, unknown>) {
    return Object.fromEntries(
      Object.entries(data).map(([key, value]) => [
        key,
        JSON.stringify(value).replace(/"/g, ''),
      ]),
    )
  }

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const token = getUserToken()

      if (!token) {
        // Implementar mensagem personalizada
        router.push('/login')
        return
      }

      const anamnesiData = stringifyData({
        gender: data.gender,
        age: data.age,
        height: data.height,
        weight: data.weight,
        mealPlanAtHome: data.mealPlanAtHome,
        foodPreferences: data.foodPreferences,
        mealTimes: data.mealTimes,
        last24hFoodIntake: data.last24hFoodIntake,
        allergies: data.allergies,
        physicalActivities: data.physicalActivities,
        jointPainDiscomfort: data.jointPainDiscomfort,
        comorbidities: data.comorbidities,
        budgetForDietSupplementation: data.budgetForDietSupplementation,
        supplementsPharmaceuticalsUsed: data.supplementsPharmaceuticalsUsed,
      })

      await createAnamnesi(token, {
        ...anamnesiData,
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
              </Select>
            </FormControl>

            <FormControl gridColumn="span 1">
              <FormLabel>Idade</FormLabel>
              <Input
                {...register('age')}
                placeholder="Digite sua idade"
                isRequired
              />
            </FormControl>

            <FormControl gridColumn="span 1">
              <FormLabel>Altura</FormLabel>
              <Input
                {...register('height')}
                placeholder="Digite sua altura em cm"
                isRequired
              />
            </FormControl>

            <FormControl gridColumn="span 1">
              <FormLabel>Peso</FormLabel>
              <Input
                {...register('weight')}
                placeholder="Digite seu peso em kg"
                isRequired
              />
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
                {...register('last24hFoodIntake')}
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
