import { useEffect, useRef } from 'react';
import * as Plot from '@observablehq/plot';
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

    const svgs = containerRef.current.querySelectorAll('svg');
    if (svgs.length === 0) {
      alert('SVG를 찾을 수 없습니다.');
      return;
    }

    try {
      const width = Array.from(svgs).reduce((w, svg) => Math.max(w, svg.width.baseVal.value), 0);
      const height = Array.from(svgs).reduce((h, svg) => h + svg.height.baseVal.value, 0);

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Canvas context 생성 실패');

      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      let offsetY = 0;

      await Promise.all(
        Array.from(svgs).map(
          (svg) =>
            new Promise<void>((resolve, reject) => {
              const svgClone = svg.cloneNode(true) as SVGSVGElement;
              const svgString = new XMLSerializer().serializeToString(svgClone);
              const blob = new Blob([svgString], { type: 'image/svg+xml' });
              const url = URL.createObjectURL(blob);
              const img = new Image();

              img.onload = () => {
                ctx.drawImage(img, 0, offsetY);
                offsetY += img.height;
                URL.revokeObjectURL(url);
                resolve();
              };
              img.onerror = reject;
              img.src = url;
            }),
        ),
      );

      const a = document.createElement('a');
      a.href = canvas.toDataURL('image/png');
      a.download = 'chart.png';
      a.click();
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
