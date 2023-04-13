import { IUser } from '@/pages/api/providers/auth.provider'
import {
  Avatar,
  Box,
  Flex,
  FlexProps,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { FiBell, FiChevronDown, FiMenu } from 'react-icons/fi'

interface MobileProps extends FlexProps {
  onOpen: () => void
  user?: IUser
  signOut: () => void
}

export default function MobileNav({
  onOpen,
  user,
  signOut,
  ...rest
}: MobileProps) {
  const [nameInitial, setNameInitial] = useState<string>('')

  function getingFirstNameInitials(name?: string) {
    if (name !== undefined && name !== '' && name !== null) {
      const nameSplited = name.split(' ')
      const firstName = nameSplited[0]

      return setNameInitial(`${firstName[0]}}`)
    }
  }

  useEffect(() => {
    getingFirstNameInitials(user?.firstName)
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
        Olá, {user?.firstName}
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
                  bg={'purple.400'}
                />
                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                ></VStack>
                <Box display={{ base: 'none', md: 'flex' }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              border={'1px'}
              borderColor={'whiteAlpha.200'}
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
