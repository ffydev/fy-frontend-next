import { createFFmpeg } from '@ffmpeg/ffmpeg'

export const ffmpeg = createFFmpeg({
  log: false,
  corePath: 'https://andresena.fitexperience.app/ffmpeg-dist/ffmpeg-core.js',
})
