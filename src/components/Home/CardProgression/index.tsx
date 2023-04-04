/* eslint-disable prettier/prettier */
import {
  Box,
  Flex,
  Heading,
  SimpleGrid,
  Stack,
  VStack,
  Text,
  Button,
} from '@chakra-ui/react';
import {
  Star,
  NotePencil,
  HandHeart,
  Barbell,
  ArrowCircleRight,
} from '@phosphor-icons/react';
import { RevealWrapper } from 'next-reveal';

export default function CardProgression() {
  const garantiaText = {
    heading1: 'Experiência',
    text1:
      'Loren Loren Loren Loren Loren Loren Loren Loren Loren Loren Loren Loren Loren Loren Loren Loren Loren Loren Loren Loren Loren Loren ',
    heading2: 'Monitoramento',
    text2:
      'Loren Loren Loren Loren Loren Loren Loren Loren Loren Loren Loren Loren Loren Loren Loren Loren Loren Loren Loren Loren Loren Loren ',
    heading3: 'Benefícios',
    text3:
      'Loren Loren Loren Loren Loren Loren Loren Loren Loren Loren Loren Loren Loren Loren Loren Loren Loren Loren Loren Loren Loren Loren ',
    heading4: 'Performance',
    text4:
      'Loren Loren Loren Loren Loren Loren Loren Loren Loren Loren Loren Loren Loren Loren Loren Loren Loren Loren Loren Loren Loren Loren ',
  };
  return (
    <>
      <Stack direction='column' alignItems='center' pt={20}>
        <Box>
          <Flex
            justifyContent={{ base: 'center', md: 'center' }}
            direction={{ base: 'column-reverse', md: 'column' }}
          >
            <SimpleGrid columns={{ base: 2, md: 4 }} spacing={6}>
              <RevealWrapper
                rotate={{ x: 12, y: 40, z: 0 }}
                origin='left'
                delay={100}
                duration={500}
                distance='500px'
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
                  backdropFilter='blur(10px)'
                  border={'1px'}
                  borderColor={'whiteAlpha.200'}
                  rounded='2xl'
                  _hover={{
                    bgColor: 'blackAlpha.600',
                    transition: '0.5s ease-in-out',
                  }}
                >
                  <Box>
                    <Star size={'4em'} weight={'fill'} />
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
                    marginInline='auto'
                    spacing={{ base: 8, md: 0 }}
                    direction={{ base: 'column', md: 'row' }}
                  >
                    <Button size='sm' rightIcon={<ArrowCircleRight weight='fill' />}>
                      Saiba mais
                    </Button>
                  </Stack>
                </VStack>
              </RevealWrapper>
              <RevealWrapper
                rotate={{ x: 12, y: 40, z: 0 }}
                origin='left'
                delay={200}
                duration={500}
                distance='500px'
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
                  backdropFilter='blur(10px)'
                  border={'1px'}
                  borderColor={'whiteAlpha.200'}
                  rounded='2xl'
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
                        {garantiaText.heading2}
                      </Heading>
                      <Text mt={3} as={'h2'} textAlign={'left'}>
                        {garantiaText.text2}
                      </Text>
                    </Box>
                  </Box>
                  <Stack
                    pt={3}
                    marginInline='auto'
                    spacing={{ base: 8, md: 0 }}
                    direction={{ base: 'column', md: 'row' }}
                  >
                    <Button size='sm' rightIcon={<ArrowCircleRight weight='fill' />}>
                      Saiba mais
                    </Button>
                  </Stack>
                </VStack>
              </RevealWrapper>
              <RevealWrapper
                rotate={{ x: 12, y: 40, z: 0 }}
                origin='left'
                delay={300}
                duration={500}
                distance='500px'
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
                  backdropFilter='blur(10px)'
                  border={'1px'}
                  borderColor={'whiteAlpha.200'}
                  rounded='2xl'
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
                        {garantiaText.heading3}
                      </Heading>
                      <Text mt={3} as={'h2'} textAlign={'left'}>
                        {garantiaText.text3}
                      </Text>
                    </Box>
                  </Box>
                  <Stack
                    pt={3}
                    marginInline='auto'
                    spacing={{ base: 8, md: 0 }}
                    direction={{ base: 'column', md: 'row' }}
                  >
                    <Button size='sm' rightIcon={<ArrowCircleRight weight='fill' />}>
                      Saiba mais
                    </Button>
                  </Stack>
                </VStack>
              </RevealWrapper>
              <RevealWrapper
                rotate={{ x: 12, y: 40, z: 0 }}
                origin='left'
                delay={400}
                duration={500}
                distance='500px'
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
                  backdropFilter='blur(10px)'
                  border={'1px'}
                  borderColor={'whiteAlpha.200'}
                  rounded='2xl'
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
                        {garantiaText.heading4}
                      </Heading>
                      <Text mt={3} as={'h2'} textAlign={'left'}>
                        {garantiaText.text4}
                      </Text>
                    </Box>
                  </Box>
                  <Stack
                    pt={3}
                    marginInline='auto'
                    spacing={{ base: 8, md: 0 }}
                    direction={{ base: 'column', md: 'row' }}
                  >
                    <Button size='sm' rightIcon={<ArrowCircleRight weight='fill' />}>
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
  );
}
