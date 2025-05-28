import { create } from 'zustand';

interface DataVisualTypeStore {
  dataVisualType: 'heatmap' | 'marker' | '3d';
  setDataVisualType: (type: 'heatmap' | 'marker' | '3d') => void;
}

const useDataVisualTypeStore = create<DataVisualTypeStore>((set) => ({
  dataVisualType: 'marker',
  setDataVisualType: (type) => set({ dataVisualType: type }),
}));

export default useDataVisualTypeStore;
