import { Button } from '@chakra-ui/react'

interface ButtonProps {
  text: string
  color: string
  onClick?: () => void
}

export default function ButtonDashboard({ text, color, onClick }: ButtonProps) {
  return (
    <>
      <Button
        color={color}
        mr={3}
        onClick={onClick}
        bgColor={'orange.500'}
        _hover={{ bgColor: 'orange.400', transform: '0.3s' }}
      >
        {text}
      </Button>
    </>
  )
}
