import useMapStore from '@/features/map/store/useMapStore';
import getData from '@/api/getData';

interface CoordResponse {
  result: {
    dmX: number;
    dmY: number;
  };
}

async function focusOnSQLLocation(stationName: string, zoom: number = 14) {
  console.log('stationName!!', stationName);

  const { mapInstance } = useMapStore.getState();
  const data: CoordResponse = await getData(`/observatory/get/loc/${stationName}`);
  console.log('loc', data);

  if (mapInstance) {
    mapInstance.panTo({ lat: data.result.dmX, lng: data.result.dmY });
    mapInstance.setZoom(zoom);
  } else {
    console.warn('Map instance is not ready yet.');
  }
}
export default focusOnSQLLocation;
