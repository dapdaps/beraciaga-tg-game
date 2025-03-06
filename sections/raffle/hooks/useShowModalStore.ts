import { create } from "zustand";
import { createJSONStorage, persist } from 'zustand/middleware';
interface ShowModalStore {
  shownResults: Record<number, boolean>;
  addShownResult: (round: number) => void;
  hasShownResult: (round: number) => boolean;
}

export const useShowModalStore = create(persist<ShowModalStore>((set, get) => ({
  shownResults: {},
  addShownResult: (round: number) => {
    set((state) => ({
      shownResults: { ...state.shownResults, [round]: true }
    }));
  },
  hasShownResult: (round: number) => {
    return get().shownResults[round] === true;
  }
}), {
    name: '_useShowModalStore',
    version: 0.1,
    storage: createJSONStorage(() => localStorage)
}));