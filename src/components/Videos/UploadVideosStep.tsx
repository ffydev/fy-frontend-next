import { ArrowRight, Music, PlusCircle } from 'lucide-react'
import { ChangeEvent } from 'react'
import { VideoItem } from './VideoItem'
import { Video, useVideos } from '@/hooks/useVideos'

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
        <PlusCircle />
        Selecione os vídeos
      </label>

      <input
        type="file"
        accept="video/*"
        multiple
        id="videos"
        onChange={handleVideoFilesSelected}
      />

      {!hasAnyVideoUploaded ? (
        <span>Nenhum vídeo selecionado</span>
      ) : (
        <div>
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
        </div>
      )}

      {hasAnyVideoUploaded && !finishedConversionAt && (
        <button
          type="button"
          onClick={startAudioConversion}
          disabled={isConverting}
        >
          <Music />
          Converter {videos.size} vídeos em áudio
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
