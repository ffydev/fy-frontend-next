import HandleButton from '@/components/Buttons/HandleButton'
import { getUserToken } from '@/pages/api/providers/auth.provider'
import { updateMuscleGroup } from '@/pages/api/providers/exercises.provider'
import {
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Stack,
  Text,
  Button,
  useToast,
  useDisclosure,
} from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { NotePencil } from '@phosphor-icons/react'
import { useRouter } from 'next/router'
import { useRef } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

interface MuscleGroupUpdateProps {
  oldName: string
  setIsFetching: any
}

const updateMusclegroupFormSchema = z.object({
  newName: z.string().nonempty({ message: 'Campo obrigatório' }),
})

type updateMuscleGroupFormSchemaType = z.infer<
  typeof updateMusclegroupFormSchema
>

export function MuscleGroupUpdate({
  oldName,
  setIsFetching,
}: MuscleGroupUpdateProps) {
  const router = useRouter()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = useRef<HTMLInputElement>(null)
  const toast = useToast()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<updateMuscleGroupFormSchemaType>({
    resolver: zodResolver(updateMusclegroupFormSchema),
  })

  const onSubmit: SubmitHandler<updateMuscleGroupFormSchemaType> = async (
    data,
  ) => {
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

      setIsFetching(true)

      await updateMuscleGroup(token, oldName, data.newName)

      onClose()

      toast({
        title: 'Grupo Muscular atualizado.',
        description: 'Grupo Muscular com sucesso.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    } catch (error) {
      console.error(error)

      toast({
        title: 'Erro ao atualizar Grupo Muscular.',
        description: 'Erro ao atualizar Grupo Muscular.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    } finally {
      reset()
      setIsFetching(false)
    }
  }

  return (
    <>
      <Stack>
        <HandleButton
          text="Editar"
          leftIcon={<NotePencil size={32} />}
          onClick={onOpen}
        />
      </Stack>
      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay bg="blackAlpha.300"  />
        <ModalContent
          bgGradient={[
            'linear(to-tr, gray.900 27.17%, purple.900 85.87%)',
            'linear(to-b, gray.900 27.17%, purple.900 85.87%)',
          ]}
          border={'1px'}
          borderColor={'whiteAlpha.200'}
          
          backdropBlur={'1rem'}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl mt={4}>
                <Text>{oldName}</Text>
                {errors.newName && <Text>{errors.newName.message}</Text>}
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Novo Nome: </FormLabel>
                <Input {...register('newName')} />
                {errors.newName && <Text>{errors.newName.message}</Text>}
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <HandleButton
                mr={3}
                text="Enviar"
                leftIcon={<NotePencil size={32} />}
                type="submit"
              />
              <Button variant={'outline'} onClick={onClose}>
                Cancelar
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  )
}
