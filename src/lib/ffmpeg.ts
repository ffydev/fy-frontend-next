import { createFFmpeg } from '@ffmpeg/ffmpeg'

export const ffmpeg = createFFmpeg({
  log: false,
  corePath: '/ffmpeg-dist/ffmpeg-core.js',
})
