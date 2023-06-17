import { getUserToken } from '@/pages/api/providers/auth.provider'
import { ISet, deleteSet, updateSet } from '@/pages/api/providers/sets.provider'
import {
  Box,
  Input,
  useToast,
  Select,
  Table,
  Tr,
  Tbody,
  Td,
  Center,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { CloseButtonComponent } from '@/components/Buttons/CloseButtonComponent'
import { useWorkoutsExercisesStore } from '@/stores/OwnerStore/WorkoutsExercises'

interface SetsListProps {
  sets?: ISet[]
}

export default function SetsList({ sets }: SetsListProps) {
  const toast = useToast()
  const router = useRouter()
  const { workoutsExercises, setWorkoutsExercises } =
    useWorkoutsExercisesStore()
  const [reps, setReps] = useState<string | undefined>('')
  const [weight, setWeight] = useState<string | undefined>('')
  const [rir, setRir] = useState<string | undefined>('')
  const [setType, setSetType] = useState<string | undefined>('')

  const handleWithDeleteSet = async (id: string) => {
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

      const response = await deleteSet(token, id)

      if (response) {
        deleteSetFromWorkoutExercise(id)
      }
    } catch (error) {
      console.log(error)

      toast({
        title: 'Erro ao deletar série.',
        description: 'Não foi possível deletar a série.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  const deleteSetFromWorkoutExercise = (id: string) => {
    const updatedSets = workoutsExercises.map((workoutExercise) => {
      const sets = workoutExercise.sets?.filter((set) => set.id !== id)
      return {
        ...workoutExercise,
        sets,
      }
    })
    setWorkoutsExercises(updatedSets)
  }

  const handleWithUpdateSet = async (id: string) => {
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

      const response = await updateSet(token, id, {
        reps: reps || undefined,
        weight: weight || undefined,
        setType: setType || undefined,
        rir: rir || undefined,
      })

      if (response) {
        updateSetFromWorkoutExercise(id, response)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const updateSetFromWorkoutExercise = (id: string, setResponse: ISet) => {
    const updatedSets = workoutsExercises.map((workoutExercise) => {
      const updatedSet = workoutExercise.sets?.map((set) => {
        if (set.id === id) {
          return setResponse
        }
        return set
      })

      return {
        ...workoutExercise,
        sets: updatedSet,
      }
    })

    setWorkoutsExercises(updatedSets)
  }

  return (
    <>
      {sets?.map((set: ISet) => [
        <Box key={set.id}>
          <Table variant="unstyled" size={'sm'}>
            <Tbody>
              <Tr>
                <Td textAlign={'center'} p={0} maxW={'2rem'} minW={'2rem'}>
                  <Input
                    p={0}
                    m={0}
                    border={'none'}
                    w={'20'}
                    textAlign={'center'}
                    defaultValue={set.reps}
                    onChange={(event) => setReps(event.target.value)}
                    onBlur={() => handleWithUpdateSet(set.id!)}
                  />
                </Td>
                <Td textAlign={'center'} p={0} maxW={'2rem'} minW={'2rem'}>
                  <Input
                    p={0}
                    m={0}
                    border={'none'}
                    w={'20'}
                    textAlign={'center'}
                    defaultValue={set.weight}
                    onChange={(event) => setWeight(event.target.value)}
                    onBlur={() => handleWithUpdateSet(set.id!)}
                  />
                </Td>

                <Td textAlign={'center'} p={0} maxW={'2rem'} minW={'2rem'}>
                  <Center>
                    <Select
                      p={0}
                      m={0}
                      border={'none'}
                      textAlign={'center'}
                      defaultValue={set.setType}
                      onChange={(event) => setSetType(event.target.value)}
                      onBlur={() => handleWithUpdateSet(set.id!)}
                    >
                      <option
                        style={{ backgroundColor: '#322659' }}
                        value=""
                        disabled
                      >
                        {set.setType}
                      </option>
                      <option
                        style={{ backgroundColor: '#322659' }}
                        value="REGULAR"
                      >
                        REGULAR
                      </option>
                      <option
                        style={{ backgroundColor: '#322659' }}
                        value="DROP_SET"
                      >
                        DROP_SET
                      </option>
                      <option
                        style={{ backgroundColor: '#322659' }}
                        value="BI_SET"
                      >
                        BI_SET
                      </option>
                    </Select>
                  </Center>
                </Td>

                <Td textAlign={'center'} p={0} maxW={'2rem'} minW={'2rem'}>
                  <Input
                    p={0}
                    m={0}
                    border={'none'}
                    w={'20'}
                    textAlign={'center'}
                    defaultValue={set.rir}
                    onChange={(event) => setRir(event.target.value)}
                    onBlur={() => handleWithUpdateSet(set.id!)}
                  />
                </Td>

                <Td
                  borderRadius={3}
                  textAlign={'center'}
                  p={0}
                  maxW={'1rem'}
                  minW={'1rem'}
                >
                  <CloseButtonComponent
                    onClick={() => handleWithDeleteSet(set.id!)}
                  />
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </Box>,
      ])}
    </>
  )
}
