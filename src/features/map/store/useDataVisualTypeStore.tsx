import { create } from 'zustand';

interface DataVisualTypeStore {
  dataVisualType: 'heatmap' | 'marker' | '3d';
  setDataVisualType: (type: 'heatmap' | 'marker' | '3d') => void;
}

const useDataVisualTypeStore = create<DataVisualTypeStore>((set) => ({
  dataVisualType: '3d',
  setDataVisualType: (type) => set({ dataVisualType: type }),
}));

export default useDataVisualTypeStore;
