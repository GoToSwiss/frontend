import { useEffect, useRef } from 'react';
import * as Plot from '@observablehq/plot';
import rasterize from '@/features/mypage/service/PngConverter';
import { PlotFigureProps } from '../types/uploadType';

export default function PlotFigure({ options }: PlotFigureProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const plot = Plot.plot(options);

    if (containerRef.current) {
      containerRef.current.replaceChildren(plot);
    }

    return () => {
      plot.remove();
    };
  }, [options]);

  const handleDownload = async () => {
    if (!containerRef.current) return;

    const svg = containerRef.current.querySelector('svg');
    if (!svg) {
      alert('SVG를 찾을 수 없습니다.');
      return;
    }

    try {
      const { blob } = await rasterize(svg);

      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'chart.png';
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      alert('이미지 변환 중 오류가 발생했습니다.');
      console.error(err);
    }
  };

  return (
    <div className="flex w-full flex-col gap-4">
      <div ref={containerRef} className="flex" />
      <button
        onClick={handleDownload}
        className="w-[200px] self-center rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        PNG로 다운로드
      </button>
    </div>
  );
}
