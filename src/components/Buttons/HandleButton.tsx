import { Button } from '@chakra-ui/react'

interface ButtonProps {
  text?: string
  color?: string
  backgroundColor?: string
  variant?: any
  leftIcon?: any
  w?: string
  mr?: number
  ml?: number
  mt?: number
  onClick?: () => void
  type?: 'submit' | 'button'
  size?: 'xs' | 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
}

export default function HandleButton({
  text,
  color,
  backgroundColor,
  leftIcon,
  variant,
  w,
  mr,
  ml,
  mt,
  onClick,
  type,
  size,
  disabled,
  loading,
}: ButtonProps) {
  return (
    <>
      <Button
        bgGradient={'linear(to-r, purple.600, purple.700)'}
        textColor={'white'}
        color={color}
        backgroundColor={backgroundColor}
        mr={mr}
        ml={ml}
        mt={mt}
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
        disabled={disabled}
        isLoading={loading}
      >
        {text}
      </Button>
    </>
  )
}
