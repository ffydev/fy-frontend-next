import VideoConverterService from './videoConverter'

const videoConverteService = new VideoConverterService()

addEventListener('message', async (event: any) => {
  postMessage(await videoConverteService.convertVideoToLiteVideo(event.data))
})
