import { create } from 'zustand';

interface LineChartFilterStore {
  x: string;
  x2: string;
  y: string;
  y2: string;
  isComplete: boolean;
  setX: (x: string) => void;
  setX2: (x2: string) => void;
  setY: (y: string) => void;
  setY2: (value: string) => void;
  setIsComplete: (isComplete: boolean) => void;
}

const useLineChartFilterStore = create<LineChartFilterStore>((set) => ({
  x: '',
  x2: '',
  y: '',
  y2: '',
  isComplete: false,
  setX: (x: string) => set({ x }),
  setX2: (x2: string) => set({ x2 }),

  setY: (y: string) => set({ y }),
  setY2: (value: string) => set({ y2: value }),
  setIsComplete: (isComplete: boolean) => set({ isComplete }),
}));

interface WindRoseFilterStore {
  x: string;
  y: string;
  isComplete: boolean;
  setX: (x: string) => void;
  setY: (y: string) => void;
  setIsComplete: (isComplete: boolean) => void;
}

const useWindRoseFilterStore = create<WindRoseFilterStore>((set) => ({
  x: '',
  y: '',
  isComplete: false,
  setX: (x: string) => set({ x }),
  setY: (y: string) => set({ y }),
  setIsComplete: (isComplete: boolean) => set({ isComplete }),
}));

export { useLineChartFilterStore, useWindRoseFilterStore };
