import { create } from 'zustand';
import { combine } from 'zustand/middleware';

interface VideoState {
  finalVideo: any[];
  setFinalVideo: (video: any) => void;
  reset: () => void;
}

const initialState: VideoState = {
  finalVideo: [],
  setFinalVideo: () => {},
  reset: () => {},
};

export const useVideosStore = create(
  combine(initialState, (set) => ({
    setFinalVideo: (video: any) =>
      set((state) => ({ finalVideo: [...state.finalVideo, video] })),
    reset: () => {
      set(initialState);
    },
  }))
);
