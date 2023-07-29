import VideoConverter from './VideoConverter'

addEventListener('message', async (event: any) => {
  postMessage(await VideoConverter.convertVideoToLiteVideo(event.data))
})
