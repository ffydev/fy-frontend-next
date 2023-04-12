import { getUserToken } from '@/pages/api/providers/auth.provider'
import { IPlanType } from '@/pages/api/providers/plans-types.provider'
import { IPlan, updatePlan } from '@/pages/api/providers/plans.provider'
import {
  Box,
  Center,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  SimpleGrid,
  Tag,
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
          <Center>
            <Tag mb={3} size={'md'} colorScheme={'gray'} variant={'subtle'}>
              PLANO
            </Tag>
          </Center>
          <Flex justify={'space-between'}>
            <Tag size={'md'} colorScheme={'gray'} variant={'subtle'}>
              INÍCIO:
            </Tag>
            <Editable
              mr={5}
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

            <Tag size={'md'} colorScheme={'gray'} variant={'subtle'}>
              FIM:
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
          </Flex>

          <SelectUpdate
            tag={'TIPO DE PLANO'}
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
