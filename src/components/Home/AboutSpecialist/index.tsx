import {
  Avatar,
  Box,
  Container,
  Flex,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react'

export default function AboutSpecialist() {
  const textHeading = {
    heading1: 'André Senna',
    heading2:
      'Se você segue sem uma direção ou sem saber o que analisar para identificar seu progresso, tenha a certeza de que você vai se sentir perdido.',
    heading3:
      'O esforço inteligente é bem direcionado. Do iniciante ao avançado, um diário de treino é essencial na rotina. Através de uma ferramenta assim você consegue obter dados sobre sua força e seu desempenho nos treinos com um simples registro, que pode ser feito através de seu celular, entre os descansos.',
    heading4: '“bene curris sed extra viam”',
    heading5:
      'Largue o treino intuitivo, sem direção, e saia de casa sabendo o que irá fazer, volte para casa sabendo o que foi feito e apure semanalmente se você tem evoluído. Seu esforço só vale a pena se este for aplicado na direção certa.',
    heading6: 'Bons treinos e conte comigo!',
    heading7: '@andremsena',
  }
  return (
    <Box bgGradient={'linear(to-l, orange.500, blackAlpha.400)'}>
      <Container maxW={'7xl'} p={8}>
        <Stack direction={{ base: 'column', md: 'row' }}>
          <Flex flex={1} justifyContent='center' align='center'>
            <Box p={6}>
              <Stack
                spacing={2}
                w={'full'}
                maxW={'lg'}
                textAlign={{ base: 'center', md: 'left' }}
              >
                <Heading
                  fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }}
                  textShadow={'#000 1px 1px'}
                >
                  {textHeading.heading1}
                </Heading>
                <Text
                  fontSize={{ base: 'sm', lg: 'lg' }}
                  color={'whiteAlpha.800'}
                >
                  {textHeading.heading2}
                </Text>
                <Text
                  fontSize={{ base: 'sm', lg: 'lg' }}
                  color={'whiteAlpha.800'}
                >
                  {textHeading.heading3}
                </Text>
                <Text
                  fontSize={{ base: 'md', lg: 'lg' }}
                  color={'whiteAlpha.800'}
                >
                  {textHeading.heading4}
                </Text>
                <Text
                  fontSize={{ base: 'md', lg: 'lg' }}
                  color={'whiteAlpha.800'}
                >
                  {textHeading.heading5}
                </Text>
                <Text
                  fontSize={{ base: 'md', lg: 'lg' }}
                  color={'whiteAlpha.800'}
                >
                  {textHeading.heading6}
                </Text>
                <Text
                  fontSize={{ base: 'md', lg: 'lg' }}
                  color={'whiteAlpha.800'}
                >
                  {textHeading.heading7}
                </Text>
              </Stack>
            </Box>
          </Flex>
          <Flex flex={1} align={'center'} justify={'center'}>
            <Avatar
              src={'/andresena.webp'}
              size={'6xl'}
              loading={'lazy'}
              border={'8px'}
              borderColor={'whiteAlpha.900'}
            />
          </Flex>
        </Stack>
      </Container>
    </Box>
  )
}
