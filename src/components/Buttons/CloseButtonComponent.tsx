import React, { useState } from 'react'
import {
  CloseButton,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
} from '@chakra-ui/react'

interface CloseButtonProps {
  key?: string
  onClick?: () => void
  position?: any
  right?: number
  top?: number
  left?: number
  style?: any
  h?: number
  mt?: number
  mb?: number
  ml?: number
  onDelete?: () => void
}

export function CloseButtonComponent({
  onDelete,
  onClick,
  ...rest
}: CloseButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const cancelRef = React.useRef()

  const onClose = () => setIsOpen(false)
  const onDeleteClick = () => {
    setIsOpen(true)
  }

  const handleDeleteConfirm = () => {
    onDelete?.()
    onClick?.()
    onClose()
  }

  return (
    <>
      <CloseButton onClick={onDeleteClick} {...rest} />

      <AlertDialog
        isOpen={isOpen}
        onClose={onClose}
        leastDestructiveRef={cancelRef as any}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Confirmação de exclusão
            </AlertDialogHeader>

            <AlertDialogBody>
              Você tem certeza que deseja deletar?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button colorScheme="gray" onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleDeleteConfirm} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}
