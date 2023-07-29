/* eslint-disable no-unused-vars */
import { useReducer } from 'react'
import { produce, enableMapSet } from 'immer'
import { useVideosStore } from '@/stores/VideoStore'

enableMapSet()

export interface Video {
  file: File
  previewURL: string
  isLoading: boolean
  convertedAt?: Date
  conversionProgress: number
  transcribedAt?: Date
}

interface VideoState {
  videos: Map<string, Video>
  finalVideo?: Video
  isConverting: boolean
  isTranscribing: boolean
  finishedConversionAt?: Date
  finishedTranscriptionAt?: Date
}

export enum ActionTypes {
  UPLOAD,
  REMOVE_VIDEO,
  FINAL_VIDEO,

  START_CONVERSION,
  END_CONVERSION,
  START_TRANSCRIPTION,
  END_TRANSCRIPTION,

  MARK_VIDEO_AS_LOADING,
  UPDATE_CONVERSION_PROGRESS,
  MARK_VIDEO_AS_CONVERTED,
  MARK_VIDEO_AS_TRANSCRIBED,
}

interface Action {
  type: ActionTypes
  payload?: any
}

export function useVideos() {
  const { setFinalVideo } = useVideosStore()
  const worker = new Worker(new URL('./videoWorker.ts', import.meta.url))
  const [
    {
      videos,
      isConverting,
      isTranscribing,
      finishedConversionAt,
      finishedTranscriptionAt,
    },
    dispatch,
  ] = useReducer(
    (state: VideoState, action: Action) => {
      return produce(state, (draft) => {
        switch (action.type) {
          case ActionTypes.UPLOAD: {
            const files = action.payload.files as FileList

            Array.from(files).forEach((file) => {
              const videoId = crypto.randomUUID()

              draft.videos.set(videoId, {
                file,
                previewURL: URL.createObjectURL(file),
                conversionProgress: 0,
                isLoading: false,
              })
            })

            break
          }
          case ActionTypes.START_CONVERSION: {
            draft.isConverting = true
            break
          }
          case ActionTypes.END_CONVERSION: {
            draft.isConverting = false
            draft.finishedConversionAt = new Date()

            break
          }
          case ActionTypes.START_TRANSCRIPTION: {
            draft.isTranscribing = true
            break
          }
          case ActionTypes.END_TRANSCRIPTION: {
            draft.isTranscribing = false
            draft.finishedTranscriptionAt = new Date()

            break
          }
          case ActionTypes.REMOVE_VIDEO: {
            const id = action.payload.id as string

            draft.videos.delete(id)

            break
          }
          case ActionTypes.MARK_VIDEO_AS_LOADING: {
            const id = action.payload.id as string

            const videoToBeUpdated = draft.videos.get(id)

            if (!videoToBeUpdated) {
              return
            }

            draft.videos.set(id, {
              ...videoToBeUpdated,
              isLoading: true,
            })

            break
          }
          case ActionTypes.UPDATE_CONVERSION_PROGRESS: {
            const id = action.payload.id as string
            const progress = action.payload.progress as number

            const videoToBeUpdated = draft.videos.get(id)

            if (!videoToBeUpdated) {
              return
            }

            draft.videos.set(id, {
              ...videoToBeUpdated,
              conversionProgress: progress,
            })

            break
          }
          case ActionTypes.MARK_VIDEO_AS_CONVERTED: {
            const id = action.payload.id as string

            const videoToBeUpdated = draft.videos.get(id)

            if (!videoToBeUpdated) {
              return
            }

            draft.videos.set(id, {
              ...videoToBeUpdated,
              convertedAt: new Date(),
              isLoading: false,
            })

            break
          }
          case ActionTypes.MARK_VIDEO_AS_TRANSCRIBED: {
            const id = action.payload.id as string

            const videoToBeUpdated = draft.videos.get(id)

            if (!videoToBeUpdated) {
              return
            }

            draft.videos.set(id, {
              ...videoToBeUpdated,
              transcribedAt: new Date(),
              isLoading: false,
            })

            break
          }
        }
      })
    },
    {
      videos: new Map(),
      isConverting: false,
      isTranscribing: false,
    },
  )

  function addFiles(files: FileList) {
    dispatch({
      type: ActionTypes.UPLOAD,
      payload: { files },
    })
  }

  function removeVideo(id: string) {
    dispatch({
      type: ActionTypes.REMOVE_VIDEO,
      payload: { id },
    })
  }

  async function convertVideoToLiteVideo(id: string) {
    dispatch({
      type: ActionTypes.MARK_VIDEO_AS_LOADING,
      payload: { id },
    })

    worker.postMessage({ videos, id })

    let { finalVideo, progress } = {} as any

    worker.onmessage = (event: any) => {
      finalVideo = event.data.convertedVideo
      progress = event.data.progress

      dispatch({
        type: ActionTypes.UPDATE_CONVERSION_PROGRESS,
        payload: { id, progress },
      })

      if (progress === 100) {
        setFinalVideo(finalVideo)

        dispatch({
          type: ActionTypes.MARK_VIDEO_AS_CONVERTED,
          payload: { id },
        })
        dispatch({ type: ActionTypes.END_CONVERSION })
      }
    }
  }

  async function startAudioConversion() {
    dispatch({ type: ActionTypes.START_CONVERSION })

    for (const id of videos.keys()) {
      await convertVideoToLiteVideo(id)
    }
  }

  return {
    videos,
    isConverting,
    isTranscribing,
    addFiles,
    removeVideo,
    finishedConversionAt,
    finishedTranscriptionAt,
    startAudioConversion,
  }
}
