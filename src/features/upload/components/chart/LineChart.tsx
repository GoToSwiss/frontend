import * as Plot from '@observablehq/plot';
import useFileStore from '../../store/useFileStore';
import { useLineChartFilterStore } from '../../store/useFilterStore';
import PlotFigure from '../PlotFigure';

export default function LineChart() {
  const uploadedData = useFileStore((state) => state.uploadedData);
  const { startTime, endTime, addY, observationName } = useLineChartFilterStore();

  const parsedData = uploadedData
    .map((d) => ({
      ...d,
      time: new Date(d.time),
    }))
    .filter((d) => d.observatoryName === observationName);

  console.log(observationName);

  const marks = [];

  const colorPalette = [
    'red',
    'green',
    'orange',
    'purple',
    'teal',
    'brown',
    'pink',
    'gray',
    'indigo',
    'cyan',
  ];

  for (let i = 0; i < addY.length; i += 1) {
    const color = colorPalette[i % colorPalette.length];

    const filtered = parsedData.filter(
      (e) => e.time <= new Date(endTime) && e.time >= new Date(startTime),
    );

    marks.push(
      Plot.lineY(filtered, {
        x: 'time',
        y: addY[i],
        stroke: color,
      }),
      Plot.dotY(filtered, {
        x: 'time',
        y: addY[i],
        fill: color,
        r: 2,
        tip: true,
        title: (d) =>
          `🗓️ ${d.time.toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })}\n📊 ${addY[i]}: ${
            d[addY[i]]
          }`,
      }),
      Plot.text([filtered.at(-1)], {
        x: 'time',
        y: addY[i],
        dy: -10,
        text: () => addY[i],
        fill: color,
        fontWeight: 'bold',
      }),
    );
  }

  return <PlotFigure options={{ x: { grid: true }, y: { grid: true }, marks }} />;
}
