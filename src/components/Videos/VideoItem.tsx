import { Video } from '@/hooks/useVideos'
import { X } from 'lucide-react'

interface VideoItemProps {
  id: string
  video: Video
  onRemove: (id: string) => void
}

export function VideoItem({ id, video, onRemove }: VideoItemProps) {
  return (
    <div>
      <button
        type="button"
        aria-label="Remover vídeo"
        onClick={() => onRemove(id)}
      >
        <X />
      </button>

      <video
        src={video.previewURL}
        data-disabled={video.isLoading}
        controls={false}
      />

      <span>
        {video.isLoading ? `${video.conversionProgress}%` : video.file.name}
      </span>
    </div>
  )
}
