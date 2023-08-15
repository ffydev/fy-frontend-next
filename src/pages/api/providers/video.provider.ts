import { api } from '../apis/api'

export async function deleteVideo(token: string, key: string): Promise<void> {
  try {
    await api.delete(`/videos/${key}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return
  } catch (error) {
    console.error(`Failed to delete video with key ${key}`, error)
    throw error
  }
}
