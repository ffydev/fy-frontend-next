import { Box, chakra, Container, HStack, Icon, Stack } from '@chakra-ui/react'

import { CheckFat } from '@phosphor-icons/react'

export default function Progression() {
  const planList = [
    'Mostra sua progressão de força ao longo das semanas.',
    'Fornece dados sobre seu volume de treinamento por exercício.',
    'Permite o registro de seu desempenho nos treinos, com repetições, carga e séries.',
    'Garante um diário de treino organizado',
    'Faz com que sua periodização seja baseada em dados',
  ]

  return (
    <>
      <Stack align={'center'} p={10} pt={20}>
        <chakra.h1
          fontSize={['2xl', '4xl']}
          lineHeight={1.2}
          fontWeight="bold"
          color={'whiteAlpha.900'}
        >
          O que você irá receber na Planilha?
        </chakra.h1>
      </Stack>
      <Box
        boxShadow={'lg'}
        bgColor={'whiteAlpha.200'}
        backdropBlur={'1rem'}
        backdropFilter="blur(10px)"
        border={'1px'}
        borderColor={'whiteAlpha.200'}
        rounded="2xl"
        p={8}
      >
        <Stack
          direction={{ base: 'column', md: 'row' }}
          justifyContent="center"
        >
          <Stack spacing={4}>
            <Stack spacing={2}>
              {planList.map((data, index) => (
                <HStack
                  key={index}
                  alignItems="center"
                  spacing={2}
                  fontSize="md"
                >
                  <Icon
                    as={CheckFat}
                    weight={'fill'}
                    size={24}
                    color="orange.400"
                  />
                  <chakra.h2
                    color="whiteAlpha.800"
                    fontSize={['lg', 'xl']}
                    lineHeight={1.2}
                  >
                    {data}
                  </chakra.h2>
                </HStack>
              ))}
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </>
  )
}
