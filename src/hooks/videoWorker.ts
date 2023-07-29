import convertVideoToLiteVideo from './convertVideoToLiteVideo'

addEventListener('message', async (event: any) => {
  postMessage(await convertVideoToLiteVideo(event.data))
})
