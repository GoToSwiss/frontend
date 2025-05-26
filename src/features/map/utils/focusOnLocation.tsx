import useMapStore from '@/features/map/store/useMapStore';

function focusOnLocation(lat: number, lng: number, zoom: number = 14) {
  const { mapInstance } = useMapStore.getState();

  if (mapInstance) {
    mapInstance.panTo({ lat, lng });
    mapInstance.setZoom(zoom);
  } else {
    console.warn('Map instance is not ready yet.');
  }
}
export default focusOnLocation;
