import { useEffect, useRef } from 'react';
import { useMap } from '@vis.gl/react-google-maps';

function KoreaBoundaryCircle() {
  const map = useMap();
  const circleRef = useRef<google.maps.Circle | null>(null);

  useEffect(() => {
    if (!map || circleRef.current) return;

    const circle = new google.maps.Circle({
      center: { lat: 35.8, lng: 127.75 }, // ⬅ 중심을 더 남쪽으로
      radius: 380000, // 250km 반경으로 대한민국 전역 포함
      map,
      strokeColor: '#3B82F6',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillOpacity: 0.05,
      fillColor: '#3B82F6',
    });

    circleRef.current = circle;
    /* eslint-disable consistent-return */
    return () => circle.setMap(null);
  }, [map]);

  return null;
}

export default KoreaBoundaryCircle;
