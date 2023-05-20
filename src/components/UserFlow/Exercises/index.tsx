import { IWorkoutsExercises } from '@/pages/api/providers/workoutsExercises.provider'
import { Box, Center, chakra, Flex, Stack } from '@chakra-ui/react'
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
          <Stack
            direction={'column'}
            spacing={5}
            w={'full'}
            textColor={'whiteAlpha.800'}
          >
            <Center>
              <chakra.h1
                textColor={'whiteAlpha.800'}
                bgColor={'purple.700'}
                borderRadius={3}
                px={2}
                fontWeight={'medium'}
                fontSize="sm"
                lineHeight={6}
              >
                {workoutExercise?.exercise?.muscleGroup}
              </chakra.h1>
            </Center>

            <chakra.h1 fontWeight={'medium'} fontSize="md" lineHeight={6}>
              {workoutExercise?.exercise?.name}
            </chakra.h1>

            <Flex justifyContent={'space-between'}>
              <chakra.h1 fontWeight={'thin'}>Repetições</chakra.h1>
              <chakra.h1 fontWeight={'thin'}>Carga</chakra.h1>
              <chakra.h1 fontWeight={'thin'}>Tipo</chakra.h1>
              <chakra.h1 fontWeight={'thin'}>Reserva</chakra.h1>
            </Flex>

            {workoutExercise.sets &&
              workoutExercise.sets.map((set: ISet) => (
                <Box key={set.id}>
                  <Flex justifyContent={'space-between'}>
                    <chakra.h1
                      fontWeight={'medium'}
                      fontSize="md"
                      lineHeight={6}
                    >
                      {set.reps}
                    </chakra.h1>

                    <chakra.h1
                      fontWeight={'medium'}
                      fontSize="md"
                      lineHeight={6}
                    >
                      {set.weight}
                    </chakra.h1>

                    <chakra.h1
                      fontWeight={'medium'}
                      fontSize="md"
                      lineHeight={6}
                    >
                      {set.setType}
                    </chakra.h1>

                    <chakra.h1
                      fontWeight={'medium'}
                      fontSize="md"
                      lineHeight={6}
                    >
                      {set.rir}
                    </chakra.h1>
                  </Flex>
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
