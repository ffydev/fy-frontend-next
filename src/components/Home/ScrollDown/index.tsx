import { Center, Stack, chakra, shouldForwardProp } from '@chakra-ui/react'
import { CaretCircleDoubleDown } from '@phosphor-icons/react'
import { motion, isValidMotionProp } from 'framer-motion'

export default function ScrollDown() {
  const ChakraBox = chakra(motion.div, {
    shouldForwardProp: (prop) =>
      isValidMotionProp(prop) || shouldForwardProp(prop),
  })

  return (
    <>
      <Stack pt={10}>
        <Center>
          <ChakraBox
            animate={{
              scale: [1, 1.5, 1.5, 1, 1],
              borderRadius: ['20%', '20%', '50%', '50%', '20%'],
            }}
            // @ts-ignore no problem in operation, although type error appears.
            transition={{
              duration: 2,
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
            <CaretCircleDoubleDown size={60} weight={'light'} />
          </ChakraBox>
          {/* <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <ArrowCircleDown size={60} weight={'light'} />
          </motion.button> */}
        </Center>
      </Stack>
    </>
  )
}
