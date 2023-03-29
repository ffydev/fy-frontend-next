import { Button } from '@chakra-ui/react'

interface ButtonProps {
  text: string
  color: string
  bgColor?: string
  size?: string
  mr?: number
  onClick?: () => void
}

export default function ButtonDashboard({ text, color, onClick }: ButtonProps) {
  return (
    <>
      <Button color={color} colorScheme='blue' onClick={onClick}>
        {text}
      </Button>
    </>
  )
}
