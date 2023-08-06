import { CloseButton } from '@chakra-ui/react'

interface CloseButtonProps {
  key?: string
  onClick?: () => void
  position?: any
  right?: number
  top?: number
  left?: number
  style?: any
  h?: number
  mt?: number
  mb?: number
  ml?: number
}

export function CloseButtonComponent({ onClick, ...rest }: CloseButtonProps) {
  return (
    <CloseButton
      _hover={{
        bgGradient: 'linear(to-r, red.500, red.600)',
        transition: '0.8s',
      }}
      size="sm"
      border={'1px'}
      borderColor={'whiteAlpha.300'}
      onClick={onClick}
      {...rest} // Propagação das demais propriedades aqui
    />
  )
}
