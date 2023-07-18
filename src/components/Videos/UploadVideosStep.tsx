import { ArrowRight } from 'lucide-react'
import { ChangeEvent } from 'react'
import { VideoItem } from './VideoItem'
import { Video, useVideos } from '@/hooks/useVideos'
import { Box, Flex, Text } from '@chakra-ui/react'
import { MdCloudUpload } from 'react-icons/md'

interface UploadVideosStepProps {
  onNextStep: (videos: Map<string, Video>) => void
}

export function UploadVideosStep({ onNextStep }: UploadVideosStepProps) {
  const {
    videos,
    addFiles,
    isConverting,
    finishedConversionAt,
    removeVideo,
    startAudioConversion,
  } = useVideos()

  function handleVideoFilesSelected(event: ChangeEvent<HTMLInputElement>) {
    const files = event.target.files

    if (!files) {
      return
    }

    addFiles(files)
  }

  const hasAnyVideoUploaded = videos.size !== 0

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
        accept="video/*"
        multiple
        id="videos"
        onChange={handleVideoFilesSelected}
        style={{ display: 'none' }}
      />

      {!hasAnyVideoUploaded ? (
        <span>Nenhum vídeo selecionado</span>
      ) : (
        <>
          <Flex>
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
        <button
          type="button"
          onClick={startAudioConversion}
          disabled={isConverting}
        >
          Carregar Vídeos {videos.size}
        </button>
      )}

      {finishedConversionAt && (
        <button type="button" onClick={() => onNextStep(videos)}>
          Prosseguir
          <ArrowRight />
        </button>
      )}
    </div>
  )
}
