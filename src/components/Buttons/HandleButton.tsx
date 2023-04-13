import { Button } from '@chakra-ui/react'

interface ButtonProps {
  text?: string
  color?: string
  leftIcon?: any
  w?: string
  onClick?: () => void
  type?: 'submit' | 'button'
}

export default function HandleButton({
  text,
  leftIcon,
  w,
  onClick,
  type,
}: ButtonProps) {
  return (
    <>
      <Button
        bgGradient={'linear(to-r, purple.600, purple.700)'}
        textColor={'white'}
        mr={3}
        onClick={onClick}
        _hover={{
          bg: 'whiteAlpha.800',
          transition: '0.8s',
        }}
        w={w}
        leftIcon={leftIcon}
        type={type}
      >
        {text}
      </Button>
    </>
  )
}
