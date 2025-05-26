import { create } from 'zustand';
import { AirPreviousSelectType } from '../types/AirSelectType';

interface AirTypeStore {
  selectedType: AirPreviousSelectType;
  setSelectedType: (type: AirPreviousSelectType) => void;
}

const usePredAirSelectionStore = create<AirTypeStore>((set) => ({
  selectedType: 'pm10',
  setSelectedType: (type) => set({ selectedType: type }),
}));

export default usePredAirSelectionStore;
