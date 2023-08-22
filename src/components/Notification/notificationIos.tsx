import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import { Export } from "@phosphor-icons/react";
import { useEffect, useState } from "react";

function NotificationIos() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [isIOS, setIsIOS] = useState(false);
  useEffect(() => {
    setIsIOS(/iPhone|iPad|iPod/i.test(navigator.userAgent));
  }, []);

 
  return (
    <>
      {isIOS && (
        <Button colorScheme="purple" variant="outline" onClick={onOpen}>
          Aplicativo
        </Button>
      )}

      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bgColor={"WhiteAlpha.300"}>
          <ModalHeader>Aplicativo</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Text>
              <strong>Para melhor experiência: </strong> 
              <br />
              1 - Toque no botão Compartilhar {<Export size={12} style={{ display: "inline" }} />} na barra de
              menus.
              <br />
              2 - Toque em “Adicionar à Tela de Início”.
              <br />
              3 - Caso não veja a opção “Adicionar à Tela de Início”, você
              pode adicioná-la. Role até a parte inferior da lista, toque em
              Editar Ações e toque em “Adicionar à Tela de Início”.
            </Text>
            <br />
            <Image src="/tutorial.png" />
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="black"
              variant="outline"
              mr={3}
              onClick={onClose}
            >
              Fechar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default NotificationIos;
