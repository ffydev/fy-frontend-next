import { CloseButton } from '@chakra-ui/react'

interface CloseButtonProps {
  onClick?: () => void
}

export function CloseButtonComponent({ onClick }: CloseButtonProps) {
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
    />
  )
}
