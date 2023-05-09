import { getUserToken } from '@/pages/api/providers/auth.provider'
import { IPlanType } from '@/pages/api/providers/plans-types.provider'
import { IPlan, updatePlan } from '@/pages/api/providers/plans.provider'
import {
  Box,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  FormControl,
  FormLabel,
  Select,
  SimpleGrid,
  Tag,
  Text,
  useToast,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useState } from 'react'

interface PlanListProps {
  plan: IPlan
  planTypes: IPlanType[]
}

export default function PlanList({ plan, planTypes }: PlanListProps) {
  const router = useRouter()
  const [initDate, setInitDate] = useState<string>()
  const [endDate, setEndDate] = useState<string>()
  const [planTypeId, setPlanTypeId] = useState<string | undefined>()
  const toast = useToast()

  const handleUpdatePlan = async (planId: string) => {
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

      await updatePlan(token, planId, {
        initDate: initDate ? initDate.toString() : undefined,
        endDate: endDate ? endDate.toString() : undefined,
        planTypeId: planTypeId !== '' ? planTypeId : undefined,
      })
      setInitDate(undefined)
      setEndDate(undefined)
      setPlanTypeId(undefined)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <SimpleGrid columns={1} mt={2}>
        <Box
          p={3}
          width="100%"
          rounded={'lg'}
          border={'1px'}
          bgColor={'whiteAlpha.50'}
          borderColor={'whiteAlpha.100'}
          boxShadow={'lg'}
        >
          <Tag mb={3} size={'md'} bgGradient={'gray'} variant={'subtle'}>
            Plano
          </Tag>

          <Flex justify={'space-between'} direction={['column', 'row']}>
            <Editable
              defaultValue={new Date(plan.initDate!).toLocaleDateString(
                'pt-BR',
              )}
            >
              <Flex>
                <Text mt={1} mr={1} fontWeight={'bold'}>
                  Início:
                </Text>
                <EditablePreview />
                <EditableInput
                  type="date"
                  value={initDate}
                  onChange={(event) => setInitDate(event.target.value)}
                  onBlur={() => handleUpdatePlan(plan.id!)}
                />
              </Flex>
            </Editable>

            <Editable
              defaultValue={new Date(plan.endDate!).toLocaleDateString('pt-BR')}
            >
              <Flex>
                <Text mt={1} mr={1} fontWeight={'bold'}>
                  Final:
                </Text>
                <EditablePreview />
                <EditableInput
                  type="date"
                  value={endDate}
                  onChange={(event) => setEndDate(event.target.value)}
                  onBlur={() => handleUpdatePlan(plan.id!)}
                />
              </Flex>
            </Editable>
          </Flex>

          <FormControl mt={2}>
            <FormLabel>
              <Tag size={'md'} bgGradient={'gray'}>
                Tipo de Plano
              </Tag>
            </FormLabel>
            <Select
              bgGradient={'linear(to-r, gray.800, gray.900)'}
              variant={'filled'}
              rounded={'lg'}
              boxShadow={'lg'}
              focusBorderColor={'purple.400'}
              size={'md'}
              value={planTypeId}
              onChange={(event) => setPlanTypeId(event.target.value)}
              onBlur={() => handleUpdatePlan(plan.id!)}
            >
              <option style={{ backgroundColor: '#322659' }} value="">
                {plan?.planType?.name}
              </option>
              {planTypes.map((planType: any) => (
                <option
                  style={{ backgroundColor: '#322659' }}
                  key={planType.id}
                  value={planType.id}
                  onClick={() => setPlanTypeId(planType.id)}
                >
                  {planType.name}
                </option>
              ))}
            </Select>
          </FormControl>
        </Box>
      </SimpleGrid>
    </>
  )
}
