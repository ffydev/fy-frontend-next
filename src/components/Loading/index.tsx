import { Spinner } from '@chakra-ui/react'

export default function Loading() {
  return (
    <>
      <div style={{ position: 'fixed', bottom: '10px', right: '10px' }}>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </div>
    </>
  )
}
