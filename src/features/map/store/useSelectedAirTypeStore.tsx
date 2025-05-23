import { create } from 'zustand';
import { AirSelectType } from '../types/AirSelectType';

interface AirTypeStore {
  selectedType: AirSelectType;
  setSelectedType: (type: AirSelectType) => void;
}

const useSelectedAirTypeStore = create<AirTypeStore>((set) => ({
  selectedType: 'pm10',
  setSelectedType: (type) => set({ selectedType: type }),
}));

export default useSelectedAirTypeStore;
