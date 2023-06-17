import {
  Box,
  Image,
  Modal,
  ModalContent,
  ModalBody,
  Button,
  ModalOverlay,
} from '@chakra-ui/react'
import { ArrowLeft, ArrowRight } from '@phosphor-icons/react'
import { useState } from 'react'

interface Picture {
  imagekey: string
  imageData: string
}

interface ViewPicturesProps {
  pictures: Picture[]
}

export function ViewPictures({ pictures }: ViewPicturesProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % pictures.length)
  }

  const handlePreviousSlide = () => {
    setCurrentSlide(
      (prevSlide) => (prevSlide - 1 + pictures.length) % pictures.length,
    )
  }

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      <Button onClick={openModal}>Visualizar Fotos</Button>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
        <ModalContent
          bgGradient={[
            'linear(to-tr, gray.900 27.17%, purple.900 85.87%)',
            'linear(to-b, gray.900 27.17%, purple.900 85.87%)',
          ]}
          border={'1px'}
          borderColor={'whiteAlpha.200'}
          backdropFilter={'auto'}
          backdropBlur={'1rem'}
          boxShadow={'lg'}
          minWidth={'1280'} // Defina o tamanho mínimo horizontalmente como 70% da largura da tela
          minHeight={'720'} // Defina o tamanho mínimo verticalmente como 70% da altura da tela
        >
          <ModalBody>
            <Box position="relative">
              {pictures[currentSlide] && (
                <Image
                  src={`data:image/jpeg;base64,${pictures[currentSlide].imageData}`}
                  alt={pictures[currentSlide].imagekey}
                  maxWidth="100%"
                  maxHeight="100%"
                />
              )}
            </Box>
            <Box mt={4} display="flex" justifyContent="center">
              <Button
                mr={3}
                backgroundColor={'purple.700'}
                _hover={{
                  bgGradient: 'linear(to-r, purple.500, purple.600)',
                  transition: '0.8s',
                }}
                onClick={handlePreviousSlide}
              >
                <ArrowLeft size={28} />
              </Button>

              <Button
                onClick={handleNextSlide}
                backgroundColor={'purple.700'}
                _hover={{
                  bgGradient: 'linear(to-r, purple.500, purple.600)',
                  transition: '0.8s',
                }}
              >
                <ArrowRight size={28} />
              </Button>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
