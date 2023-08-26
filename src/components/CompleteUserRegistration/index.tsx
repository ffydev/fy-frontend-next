import { useAuthStore } from '@/stores/AuthStore'
import { getUserToken } from '@/pages/api/providers/auth.provider'
import { useRouter } from 'next/router'
import {
  Box,
  FormControl,
  FormLabel,
  Grid,
  Input,
  Heading,
  Text,
  Stack,
  HStack,
  Button,
  Flex,
} from '@chakra-ui/react'
import { useForm, SubmitHandler } from 'react-hook-form'
import HandleButton from '@/components/Buttons/HandleButton'
import { Plus, X } from '@phosphor-icons/react'
import { updateUserByUser } from '@/pages/api/providers/users.provider'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { MdCloudUpload } from 'react-icons/md'
import { useState } from 'react'
import Image from 'next/image'
import { CloseButtonComponent } from '../Buttons/CloseButtonComponent'

const maxFileSize = 10 * 1024 * 1024
const imageTypes = [
  'image/png',
  'image/jpeg',
  'image/jpg',
  'image/heic',
  'image/heif',
]

const createOwnerFormSchema = z
  .object({
    firstName: z
      .string()
      .nonempty({ message: 'Campo obrigatório' })
      .transform((value) =>
        value
          .trim()
          .split(' ')
          .map((word) => word[0].toUpperCase() + word.slice(1))
          .join(' '),
      ),
    lastName: z
      .string()
      .nonempty({ message: 'Campo obrigatório' })
      .transform((value) =>
        value
          .trim()
          .split(' ')
          .map((word) => word[0].toUpperCase() + word.slice(1))
          .join(' '),
      ),
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
    password: z
      .string()
      .min(8, { message: 'A senha deve ter no mínimo 8 caracteres' })
      .max(72, { message: 'A senha deve ter no máximo 72 caracteres' })
      .nonempty({ message: 'Campo obrigatório' }),
    confirmPassword: z.string().nonempty({ message: 'Campo obrigatório' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  })

type createOwnerFormSchemaType = z.infer<typeof createOwnerFormSchema>

export default function CompleteUserRegistration() {
  const router = useRouter()
  const { user, setIsFetchingCurrentUser } = useAuthStore()
  const [avatar, setAvatar] = useState([])
  const [avatarPreviewContent, setAvatarPreviewContent] = useState([])

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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<createOwnerFormSchemaType>({
    resolver: zodResolver(createOwnerFormSchema),
  })

  const onSubmit: SubmitHandler<createOwnerFormSchemaType> = async (data) => {
    try {
      const token = getUserToken()

      if (!token) {
        router.push('/login')
        return
      }

      const formData = new FormData()

      if (avatar && avatar.length > 0) {
        formData.append('avatar', avatar[0])
      }

      formData.append('firstName', data.firstName)
      formData.append('lastName', data.lastName)
      formData.append('password', data.password)

      await updateUserByUser(token, user!.id, formData as any)
      setIsFetchingCurrentUser()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading
            fontSize={'4xl'}
            textAlign={'center'}
            textTransform={'capitalize'}
          >
            complete seu cadastro 📝
          </Heading>
        </Stack>
      </Stack>
      <Box
        m={4}
        mt={3}
        mb={4}
        p={6}
        rounded={'lg'}
        border={'1px'}
        borderColor={'whiteAlpha.200'}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid templateColumns="repeat(1, 1fr)" gap={6} mt={4}>
            <FormControl gridColumn="span 1">
              <FormLabel>Primeiro Nome</FormLabel>
              <Input {...register('firstName')} placeholder="Primeiro Nome" />
              {errors.firstName && <Text>{errors.firstName.message}</Text>}
            </FormControl>

            <FormControl gridColumn="span 1">
              <FormLabel>Último Nome</FormLabel>
              <Input
                {...register('lastName')}
                placeholder="Último Nome"
                isRequired
              />
              {errors.lastName && <Text>{errors.lastName.message}</Text>}
            </FormControl>

            <FormControl gridColumn="span 1">
              <FormLabel>Senha</FormLabel>
              <Input
                type={'password'}
                {...register('password')}
                placeholder="Senha"
                isRequired
              />
              {errors.password && <Text>{errors.password.message}</Text>}
            </FormControl>

            <FormControl gridColumn="span 1">
              <FormLabel>Confirmar senha</FormLabel>
              <Input
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

              {errors?.avatar && <Text>{errors.avatar.message as any}</Text>}
            </FormControl>
          </Grid>

          <Stack mt={6} mb={4}>
            <HStack>
              <HandleButton
                text="Enviar"
                leftIcon={<Plus weight="bold" />}
                w={'full'}
                type={'submit'}
              />
              <Button
                variant={'outline'}
                w={'full'}
                leftIcon={<X weight="bold" />}
                type="reset"
              >
                Cancelar
              </Button>
            </HStack>
          </Stack>
        </form>
      </Box>
    </>
  )
}
