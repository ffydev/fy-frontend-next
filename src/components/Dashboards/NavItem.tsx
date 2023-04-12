import { Flex, FlexProps, Icon, Link } from '@chakra-ui/react'
import { IconType } from 'react-icons'

interface NavItemProps extends FlexProps {
  icon: IconType
  children: any
}

export default function NavItem({ icon, children, ...rest }: NavItemProps) {
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
