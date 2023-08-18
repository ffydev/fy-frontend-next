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
import { useRouter } from 'next/router'


// interface ViewVideosProps {
//   src?: string
// }

export function ExternalVideoView({ src }) {
  const router = useRouter()
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
       
        > 
          <iframe  width="560" height="315"   src={src} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen ></iframe>

        </ModalContent>
      </Modal>
    </>
  )

}

export async function getServerSideProps(context) {
  // Define the headers you want for this route
  context.res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');

  return {
    props: {},
  };
}
