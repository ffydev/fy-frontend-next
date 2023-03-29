import { Button } from '@chakra-ui/react'

interface ButtonProps {
  text: string
  color: string
  onClick?: () => void
}

export default function ButtonDashboard({ text, color, onClick }: ButtonProps) {
  return (
    <>
      <Button color={color} colorScheme='blue' mr={3} onClick={onClick}>
        {text}
      </Button>
    </>
  )
}
