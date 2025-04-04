import { useEffect, useRef } from 'react';
import * as Plot from '@observablehq/plot';
import { PlotFigureProps } from '../types/uploadType';

export default function PlotFigure({ options }: PlotFigureProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const plot = Plot.plot(options);

    if (ref.current) {
      ref.current.innerHTML = '';
      ref.current.appendChild(plot);
    }

    return () => {
      plot.remove();
    };
  }, [options]);

  return <div ref={ref} className="flex w-full justify-center" />;
}
