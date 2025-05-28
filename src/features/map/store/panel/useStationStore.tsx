import { create } from 'zustand';

type StationStore = {
  stationName: string;
  setStationName: (name: string) => void;
  clearStationName: () => void;
};

const useStationStore = create<StationStore>((set) => ({
  stationName: '강남대로',
  setStationName: (name: string) => set({ stationName: name }),
  clearStationName: () => set({ stationName: '' }),
}));

export default useStationStore;
