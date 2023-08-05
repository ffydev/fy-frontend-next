import VideoConverterService from './videoConverter.service'

const videoConverteService = new VideoConverterService()

addEventListener('message', async (event: any) => {
  postMessage(await videoConverteService.convertVideoToLiteVideo(event.data))
})

// const videoWorker = new Worker(
//   new URL('../services/videoWorker.service.ts', import.meta.url),
// )

// videoWorker.postMessage({ videos, id })

// videoWorker.onmessage = (event: any) => {
//   const finalVideo = event.data.convertedVideo
//   const progress = event.data.progress

//   dispatch({
//     type: ActionTypes.UPDATE_CONVERSION_PROGRESS,
//     payload: { id, progress },
//   })

//   if (progress === 100 && finalVideo !== undefined) {
//     setFinalVideo(finalVideo)

//     dispatch({
//       type: ActionTypes.MARK_VIDEO_AS_CONVERTED,
//       payload: { id },
//     })
//     dispatch({ type: ActionTypes.END_CONVERSION })
//   }
// }
