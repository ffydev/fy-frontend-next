import {
  Stack,
  HStack,
  Link,
  Divider,
  Image,
  IconButton,
  LinkProps,
  Box,
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
          <Link href="#" isExternal>
            <Image
              alt="logo"
              src="/logo.png"
              width={10}
              height={10}
              loading={'eager'}
            />
          </Link>

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
              <Divider h="1rem" orientation="vertical" />
              <CustomLink>Termos de Uso</CustomLink>
            </HStack>
            <CustomLink>Política de Privacidade</CustomLink>
          </Stack>

          <Stack
            direction="row"
            spacing={5}
            pt={{ base: 4, md: 0 }}
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
        _hover={{ textDecoration: 'underline' }}
        {...props}
      >
        {children}
      </Link>
    </>
  )
}
