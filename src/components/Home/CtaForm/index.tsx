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
            rounded={'full'}
            shadow={'dark-lg'}
            style={{ textDecoration: 'none' }}
            bgGradient={'linear(to-r, purple.400, purple.500)'}
            _hover={{
              bgGradient: 'linear(to-r, purple.500, purple.600)',
              transform: 'scale(1.1)',
              transition: '0.5s',
            }}
            href="#"
          >
            Quero minha planilha
          </Button>
        </Center>
      </Stack>
    </>
  )
}
