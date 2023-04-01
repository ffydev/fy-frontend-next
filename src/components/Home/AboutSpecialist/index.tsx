import { Avatar, Box, Container, Flex, chakra, Stack } from '@chakra-ui/react'

export default function AboutSpecialist() {
  const textHeading = {
    heading1: 'André Senna',
    heading2:
      'Se você segue sem uma direção ou sem saber o que analisar para identificar seu progresso, tenha a certeza de que você vai se sentir perdido.',
    heading3:
      'Largue o treino intuitivo, sem direção, e saia de casa sabendo o que irá fazer, volte para casa sabendo o que foi feito e apure semanalmente se você tem evoluído. Seu esforço só vale a pena se este for aplicado na direção certa.',
    heading4: 'Bons treinos e conte comigo!',
    heading5: '@andremsena',
  }
  return (
    <>
      <Container maxW={'7xl'} p={8}>
        <Stack direction={{ base: 'column', md: 'row' }}>
          <Flex flex={1} justifyContent="center" align="center">
            <Box p={6}>
              <Stack
                spacing={2}
                w={'full'}
                maxW={'lg'}
                textAlign={{ base: 'center', md: 'left' }}
              >
                <chakra.h1
                  fontSize={['2xl', '4xl']}
                  lineHeight={1.4}
                  fontWeight="bold"
                  color={'whiteAlpha.900'}
                >
                  {textHeading.heading1}
                </chakra.h1>
                <chakra.h2
                  color="whiteAlpha.800"
                  fontSize={['lg', 'xl']}
                  lineHeight={1.4}
                >
                  {textHeading.heading2}
                </chakra.h2>
                <chakra.h2
                  color="whiteAlpha.800"
                  fontSize={['lg', 'xl']}
                  lineHeight={1.4}
                >
                  {textHeading.heading3}
                </chakra.h2>
                <chakra.h2
                  color="whiteAlpha.800"
                  fontSize={['lg', 'xl']}
                  lineHeight={1.4}
                >
                  {textHeading.heading4}
                </chakra.h2>
                <chakra.h2
                  color="whiteAlpha.500"
                  fontSize={['lg', 'xl']}
                  lineHeight={1.2}
                >
                  {textHeading.heading5}
                </chakra.h2>
              </Stack>
            </Box>
          </Flex>
          <Flex flex={1} align={'center'} justify={'center'}>
            <Avatar
              src={'/andresena.webp'}
              size="3xl"
              loading={'lazy'}
              shadow={'dark-lg'}
            />
          </Flex>
        </Stack>
      </Container>
    </>
  )
}
