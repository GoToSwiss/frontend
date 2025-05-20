import * as Plot from '@observablehq/plot';
import useFileStore from '../../store/useFileStore';
import { useLineChartFilterStore } from '../../store/useFilterStore';
import PlotFigure from '../PlotFigure';

export default function LineChart() {
  const uploadedData = useFileStore((state) => state.uploadedData);
  // TODO: 실제 데이터로 변경하고 필터링 추가
  const y = useLineChartFilterStore((state) => state.y);

  return (
    <PlotFigure
      options={{
        marks: [
          Plot.lineY(
            uploadedData.map((d) => ({ ...d, time: new Date(d.time) })),
            { x: 'time', y, stroke: 'blue' },
          ),
          Plot.dotY(
            uploadedData.map((d) => ({ ...d, time: new Date(d.time) })),
            {
              x: 'time',
              y,
              fill: 'blue',
              r: 2,
              tip: true,
              title: (d) =>
                `🗓️ 날짜: ${d.time.toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })}\n\n📊 ${y}: ${d[y]}`,
            },
          ),
        ],
      }}
    />
  );
}
