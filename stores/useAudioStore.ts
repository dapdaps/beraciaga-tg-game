import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface IStore {
    isMuted: boolean;
    set: (params: any) => void;
}

export const useAudioStore = create(
  persist<IStore>(
    (set) => ({
      isMuted: false,
      set: (params: any) => set(() => ({ ...params })),
    }),
    {
      name: "_sound_",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);