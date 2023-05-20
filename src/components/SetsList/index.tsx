import { getUserToken } from "@/pages/api/providers/auth.provider"
import { ISet, deleteSet, updateSet } from "@/pages/api/providers/sets.provider"
import { useOwnerIsFetchingStore } from "@/stores/OwnerStore/IsFetching"
import { Box, Input, Flex, Spacer, CloseButton, useToast, Select } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { useState } from "react"

interface SetsListProps {
  sets?: ISet[]
}

export default function SetsList({ sets }: SetsListProps) {
  const toast = useToast()
  const router = useRouter()
  const { setIsFetchingWorkouts } =
    useOwnerIsFetchingStore()
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

      await deleteSet(token, id)
      setIsFetchingWorkouts()
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

      await updateSet(token, id, {
        reps: reps ? reps : undefined,
        weight: weight ? weight : undefined,
        setType: setType ? setType : undefined,
        rir: rir ? rir : undefined,
      })

      setIsFetchingWorkouts()

    } catch (error) {
      console.log(error)
    }
  }


  return (
    <>
      {sets?.map((set: ISet) => (
        [
          <Box key={set.id}>
            <Flex justifyContent={'space-evenly'}>
              <Input
                defaultValue={set.reps}
                textColor={'whiteAlpha.800'}
                borderRadius={3}
                fontWeight={'medium'}
                fontSize="sm"
                onChange={(event) => setReps(event.target.value)}
                onBlur={() => handleWithUpdateSet(set.id!)}
              />

              <Input
                defaultValue={set.weight}
                textColor={'whiteAlpha.800'}
                borderRadius={3}
                fontWeight={'medium'}
                fontSize="sm"
                onChange={(event) => setWeight(event.target.value)}
                onBlur={() => handleWithUpdateSet(set.id!)}
              />

              <Select
                bgGradient={'transparent'}
                onChange={(event) => setSetType(event.target.value)}
                onBlur={() => handleWithUpdateSet(set.id!)}
                defaultValue={set.setType}
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
                  Regular
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

              <Input
                defaultValue={set.rir}
                textColor={'whiteAlpha.800'}
                borderRadius={3}
                fontWeight={'medium'}
                fontSize="sm"
                onChange={(event) => setRir(event.target.value)}
                onBlur={() => handleWithUpdateSet(set.id!)}
              />

              <Spacer />
              <CloseButton
                onClick={() => handleWithDeleteSet(set.id!)}
                size="sm"
              />

            </Flex>
          </Box>
        ]
      ))}
    </>
  )
}