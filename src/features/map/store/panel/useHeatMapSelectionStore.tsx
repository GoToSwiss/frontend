import { create } from 'zustand';
import { AirHeatMapSelectType } from '../../types/AirSelectType';

interface AirSelectionState {
  selectedType: AirHeatMapSelectType;
  selectedDateTime: string;
  setSelectedType: (type: AirHeatMapSelectType) => void;
  setSelectedDateTime: (datetime: string) => void;
}

const useHeatMapSelectionStore = create<AirSelectionState>((set) => ({
  selectedType: 'pm10',
  selectedDateTime: new Date('2023-03-01T00:00:00').toISOString(),
  setSelectedType: (type) => set({ selectedType: type }),
  setSelectedDateTime: (datetime) => set({ selectedDateTime: datetime }),
}));

export default useHeatMapSelectionStore;
