import { useState, useEffect } from 'react'

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react'
import Image from 'next/image'

export function AddToHomeScreen() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault()
      setDeferredPrompt(e)
    })

    if (deferredPrompt) {
      onOpen()
    }
  }, [deferredPrompt])

  const handleClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt()
      deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt')
        } else {
          console.log('User dismissed the A2HS prompt')
        }
        setDeferredPrompt(null)
      })
      onClose()
    }
  }

  return (
    <>
      <Button onClick={onOpen}>Open Modal</Button>

      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className="row">
            <div
              className="row"
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <Image
                priority={true}
                alt=""
                src="/logo.png"
                width={20}
                height={20}
                loading={'eager'}
                style={{ marginRight: '5px' }}
              />
              <span style={{ marginLeft: '5px' }}>André Sena Fit</span>
            </div>
          </ModalHeader>

          <ModalBody pb={6}>
            <span>
              Para melhor experiência, instale o nosso aplicativo clicando no
              botão abaixo.{' '}
            </span>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleClick}>
              Instalar
            </Button>
            <Button onClick={onClose}>Fechar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
