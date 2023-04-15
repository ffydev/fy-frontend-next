import { Box, chakra, Container, Flex, Stack } from '@chakra-ui/react'
import FormPlanilha from '../FormPlanilha'
import Progression from '../Progression'
import AboutSpecialist from '../AboutSpecialist'
import Navbar from '../Navbar'
import ScrollDown from '../ScrollDown'
import CardProgression from '../CardProgression'
import Footer from '../Footer'
import { RevealWrapper } from 'next-reveal'
import { StudentDepoiment } from '../StudentDepoiment'

export function Header() {
  return (
    <>
      <Box
        bgGradient={
          'radial(circle, rgba(97,36,182,1) 0%, rgba(57,35,98,1) 33%, rgba(47,37,70,1) 71%)'
        }
      >
        <Stack pos="relative" w="100%">
          <Box
            bgImage={
              'https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80'
            }
            pos={'relative'}
            bgPosition={'center'}
            bgRepeat={'no-repeat'}
            bgSize={'cover'}
            opacity={'0.3'}
            height={'35rem'}
            bgPos={'center'}
          ></Box>
        </Stack>
        <Box isolation="isolate" zIndex={3} mt="-34rem" marginInline="auto">
          <Navbar />
          <Container maxW={'7xl'}>
            <Box
              maxW="5xl"
              p={4}
              isolation="isolate"
              zIndex={3}
              mt="5rem"
              marginInline="auto"
            >
              <Box
                boxShadow={'lg'}
                bgColor={'whiteAlpha.200'}
                backdropBlur={'1rem'}
                backdropFilter="blur(10px)"
                border={'1px'}
                borderColor={'whiteAlpha.200'}
                rounded="2xl"
                p={{ base: 4, sm: 8 }}
              >
                <Stack
                  pos="relative"
                  direction={{ base: 'column', md: 'row' }}
                  zIndex={1}
                  spacing={5}
                  textAlign="center"
                >
                  <Flex flex={1} p={8} align="center" justify="center">
                    <Stack
                      pos="relative"
                      direction={'column'}
                      zIndex={1}
                      spacing={5}
                      textAlign="left"
                    >
                      <RevealWrapper
                        rotate={{ x: 12, y: 40, z: 0 }}
                        origin="top"
                        delay={200}
                        duration={500}
                        distance="500px"
                        reset={true}
                        viewOffset={{ top: 25, right: 0, bottom: 10, left: 5 }}
                      >
                        <chakra.h1
                          fontSize={['2xl', '4xl']}
                          lineHeight={1.2}
                          fontWeight="bold"
                          color={'whiteAlpha.900'}
                        >
                          Tem dificuldade em acompanhar sua performance nos
                          treinos?
                        </chakra.h1>
                      </RevealWrapper>
                      <RevealWrapper
                        rotate={{ x: 12, y: 40, z: 0 }}
                        origin="top"
                        delay={300}
                        duration={500}
                        distance="500px"
                        reset={true}
                        viewOffset={{ top: 25, right: 0, bottom: 10, left: 5 }}
                      >
                        <chakra.h2
                          color="whiteAlpha.800"
                          fontSize={['lg', 'xl']}
                          lineHeight={1.2}
                        >
                          Acompanhe de perto o desempenho da sua saúde com nosso
                          sistema de monitoramento de performance.
                        </chakra.h2>
                      </RevealWrapper>
                    </Stack>
                  </Flex>
                  <Flex flex={1}>
                    <FormPlanilha />
                  </Flex>
                </Stack>
              </Box>
              <ScrollDown />
              <CardProgression />
              <Progression />
              <StudentDepoiment />
              <AboutSpecialist />
            </Box>
          </Container>
          <Footer />
        </Box>
      </Box>
    </>
  )
}
