import React, { useState } from 'react';
import { 
  Box, 
  Text,
  chakra,
  Editable,  
  EditablePreview, 
  EditableInput, 
  FormControl,  
  Select,
  FormLabel,   
} from '@chakra-ui/react';
import { useRouter } from 'next/router'
import { IPlanInterface, updatePlan } from '@/pages/api/providers/plan.provider';
import { IPlanTypeInterface } from '@/pages/api/providers/plan-type.provider';

interface PlanListProps {
  plans: IPlanInterface[];
  planTypes: IPlanTypeInterface[];
}

export default function PlanList ({ plans, planTypes }: PlanListProps) {
  const router= useRouter();
  const [ initDate, setInitDate ] = useState<string>();
  const [ endDate, setEndDate ] = useState<string>();
  const [ planTypeId, setPlanTypeId ] = useState<string>();  

  const handleUpdatePlan= async (planId: string) => {
    try {
      const token = localStorage.getItem('fyToken');

      if (!token) {
        router.push('/login');
        return;
      }
 
      await updatePlan(token, planId, {
        initDate: initDate ? initDate.toString(): undefined,
        endDate: endDate ? endDate.toString() : undefined,   
        planTypeId,            
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>   
      <Box mt={3}>
        <Text fontWeight='bold' pb={3}>
          Acompanhamento
        </Text>
        {plans.map((plan: IPlanInterface) => (
          <Box
            key={plan.id}
            p={3}
            width='100%'
            boxShadow={'lg'}
            bgGradient={[
              'linear(to-tr, gray.900 70.17%, purple.900 90.87%)',
              'linear(to-br, gray.900 50.17%, purple.900 90.87%)'
            ]}
            border='2px solid white'
            borderRadius='md'            
            minWidth='250px'
          >        

            <chakra.h1 fontSize='lg' lineHeight={6}>
              Início: 
              <Editable defaultValue={new Date(plan.initDate!).toLocaleDateString()}>
                <EditablePreview />
                <EditableInput                    
                  type="date"
                  value={initDate}
                  onChange={(event) => setInitDate(event.target.value)}
                  onBlur={() => handleUpdatePlan(plan.id!)} 
                />
              </Editable>
            </chakra.h1>

            <chakra.h1 fontSize='lg' lineHeight={6}>
              Fim: 
              <Editable defaultValue={new Date(plan.endDate!).toLocaleDateString()}>
                <EditablePreview />
                <EditableInput  
                  type="date"
                  value={endDate}
                  onChange={(event) => setEndDate(event.target.value)} 
                  onBlur={() => handleUpdatePlan(plan.id!)} 
                />
              </Editable>
            </chakra.h1>

            <FormControl mt={4} isRequired>
              <FormLabel>Tipo de Plano:</FormLabel>
              <Select
                value={planTypeId}
                onChange={(event) => setPlanTypeId(event.target.value)}
                onBlur={() => handleUpdatePlan(plan.id!)} 
              >
                <option>{plan.planType?.name}</option>
                {planTypes.map((planType: IPlanTypeInterface) => (
                  <option key={planType.id} value={planType.id ? planType.id : plan.planType?.id}>
                    {planType.name}
                  </option>
                ))}
              </Select>
            </FormControl> 
          </Box>
        ))}
      </Box>
    </>
  )
}