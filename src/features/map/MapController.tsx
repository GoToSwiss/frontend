import { useMap } from '@vis.gl/react-google-maps';
import { useEffect } from 'react';

function MapController({ onReady }: { onReady: (map: google.maps.Map) => void }) {
  const map = useMap();

  useEffect(() => {
    if (map) {
      onReady(map);
    }
  }, [map, onReady]);

  return null;
}

export default MapController;
