import * as Plot from '@observablehq/plot';
import PlotFigure from '../PlotFigure';
import { useBinnedBoxStore } from '../../store/useFilterStore';
import useFileStore from '../../store/useFileStore';

export default function BinnedChart() {
  const { name, data, x } = useBinnedBoxStore();
  const uploadedData = useFileStore((state) => state.uploadedData);

  const parsedData = uploadedData
    .map((d) => {
      const date = new Date(d.time);
      const localDate = new Date(date.getTime() + 9 * 60 * 60 * 1000);
      return {
        ...d,
        time: localDate,
      };
    })
    .filter((d) => d.observatoryName === name);

  return (
    <PlotFigure
      options={{
        y: {
          grid: true,
        },
        x: {
          interval: x,
          label: x,
          labelAnchor: 'right',
        },
        marks: [
          Plot.boxY(parsedData, {
            x: 'time',
            y: data,
          }),
          Plot.ruleY([0]),
        ],
      }}
    />
  );
}
