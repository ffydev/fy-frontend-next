import { IWorkoutsExercises } from '@/pages/api/providers/workoutsExercises.provider'
import {
  Box,
  Text,
  Stack,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Center,
} from '@chakra-ui/react'
import { ISet } from '@/pages/api/providers/sets.provider'

interface WorkoutsExercisesProps {
  workoutsExercises?: IWorkoutsExercises[]
}

export default function ExercisesList({
  workoutsExercises,
}: WorkoutsExercisesProps) {
  // const [errors, setErrors] = useState<{ [key: string]: string }>({})

  // const schema = z.object({
  //   weight: z.coerce
  //     .number({
  //       invalid_type_error: 'Valor Inválido',
  //     })
  //     .positive()
  //     .min(0)
  //     .max(800, { message: 'Valor Inválido' }),
  // })
  // const toast = useToast()

  // const handleUpdateExercise = async (weight: string, id: string) => {
  //   const token = getUserToken()

  //   if (!token) {
  //     toast({
  //       title: 'Sua sessão expirou.',
  //       description: 'Por favor, faça login novamente.',
  //       status: 'error',
  //       duration: 3000,
  //       isClosable: true,
  //     })
  //     router.push('/login')
  //     return
  //   }

  //   try {
  //     const parsedWeight = schema.parse({ weight })

  //     await updateExerciseByUser(token, id, {
  //       weight: parsedWeight.weight,
  //     })

  //     const exerciseUpdated = await findExerciseById(token, id)

  //     setExercisesState((prevExercisesState) => {
  //       const updatedExercisesState = prevExercisesState.map((exercise) =>
  //         exercise.id === id ? exerciseUpdated : exercise,
  //       )
  //       return updatedExercisesState
  //     })

  //     setErrors((prevErrors) => ({ ...prevErrors, [id]: '' }))

  //     toast({
  //       title: 'Peso atualizado com sucesso.',
  //       status: 'success',
  //       duration: 3000,
  //       isClosable: true,
  //     })
  //   } catch (error) {
  //     if (error instanceof z.ZodError) {
  //       setErrors((prevErrors) => ({
  //         ...prevErrors,
  //         [id]: (error as z.ZodError).errors[0].message,
  //       }))
  //     } else {
  //       console.error(error)
  //       toast({
  //         title: 'Erro ao atualizar peso.',
  //         description: 'Por favor, tente novamente.',
  //         status: 'error',
  //         duration: 3000,
  //         isClosable: true,
  //       })
  //     }
  //   }
  // }

  return (
    <>
      {workoutsExercises?.map((workoutExercise) => (
        <Box
          key={workoutExercise.id}
          p={4}
          backdropBlur={'1rem'}
          backdropFilter="blur(5px)"
          rounded={'lg'}
          border={'1px'}
          bgColor={'whiteAlpha.50'}
          borderColor={'whiteAlpha.100'}
          boxShadow={'lg'}
        >
          <Stack direction={'column'} spacing={3} textColor={'whiteAlpha.800'}>
            <Center justifyContent={'center'} mb={3} flexDirection={'column'}>
              <Text
                textAlign={'center'}
                bgColor={'purple.700'}
                borderRadius={3}
                fontSize="sm"
                p={1}
              >
                {workoutExercise?.exercise?.muscleGroup}
              </Text>
              <Text fontSize="md" p={1}>
                {workoutExercise?.exercise?.name}
              </Text>
            </Center>

            <Table variant="unstyled" size={'sm'}>
              <Thead>
                <Tr borderBottom={'1px solid grey'}>
                  <Th textAlign={'center'} p={0} minW={'70px'}>
                    REPS
                  </Th>
                  <Th textAlign={'center'} p={0} minW={'70px'}>
                    Carga
                  </Th>
                  <Th textAlign={'center'} p={0} minW={'70px'}>
                    Tipo
                  </Th>
                  <Th textAlign={'center'} p={0} minW={'70px'}>
                    Reserva
                  </Th>
                </Tr>
              </Thead>
            </Table>

            {workoutExercise.sets &&
              workoutExercise.sets.map((set: ISet) => (
                <Box key={set.id}>
                  <Table variant="unstyled" size={'sm'}>
                    <Tbody>
                      <Tr>
                        <Td textAlign={'center'} p={0} minW={'70px'}>
                          {set.reps}
                        </Td>
                        <Td textAlign={'center'} p={0} minW={'70px'}>
                          {set.weight}
                        </Td>
                        <Td textAlign={'center'} p={0} minW={'70px'}>
                          {set.setType}
                        </Td>
                        <Td textAlign={'center'} p={0} minW={'70px'}>
                          {set.rir}
                        </Td>
                      </Tr>
                    </Tbody>
                  </Table>
                </Box>
              ))}

            {/* <chakra.h1 fontWeight={'medium'} fontSize="md" lineHeight={6}>
              <Flex>
                Carga: <Pen size={20} />
              </Flex>
              <Input
                key={exercise.id}
                defaultValue={exercise.weight}
                onBlur={(event) =>
                  handleUpdateExercise(event.target.value, exercise.id!)
                }
              />
              {errors[exercise.id!] && (
                <Text color={'red.500'} mt={3}>
                  {errors[exercise.id!]}
                </Text>
              )}
            </chakra.h1> */}
          </Stack>
        </Box>
      ))}
    </>
  )
}
