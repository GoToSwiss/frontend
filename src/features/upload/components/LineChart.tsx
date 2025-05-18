import * as Plot from '@observablehq/plot';
import dummy from '@/dummy';
import PlotFigure from './PlotFigure';
import useFileStore from '../store/useFileStore';

export default function LineChart() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const uploadedData = useFileStore((state) => state.uploadedData);
  // TODO: 실제 데이터로 변경하고 필터링 추가

  return (
    <PlotFigure
      options={{
        marks: [
          Plot.lineY(
            dummy.map((d) => ({ ...d, time: new Date(d.time) })),
            { x: 'time', y: 'co2', stroke: 'blue' },
          ),
          Plot.dotY(
            dummy.map((d) => ({ ...d, time: new Date(d.time) })),
            { x: 'time', y: 'co2', fill: 'blue', r: 2, tip: true },
          ),
        ],
      }}
    />
  );
}
