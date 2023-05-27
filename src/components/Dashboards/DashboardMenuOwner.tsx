import {
  Box,
  BoxProps,
  Button,
  CloseButton,
  Drawer,
  DrawerContent,
  Flex,
  useDisclosure,
} from '@chakra-ui/react'
import Image from 'next/image'
import { useState } from 'react'
import { IconType } from 'react-icons'
import { FiHome } from 'react-icons/fi'
import MobileNav from './MobileNav'
import NavItem from './NavItem'
import Navigation from '../OwnerFlow/Navigation'

interface LinkItemProps {
  name: string
  icon: IconType
  dashboardHome?: boolean
}

const LinkItems: Array<LinkItemProps> = [
  { name: 'Início', icon: FiHome, dashboardHome: true },
]

export default function DashboardMenuOwner() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [dashboardHome, setDashboardHome] = useState<boolean>(true)

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
        <MobileNav onOpen={onOpen} />
        <Box>
          {dashboardHome ? (
            <>
              <Box ml={{ base: 0, md: 60 }}>
                <Navigation />
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
