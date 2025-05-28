import { useEffect, useRef } from 'react';
import { useMap } from '@vis.gl/react-google-maps';

function KoreaBoundaryCircle() {
  const map = useMap();
  const circleRef = useRef<google.maps.Circle | null>(null);

  useEffect(() => {
    if (!map || circleRef.current) return undefined;

    const circle = new google.maps.Circle({
      center: { lat: 35.8, lng: 127.75 },
      radius: 380000,
      map,
      strokeColor: '#3B82F6',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillOpacity: 0.05,
      fillColor: '#3B82F6',
    });

    circleRef.current = circle;
    return () => circle.setMap(null);
  }, [map]);

  return null;
}

export default KoreaBoundaryCircle;
