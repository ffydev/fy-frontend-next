import { getUserToken } from '@/pages/api/providers/auth.provider'
import { deleteVideo } from '@/pages/api/providers/video.provider'
import {
  Box,
  Modal,
  ModalContent,
  ModalBody,
  Button,
  ModalOverlay,
  Center,
  useToast,
} from '@chakra-ui/react'
import { ArrowLeft, ArrowRight, Trash, Video } from '@phosphor-icons/react'
import { useRouter } from 'next/router'
import { useState } from 'react'

interface IVideo {
  key?: string
  videoData?: string
}

interface ViewVideosProps {
  videos?: IVideo[]
  handleWithFindVideos: () => void
}

export function VideosView({ videos, handleWithFindVideos }: ViewVideosProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const toast = useToast()
  const router = useRouter()

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % videos!.length)
  }

  const handlePreviousSlide = () => {
    setCurrentSlide(
      (prevSlide) => (prevSlide - 1 + videos!.length) % videos!.length,
    )
  }

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const handleWithOpenModalAndFindVideos = () => {
    openModal()
    handleWithFindVideos()
  }

  const handleWithDeleteVideo = async (key: string) => {
    try {
      const token = getUserToken()

      if (!token) {
        toast({
          title: 'Sua sessão expirou.',
          description: 'Por favor, faça login novamente.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        })

        router.push('/login')
        return
      }

      await deleteVideo(token, key)

      toast({
        title: 'Vídeo deletado com sucesso.',
        description: 'Vídeo deletado com sucesso.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    } catch (error) {
      console.log(error)

      toast({
        title: 'Erro ao deletar vídeo.',
        description: 'Não foi possível deletar vídeo.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
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
        onClick={() => handleWithOpenModalAndFindVideos()}
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
          key={currentSlide}
        >
          <ModalBody>
            <Box
              position="relative"
              flexDirection="column"
              p={4}
              overflow={'hidden'}
            >
              <Center>
                {videos && videos.length > 0 && (
                  <video controls={true} width="300px" height="400">
                    <source
                      src={`data:video/mp4;base64,${videos[currentSlide]?.videoData}`}
                    />
                  </video>
                )}
              </Center>
            </Box>
            <Box ml={6} position="absolute" top={0} right={0} p={4}>
              <Button
                onClick={() =>
                  handleWithDeleteVideo(videos![currentSlide]?.key!)
                }
                _hover={{
                  bgGradient: 'linear(to-r, red.500, red.600)',
                  transition: '0.8s',
                }}
                size="xs"
                border={'1px'}
                borderColor={'whiteAlpha.300'}
              >
                <Trash size={14} />
              </Button>
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
