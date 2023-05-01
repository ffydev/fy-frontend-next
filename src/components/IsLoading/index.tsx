import { Center } from '@chakra-ui/react'
import Image from 'next/image'
import { keyframes } from '@emotion/react'

const pulse = keyframes`
  0% {
    opacity: 0.3;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.3;
  }
`

export default function IsLoading() {
  return (
    <Center height="100vh" animation={`${pulse} 1s linear infinite`}>
      <Image
        src={'/logo.png'}
        alt={''}
        width={50}
        height={50}
        loading={'eager'}
      />
    </Center>
  )
}
