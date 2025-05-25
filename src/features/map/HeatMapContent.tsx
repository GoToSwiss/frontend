import { useEffect, useMemo } from 'react';
import { useMapsLibrary } from '@vis.gl/react-google-maps';
import useMapStore from './store/useMapStore';
import useGetHeatMap from './query/heatmap.query';

type HeatmapProps = {
  radius: number;
  opacity: number;
};

function HeatMapContent({ radius, opacity }: HeatmapProps) {
  const { data } = useGetHeatMap();
  const mapInstance = useMapStore((state) => state.mapInstance);
  const visualization = useMapsLibrary('visualization');

  const heatmap = useMemo(() => {
    if (!visualization) return null;

    return new google.maps.visualization.HeatmapLayer({
      radius,
      opacity,
    });
  }, [visualization, mapInstance]);

  useEffect(() => {
    if (!heatmap) return;
    if (data.result.length === 0) heatmap.setData([]);
    heatmap.setData(
      data.result.map((point) => ({
        location: new google.maps.LatLng(point.dmX, point.dmY),
        weight: point.value,
      })),
    );
  }, [heatmap, data]);

  useEffect(() => {
    if (!heatmap) return;

    heatmap.setMap(mapInstance);

    // eslint-disable-next-line consistent-return
    return () => {
      heatmap.setMap(null);
    };
  }, [heatmap, mapInstance]);

  return null;
}

export default HeatMapContent;
