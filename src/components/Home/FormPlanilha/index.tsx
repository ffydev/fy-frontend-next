import {
  Container,
  Box,
  FormLabel,
  FormControl,
  Input,
  Stack,
  VStack,
} from '@chakra-ui/react';
import CtaForm from '../CtaForm';

export default function FormPlanilha() {
  return (
    <Container maxW='5xl' p={{ base: 5, md: 10 }}>
      <Stack spacing={4} maxW={{ base: '20rem', sm: '25rem' }} margin='0 auto'>
        <Box pos='relative'>
          <Box
            pos='absolute'
            top='-7px'
            right='-7px'
            bottom='-7px'
            left='-7px'
            rounded='lg'
            bgGradient='linear(to-l, orange.400, orange.500)'
            transform='rotate(-2deg)'
          ></Box>
          <VStack
            as='form'
            pos='relative'
            spacing={8}
            p={6}
            boxShadow={'lg'}
            bgColor={'whiteAlpha.200'}
            backdropBlur={'1rem'}
            backdropFilter='blur(10px)'
            border={'1px'}
            borderColor={'whiteAlpha.200'}
            rounded='2xl'
          >
            <FormControl id='text'>
              <FormLabel>Seu Nome</FormLabel>
              <Input
                type='text'
                placeholder='Seu nome completo'
                rounded='md'
                size={'lg'}
                variant={'filled'}
                color={'blackAlpha.600'}
                _placeholder={{ opacity: 0.4, color: 'inherit' }}
                focusBorderColor={'blackAlpha.200'}
                border={'1px'}
                borderColor={'whiteAlpha.200'}
              />
            </FormControl>
            <FormControl id='email'>
              <FormLabel>Seu E-mail</FormLabel>
              <Input
                type='email'
                placeholder='Seu melhor e-mail'
                rounded='md'
                size={'lg'}
                variant={'filled'}
                color={'blackAlpha.600'}
                _placeholder={{ opacity: 0.4, color: 'inherit' }}
                focusBorderColor={'blackAlpha.200'}
                border={'1px'}
                borderColor={'whiteAlpha.200'}
              />
            </FormControl>
            <CtaForm />
          </VStack>
        </Box>
      </Stack>
    </Container>
  );
}
