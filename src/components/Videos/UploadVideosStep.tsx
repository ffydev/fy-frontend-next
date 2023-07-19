import { ArrowRight, Plus, Video as VideoIcon } from 'lucide-react'
import { ChangeEvent } from 'react'
import VideoItem from './VideoItem'
import { Video, useVideos } from '@/hooks/useVideos'
import { Box, Flex, FormControl, Text } from '@chakra-ui/react'
import { MdCloudUpload } from 'react-icons/md'
import HandleButton from '../Buttons/HandleButton'

interface UploadVideosStepProps {
  onNextStep: (videos: Map<string, Video>) => void
  textButtonSubmit?: string
}

export default function UploadVideosStep({
  onNextStep,
  textButtonSubmit,
}: UploadVideosStepProps) {
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
        <HandleButton
          onClick={startAudioConversion}
          loading={isConverting}
          mr={3}
          text="Carregar Videos"
          leftIcon={<VideoIcon height="bold" />}
        />
      )}

      {finishedConversionAt && (
        <HandleButton
          onClick={() => onNextStep(videos)}
          mr={3}
          text="Prosseguir"
          leftIcon={<ArrowRight height="bold" />}
        />
      )}

      {!hasAnyVideoUploaded && !finishedConversionAt && (
        <FormControl gridColumn="span 2" mt={3}>
          <HandleButton
            w="100%"
            mr={3}
            text={textButtonSubmit || 'Enviar '}
            leftIcon={<Plus height="bold" />}
            type="submit"
          />
        </FormControl>
      )}
    </div>
  )
}
