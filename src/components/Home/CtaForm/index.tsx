import { Button, Center, Link, Stack } from '@chakra-ui/react'
import { ArrowCircleRight } from '@phosphor-icons/react'

export default function CtaForm() {
  return (
    <>
      <Stack spacing={3}>
        <Center>
          <Button
            as={Link}
            variant={'solid'}
            size={'lg'}
            rightIcon={<ArrowCircleRight size={24} weight="fill" />}
            rounded="full"
            shadow={'dark-lg'}
            style={{ textDecoration: 'none' }}
            bgGradient="linear(to-r, blackAlpha.800, blackAlpha.900)"
            _hover={{
              bgGradient: 'linear(to-r, blackAlpha.700, blackAlpha.800)',
              border: '1px',
              transform: 'scale(1.1)',
              transition: '0.5s',
            }}
          >
            Quero minha planilha
          </Button>
        </Center>
      </Stack>
    </>
  )
}
