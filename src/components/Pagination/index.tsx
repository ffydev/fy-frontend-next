import { Box, Button, Flex } from '@chakra-ui/react'

interface PaginationProps {
  hasPreviousPage: boolean
  hasNextPage: boolean
  handlePreviousPage: () => void
  handleNextPage: () => void
  isButtonDisabled: boolean
}

export default function Pagination({
  hasPreviousPage,
  hasNextPage,
  handlePreviousPage,
  handleNextPage,
  isButtonDisabled,
}: PaginationProps) {
  return (
    <>
      <Box mt={3} w={'full'}>
        <Flex justifyContent={'center'}>
          <Button
            transition={'all 0.1s ease-in-out'}
            isDisabled={!hasPreviousPage}
            onClick={() => handlePreviousPage()}
          >
            Página Anterior
          </Button>

          <Button
            transition={'all 0.2s ease-in-out'}
            isDisabled={!hasNextPage || isButtonDisabled}
            onClick={() => handleNextPage()}
          >
            Próxima Página
          </Button>
        </Flex>
      </Box>
    </>
  )
}
