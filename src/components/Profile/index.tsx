import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  Text,
  useToast,
  Flex,
  Box,
  Avatar,
  Stack,
} from '@chakra-ui/react'
import { useAuthStore } from '@/stores/AuthStore'
import HandleButton from '../Buttons/HandleButton'
import { Plus } from '@phosphor-icons/react'
import { updateUserByUser } from '@/pages/api/providers/users.provider'
import { getUserToken } from '@/pages/api/providers/auth.provider'
import { useRouter } from 'next/router'
import { useForm, SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { CloseButtonComponent } from '../Buttons/CloseButtonComponent'
import Image from 'next/image'
import { MdCloudUpload } from 'react-icons/md'

const maxFileSize = 10 * 1024 * 1024
const imageTypes = [
  'image/png',
  'image/jpeg',
  'image/jpg',
  'image/heic',
  'image/heif',
]

const updateUserFormSchema = z
  .object({
    firstName: z.string().nonempty({ message: 'Campo obrigatório' }),
    lastName: z.string(),
    password: z.string().optional(),
    confirmPassword: z.string().optional(),
    avatar: z
      .any()
      .refine(
        (obj) => {
          if (obj && obj.length > 0) {
            Object.entries(obj)
            for (const file of obj) {
              if (file.size > maxFileSize) {
                return false
              }
            }
            return true
          }
          return true
        },
        { message: 'O tamanho de cada foto deve ser no máximo 10 megabytes.' },
      )
      .refine(
        (obj) => {
          if (obj && obj.length > 0) {
            Object.entries(obj)
            for (const file of obj) {
              if (!imageTypes.includes(file.type)) {
                return false
              }
            }
            return true
          }
          return true
        },
        { message: 'Por favor, selecione apenas imagens.' },
      ),
  })
  .refine(
    (data) => {
      if (
        data.password !== undefined &&
        data.password !== null &&
        data.password !== ''
      ) {
        if (data.password.length >= 8 && data.password.length <= 72) {
          return true
        } else {
          return false
        }
      }
      return true
    },
    {
      message: 'A senha deve ter no mínimo 8 caracteres e no máximo 72',
      path: ['password'],
    },
  )
  .refine(
    (data) => {
      if (data.password && data.confirmPassword) {
        return data.password === data.confirmPassword
      }
      return true
    },
    {
      message: 'As senhas não coincidem',
      path: ['confirmPassword'],
    },
  )

type updateUserFormSchemaType = z.infer<typeof updateUserFormSchema>

export default function Profile() {
  const { user, userAvatar, setIsFetchingCurrentUser } = useAuthStore()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [avatar, setAvatar] = useState([])
  const [avatarPreviewContent, setAvatarPreviewContent] = useState([])
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<updateUserFormSchemaType>({
    resolver: zodResolver(updateUserFormSchema),
  })
  const toast = useToast()

  const handleFileChange = (event: any) => {
    const files = event.target.files
    const images = Array.from(files)

    const imagePreviews: any = []
    const fileList: any = []

    images.forEach((image) => {
      const reader = new FileReader()

      reader.onload = (e: any) => {
        imagePreviews.push(e.target.result)
        if (imagePreviews.length === images.length) {
          setAvatarPreviewContent(imagePreviews)
        }
      }

      reader.readAsDataURL(image as any)

      fileList.push(image)
    })

    setAvatar(fileList)
  }

  const removeImage = (index: any) => {
    const updatedPictures = [...avatarPreviewContent]
    const updatedFiles = [...avatar]

    updatedPictures.splice(index, 1)
    updatedFiles.splice(index, 1)

    setAvatarPreviewContent(updatedPictures)
    setAvatar(updatedFiles)
  }

  const onSubmit: SubmitHandler<updateUserFormSchemaType> = async (data) => {
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

      const formData = new FormData()

      if (avatar && avatar.length > 0) {
        formData.append('avatar', avatar[0])
      }

      formData.append('firstName', data.firstName)
      formData.append('lastName', data.lastName)

      if (data.password) {
        formData.append('password', data.password)
      }

      await updateUserByUser(token, user?.id!, formData as any)
      onClose()
      toast({
        title: 'Perfil atualizado com sucesso!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    } catch (error) {
      console.error(error)
      toast({
        title: 'Erro ao atualizar perfil.',
        description: 'Por favor, tente novamente.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    } finally {
      reset()
      setIsFetchingCurrentUser()
    }
  }

  return (
    <>
      <Button
        _hover={{}}
        w={'full'}
        variant={'ghost'}
        onClick={onOpen}
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}
      >
        Perfil
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay bg="blackAlpha.300" />
        <ModalContent
          bgGradient={[
            'linear(to-tr, gray.900 27.17%, purple.900 85.87%)',
            'linear(to-b, gray.900 27.17%, purple.900 85.87%)',
          ]}
          border={'1px'}
          borderColor={'whiteAlpha.200'}
        >
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Stack spacing={3}>
              <Avatar
                name="Avatar"
                size={'lg'}
                src={
                  user.hasAvatar
                    ? `data:image/jpeg;base64,${
                        userAvatar.imageData || 'logo.png'
                      }`
                    : 'logo.png'
                }
              />
              <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl gridColumn="span 1">
                  <FormLabel>Primeiro Nome</FormLabel>
                  <Input
                    defaultValue={user?.firstName}
                    {...register('firstName')}
                    placeholder="Primeiro Nome"
                  />
                  {errors.firstName && <Text>{errors.firstName.message}</Text>}
                </FormControl>

                <FormControl gridColumn="span 1">
                  <FormLabel>Último Nome</FormLabel>
                  <Input
                    defaultValue={user?.lastName}
                    {...register('lastName')}
                    placeholder="Último Nome"
                  />
                  {errors.lastName && <Text>{errors.lastName.message}</Text>}
                </FormControl>

                <FormControl gridColumn="span 1">
                  <FormLabel>Alterar Senha</FormLabel>
                  <Input
                    defaultValue={undefined}
                    type={'password'}
                    {...register('password')}
                    placeholder="Senha"
                  />
                  {errors.password && <Text>{errors.password.message}</Text>}
                </FormControl>

                <FormControl gridColumn="span 1" mb={3}>
                  <FormLabel>Confirmar senha</FormLabel>
                  <Input
                    defaultValue={undefined}
                    type={'password'}
                    {...register('confirmPassword')}
                    placeholder="Confirmar senha"
                  />
                  {errors.confirmPassword && (
                    <Text>{errors.confirmPassword.message}</Text>
                  )}
                </FormControl>

                <FormControl gridColumn="span 2">
                  <label>
                    <Box
                      display="flex"
                      flexDirection="column"
                      alignItems="center"
                      p={4}
                      minW={'full'}
                      border="2px dashed"
                      borderColor="gray.300"
                      borderRadius="md"
                      textAlign="center"
                      cursor="pointer"
                      _hover={{
                        bgGradient: 'linear(to-r, purple.500, purple.600)',
                        transition: '0.8s',
                      }}
                    >
                      <MdCloudUpload size={24} />
                      <Text mt={2} fontSize="sm" fontWeight="bold">
                        Arraste a imagem ou clique aqui (Opcional)
                      </Text>
                      <Input
                        id="fileInput"
                        onChange={(event) => {
                          register('avatar', {
                            value: event.target.files,
                          })
                          handleFileChange(event)
                        }}
                        type="file"
                        accept=".png, .jpg, .jpeg, .heic, .heif"
                        style={{ display: 'none' }}
                      />
                    </Box>
                  </label>

                  <Flex flexWrap="wrap">
                    {avatarPreviewContent?.map((image: any, index: any) => (
                      <Box key={index} m={3} position="relative">
                        <CloseButtonComponent
                          onClick={() => removeImage(index)}
                          position="absolute"
                          right={0}
                        />
                        <Image
                          src={image}
                          alt="Imagens selecionadas pelo usuário"
                          width={100}
                          height={100}
                        />
                      </Box>
                    ))}
                  </Flex>

                  {errors?.avatar && (
                    <Text>{errors.avatar.message as any}</Text>
                  )}
                </FormControl>

                <Flex justify={'space-between'} mt={3}>
                  <HandleButton
                    w={'full'}
                    mr={3}
                    text="Atualizar dados"
                    leftIcon={<Plus weight="bold" />}
                    type="submit"
                  />
                  <Button w={'full'} variant={'outline'} onClick={onClose}>
                    Cancelar
                  </Button>
                </Flex>
              </form>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
