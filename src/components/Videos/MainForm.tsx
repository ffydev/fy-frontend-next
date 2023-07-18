import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'
import { UploadVideosStep } from './UploadVideosStep'
import { Video } from '@/hooks/useVideos'
import { Mic2 } from 'lucide-react'

const formSchema = z.object({
  transcriptionPrompt: z.string(),
})

type FormSchema = z.infer<typeof formSchema>

export function MainForm() {
  const [videos, setVideos] = useState<Map<string, Video>>(new Map())
  const [isTranscribing, setIsTranscribing] = useState(false)
  const [step, setStep] = useState<'upload' | 'transcribe' | 'generate'>(
    'upload',
  )

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  })

  async function handleGenerate(data: FormSchema) {
    setIsTranscribing(true)

    await fetch('/api/ai/transcribe', {
      method: 'POST',
      body: JSON.stringify({
        videoKeys: uploadedVideoKey,
      }),
    }).then((response) => response.json())

    setIsTranscribing(false)
  }

  function handleUploaded(videos: Map<string, Video>) {
    setVideos(videos)
    setStep('transcribe')
  }

  return (
    <form onSubmit={handleSubmit(handleGenerate)}>
      {step === 'upload' && <UploadVideosStep onNextStep={handleUploaded} />}
      {step === 'transcribe' && (
        <button type="submit" disabled={isTranscribing}>
          <Mic2 />
          Transcrever {videos.size} vídeos
        </button>
      )}
    </form>
  )
}
