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
  useToast,
  Input,
  Flex,
} from '@chakra-ui/react'
import { ISet, updateSet } from '@/pages/api/providers/sets.provider'
import z from 'zod'
import { useState } from 'react'
import { getUserToken } from '@/pages/api/providers/auth.provider'
import { useRouter } from 'next/router'

interface WorkoutsExercisesProps {
  workoutsExercises?: IWorkoutsExercises[]
}

export default function ExercisesList({
  workoutsExercises,
}: WorkoutsExercisesProps) {
  const router = useRouter()
  const toast = useToast()
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const schema = z.object({
    weight: z.coerce
      .number({
        invalid_type_error: 'Valor Inválido',
      })
      .max(800, { message: 'Valor Inválido' }),
  })

  const handleUpdateSets = async (weight: string, id: string) => {
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

    try {
      const parsedWeight = schema.parse({ weight })

      await updateSet(token, id, {
        weight: parsedWeight.weight.toString(),
      })

      setErrors((prevErrors) => ({ ...prevErrors, [id]: '' }))

      toast({
        title: 'Peso atualizado com sucesso.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [id]: (error as z.ZodError).errors[0].message,
        }))
      } else {
        console.error(error)
        toast({
          title: 'Erro ao atualizar peso.',
          description: 'Por favor, tente novamente.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
      }
    }
  }

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
          {workoutExercise &&
            workoutExercise?.workoutsExercisesNames &&
            workoutExercise?.workoutsExercisesNames?.map(
              (workoutExerciseName) => (
                <>
                  <Flex
                    key={workoutExerciseName.id}
                    flexWrap={'wrap'}
                    justifyContent={'start'}
                    alignItems={'center'}
                    mb={3}
                    mt={3}
                  >
                    <Text
                      textAlign={'center'}
                      bgColor={'purple.700'}
                      borderRadius={3}
                      fontSize="sm"
                      p={1}
                    >
                      {workoutExerciseName?.exercises?.muscleGroup}
                    </Text>
                    <Text fontSize="md" p={1}>
                      {workoutExerciseName?.exercises?.name}
                    </Text>
                  </Flex>
                </>
              ),
            )}

          <Stack direction={'column'} spacing={3} textColor={'whiteAlpha.800'}>
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
                        <Td
                          textAlign={'center'}
                          p={0}
                          minW={'2rem'}
                          maxW={'2rem'}
                        >
                          {set.reps}
                        </Td>

                        <Td
                          textAlign={'center'}
                          p={0}
                          minW={'2rem'}
                          maxW={'2rem'}
                        >
                          <Input
                            key={set.id}
                            defaultValue={set.weight}
                            onBlur={(event) =>
                              handleUpdateSets(event.target.value, set.id!)
                            }
                            textAlign={'center'}
                            p={0}
                            m={0}
                            maxW={'14'}
                          />
                          {errors[set.id!] && (
                            <Text color={'red.500'} mt={3}>
                              {errors[set.id!]}
                            </Text>
                          )}
                        </Td>

                        <Td
                          textAlign={'center'}
                          p={0}
                          minW={'2rem'}
                          maxW={'2rem'}
                        >
                          {set.setType}
                        </Td>
                        <Td
                          textAlign={'center'}
                          p={0}
                          minW={'2rem'}
                          maxW={'2rem'}
                        >
                          {set.rir}
                        </Td>
                      </Tr>
                    </Tbody>
                  </Table>
                </Box>
              ))}
          </Stack>
        </Box>
      ))}
    </>
  )
}
