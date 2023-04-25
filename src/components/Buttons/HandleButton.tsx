import { Button } from '@chakra-ui/react'

interface ButtonProps {
  text?: string
  color?: string
  variant?: any
  leftIcon?: any
  w?: string
  mr?: number
  onClick?: () => void
  type?: 'submit' | 'button'
  size?: 'xs' | 'sm' | 'md' | 'lg'
}

export default function HandleButton({
  text,
  leftIcon,
  variant,
  w,
  mr,
  onClick,
  type,
  size,
}: ButtonProps) {
  return (
    <>
      <Button
        bgGradient={'linear(to-r, purple.600, purple.700)'}
        textColor={'white'}
        mr={mr}
        variant={variant}
        onClick={onClick}
        _hover={{
          bgGradient: 'linear(to-r, purple.500, purple.600)',
          transition: '0.8s',
        }}
        w={w}
        leftIcon={leftIcon}
        type={type}
        size={size}
      >
        {text}
      </Button>
    </>
  )
}
