import { create } from 'zustand';

interface LineChartFilterStore {
  startTime: string;
  endTime: string;
  addY: string[];
  observationName: string;
  setStartTime: (startTime: string) => void;
  setEndTime: (endTime: string) => void;
  setAddY: (addY: string[]) => void;
  setObservationName: (observationName: string) => void;
  reset: () => void;
}

const initialLinchartState = {
  startTime: '',
  endTime: '',
  addY: [],
  observationName: '',
};

const useLineChartFilterStore = create<LineChartFilterStore>((set) => ({
  ...initialLinchartState,
  setStartTime: (startTime: string) => set({ startTime }),
  setEndTime: (endTime: string) => set({ endTime }),
  setAddY: (addY: string[]) => set({ addY }),
  setObservationName: (observationName: string) => set({ observationName }),
  reset: () => set(initialLinchartState),
}));

interface CBPFStore {
  startTime: string;
  endTime: string;
  name: string;
  data: string;
  setStartTime: (startTime: string) => void;
  setEndTime: (endTime: string) => void;
  setName: (name: string) => void;
  setData: (data: string) => void;
  reset: () => void;
}

const initialCBPFState = {
  startTime: '',
  endTime: '',
  name: '',
  data: '',
};

const useCBPFStore = create<CBPFStore>((set) => ({
  ...initialCBPFState,
  setStartTime: (startTime: string) => set({ startTime }),
  setEndTime: (endTime: string) => set({ endTime }),
  setName: (name: string) => set({ name }),
  setData: (data: string) => set({ data }),
  reset: () => set(initialCBPFState),
}));

interface BinnedBoxStore {
  x: 'day' | 'month' | 'year';
  name: string;
  data: string;
  setX: (x: 'day' | 'month' | 'year') => void;
  setName: (name: string) => void;
  setData: (data: string) => void;
  reset: () => void;
}

const initialBinnedBoxState: Pick<BinnedBoxStore, 'x' | 'name' | 'data'> = {
  x: 'day',
  name: '',
  data: '',
};

const useBinnedBoxStore = create<BinnedBoxStore>((set) => ({
  ...initialBinnedBoxState,
  setX: (x: 'day' | 'month' | 'year') => set({ x }),
  setName: (name: string) => set({ name }),
  setData: (data: string) => set({ data }),
  reset: () => set(initialBinnedBoxState),
}));

export { useLineChartFilterStore, useCBPFStore, useBinnedBoxStore };
