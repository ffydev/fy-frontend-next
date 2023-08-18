import { Modal, ModalContent, Button, ModalOverlay } from '@chakra-ui/react'
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
        <ModalContent>
          <iframe
            width="560"
            height="315"
            src={src}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </ModalContent>
      </Modal>
    </>
  )
}

export async function getServerSideProps(context: any) {
  context.res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp')

  return {
    props: {},
  }
}
