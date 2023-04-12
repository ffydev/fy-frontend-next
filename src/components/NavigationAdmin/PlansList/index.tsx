import { getUserToken } from '@/pages/api/providers/auth.provider'
import { IPlanType } from '@/pages/api/providers/plans-types.provider'
import { IPlan, updatePlan } from '@/pages/api/providers/plans.provider'
import {
  Box,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  SimpleGrid,
  Tag,
  Text,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { SelectUpdate } from '../../Select/SelectUpdate'

interface PlanListProps {
  plan: IPlan
  planTypes: IPlanType[]
}

export default function PlanList({ plan, planTypes }: PlanListProps) {
  const router = useRouter()
  const [initDate, setInitDate] = useState<string>()
  const [endDate, setEndDate] = useState<string>()
  const [planTypeId, setPlanTypeId] = useState<string | undefined>()

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

          <Flex justify={'space-between'}>
            <Editable
              defaultValue={new Date(plan.initDate!).toLocaleDateString()}
            >
              <Flex>
                <Text mt={1} mr={1}>
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
              defaultValue={new Date(plan.endDate!).toLocaleDateString()}
            >
              <Flex>
                <Text mt={1} mr={1}>
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

          <SelectUpdate
            tag={'Tipo de Plano'}
            value={planTypeId!}
            id={plan.id!}
            setValue={setPlanTypeId}
            onBlurAction={() => handleUpdatePlan(plan.id!)}
            defaultName={plan.planType?.name!}
            valuesMap={planTypes}
          />
        </Box>
      </SimpleGrid>
    </>
  )
}
