import { create } from 'zustand';

interface DataVisualTypeStore {
  dataVisualType: 'heatmap' | 'marker';
  setDataVisualType: (type: 'heatmap' | 'marker') => void;
}

const useDataVisualTypeStore = create<DataVisualTypeStore>((set) => ({
  dataVisualType: 'heatmap',
  setDataVisualType: (type) => set({ dataVisualType: type }),
}));

export default useDataVisualTypeStore;
