import { create } from 'zustand';

const MapTypeId = {
  HYBRID: 'hybrid',
  ROADMAP: 'roadmap',
  SATELLITE: 'satellite',
  TERRAIN: 'terrain',
};

export const MAP_CONFIGS: MapConfig[] = [
  {
    id: 'light',
    label: 'Light',
    mapId: '49ae42fed52588c3',
    mapTypeId: MapTypeId.ROADMAP,
  },
  {
    id: 'dark',
    label: 'Dark',
    mapId: '739af084373f96fe',
    mapTypeId: MapTypeId.ROADMAP,
  },
  {
    id: 'satellite',
    label: 'Satellite',
    mapId: '49ae42fed52588c3',
    mapTypeId: MapTypeId.SATELLITE,
  },
  {
    id: 'hybrid',
    label: 'Hybrid',
    mapId: '49ae42fed52588c3',
    mapTypeId: MapTypeId.HYBRID,
  },
  {
    id: 'terrain',
    label: 'Terrain',
    mapId: '49ae42fed52588c3',
    mapTypeId: MapTypeId.TERRAIN,
  },
];

export type MapConfig = {
  id: string;
  label: string;
  mapId?: string;
  mapTypeId?: string;
  styles?: google.maps.MapTypeStyle[];
};

interface MapConfigState {
  mapConfig: MapConfig;
  setMapConfig: (config: MapConfig) => void;
}

export const useMapConfigStore = create<MapConfigState>((set) => ({
  mapConfig: MAP_CONFIGS[0],
  setMapConfig: (config) => set({ mapConfig: config }),
}));
