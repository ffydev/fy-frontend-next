import { Button } from '@chakra-ui/react'

interface CardButtonProps {
  title: string
  mr?: number
  background: string
  size: string
  onClick: () => void
  value: string
}

export function CardButton({
  title,
  mr,
  background,
  size,
  onClick,
  value,
}: CardButtonProps) {
  return (
    <>
      <Button
        mr={mr}
        background={background}
        _hover={{
          bg: 'whiteAlpha.800',
          transition: '0.8s',
        }}
        size={size}
        onClick={() => onClick()}
      >
        {title}
      </Button>
    </>
  )
}
