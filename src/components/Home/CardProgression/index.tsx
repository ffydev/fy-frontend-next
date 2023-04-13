import {
  Box,
  Flex,
  Heading,
  SimpleGrid,
  Stack,
  VStack,
  Text,
  Button,
  Link,
} from '@chakra-ui/react'
import {
  NotePencil,
  HandHeart,
  Barbell,
  ArrowFatRight,
} from '@phosphor-icons/react'
import { RevealWrapper } from 'next-reveal'

export default function CardProgression() {
  const garantiaText = {
    heading1: 'Monitoramento',
    text1:
      'Não perca mais tempo com monitoramento manual de desempenho. Nosso sistema automatizado oferece informações precisas e atualizadas sobre a performance do seu negócio.',
    heading2: 'Benefícios',
    text2:
      'Obtenha uma visão completa e em tempo real do desempenho do seu progresso com nosso sistema de monitoramento de performance. Identifique áreas de melhoria e tome decisões mais informadas e estratégicas para aumentar seus resultados',
    heading3: 'Performance',
    text3:
      'Você pode acompanhar métricas importantes e compará-las com as que você já tem, permitindo que você mantenha sua a eficiência e a produtividade do dia a dia.',
  }
  return (
    <>
      <Stack direction="column" alignItems="center" pt={20}>
        <Box>
          <Flex
            justifyContent={{ base: 'center', md: 'center' }}
            direction={{ base: 'column-reverse', md: 'column' }}
          >
            <SimpleGrid columns={{ base: 2, md: 3 }} spacing={6}>
              <RevealWrapper
                rotate={{ x: 12, y: 40, z: 0 }}
                origin="left"
                delay={350}
                duration={500}
                distance="500px"
                reset={true}
                viewOffset={{ top: 25, right: 0, bottom: 10, left: 5 }}
              >
                <VStack
                  align={'left'}
                  py={5}
                  p={5}
                  boxShadow={'lg'}
                  bgColor={'whiteAlpha.200'}
                  backdropBlur={'1rem'}
                  backdropFilter="blur(10px)"
                  border={'1px'}
                  borderColor={'whiteAlpha.200'}
                  rounded="2xl"
                  _hover={{
                    bgColor: 'blackAlpha.600',
                    transition: '0.5s ease-in-out',
                  }}
                >
                  <Box>
                    <NotePencil size={'4em'} weight={'fill'} />
                  </Box>
                  <Box>
                    <Box>
                      <Heading
                        mt={3}
                        as={'h1'}
                        fontSize={'2xl'}
                        color={'orange.300'}
                        textAlign={'left'}
                      >
                        {garantiaText.heading1}
                      </Heading>
                      <Text mt={3} as={'h2'} textAlign={'left'}>
                        {garantiaText.text1}
                      </Text>
                    </Box>
                  </Box>
                  <Stack
                    pt={3}
                    marginInline="auto"
                    spacing={{ base: 8, md: 0 }}
                    direction={{ base: 'column', md: 'row' }}
                  >
                    <Button
                      as={Link}
                      href={'#'}
                      rounded="full"
                      shadow={'dark-lg'}
                      style={{ textDecoration: 'none' }}
                      size="sm"
                      rightIcon={<ArrowFatRight size={16} weight="fill" />}
                      bgGradient="linear(to-r, blackAlpha.800, blackAlpha.900)"
                      _hover={{
                        bgGradient:
                          'linear(to-r, blackAlpha.700, blackAlpha.800)',
                        border: '1px',
                        transform: 'scale(1.1)',
                        transition: '0.5s',
                      }}
                    >
                      Saiba mais
                    </Button>
                  </Stack>
                </VStack>
              </RevealWrapper>
              <RevealWrapper
                rotate={{ x: 12, y: 40, z: 0 }}
                origin="left"
                delay={400}
                duration={500}
                distance="500px"
                reset={true}
                viewOffset={{ top: 25, right: 0, bottom: 10, left: 5 }}
              >
                <VStack
                  align={'left'}
                  py={5}
                  p={5}
                  boxShadow={'lg'}
                  bgColor={'whiteAlpha.200'}
                  backdropBlur={'1rem'}
                  backdropFilter="blur(10px)"
                  border={'1px'}
                  borderColor={'whiteAlpha.200'}
                  rounded="2xl"
                  _hover={{
                    bgColor: 'blackAlpha.600',
                    transition: '0.5s ease-in-out',
                  }}
                >
                  <Box>
                    <HandHeart size={'4em'} weight={'fill'} />
                  </Box>
                  <Box>
                    <Box>
                      <Heading
                        mt={3}
                        as={'h1'}
                        fontSize={'2xl'}
                        color={'orange.300'}
                        textAlign={'left'}
                      >
                        {garantiaText.heading2}
                      </Heading>
                      <Text mt={3} as={'h2'} textAlign={'left'}>
                        {garantiaText.text2}
                      </Text>
                    </Box>
                  </Box>
                  <Stack
                    pt={3}
                    marginInline="auto"
                    spacing={{ base: 8, md: 0 }}
                    direction={{ base: 'column', md: 'row' }}
                  >
                    <Button
                      as={Link}
                      href={'#'}
                      rounded="full"
                      shadow={'dark-lg'}
                      style={{ textDecoration: 'none' }}
                      size="sm"
                      rightIcon={<ArrowFatRight size={16} weight="fill" />}
                      bgGradient="linear(to-r, blackAlpha.800, blackAlpha.900)"
                      _hover={{
                        bgGradient:
                          'linear(to-r, blackAlpha.700, blackAlpha.800)',
                        border: '1px',
                        transform: 'scale(1.1)',
                        transition: '0.5s',
                      }}
                    >
                      Saiba mais
                    </Button>
                  </Stack>
                </VStack>
              </RevealWrapper>
              <RevealWrapper
                rotate={{ x: 12, y: 40, z: 0 }}
                origin="left"
                delay={450}
                duration={500}
                distance="500px"
                reset={true}
                viewOffset={{ top: 25, right: 0, bottom: 10, left: 5 }}
              >
                <VStack
                  align={'left'}
                  py={5}
                  p={5}
                  boxShadow={'lg'}
                  bgColor={'whiteAlpha.200'}
                  backdropBlur={'1rem'}
                  backdropFilter="blur(10px)"
                  border={'1px'}
                  borderColor={'whiteAlpha.200'}
                  rounded="2xl"
                  _hover={{
                    bgColor: 'blackAlpha.600',
                    transition: '0.5s ease-in-out',
                  }}
                >
                  <Box>
                    <Barbell size={'4em'} weight={'fill'} />
                  </Box>
                  <Box>
                    <Box>
                      <Heading
                        mt={3}
                        as={'h1'}
                        fontSize={'2xl'}
                        color={'orange.300'}
                        textAlign={'left'}
                      >
                        {garantiaText.heading3}
                      </Heading>
                      <Text mt={3} as={'h2'} textAlign={'left'}>
                        {garantiaText.text3}
                      </Text>
                    </Box>
                  </Box>
                  <Stack
                    pt={3}
                    marginInline="auto"
                    spacing={{ base: 8, md: 0 }}
                    direction={{ base: 'column', md: 'row' }}
                  >
                    <Button
                      as={Link}
                      href={'#'}
                      rounded="full"
                      shadow={'dark-lg'}
                      style={{ textDecoration: 'none' }}
                      size="sm"
                      rightIcon={<ArrowFatRight size={16} weight="fill" />}
                      bgGradient="linear(to-r, blackAlpha.800, blackAlpha.900)"
                      _hover={{
                        bgGradient:
                          'linear(to-r, blackAlpha.700, blackAlpha.800)',
                        border: '1px',
                        transform: 'scale(1.1)',
                        transition: '0.5s',
                      }}
                    >
                      Saiba mais
                    </Button>
                  </Stack>
                </VStack>
              </RevealWrapper>
            </SimpleGrid>
          </Flex>
        </Box>
      </Stack>
    </>
  )
}
