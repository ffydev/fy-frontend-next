import { useAuthStore } from '@/stores/AuthStore'
import { createAnamnesis } from '@/pages/api/providers/anamnesis.provider'
import {
  findCurrentUser,
  getUserToken,
} from '@/pages/api/providers/auth.provider'
import { useRouter } from 'next/router'
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Grid,
  HStack,
  Input,
  Select,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react'
import { useForm, SubmitHandler } from 'react-hook-form'
import HandleButton from '@/components/Buttons/HandleButton'
import { Plus, X } from '@phosphor-icons/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useUserNavigationStore } from '@/stores/UserStore/Navigation'
import { MdCloudUpload } from 'react-icons/md'

const createAnamnesisFormSchema = z.object({
  gender: z.string().nonempty({ message: 'Selecione seu gênero' }),
  age: z.coerce
    .number({
      required_error: 'Campo obrigatório',
      invalid_type_error: 'Idade deve ser um número válido',
    })
    .min(1, { message: 'Idade deve ser maior que 0' })
    .max(130, { message: 'Idade deve ser menor que 130' }),
  height: z.coerce
    .number({
      required_error: 'Campo obrigatório',
      invalid_type_error: 'Altura deve ser um número válido',
    })
    .min(1, { message: 'Altura deve ser maior que 0' })
    .max(3.0, { message: 'Altura deve ser menor que 3 metros' }),
  weight: z.coerce
    .number({
      required_error: 'Campo obrigatório',
      invalid_type_error: 'Peso deve ser um número válido',
    })
    .min(1, { message: 'Peso deve ser maior que 0' })
    .max(300, { message: 'Peso deve ser menor 300' }),
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
  pictures: z.any().refine((obj) => Object.keys(obj).length > 0, {
    message: 'Por favor, selecione suas fotos.',
  }),
})

type createAnamnesisFormSchemaType = z.infer<typeof createAnamnesisFormSchema>

export default function AnamnesisCreate() {
  const router = useRouter()
  const { user, setUser } = useAuthStore()
  const { setIsShowingDashboard, setIsShowingCreateAnamnesis } =
    useUserNavigationStore()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<createAnamnesisFormSchemaType>({
    resolver: zodResolver(createAnamnesisFormSchema),
  })

  const toast = useToast()

  const fetchCurrentUserData = async (token: string) => {
    try {
      const currentUserData = await findCurrentUser(token)

      if (!currentUserData) {
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

      setUser(currentUserData)
    } catch (error) {
      console.error(error)
      toast({
        title: 'Erro ao buscar dados do usuário.',
        description: 'Por favor, tente novamente.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  const onSubmit: SubmitHandler<createAnamnesisFormSchemaType> = async (
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

      const formData = new FormData()
      const filesValues = Object.entries(data.pictures)

      filesValues.map((file: any) => {
        return formData.append('pictures', file[1])
      })

      formData.append('gender', data.gender)
      formData.append('age', String(data.age))
      formData.append('height', String(data.height))
      formData.append('weight', String(data.weight))
      formData.append('mealPlanAtHome', String(data.mealPlanAtHome))
      formData.append('foodPreferences', JSON.stringify(data.foodPreferences))
      formData.append('mealTimes', JSON.stringify(data.mealTimes))
      formData.append(
        'lastDayFoodIntake',
        JSON.stringify(data.lastDayFoodIntake),
      )
      formData.append('allergies', JSON.stringify(data.allergies))
      formData.append(
        'physicalActivities',
        JSON.stringify(data.physicalActivities),
      )
      formData.append(
        'jointPainDiscomfort',
        JSON.stringify(data.jointPainDiscomfort),
      )
      formData.append('comorbidities', JSON.stringify(data.comorbidities))
      formData.append(
        'budgetForDietSupplementation',
        JSON.stringify(data.budgetForDietSupplementation),
      )
      formData.append(
        'supplementsPharmaceuticalsUsed',
        JSON.stringify(data.supplementsPharmaceuticalsUsed),
      )
      formData.append('userId', user!.id)

      await createAnamnesis(token, formData as any)

      await fetchCurrentUserData(token)
      toast({
        title: 'Anamnese criada com sucesso!',
        description: 'Agora você pode acessar seu Dashboard.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    } catch (error) {
      console.error(error)
      toast({
        title: 'Erro ao criar anamnese.',
        description: 'Por favor, tente novamente.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    } finally {
      setIsShowingDashboard()
      setIsShowingCreateAnamnesis()
    }
  }

  const handleWithCancelCreatingAnamnesis = () => {
    setIsShowingDashboard()
    setIsShowingCreateAnamnesis()
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

              <FormControl gridColumn="span 2">
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
                    _hover={{ bg: 'gray.50' }}
                  >
                    <MdCloudUpload size={24} />
                    <Text mt={2} fontSize="sm" fontWeight="bold">
                      Arraste as imagens ou clique para fazer o upload
                    </Text>
                  </Box>
                  <Input
                    {...register('pictures')}
                    type="file"
                    style={{ display: 'none' }}
                    accept="image/*"
                    multiple
                  />
                </label>
                {errors?.pictures && (
                  <Text>{errors.pictures.message as any}</Text>
                )}
              </FormControl>
            </Grid>

            <Stack mt={6} mb={4}>
              <HStack>
                <HandleButton
                  text="Enviar"
                  leftIcon={<Plus weight="bold" />}
                  w={'full'}
                  type={'submit'}
                />
                <Button
                  variant={'outline'}
                  w={'full'}
                  leftIcon={<X weight="bold" />}
                  type="reset"
                  onClick={handleWithCancelCreatingAnamnesis}
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
