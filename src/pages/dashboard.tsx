import Users from '@/components/Users'
import { getUserToken } from '@/pages/api/providers/auth.provider'
import {
  findCurrentUser,
  IUserInterface,
} from '@/pages/api/providers/users.provider'
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
import { useCallback, useEffect, useState } from 'react'
import { IconType } from 'react-icons'
import { FiBell, FiChevronDown, FiHome, FiMenu } from 'react-icons/fi'

interface LinkItemProps {
  name: string
  icon: IconType
  userComponent?: boolean
}

const LinkItems: Array<LinkItemProps> = [
  { name: 'Início', icon: FiHome, userComponent: true },
]

export default function Dashboard() {
  const router = useRouter()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [userComponent, setUserComponent] = useState<boolean>(true)
  const [currentUser, setCurrentUser] = useState<IUserInterface>()

  const fetchCurrentUserData = useCallback(
    async (token: string) => {
      try {
        const currentUserData = await findCurrentUser(token)

        if (!currentUserData) {
          // Implementar mensagem personalizada
          router.push('/login')
          return
        }

        setCurrentUser(currentUserData)
      } catch (error) {
        console.error(error)
        router.push('/login')
      }
    },
    [router, setCurrentUser],
  )

  useEffect(() => {
    const token = getUserToken()
    if (token) {
      fetchCurrentUserData(token)
    }
  }, [fetchCurrentUserData])

  const handleWithShowUsers = () => {
    setUserComponent(true)
  }

  const handleWithLogout = () => {
    const token = getUserToken()

    if (token) {
      localStorage.removeItem('fyToken')
      router.push('/login')
    }
  }

  return (
    <>
      <Box
        minH="100vh"
        style={{
          background:
            'linear-gradient(180deg, #161616 0%, #754923 50%, #0c0c0c 100%)',
        }}
      >
        <SidebarContent
          onClose={() => onClose}
          handleWithShowUsers={handleWithShowUsers}
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
              handleWithShowUsers={handleWithShowUsers}
            />
          </DrawerContent>
        </Drawer>
        {/* mobilenav */}
        <MobileNav
          onOpen={onOpen}
          currentUser={currentUser}
          handleWithLogout={handleWithLogout}
        />
        <Box>{userComponent ? <Users /> : null}</Box>
      </Box>
    </>
  )
}

interface SidebarProps extends BoxProps {
  onClose: () => void
  handleWithShowUsers: () => void
}

const SidebarContent = ({
  onClose,
  handleWithShowUsers,
  ...rest
}: SidebarProps) => {
  return (
    <Box
      transition="3s ease"
      style={{
        background:
          'linear-gradient(180deg, #161616 0%, #754923 50%, #0c0c0c 100%)',
      }}
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
            {link.userComponent ? (
              <Button
                variant="ghost"
                _active={{
                  bgColor: 'blackAlpha.900',
                  transform: 'scale(0.98)',
                }}
                _focus={{
                  bgColor: 'blackAlpha.900',
                }}
                onClick={() => handleWithShowUsers()}
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
  currentUser?: IUserInterface
  handleWithLogout: () => void
}
const MobileNav = ({
  onOpen,
  currentUser,
  handleWithLogout,
  ...rest
}: MobileProps) => {
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
        Olá! Seja muito bem vindo.
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
                <Avatar size={'md'} src={''} name={'Admin'} bg={'orange.400'} />
                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">{currentUser?.firstName}</Text>
                  <Text fontSize="xs" color="whiteAlpha.900">
                    Admin
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
                onClick={() => handleWithLogout()}
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
