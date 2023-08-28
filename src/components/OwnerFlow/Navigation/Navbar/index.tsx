import React, { useEffect, useState } from 'react'
import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
} from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
import Image from 'next/image'
import Link from 'next/link'
import { useAuthStore } from '@/stores/AuthStore'
import { useRouter } from 'next/router'
import Profile from '@/components/Profile'

interface Props {
  children: React.ReactNode
}

const Links = ['Dashboard', 'Users', 'Exercises', 'Feedbacks']

const NavLink = (props: Props) => {
  const { children } = props
  const link = children!.toString().toLowerCase()

  return <Link href={link}>{children}</Link>
}

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [nameInitial, setNameInitial] = useState<string>('')
  const { user, signOut } = useAuthStore()
  const router = useRouter()

  const handleWithSignOut = () => {
    localStorage.removeItem('fyToken')
    router.replace('/login').then(() => {
      signOut()
    })
  }

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
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={24} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Box>
              {' '}
              <Image
                priority={true}
                src={'/logo.png'}
                alt={''}
                width={50}
                height={50}
                loading={'eager'}
              />
            </Box>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}
            >
              {Links.map((link) => (
                <>
                  <Box
                    _hover={{
                      bgColor: 'purple.500',
                      rounded: 'lg',
                    }}
                    p={1}
                  >
                    <NavLink key={link}>{link}</NavLink>
                  </Box>
                </>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}
              >
                <Avatar
                  size={'md'}
                  src={''}
                  name={nameInitial}
                  bg={'purple.400'}
                />
              </MenuButton>
              <MenuList
                border={'1px'}
                borderColor={'whiteAlpha.200'}
                backdropFilter="auto"
                backdropBlur="1rem"
              >
                <>
                  <Profile />
                </>

                <MenuDivider />
                <MenuItem
                  onClick={() => handleWithSignOut()}
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
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map((link) => (
                <>
                  <Box
                    _hover={{
                      bgColor: 'purple.500',
                      rounded: 'lg',
                    }}
                    p={1}
                  >
                    <NavLink key={link}>{link}</NavLink>
                  </Box>
                </>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  )
}
