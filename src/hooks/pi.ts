import { ffmpeg } from '@/lib/ffmpeg'
import { fetchFile } from '@ffmpeg/ffmpeg'

export default async function pi(n: any) {
  const { videos, id } = n

  if (!ffmpeg.isLoaded()) {
    await ffmpeg.load()
  }

  const video = videos.get(id)

  if (!video) {
    throw new Error(`Trying to convert an inexistent video: ${id}`)
  }

  const { file } = video

  ffmpeg.FS('writeFile', file.name, await fetchFile(file))

  let progress = 0

  ffmpeg.setProgress(({ ratio }) => {
    progress = Math.round(ratio * 100)
  })

  await ffmpeg.run(
    '-i',
    file.name,
    '-vf',
    'scale=320:240',
    '-b:v',
    '256k',
    '-an',
    '-c:v',
    'libx264',
    '-t',
    '30',
    `${id}.mp4`,
  )

  const data = ffmpeg.FS('readFile', `${id}.mp4`)

  const blob = new Blob([data.buffer], { type: 'video/mp4' })

  const convertedFile = new File([blob], `${id}.mp4`)

  const convertedVideo = {
    file: convertedFile,
  }

  return { convertedVideo, progress }
}
