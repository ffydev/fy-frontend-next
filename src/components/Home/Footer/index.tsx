import { Stack, HStack, Link, LinkProps, Text, Button } from '@chakra-ui/react'
import { InstagramLogo } from '@phosphor-icons/react'

const links = ['Termos de Uso', 'Política de Privacidade']
const copy = ['© André Sena | 2023. Todos os Direitos Reservados.']
const accounts = [
  {
    url: '#',
    label: 'Instagram',
    type: 'purple',
    leftIcon: <InstagramLogo size={24} />,
  },
]

export default function Footer() {
  return (
    <>
      <Stack
        maxW={'5xl'}
        p={4}
        marginInline="auto"
        spacing={{ base: 8, md: 0 }}
        justifyContent="space-between"
        alignItems="center"
        mt={20}
      >
        <Stack mb={4}>
          {accounts.map((sc, index) => (
            <Button
              key={index}
              as={Link}
              href={sc.url}
              aria-label={sc.label}
              colorScheme={sc.type}
              leftIcon={sc.leftIcon}
              rounded="full"
              style={{ textDecoration: 'none' }}
            >
              Conheça @andremsena
            </Button>
          ))}
          <Text></Text>
        </Stack>
        {/* Desktop Screen */}
        <HStack
          pb={4}
          spacing={4}
          alignItems="center"
          display={{ base: 'none', md: 'flex' }}
        >
          <Text color={'whiteAlpha.500'}>{copy}</Text>
        </HStack>
        <HStack
          pb={4}
          spacing={4}
          alignItems="center"
          display={{ base: 'none', md: 'flex' }}
        >
          {links.map((link, index) => (
            <CustomLink key={index}>{link}</CustomLink>
          ))}
        </HStack>

        {/* Mobile and Tablet Screens */}
        <Stack
          pb={4}
          spacing={4}
          display={{ base: 'flex', md: 'none' }}
          alignItems="center"
        >
          <HStack alignItems="center">
            <CustomLink>Termos de Uso</CustomLink>
          </HStack>
          <CustomLink>Política de Privacidade</CustomLink>
          <Text color={'whiteAlpha.500'}>{copy}</Text>
        </Stack>
      </Stack>
    </>
  )
}

const CustomLink = ({ children, ...props }: LinkProps) => {
  return (
    <>
      <Link
        href="#"
        fontSize="sm"
        color={'whiteAlpha.500'}
        _hover={{ textDecoration: 'underline' }}
        {...props}
      >
        {children}
      </Link>
    </>
  )
}
