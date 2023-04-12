import { useAuth } from '@/hooks/ContextAuth'
import {
  Box,
  BoxProps,
  Button,
  CloseButton,
  Drawer,
  DrawerContent,
  Flex,
  FlexProps,
  Icon,
  Link,
  useDisclosure,
} from '@chakra-ui/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { IconType } from 'react-icons'
import { FiHome } from 'react-icons/fi'
import NavigationUser from '../NavigationUser/NavigationUser'
import MobileNav from './MobileNav'

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
