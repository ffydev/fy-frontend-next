import { Box, Button, Flex } from '@chakra-ui/react'
import { ArrowLeft, ArrowRight } from '@phosphor-icons/react'

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
      <Box mt={3} mb={3}>
        <Flex justifyContent={'center'}>
          <Box mr={3}>
            {hasPreviousPage ? (
              <Button
                backgroundColor={'gray.700'}
                _hover={{
                  bgGradient: 'linear(to-r, purple.500, purple.600)',
                  transition: '0.8s',
                }}
                onClick={() => handlePreviousPage()}
              >
                <ArrowLeft size={28} />
              </Button>
            ) : (
              <Button
                variant={'outline'}
                backgroundColor={'gray.900'}
                style={{ pointerEvents: 'none' }}
              >
                <ArrowLeft size={28} />
              </Button>
            )}
          </Box>

          <Box>
            {hasNextPage ? (
              <Button
                onClick={() => handleNextPage()}
                backgroundColor={'gray.700'}
                _hover={{
                  bgGradient: 'linear(to-r, purple.500, purple.600)',
                  transition: '0.8s',
                }}
              >
                <ArrowRight size={28} />
              </Button>
            ) : (
              <Button
                variant={'outline'}
                backgroundColor={'gray.900'}
                style={{ pointerEvents: 'none' }}
              >
                <ArrowRight size={28} />
              </Button>
            )}
          </Box>
        </Flex>
      </Box>
    </>
  )
}
