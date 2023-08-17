import {
  Box,
  Modal,
  ModalContent,
  ModalBody,
  Button,
  ModalOverlay,
  Center,
  AspectRatio,
} from '@chakra-ui/react'
import { Video } from '@phosphor-icons/react'
import { useState } from 'react'

interface ViewVideosProps {
  src?: string
}

export function ExternalVideoView({ src }: ViewVideosProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const handleWithOpenModal = () => {
    openModal()
  }

  return (
    <>
      <Button
        _hover={{
          bgGradient: 'linear(to-r, red.500, red.600)',
          transition: '0.8s',
        }}
        size="xs"
        border={'1px'}
        borderColor={'whiteAlpha.300'}
        onClick={() => handleWithOpenModal()}
      >
        <Video size={32} />
      </Button>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
        <ModalContent
          bgColor={'blackAlpha.100'}
          border={'1px'}
          borderColor={'whiteAlpha.200'}
          backdropFilter={'auto'}
          backdropBlur={'1rem'}
          boxShadow={'lg'}
        >
          <ModalBody>
            <Box
              position="relative"
              flexDirection="column"
              p={4}
              overflow={'hidden'}
            >
              <Center>
                <AspectRatio maxW="560px" ratio={1}>
                  <iframe
                    title="naruto"
                    src="https://www.youtube.com/embed/QhBnZ6NPOY0"
                    allowFullScreen
                  />
                </AspectRatio>
              </Center>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
