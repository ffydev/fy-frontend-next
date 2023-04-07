import { Button } from '@chakra-ui/react'

interface ButtonProps {
  text?: string
  color?: string
  bgColor?: string
  _hover?: any
  leftIcon?: any
  w?: string
  onClick?: () => void
  type?: 'submit' | 'button'
}

export default function HandleButton({
  text,
  color,
  bgColor,
  _hover,
  leftIcon,
  w,
  onClick,
  type,
}: ButtonProps) {
  return (
    <>
      <Button
        color={color}
        mr={3}
        onClick={onClick}
        bgColor={bgColor}
        _hover={_hover}
        w={w}
        leftIcon={leftIcon}
        type={type}
      >
        {text}
      </Button>
    </>
  )
}
