import { create } from 'zustand';
import { MarkerFeature } from '../types/CoordType';

type InfowindowState = {
  infowindowData: {
    anchor: google.maps.marker.AdvancedMarkerElement;
    features: MarkerFeature[];
  } | null;
  setInfowindowData: (
    data: {
      anchor: google.maps.marker.AdvancedMarkerElement;
      features: MarkerFeature[];
    } | null,
  ) => void;
};

const useInfowindowStore = create<InfowindowState>((set) => ({
  infowindowData: null,
  setInfowindowData: (data) => set({ infowindowData: data }),
}));

export default useInfowindowStore;
