import * as Plot from '@observablehq/plot';
import PlotFigure from '../PlotFigure';
import useFileStore from '../../store/useFileStore';
import computeCorrelationMatrix from '../../utils/computeCorrelationMatrix';
import { useHeatMapStore } from '../../store/useFilterStore';

const keys = [
  'co2',
  'ch4_ppb',
  'ch4_ppm',
  'so2_ppm',
  'no2_ppm',
  'o3_ppm',
  'co_ppm',
  'pm10',
  'pm2_5',
  'nox_ppm',
  'no_ppm',
  'windDirection',
  'windSpeed',
  'temperature',
  'humidity',
];

export default function CorrelationHeatmap() {
  const uploadedData = useFileStore((state) => state.uploadedData);
  const { name, startTime, endTime } = useHeatMapStore();

  const filteredData = uploadedData.filter(
    (d) =>
      d.observatoryName === name &&
      new Date(d.time) >= new Date(startTime) &&
      new Date(d.time) <= new Date(endTime),
  );

  const numericData = filteredData
    // @ts-ignore
    // TODO: fix type
    .map((d) => Object.fromEntries(keys.map((key) => [key, parseFloat(d[key])])))
    .filter((d) => keys.every((key) => !Number.isNaN(d[key])));

  const corMatrix = computeCorrelationMatrix(numericData, keys);

  return (
    <PlotFigure
      options={{
        marks: [
          Plot.cell(corMatrix, {
            x: 'x',
            y: 'y',
            fill: 'value',
            inset: 0.5,
          }),
          Plot.text(corMatrix, {
            x: 'x',
            y: 'y',
            text: (d) => d.value.toFixed(2),
            fill: 'black',
            dy: 4,
            fontSize: 8,
          }),
        ],
        color: {
          type: 'diverging',
          scheme: 'turbo',
          domain: [-1, 1],
        },
        x: {
          axis: 'top',
          label: null,
          tickRotate: -45,
          tickSize: 5,
        },
        y: {
          reverse: true,
          label: null,
          tickSize: 5,
        },
        width: 600,
        height: 600,
        marginTop: 100,
        marginLeft: 100,
        marginBottom: 100,
        marginRight: 100,
      }}
    />
  );
}
