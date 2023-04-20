import {
  Text,
  HStack,
  Flex,
  Box,
  Avatar,
  Icon,
  SimpleGrid,
  Stack,
  VStack,
  Heading,
} from '@chakra-ui/react'
import { Plus, Quotes, Star } from '@phosphor-icons/react'

interface TestimonialAttributes {
  username: string
  position: string
  company: string
  content: string
  image: string
}

const testimonials: TestimonialAttributes[] = [
  {
    username: 'Ben Parker',
    position: 'CEO',
    company: 'Foodtesla',
    image:
      'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&auto=format&fit=crop&w=334&q=80',
    content: `Proin iaculis purus consequat sem cure digni ssim donec porttitora entum suscipit
      rhoncus. Accusantium quam, ultricies eget id, aliquam eget nibh et. Maecen aliquam,
      risus at semper`,
  },
  {
    username: 'Jena Karlis',
    position: 'GM',
    company: 'Olpers',
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=334&q=80',
    content: `Proin iaculis purus consequat sem cure digni ssim donec porttitora entum suscipit
      rhoncus. Accusantium quam, ultricies eget id, aliquam eget nibh et.`,
  },
]

export function StudentDepoiment() {
  return (
    <>
      <Stack
        align={'center'}
        pt={20}
        pos="relative"
        direction={{ base: 'column', md: 'row' }}
        spacing={5}
        textAlign="center"
      >
        <Flex flex={1}>
          <Stack>
            <VStack spacing={2} align={'start'}>
              {['500'].map((text, index) => (
                <HStack spacing={2} key={index}>
                  <Heading
                    textAlign={'left'}
                    fontSize={['4xl', '6xl']}
                    fontWeight="bold"
                    color={'#8059D4'}
                  >
                    {text}
                  </Heading>
                  <Plus color="#8059D4" weight="bold" size={56} />
                </HStack>
              ))}
              <HStack fontSize={['4xl', '6xl']} fontWeight="bold">
                <Star color="#8059D4" weight="fill" />
                <Star color="#8059D4" weight="fill" />
                <Star color="#8059D4" weight="fill" />
                <Star color="#8059D4" weight="fill" />
                <Star color="#8059D4" weight="fill" />
              </HStack>
              <HStack>
                {['Veja alguns dos nossos alunos'].map((text, index) => (
                  <HStack spacing={2} key={index}>
                    <Heading
                      textAlign={'left'}
                      fontSize={['lg', '3xl']}
                      fontWeight="bold"
                      color={'whiteAlpha.900'}
                    >
                      {text}
                    </Heading>
                  </HStack>
                ))}
              </HStack>
            </VStack>
          </Stack>
        </Flex>
        <Flex flex={1}>
          <SimpleGrid
            columns={{ base: 1, md: 2 }}
            placeItems="center"
            spacing={3}
            pt={10}
          >
            {testimonials.map((obj, index) => (
              <Flex key={index} direction="column">
                <Box
                  p={5}
                  boxShadow={'lg'}
                  bgColor={'whiteAlpha.200'}
                  backdropBlur={'1rem'}
                  backdropFilter="blur(10px)"
                  border={'1px'}
                  borderColor={'whiteAlpha.200'}
                  borderTopLeftRadius="lg"
                  borderTopRightRadius="lg"
                >
                  {obj.content}
                </Box>
                <Flex
                  justify="space-between"
                  alignItems="center"
                  p={5}
                  boxShadow={'lg'}
                  bgColor={'rgba(97,36,182,0.3)'}
                  backdropBlur={'1rem'}
                  backdropFilter="blur(10px)"
                  border={'1px'}
                  borderColor={'whiteAlpha.200'}
                  borderBottomLeftRadius="lg"
                  borderBottomRightRadius="lg"
                >
                  <HStack spacing={2}>
                    <Avatar name="avatar" src={obj.image} />
                    <Flex direction="column">
                      <Text fontWeight="bold" fontSize="lg">
                        {obj.username}
                      </Text>
                      <Text fontSize="md" color="whiteAlpha.600">
                        {obj.position} at {obj.company}
                      </Text>
                    </Flex>
                  </HStack>
                  <Icon as={Quotes} w={8} h={8} weight={'fill'} />
                </Flex>
              </Flex>
            ))}
          </SimpleGrid>
        </Flex>
      </Stack>
      <Stack
        align={'center'}
        direction={{ base: 'column', md: 'row' }}
        spacing={5}
        textAlign="center"
      >
        <SimpleGrid
          columns={{ base: 1, md: 2 }}
          placeItems="center"
          spacing={3}
          pt={10}
        >
          {testimonials.map((obj, index) => (
            <Flex key={index} direction="column">
              <Box
                p={5}
                boxShadow={'lg'}
                bgColor={'whiteAlpha.200'}
                backdropBlur={'1rem'}
                backdropFilter="blur(10px)"
                border={'1px'}
                borderColor={'whiteAlpha.200'}
                borderTopLeftRadius="lg"
                borderTopRightRadius="lg"
              >
                {obj.content}
              </Box>
              <Flex
                justify="space-between"
                alignItems="center"
                p={5}
                boxShadow={'lg'}
                bgColor={'rgba(97,36,182,0.3)'}
                backdropBlur={'1rem'}
                backdropFilter="blur(10px)"
                border={'1px'}
                borderColor={'whiteAlpha.200'}
                borderBottomLeftRadius="lg"
                borderBottomRightRadius="lg"
              >
                <HStack spacing={2}>
                  <Avatar name="avatar" src={obj.image} />
                  <Flex direction="column">
                    <Text fontWeight="bold" fontSize="lg">
                      {obj.username}
                    </Text>
                    <Text fontSize="md" color="whiteAlpha.600">
                      {obj.position} at {obj.company}
                    </Text>
                  </Flex>
                </HStack>
                <Icon as={Quotes} w={8} h={8} weight={'fill'} />
              </Flex>
            </Flex>
          ))}
        </SimpleGrid>
      </Stack>
    </>
  )
}
