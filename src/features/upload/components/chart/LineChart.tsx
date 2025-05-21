import * as Plot from '@observablehq/plot';
import useFileStore from '../../store/useFileStore';
import { useLineChartFilterStore } from '../../store/useFilterStore';
import PlotFigure from '../PlotFigure';

export default function LineChart() {
  const uploadedData = useFileStore((state) => state.uploadedData);
  const { x, x2, y, y2 } = useLineChartFilterStore();

  const parsedData = uploadedData.map((d) => ({
    ...d,
    time: new Date(d.time),
  }));

  const marks = [
    Plot.lineY(
      parsedData.filter((e) => e.time <= new Date(x2) && e.time >= new Date(x)),
      { x: 'time', y, stroke: 'blue' },
    ),
    Plot.dotY(
      parsedData.filter((e) => e.time <= new Date(x2) && e.time >= new Date(x)),
      {
        x: 'time',
        y,
        fill: 'blue',
        r: 2,
        tip: true,
        title: (d) =>
          `🗓️ ${d.time.toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })}\n📊 ${y}: ${d[y]}`,
      },
    ),
    Plot.text([parsedData.filter((e) => e.time <= new Date(x2) && e.time >= new Date(x)).at(-1)], {
      x: 'time',
      y,
      text: () => y,
      dy: -10,
      fill: 'blue',
      fontWeight: 'bold',
    }),
  ];

  if (y2) {
    marks.push(
      Plot.lineY(
        parsedData.filter((e) => e.time <= new Date(x2) && e.time >= new Date(x)),
        { x: 'time', y: y2, stroke: 'red' },
      ),
      Plot.dotY(
        parsedData.filter((e) => e.time <= new Date(x2) && e.time >= new Date(x)),
        {
          x: 'time',
          y: y2,
          fill: 'red',
          r: 2,
          tip: true,
          title: (d) =>
            `🗓️ ${d.time.toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })}\n📊 ${y2}: ${d[y2]}`,
        },
      ),
      Plot.text(
        [parsedData.filter((e) => e.time <= new Date(x2) && e.time >= new Date(x)).at(-1)],
        {
          x: 'time',
          y: y2,
          dy: -10,
          text: () => y2,
          fill: 'red',
          fontWeight: 'bold',
        },
      ),
    );
  }

  return <PlotFigure options={{ marks }} />;
}
