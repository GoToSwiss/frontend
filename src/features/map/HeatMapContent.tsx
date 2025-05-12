import { useEffect, useMemo } from 'react';
import { useMapsLibrary } from '@vis.gl/react-google-maps';
import { FeatureCollection, Point, GeoJsonProperties } from 'geojson';
import useMapStore from './store/useMapStore';

type HeatmapProps = {
  geojson: FeatureCollection<Point, GeoJsonProperties>;
  radius: number;
  opacity: number;
};

function Heatmap({ geojson, radius, opacity }: HeatmapProps) {
  const mapInstance = useMapStore((state) => state.mapInstance);
  const visualization = useMapsLibrary('visualization');

  const heatmap = useMemo(() => {
    if (!visualization || !mapInstance) return null;

    return new google.maps.visualization.HeatmapLayer({
      radius,
      opacity,
    });
  }, [visualization, radius, opacity]);

  useEffect(() => {
    if (!heatmap) return;

    heatmap.setData(
      geojson.features.map((point) => {
        const [lng, lat] = point.geometry.coordinates;

        return {
          location: new google.maps.LatLng(lat, lng),
          weight: point.properties?.mag,
        };
      }),
    );
  }, [heatmap, geojson, radius, opacity]);

  useEffect(() => {
    if (!heatmap || !mapInstance) return;

    heatmap.setMap(mapInstance);
    // eslint-disable-next-line consistent-return
    return () => {
      heatmap.setMap(null);
    };
  }, [heatmap, mapInstance]);

  return null;
}

export default Heatmap;
