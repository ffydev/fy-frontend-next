import { Box, chakra, Container, HStack, Stack, Text } from '@chakra-ui/react';

export default function Progression() {
  const planList = [
    'Mostra sua progressão de força ao longo das semanas.',
    'Fornece dados sobre seu volume de treinamento por exercício.',
    'Permite o registro de seu desempenho nos treinos, com repetições, carga e séries.',
    'Garante um diário de treino organizado',
    'Faz com que sua periodização seja baseada em dados',
  ];

  return (
    <Box bgGradient={'linear(to-r, blackAlpha.400, blackAlpha.500, orange.500)'}>
      <Container maxW='5xl' p={{ base: 4, sm: 10 }}>
        <Stack align={'center'} p={8}>
          <chakra.h1
            fontSize='4xl'
            lineHeight={1.2}
            fontWeight='bold'
            color={'whiteAlpha.900'}
          >
            O que você irá receber na Planilha?
          </chakra.h1>
        </Stack>
        <Box
          boxShadow={'lg'}
          bgColor={'whiteAlpha.200'}
          backdropBlur={'1rem'}
          backdropFilter='blur(10px)'
          border={'1px'}
          borderColor={'whiteAlpha.200'}
          overflow='hidden'
          rounded='2xl'
          p={{ base: 4, sm: 8 }}
        >
          <Stack direction={{ base: 'column', md: 'row' }} justifyContent='center'>
            <Stack spacing={4}>
              <Stack spacing={2}>
                {planList.map((data, index) => (
                  <HStack key={index} alignItems='center' spacing={1} fontSize='md'>
                    {/* <Icon as={GiCheckMark} w={5} h={5} color='orange.400' /> */}
                    <Text color='whiteAlpha.800' fontSize='xl' lineHeight={1.2}>
                      {data}
                    </Text>
                  </HStack>
                ))}
              </Stack>
            </Stack>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
