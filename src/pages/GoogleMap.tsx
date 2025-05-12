import Heatmap from '@/features/map/HeatMapContent';
import { APIProvider, Map, Marker, useMap } from '@vis.gl/react-google-maps';
import { useEffect, useState } from 'react';
import { EarthquakesGeojson, loadEarthquakeGeojson } from '@/features/map/earthquake';
import SideLeftPanel from '@/features/map/components/SideLeftPanel';
import SideRightPanel from '@/features/map/components/SideRightPanel';
import useMapStore from '@/features/map/store/useMapStore';
import { MarkerData } from '@/features/map/types/CoordType';
import useDataVisualTypeStore from '@/features/map/store/useDataVisualTypeStore';

function MapController({ onReady }: { onReady: (map: google.maps.Map) => void }) {
  const map = useMap();

  useEffect(() => {
    if (map) {
      onReady(map);
    }
  }, [map, onReady]);

  return null;
}

function GoogleMap() {
  const [radius] = useState(25);
  const [opacity] = useState(0.8);
  const [earthquakesGeojson, setEarthquakesGeojson] = useState<EarthquakesGeojson>();
  const dataVisualType = useDataVisualTypeStore((state) => state.dataVisualType);
  const setMapInstance = useMapStore((state) => state.setMapInstance);

  useEffect(() => {
    loadEarthquakeGeojson().then(setEarthquakesGeojson);
  }, []);

  const dummyMarkers: MarkerData[] = [
    { id: 1, lat: 37.5665, lng: 126.978, label: 'Seoul' },
    { id: 2, lat: 35.1796, lng: 129.0756, label: 'Busan' },
    { id: 3, lat: 37.4563, lng: 126.7052, label: 'Incheon' },
  ];

  return (
    <div className="relative h-full w-full">
      <APIProvider apiKey={import.meta.env.VITE_MAP_API} libraries={['places']}>
        <Map
          style={{ width: '100%', height: '100%', zIndex: 0 }}
          defaultCenter={{ lat: 22.54992, lng: 0 }}
          defaultZoom={3}
          gestureHandling="greedy"
          disableDefaultUI
        >
          <MapController onReady={setMapInstance} />

          {dataVisualType === 'heatmap' && earthquakesGeojson && (
            <Heatmap geojson={earthquakesGeojson} radius={radius} opacity={opacity} />
          )}

          {dataVisualType === 'marker' &&
            dummyMarkers.map((marker) => (
              <Marker
                key={marker.id}
                position={{ lat: marker.lat, lng: marker.lng }}
                title={marker.label}
              />
            ))}
        </Map>

        <SideLeftPanel />
        <SideRightPanel />
      </APIProvider>
    </div>
  );
}

export default GoogleMap;
