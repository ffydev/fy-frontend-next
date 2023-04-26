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
  Pulse,
  HandHeart,
  ArrowFatRight,
  PersonSimpleRun,
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
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
              <RevealWrapper
                rotate={{ x: 12, y: 40, z: 0 }}
                origin="bottom"
                delay={500}
                duration={500}
                distance="500px"
                reset={true}
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
                    <Pulse size={'4em'} weight={'fill'} color="#8059D4" />
                  </Box>
                  <Box>
                    <Box>
                      <Heading
                        mt={3}
                        as={'h1'}
                        fontSize={'2xl'}
                        textAlign={'left'}
                      >
                        {garantiaText.heading1}
                      </Heading>
                      <Text
                        mt={3}
                        as={'h2'}
                        textAlign={'left'}
                        color={'purple.200'}
                      >
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
                      size="sm"
                      rightIcon={<ArrowFatRight size={16} weight="fill" />}
                      shadow={'dark-lg'}
                      style={{ textDecoration: 'none' }}
                      bgGradient={'linear(to-r, purple.400, purple.500)'}
                      _hover={{
                        bgGradient: 'linear(to-r, purple.500, purple.600)',
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
                origin="bottom"
                delay={550}
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
                    <HandHeart size={'4em'} weight={'fill'} color="#8059D4" />
                  </Box>
                  <Box>
                    <Box>
                      <Heading
                        mt={3}
                        as={'h1'}
                        fontSize={'2xl'}
                        textAlign={'left'}
                      >
                        {garantiaText.heading2}
                      </Heading>
                      <Text
                        mt={3}
                        as={'h2'}
                        textAlign={'left'}
                        color={'purple.200'}
                      >
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
                      size="sm"
                      rightIcon={<ArrowFatRight size={16} weight="fill" />}
                      shadow={'dark-lg'}
                      style={{ textDecoration: 'none' }}
                      bgGradient={'linear(to-r, purple.400, purple.500)'}
                      _hover={{
                        bgGradient: 'linear(to-r, purple.500, purple.600)',
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
                origin="bottom"
                delay={600}
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
                    <PersonSimpleRun
                      size={'4em'}
                      weight={'fill'}
                      color="#8059D4"
                    />
                  </Box>
                  <Box>
                    <Box>
                      <Heading
                        mt={3}
                        as={'h1'}
                        fontSize={'2xl'}
                        textAlign={'left'}
                      >
                        {garantiaText.heading3}
                      </Heading>
                      <Text
                        mt={3}
                        as={'h2'}
                        textAlign={'left'}
                        color={'purple.200'}
                      >
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
                      size="sm"
                      rightIcon={<ArrowFatRight size={16} weight="fill" />}
                      shadow={'dark-lg'}
                      style={{ textDecoration: 'none' }}
                      bgGradient={'linear(to-r, purple.400, purple.500)'}
                      _hover={{
                        bgGradient: 'linear(to-r, purple.500, purple.600)',
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
