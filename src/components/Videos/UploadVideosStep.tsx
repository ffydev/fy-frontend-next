import { Plus, Video as VideoIcon } from 'lucide-react'
import { ChangeEvent, useEffect, useState } from 'react'
import VideoItem from './VideoItem'
import { Box, Flex, FormControl, Text } from '@chakra-ui/react'
import { MdCloudUpload } from 'react-icons/md'
import HandleButton from '../Buttons/HandleButton'
import { z } from 'zod'
import { useVideos } from '@/hooks/useVideos'

interface UploadVideosStepProps {
  textButtonSubmit?: string
  isSendingForm?: boolean
}

const maxFileSize = 300 * 1024 * 1024
const imageTypes = ['video/mp4', 'video/3gp', 'video/quicktime']

const videosSchema = z.object({
  videos: z
    .array(
      z.object({
        size: z.number(),
        type: z.string(),
      }),
    )
    .refine((arr) => {
      for (const file of arr) {
        if (file.size > maxFileSize || !imageTypes.includes(file.type)) {
          return false
        }
      }
      return true
    }, 'Por favor, selecione apenas vídeos com tamanho máximo de 300 megabytes.')
    .optional(),
})

export default function UploadVideosStep({
  textButtonSubmit,
  isSendingForm,
}: UploadVideosStepProps) {
  const {
    videos,
    addFiles,
    isConverting,
    finishedConversionAt,
    removeVideo,
    startAudioConversion,
    resetState,
  } = useVideos()
  const [zodError, setZodError] = useState('')

  function handleVideoFilesSelected(event: ChangeEvent<HTMLInputElement>) {
    const files = event.target.files

    if (!files) {
      return
    }

    const result = videosSchema.safeParse({ videos: Array.from(files) })

    if (!result.success) {
      setZodError(result.error.errors[0].message)
      return
    }

    addFiles(files)
  }

  const hasAnyVideoUploaded = videos.size !== 0

  useEffect(() => {
    if (isSendingForm) {
      Array.from(videos).forEach(([id]) => {
        removeVideo(id)
      })
      resetState()
    }
    return () => {}
  }, [isSendingForm, videos, removeVideo, addFiles, resetState])

  return (
    <div>
      <label htmlFor="videos" aria-disabled={hasAnyVideoUploaded}>
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
            Arraste os vídeos ou clique para fazer o upload
          </Text>
        </Box>
      </label>

      <input
        type="file"
        accept="video/mp4, video/3gpp, video/quicktime"
        multiple
        id="videos"
        onChange={handleVideoFilesSelected}
        style={{ display: 'none' }}
      />

      <span>{zodError}</span>

      {!hasAnyVideoUploaded && !zodError ? (
        <span>Nenhum vídeo selecionado</span>
      ) : (
        <>
          <Flex wrap={'wrap'}>
            {Array.from(videos).map(([id, video]) => {
              return (
                <VideoItem
                  onRemove={removeVideo}
                  id={id}
                  key={id}
                  video={video}
                />
              )
            })}
          </Flex>
        </>
      )}

      {hasAnyVideoUploaded && !finishedConversionAt && (
        <HandleButton
          mb={3}
          onClick={startAudioConversion}
          loading={isConverting}
          mr={3}
          text="Carregar Videos"
          leftIcon={<VideoIcon size={24} />}
        />
      )}

      {!hasAnyVideoUploaded && !finishedConversionAt && (
        <FormControl gridColumn="span 2" mt={3}>
          <HandleButton
            w="100%"
            mr={3}
            text={textButtonSubmit || 'Enviar '}
            leftIcon={<Plus size={24} />}
            type="submit"
            loading={isSendingForm}
          />
        </FormControl>
      )}

      {finishedConversionAt && (
        <FormControl gridColumn="span 2" mt={3}>
          <HandleButton
            w="100%"
            mr={3}
            text={textButtonSubmit || 'Enviar '}
            leftIcon={<Plus size={24} />}
            type="submit"
            loading={isSendingForm}
          />
        </FormControl>
      )}
    </div>
  )
}
