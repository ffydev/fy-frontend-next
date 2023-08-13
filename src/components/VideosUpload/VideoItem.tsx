import { Video } from '@/hooks/useVideos'
import { Box } from '@chakra-ui/react'
import { CloseButtonComponent } from '../Buttons/CloseButtonComponent'

interface VideoItemProps {
  id: string
  video: Video
  onRemove: (id: string) => void
}

export default function VideoItem({ id, video, onRemove }: VideoItemProps) {
  return (
    <Box m={3} position="relative" width={90}>
      <video
        src={video.previewURL}
        data-disabled={video.isLoading}
        controls={false}
        height={100}
      />

      <CloseButtonComponent
        onClick={() => onRemove(id)}
        position="absolute"
        top={0}
        right={0}
      />

      <span>
        {video.isLoading ? `${video.conversionProgress}%` : video.file.name}
      </span>
    </Box>
  )
}
