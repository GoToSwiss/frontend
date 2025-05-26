import { create } from 'zustand';

interface MapStore {
  mapInstance: google.maps.Map | null;
  setMapInstance: (map: google.maps.Map) => void;
}

const useMapStore = create<MapStore>((set) => ({
  mapInstance: null,
  setMapInstance: (map) => set({ mapInstance: map }),
}));

export default useMapStore;
