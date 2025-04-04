import Heatmap from '@/features/map/HeatMapContent';
import { APIProvider, Map } from '@vis.gl/react-google-maps';
import { useEffect, useState } from 'react';
import { EarthquakesGeojson, loadEarthquakeGeojson } from '@/features/map/earthquake';

function GoogleMap() {
  const [radius] = useState(25);
  const [opacity] = useState(0.8);
  const [earthquakesGeojson, setEarthquakesGeojson] = useState<EarthquakesGeojson>();

  useEffect(() => {
    loadEarthquakeGeojson().then((data) => setEarthquakesGeojson(data));
  }, []);

  return (
    <APIProvider apiKey={import.meta.env.VITE_MAP_API}>
      <Map
        style={{ width: '100vw', height: '100vh' }}
        defaultCenter={{ lat: 22.54992, lng: 0 }}
        defaultZoom={3}
        gestureHandling="greedy"
        disableDefaultUI
      />
      {earthquakesGeojson && (
        <Heatmap geojson={earthquakesGeojson} radius={radius} opacity={opacity} />
      )}
    </APIProvider>
  );
}

export default GoogleMap;
