import { Button } from '@chakra-ui/react'

interface CardButtonProps {
  title: string
  mr?: number
  background: string
  size: string
  onClick: (value: string) => void
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
        size={size}
        onClick={() => onClick(value)}
      >
        {title}
      </Button>
    </>
  )
}
