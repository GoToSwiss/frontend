import * as Plot from '@observablehq/plot';
import PlotFigure from '../PlotFigure';
import useFileStore from '../../store/useFileStore';
import { useWindRoseFilterStore } from '../../store/useFilterStore';

function createCirclePoints(radius: number, segments = 100) {
  const points = [];
  for (let i = 0; i <= segments; i += 1) {
    const angle = (i / segments) * 2 * Math.PI;
    points.push({ x: Math.cos(angle) * radius, y: Math.sin(angle) * radius });
  }
  return points;
}

export default function Windrose() {
  const uploadedData = useFileStore((state) => state.uploadedData);
  const { startTime, endTime, name, data } = useWindRoseFilterStore();

  if (!uploadedData || uploadedData.length === 0) return <div>데이터 없음</div>;

  const filteredData = uploadedData.filter(
    (d) =>
      new Date(d.time) >= new Date(startTime) &&
      new Date(d.time) <= new Date(endTime) &&
      d.observatoryName === name,
  );

  const maxSpeed = Math.max(...filteredData.map((d) => d.windSpeed));

  const plotData = filteredData.map((d) => {
    const radius = d.windSpeed / maxSpeed;
    const angleRad = (d.windDirection * Math.PI) / 180;
    const x = Math.sin(angleRad) * radius;
    const y = Math.cos(angleRad) * radius;
    return { ...d, x, y };
  });

  const circles = [0.25, 0.5, 0.75, 1].map((r) => createCirclePoints(r));

  return (
    <PlotFigure
      options={{
        height: 500,
        width: 500,
        marks: [
          // 중앙 x=0 수직선
          Plot.ruleX([0], {
            stroke: 'black',
            strokeWidth: 1,
          }),
          // 중앙 y=0 수평선
          Plot.ruleY([0], {
            stroke: 'black',
            strokeWidth: 1,
          }),

          // 동심원 그리기 (각 반지름 별로 line으로 연결)
          ...circles.map((circlePoints) =>
            Plot.line(circlePoints, {
              x: 'x',
              y: 'y',
              stroke: 'black',
              strokeWidth: 1,
            }),
          ),

          // 데이터 점들
          Plot.raster(plotData, {
            x: 'x',
            y: 'y',
            fill: data,
            fillOpacity: 0.9,
            interpolate: 'barycentric',
          }),
        ],
        x: { domain: [-1, 1] },
        y: { domain: [-1, 1] },
        color: { legend: true, scheme: 'turbo', label: data },
        aspectRatio: 1,
      }}
    />
  );
}
