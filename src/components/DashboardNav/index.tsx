import { getUserToken } from '@/pages/api/providers/auth.provider';
import { findCurrentUser, IUserInterface } from '@/pages/api/providers/user.provider';
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
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { IconType } from 'react-icons';
import { FiBell, FiChevronDown, FiHome, FiMenu, FiTrendingUp } from 'react-icons/fi';
import Users from '../Users/Users';
interface LinkItemProps {
  name: string;
  icon: IconType;
  userComponent?: boolean;
  dietsComponents?: boolean;
}

const LinkItems: Array<LinkItemProps> = [
  { name: 'Home', icon: FiHome, userComponent: true },
  { name: 'Diets', icon: FiTrendingUp, dietsComponents: true },
];

export default function DashboardNav() {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [userComponent, setUserComponent] = useState<boolean>(true);
  const [dietsComponent, setDietsComponent] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<IUserInterface>();

  const fetchCurrentUserData = useCallback(
    async (token: string) => {
      try {
        const currentUserData = await findCurrentUser(token);

        if (!currentUserData) {
          // Implementar mensagem personalizada
          router.push('/login');
          return;
        }

        setCurrentUser(currentUserData);
      } catch (error) {
        console.error(error);
        router.push('/login');
      }
    },
    [router, setCurrentUser]
  );

  useEffect(() => {
    const token = getUserToken();
    if (token) {
      fetchCurrentUserData(token);
    }
  }, [fetchCurrentUserData]);

  const handleWithShowUser = () => {
    setUserComponent(true);
    setDietsComponent(false);
  };

  const handleWithShowDiets = () => {
    setUserComponent(false);
    setDietsComponent(true);
  };

  const handleWithLogout = () => {
    const token = getUserToken();

    if (token) {
      localStorage.removeItem('fyToken');
      router.push('/login');
    }
  };

  return (
    <>
      <Box
        minH='100vh'
        bgGradient={[
          'linear(to-tr, gray.900 30.17%, purple.900 99.87%)',
          'linear(to-br, gray.900 80.17%, purple.900 99.87%)',
        ]}
      >
        <SidebarContent
          onClose={() => onClose}
          handleWithShowUser={handleWithShowUser}
          handleWithShowDiets={handleWithShowDiets}
          display={{ base: 'none', md: 'block' }}
        />
        <Drawer
          autoFocus={false}
          isOpen={isOpen}
          placement='left'
          onClose={onClose}
          returnFocusOnClose={false}
          onOverlayClick={onClose}
          size='full'
        >
          <DrawerContent>
            <SidebarContent
              onClose={onClose}
              handleWithShowUser={handleWithShowUser}
              handleWithShowDiets={handleWithShowDiets}
            />
          </DrawerContent>
        </Drawer>
        {/* mobilenav */}
        <MobileNav
          onOpen={onOpen}
          currentUser={currentUser}
          handleWithLogout={handleWithLogout}
        />
        <Box>
          {userComponent ? <Users /> : null}
          {dietsComponent ? <></> : null}
        </Box>
      </Box>
    </>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
  handleWithShowUser: () => void;
  handleWithShowDiets: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      transition='3s ease'
      bgColor={'blackAlpha.50'}
      backdropBlur={'1rem'}
      backdropFilter='blur(15px)'
      boxShadow={'lg'}
      borderRight='1px'
      borderRightColor={'whiteAlpha.100'}
      w={{ base: 'full', md: 60 }}
      pos='fixed'
      h='full'
      {...rest}
    >
      <Flex h='20' alignItems='center' mx='8' justifyContent='space-between'>
        <Image src={'/logo.png'} alt={''} width={50} height={50} loading={'eager'} />
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon}>
          <>
            {link.userComponent ? (
              <Button
                variant='ghost'
                _active={{
                  bgColor: 'blackAlpha.900',
                  transform: 'scale(0.98)',
                }}
                _focus={{
                  bgColor: 'blackAlpha.900',
                }}
                onClick={() => rest.handleWithShowUser()}
              >
                {link.name}
              </Button>
            ) : null}

            {link.dietsComponents ? (
              <Button
                variant='ghost'
                _active={{
                  bgColor: 'blackAlpha.900',
                  transform: 'scale(0.98)',
                }}
                _focus={{
                  bgColor: 'blackAlpha.900',
                }}
                onClick={() => rest.handleWithShowDiets()}
              >
                {link.name}
              </Button>
            ) : null}
          </>
        </NavItem>
      ))}
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: any;
}
const NavItem = ({ icon, children, ...rest }: NavItemProps) => {
  return (
    <Box style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
      <Flex
        align='center'
        p='4'
        mx='4'
        borderRadius='lg'
        role='group'
        cursor='pointer'
        _focus={{
          bgColor: 'blackAlpha.900',
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr='4'
            fontSize='16'
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Box>
  );
};
interface MobileProps extends FlexProps {
  onOpen: () => void;
  currentUser?: IUserInterface;
  handleWithLogout: () => void;
}
const MobileNav = ({ onOpen, currentUser, handleWithLogout, ...rest }: MobileProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height={20}
      alignItems='center'
      bgColor={'blackAlpha.50'}
      backdropBlur={'1rem'}
      backdropFilter='blur(15px)'
      borderBottomWidth='1px'
      borderBottomColor={'whiteAlpha.100'}
      justifyContent={'space-between'}
      position={'relative'}
      zIndex={3}
      {...rest}
    >
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant='outline'
        aria-label='open menu'
        icon={<FiMenu />}
      />

      <Text fontSize={['sm', 'lg']} fontFamily='monospace' fontWeight='bold' ml={5}>
        Olá! Seja muito bem vindo.
      </Text>

      <HStack spacing={{ base: '0', md: '6' }}>
        <IconButton
          size='lg'
          variant='ghost'
          aria-label='open menu'
          icon={<FiBell />}
        />
        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton py={2} transition='all 0.3s' _focus={{ boxShadow: 'none' }}>
              <HStack>
                <Avatar size={'md'} src={''} name={'Admin'} bg={'purple.400'} />
                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems='flex-start'
                  spacing='1px'
                  ml='2'
                >
                  <Text fontSize='sm'>{currentUser?.firstName}</Text>
                  <Text fontSize='xs' color='whiteAlpha.900'>
                    Admin
                  </Text>
                </VStack>
                <Box display={{ base: 'none', md: 'flex' }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bgColor={'blackAlpha.800'}
              backdropFilter='auto'
              backdropBlur='20px'
              borderBottomWidth='1px'
              borderBottomColor={'whiteAlpha.100'}
            >
              <MenuItem>Perfil</MenuItem>
              <MenuItem>Configuração</MenuItem>
              <MenuDivider />
              <MenuItem onClick={() => handleWithLogout()}>Sair</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};
