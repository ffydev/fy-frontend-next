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
            bgGradient="linear(to-r, blackAlpha.800, blackAlpha.200)"
            _hover={{
              bgGradient: 'linear(to-r, blackAlpha.700, blackAlpha.300)',
              transform: 'scale(1.1)',
              transition: '0.5s',
            }}
            // style={{
            //   background:
            //     'linear-gradient(#000 0 0) padding-box, linear-gradient(to right, #4299E1, #ED8936, #9F7AEA) border-box',
            //   color: '#fff',
            //   border: '2px solid transparent',
            //   borderRadius: '30px',
            // }}
          >
            Quero minha planilha
          </Button>
        </Center>
      </Stack>
    </>
  )
}
