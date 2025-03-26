import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface RingStore {
  open: boolean;
  setOpen(open: boolean): void;
}

export const useRingStore = create(
  persist<RingStore>(
    (set) => ({
      open: false,
      setOpen: (open) => {
        set(() => ({ open }));
      },
    }),
    {
      name: '_ring',
      version: 0.1,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => {
        return ({ open: state.open } as any);
      }
    },
  ),
);
