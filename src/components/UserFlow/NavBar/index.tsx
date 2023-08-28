import React, { useEffect, useState } from 'react'
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorModeValue,
} from '@chakra-ui/react'
import Image from 'next/image'
import { useAuthStore } from '@/stores/AuthStore'
import { useRouter } from 'next/router'
import Profile from '@/components/Profile'

export default function Navbar() {
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

    return setNameInitial('U')
  }

  useEffect(() => {
    getingFirstNameInitials(user?.firstName)
  }, [user])

  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={24} alignItems={'center'} justifyContent={'space-between'}>
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
              <MenuList border={'1px'} borderColor={'whiteAlpha.200'}>
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
      </Box>
    </>
  )
}
