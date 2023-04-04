import {
  Stack,
  HStack,
  VStack,
  Link,
  IconButton,
  LinkProps,
  Box,
  Text,
} from '@chakra-ui/react'
// Here we have used react-icons package for the icons
import { InstagramLogo } from '@phosphor-icons/react'

const links = ['Termos de Uso', 'Política de Privacidade']
const accounts = [
  {
    url: '#',
    label: 'Instagram',
    type: 'orange',
    icon: <InstagramLogo size={24} />,
  },
]

export default function Footer() {
  return (
    <>
      <Box bgColor={'blackAlpha.900'}>
        <Stack
          maxW={'5xl'}
          pt={20}
          p={4}
          marginInline="auto"
          spacing={{ base: 8, md: 0 }}
          justifyContent="space-between"
          alignItems="center"
          direction={{ base: 'column', md: 'row' }}
        >
          {/* Desktop Screen */}
          <HStack
            spacing={4}
            alignItems="center"
            display={{ base: 'none', md: 'flex' }}
          >
            {links.map((link, index) => (
              <CustomLink key={index}>{link}</CustomLink>
            ))}
          </HStack>

          {/* Mobile and Tablet Screens */}
          <Stack display={{ base: 'flex', md: 'none' }} alignItems="center">
            <HStack alignItems="center">
              <CustomLink>Termos de Uso</CustomLink>
            </HStack>
            <CustomLink>Política de Privacidade</CustomLink>
          </Stack>

          <Stack
            direction="row"
            spacing={5}
            pt={{ base: 2, md: 0 }}
            alignItems="center"
          >
            {accounts.map((sc, index) => (
              <IconButton
                key={index}
                as={Link}
                href={sc.url}
                aria-label={sc.label}
                colorScheme={sc.type}
                icon={sc.icon}
                rounded="2xl"
                isExternal
              />
            ))}
          </Stack>
        </Stack>
        <VStack alignItems={'center'} pt={4} pb={8}>
          <Text color={'whiteAlpha.500'}>
            © André Sena | 2023. Todos os Direitos Reservados.
          </Text>
        </VStack>
      </Box>
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
