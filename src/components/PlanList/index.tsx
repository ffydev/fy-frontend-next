import { getUserToken } from '@/pages/api/providers/auth.provider'
import { IPlanType } from '@/pages/api/providers/plans-types.provider'
import {
  IPlanInterface,
  updatePlan,
} from '@/pages/api/providers/plans.provider'
import {
  Box,
  chakra,
  Editable,
  EditableInput,
  EditablePreview,
  FormControl,
  FormLabel,
  Select,
  SimpleGrid,
  Tag,
  Text,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useState } from 'react'

interface PlanListProps {
  plans: IPlanInterface[]
  planTypes: IPlanType[]
}

export default function PlanList({ plans, planTypes }: PlanListProps) {
  const router = useRouter()
  const [initDate, setInitDate] = useState<string>()
  const [endDate, setEndDate] = useState<string>()
  const [planTypeId, setPlanTypeId] = useState<string>()

  const handleUpdatePlan = async (planId: string) => {
    try {
      const token = getUserToken()

      if (!token) {
        // Implementar mensagem personalizada
        router.push('/login')
        return
      }

      await updatePlan(token, planId, {
        initDate: initDate ? initDate.toString() : undefined,
        endDate: endDate ? endDate.toString() : undefined,
        planTypeId,
      })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <SimpleGrid columns={1} mt={10} mb={4}>
        <Box mb={4}>
          <Text>Acompanhamento</Text>
        </Box>
        {plans.map((plan: IPlanInterface) => (
          <Box
            key={plan.id}
            p={3}
            width="100%"
            rounded={'lg'}
            border={'1px'}
            bgColor={'whiteAlpha.50'}
            borderColor={'whiteAlpha.100'}
            boxShadow={'lg'}
          >
            <chakra.h1 fontSize="lg" lineHeight={6} mt={2}>
              <Tag size={'md'} colorScheme={'orange'} variant={'subtle'}>
                Início:
              </Tag>
              <Editable
                defaultValue={new Date(plan.initDate!).toLocaleDateString()}
              >
                <EditablePreview />
                <EditableInput
                  type="date"
                  value={initDate}
                  onChange={(event) => setInitDate(event.target.value)}
                  onBlur={() => handleUpdatePlan(plan.id!)}
                />
              </Editable>
            </chakra.h1>

            <chakra.h1 fontSize="lg" lineHeight={6} mt={2}>
              <Tag size={'md'} colorScheme={'orange'} variant={'subtle'}>
                Fim:
              </Tag>
              <Editable
                defaultValue={new Date(plan.endDate!).toLocaleDateString()}
              >
                <EditablePreview />
                <EditableInput
                  type="date"
                  value={endDate}
                  onChange={(event) => setEndDate(event.target.value)}
                  onBlur={() => handleUpdatePlan(plan.id!)}
                />
              </Editable>
            </chakra.h1>

            <FormControl mt={2} isRequired>
              <FormLabel>
                <Tag size={'md'} colorScheme={'orange'} variant={'subtle'}>
                  Tipo de Plano:
                </Tag>
              </FormLabel>
              <Select
                size={'sm'}
                rounded={'lg'}
                variant={'filled'}
                value={planTypeId}
                onChange={(event) => setPlanTypeId(event.target.value)}
                onBlur={() => handleUpdatePlan(plan.id!)}
              >
                <option>{plan.planType?.name}</option>
                {planTypes.map((planType: IPlanType) => (
                  <option
                    key={planType.id}
                    value={planType.id ? planType.id : plan.planType?.id}
                  >
                    {planType.name}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Box>
        ))}
      </SimpleGrid>
    </>
  )
}
