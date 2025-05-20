import { create } from 'zustand';

interface LineChartFilterStore {
  x: string;
  y: string;
  isComplete: boolean;
  setX: (x: string) => void;
  setY: (y: string) => void;
  setIsComplete: (isComplete: boolean) => void;
}

const useLineChartFilterStore = create<LineChartFilterStore>((set) => ({
  x: '',
  y: '',
  isComplete: false,
  setX: (x: string) => set({ x }),
  setY: (y: string) => set({ y }),
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
