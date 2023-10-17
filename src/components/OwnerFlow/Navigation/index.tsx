import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Stack,
  VStack,
} from '@chakra-ui/react'
import {
  ListBullets,
  PersonSimpleRun,
  Users as UsersIcon,
} from '@phosphor-icons/react'
import { useRouter } from 'next/router'

export default function Navigation() {
  const router = useRouter()

  const handleWithShowFeedbacks = () => {
    router.push('/feedbacks')
  }

  const handleWithShowExercises = () => {
    router.push('/exercises')
  }

  const handleWithShowUsers = () => {
    router.push('/users')
  }

  return (
    <>
      <Stack direction={['column', 'row']} spacing={6} w={'full'} mt={10}>
        <Container maxW={'7xl'}>
          <SimpleGrid
            columns={{ base: 1, md: 2 }}
            spacing={5}
            mb={4}
            w={'full'}
          >
            <Box
              p={4}
              rounded={'lg'}
              border={'1px'}
              borderColor={'whiteAlpha.200'}
              _hover={{ cursor: 'pointer' }}
              onClick={() => handleWithShowUsers()}
            >
              <VStack spacing={5}>
                <Box
                  boxShadow="xl"
                  _hover={{ boxShadow: 'lg' }}
                  borderRadius="full"
                  color={'purple.300'}
                >
                  <UsersIcon size={96} weight="fill" />
                </Box>
                <Heading
                  fontWeight={'medium'}
                  fontSize={'3xl'}
                  textTransform={'capitalize'}
                  textAlign={'center'}
                >
                  Usuários
                </Heading>
              </VStack>
            </Box>

            <Box
              p={4}
              rounded={'lg'}
              border={'1px'}
              borderColor={'whiteAlpha.200'}
              _hover={{ cursor: 'pointer' }}
              onClick={() => handleWithShowFeedbacks()}
            >
              <VStack spacing={5}>
                <Box
                  boxShadow="xl"
                  _hover={{ boxShadow: 'lg' }}
                  borderRadius="full"
                  color={'purple.300'}
                >
                  <ListBullets size={96} weight="fill" />
                </Box>
                <Heading
                  fontWeight={'medium'}
                  fontSize={'3xl'}
                  textTransform={'capitalize'}
                  textAlign={'center'}
                >
                  Feedbacks
                </Heading>
              </VStack>
            </Box>

            <Box
              p={4}
              rounded={'lg'}
              border={'1px'}
              borderColor={'whiteAlpha.200'}
              _hover={{ cursor: 'pointer' }}
              onClick={() => handleWithShowExercises()}
            >
              <VStack spacing={5}>
                <Box
                  boxShadow="xl"
                  _hover={{ boxShadow: 'lg' }}
                  borderRadius="full"
                  color={'purple.300'}
                >
                  <PersonSimpleRun size={96} weight="fill" />
                </Box>
                <Heading
                  fontWeight={'medium'}
                  fontSize={'3xl'}
                  textTransform={'capitalize'}
                  textAlign={'center'}
                >
                  Exercícios
                </Heading>
              </VStack>
            </Box>
            {/* <Box
              p={4}
              rounded={'lg'}
              border={'1px'}
              borderColor={'whiteAlpha.200'}
              _hover={{ cursor: 'pointer' }}
              onClick={() => handleWithShowRepports()}
            >
              <VStack spacing={5}>
                <Box
                  boxShadow="xl"
                  _hover={{ boxShadow: 'lg' }}
                  borderRadius="full"
                  color={'purple.300'}
                >
                  <ChartLineUp size={96} weight="fill" />
                </Box>
                <Heading
                  fontWeight={'medium'}
                  fontSize={'3xl'}
                  textTransform={'capitalize'}
                  textAlign={'center'}
                >
                  Relatórios
                </Heading>
              </VStack>
            </Box> */}
          </SimpleGrid>
        </Container>
      </Stack>
    </>
  )
}
