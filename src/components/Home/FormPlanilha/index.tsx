import {
  Box,
  Container,
  FormControl,
  FormLabel,
  Input,
  Stack,
  VStack,
} from '@chakra-ui/react'
import CtaForm from '../CtaForm'
import { RevealWrapper } from 'next-reveal'

export default function FormPlanilha() {
  return (
    <Container maxW="5xl" p={{ base: 2, md: 5 }}>
      <Stack spacing={4} maxW={{ base: '20rem', sm: '25rem' }} margin="0 auto">
        <RevealWrapper
          rotate={{ x: 12, y: 40, z: 0 }}
          origin="top"
          delay={750}
          duration={500}
          distance="500px"
          reset={true}
          viewOffset={{ top: 25, right: 0, bottom: 10, left: 5 }}
        >
          <Box pos="relative">
            <Box
              pos="absolute"
              top="-7px"
              right="-7px"
              bottom="-7px"
              left="-7px"
              bgGradient="linear(to-l, rgba(97,36,182,0.4) 0%, rgba(57,35,98,0.4) 33%, rgba(47,37,70,0.4) 71%)"
              transform="rotate(-10deg)"
              boxShadow={'lg'}
              backdropBlur={'1rem'}
              border={'1px'}
              borderColor={'whiteAlpha.200'}
              rounded="2xl"
            ></Box>
            <VStack
              as="form"
              pos="relative"
              spacing={8}
              p={6}
              boxShadow={'2xl'}
              bgColor={'whiteAlpha.200'}
              backdropFilter="auto"
              backdropBlur="1rem"
              border={'1px'}
              borderColor={'whiteAlpha.200'}
              rounded="2xl"
            >
              <FormControl id="text">
                <FormLabel>Seu Nome</FormLabel>
                <Input
                  type="text"
                  placeholder="Digite seu nome"
                  rounded="md"
                  size={'lg'}
                  variant={'flushed'}
                  color={'whiteAlpha.600'}
                  _placeholder={{ opacity: 0.8, color: 'inherit' }}
                  focusBorderColor={'purple.300'}
                  borderColor={'purple.100'}
                />
              </FormControl>
              <FormControl id="email">
                <FormLabel>Seu E-mail</FormLabel>
                <Input
                  type="email"
                  placeholder="Digite seu melhor e-mail"
                  rounded="md"
                  size={'lg'}
                  variant={'flushed'}
                  color={'whiteAlpha.600'}
                  _placeholder={{ opacity: 0.8, color: 'inherit' }}
                  focusBorderColor={'purple.300'}
                  borderColor={'purple.100'}
                />
              </FormControl>
              <CtaForm />
            </VStack>
          </Box>
        </RevealWrapper>
      </Stack>
    </Container>
  )
}
