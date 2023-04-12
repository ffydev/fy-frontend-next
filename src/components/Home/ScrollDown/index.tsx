import { Center, Stack, chakra, shouldForwardProp } from '@chakra-ui/react'
import { CaretDoubleDown } from '@phosphor-icons/react'
import { motion, isValidMotionProp } from 'framer-motion'

export default function ScrollDown() {
  const ChakraBox = chakra(motion.div, {
    shouldForwardProp: (prop) =>
      isValidMotionProp(prop) || shouldForwardProp(prop),
  })

  return (
    <>
      <Stack pt={2}>
        <Center>
          <ChakraBox
            animate={{
              scaleY: [1, 1.1, 1, 1.1],
              y: ['2rem', '3rem'],
            }}
            // @ts-ignore no problem in operation, although type error appears.
            transition={{
              duration: 0.8,
              ease: 'easeInOut',
              repeat: Infinity,
              repeatType: 'loop',
            }}
            padding="2"
            display="flex"
            justifyContent="center"
            alignItems="center"
            width="100px"
            height="100px"
          >
            <CaretDoubleDown size={60} weight={'bold'} />
          </ChakraBox>
        </Center>
      </Stack>
    </>
  )
}
