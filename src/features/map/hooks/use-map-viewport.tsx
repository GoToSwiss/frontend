import { useEffect, useState } from 'react';
import { BBox } from 'geojson';
import useMapStore from '../store/useMapStore';

type MapViewportOptions = {
  padding?: number;
};

function useMapViewport({ padding = 0 }: MapViewportOptions = {}) {
  const mapInstance = useMapStore((state) => state.mapInstance);
  const [bbox, setBbox] = useState<BBox>([-180, -90, 180, 90]);
  const [zoom, setZoom] = useState(0);

  useEffect(() => {
    if (!mapInstance) return undefined;

    const listener = mapInstance.addListener('bounds_changed', () => {
      const bounds = mapInstance.getBounds();

      const newZoom = mapInstance.getZoom();
      const projection = mapInstance.getProjection();

      if (!bounds || !newZoom || !projection) return;

      const sw = bounds.getSouthWest();
      const ne = bounds.getNorthEast();

      const paddingDegrees = degreesPerPixel(zoom) * padding;

      const n = Math.min(90, ne.lat() + paddingDegrees);
      const s = Math.max(-90, sw.lat() - paddingDegrees);

      const w = sw.lng() - paddingDegrees;
      const e = ne.lng() + paddingDegrees;

      setBbox([w, s, e, n]);
      setZoom(newZoom);
    });

    return () => listener.remove();
  }, [mapInstance, padding]);

  return { bbox, zoom };
}

function degreesPerPixel(zoomLevel: number) {
  return 360 / (2 ** zoomLevel * 256);
}
export default useMapViewport;
