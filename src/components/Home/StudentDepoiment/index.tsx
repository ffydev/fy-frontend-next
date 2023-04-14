import {
  Text,
  HStack,
  Flex,
  Box,
  Avatar,
  Icon,
  SimpleGrid,
  Stack,
  chakra,
} from '@chakra-ui/react'
import { Quotes, Star } from '@phosphor-icons/react'

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
          <chakra.h1
            textAlign={'left'}
            fontSize={['2xl', '4xl']}
            fontWeight="bold"
            color={'whiteAlpha.900'}
          >
            Veja alguns dos nossos alunos
            <HStack spacing={3}>
              <Flex alignItems="center" justify="start">
                <Star color="#EACA4E" weight="fill" />
                <Star color="#EACA4E" weight="fill" />
                <Star color="#EACA4E" weight="fill" />
                <Star color="#EACA4E" weight="fill" />
                <Star color="#e2e8f0" weight="fill" />
              </Flex>
              <Text fontWeight="bold" fontSize="lg">
                4.5
              </Text>
            </HStack>
            <Text fontWeight="bold" fontSize="md">
              500 avaliações
            </Text>
          </chakra.h1>
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
                  bgColor={'whiteAlpha.200'}
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
                bgColor={'whiteAlpha.200'}
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
