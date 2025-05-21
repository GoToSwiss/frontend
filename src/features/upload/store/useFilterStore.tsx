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

interface CBPFStore {
  startTime: string;
  endTime: string;
  name: string;
  data: string;
  isComplete: boolean;
  setStartTime: (startTime: string) => void;
  setEndTime: (endTime: string) => void;
  setName: (name: string) => void;
  setData: (data: string) => void;
  setIsComplete: (isComplete: boolean) => void;
}

const useCBPFStore = create<CBPFStore>((set) => ({
  startTime: '',
  endTime: '',
  name: '',
  data: '',
  isComplete: false,
  setStartTime: (startTime: string) => set({ startTime }),
  setEndTime: (endTime: string) => set({ endTime }),
  setName: (name: string) => set({ name }),
  setData: (data: string) => set({ data }),
  setIsComplete: (isComplete: boolean) => set({ isComplete }),
}));

export { useLineChartFilterStore, useCBPFStore };
