import { Button } from '@chakra-ui/react'

interface ButtonProps {
  text: string
  color: string
  bgColor?: string
  _hover?: any
  leftIcon?: any
  onClick?: () => void
}

export default function HandleButton({
  text,
  color,
  bgColor,
  _hover,
  leftIcon,
  onClick,
}: ButtonProps) {
  return (
    <>
      <Button
        color={color}
        mr={3}
        onClick={onClick}
        bgColor={bgColor}
        _hover={_hover}
        leftIcon={leftIcon}
      >
        {text}
      </Button>
    </>
  )
}
