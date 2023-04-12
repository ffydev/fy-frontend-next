import { useAuth } from '@/hooks/ContextAuth'
import { IUser } from '@/pages/api/providers/auth.provider'
import {
  Avatar,
  Box,
  BoxProps,
  Button,
  CloseButton,
  Drawer,
  DrawerContent,
  Flex,
  FlexProps,
  HStack,
  Icon,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { IconType } from 'react-icons'
import { FiBell, FiChevronDown, FiHome, FiMenu } from 'react-icons/fi'
import NavigationUser from '../NavigationUser/NavigationUser'

interface LinkItemProps {
  name: string
  icon: IconType
  dashboardHome?: boolean
}

const LinkItems: Array<LinkItemProps> = [
  { name: 'Início', icon: FiHome, dashboardHome: true },
]

export default function DashboardUser() {
  const router = useRouter()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [dashboardHome, setDashboardHome] = useState<boolean>(true)
  const { user, signOut } = useAuth()

  useEffect(() => {
    if (!user) {
      router.replace('/login')
    }

    if (user?.userType.name !== 'user') {
      router.replace('/login')
    }
  }, [router, user])

  const handleWithShowDashboardHome = () => {
    setDashboardHome(true)
  }

  return (
    <>
      <Box
        minH="100vh"
        bgGradient={[
          'linear(to-tr, gray.900 27.17%, purple.900 85.87%)',
          'linear(to-b, gray.900 27.17%, purple.900 85.87%)',
        ]}
      >
        <SidebarContent
          onClose={() => onClose}
          handleWithShowDashboardHome={handleWithShowDashboardHome}
          display={{ base: 'none', md: 'block' }}
        />
        <Drawer
          autoFocus={false}
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          returnFocusOnClose={false}
          onOverlayClick={onClose}
          size="full"
        >
          <DrawerContent>
            <SidebarContent
              onClose={onClose}
              handleWithShowDashboardHome={handleWithShowDashboardHome}
            />
          </DrawerContent>
        </Drawer>
        {/* mobilenav */}
        <MobileNav onOpen={onOpen} user={user} signOut={signOut} />
        <Box>
          {dashboardHome ? (
            <>
              <Box>
                <NavigationUser />
              </Box>
            </>
          ) : null}
        </Box>
      </Box>
    </>
  )
}

interface SidebarProps extends BoxProps {
  onClose: () => void
  handleWithShowDashboardHome: () => void
}

const SidebarContent = ({
  onClose,
  handleWithShowDashboardHome,
  ...rest
}: SidebarProps) => {
  return (
    <Box
      transition="3s ease"
      bgGradient={[
        'linear(to-tr, gray.900 27.17%, gray.900 85.87%)',
        'linear(to-b, gray.900 27.17%, gray.900 85.87%)',
      ]}
      borderRight="1px"
      borderRightColor={'whiteAlpha.100'}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Image
          src={'/logo.png'}
          alt={''}
          width={50}
          height={50}
          loading={'eager'}
        />
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon}>
          <>
            {link.dashboardHome ? (
              <Button
                variant="ghost"
                _active={{
                  bgColor: 'blackAlpha.900',
                  transform: 'scale(0.98)',
                }}
                _focus={{
                  bgColor: 'blackAlpha.900',
                }}
                onClick={() => handleWithShowDashboardHome()}
              >
                {link.name}
              </Button>
            ) : null}
          </>
        </NavItem>
      ))}
    </Box>
  )
}

interface NavItemProps extends FlexProps {
  icon: IconType
  children: any
}
const NavItem = ({ icon, children, ...rest }: NavItemProps) => {
  return (
    <Link
      href="#"
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _focus={{
          bgColor: 'blackAlpha.900',
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  )
}
interface MobileProps extends FlexProps {
  onOpen: () => void
  user?: IUser
  signOut: () => void
}
const MobileNav = ({ onOpen, user, signOut, ...rest }: MobileProps) => {
  const [nameInitial, setNameInitial] = useState<string>('')

  function getingFirstNameInitials(name: string) {
    const nameSplited = name.split(' ')
    const firstName = nameSplited[0]

    return setNameInitial(`${firstName[0]}}`)
  }

  useEffect(() => {
    if (user?.isRegistered) {
      getingFirstNameInitials(user?.firstName)
    }
  })

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bgColor={'blackAlpha.50'}
      backdropBlur={'1rem'}
      backdropFilter={'auto'}
      borderBottomWidth="1px"
      borderBottomColor={'whiteAlpha.100'}
      justifyContent={'space-between'}
      {...rest}
    >
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        fontSize={['sm', 'lg']}
        fontFamily="monospace"
        fontWeight="bold"
        ml={5}
      >
        {user?.isRegistered && <>Olá, {user?.firstName}</>}
      </Text>

      <HStack spacing={{ base: '0', md: '6' }}>
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiBell />}
        />
        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: 'none' }}
            >
              <HStack>
                <Avatar
                  size={'md'}
                  src={''}
                  name={nameInitial}
                  bg={'orange.400'}
                />
                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="xs" color="whiteAlpha.900">
                    {user?.isRegistered && <>Olá, {user?.firstName}</>}
                  </Text>
                </VStack>
                <Box display={{ base: 'none', md: 'flex' }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              border={'1px'}
              borderColor={'whiteAlpha.200'}
              bgColor={'whiteAlpha.100'}
              backdropFilter="auto"
              backdropBlur="1rem"
              boxShadow={'lg'}
            >
              <MenuItem
                _hover={{
                  bgColor: 'blackAlpha.400',
                  rounded: 'lg',
                }}
              >
                Perfil
              </MenuItem>
              <MenuItem
                _hover={{
                  bgColor: 'blackAlpha.400',
                  rounded: 'lg',
                }}
              >
                Configuração
              </MenuItem>
              <MenuDivider />
              <MenuItem
                onClick={() => signOut()}
                _hover={{
                  bgColor: 'blackAlpha.400',
                  rounded: 'lg',
                }}
              >
                Sair
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  )
}
