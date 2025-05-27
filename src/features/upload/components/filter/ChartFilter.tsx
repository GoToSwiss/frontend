import { useState } from 'react';
import WhiteBox from '@/features/upload/components/WhiteBox';
import VisualizationCard from '@/features/upload/components/VisualizationCard';
import logo from '@/assets/logo.png';
import useFileStore from '../../store/useFileStore';
import useStepStore from '../../store/useStepStore';

const description: Record<'CBPF' | 'Binned Box' | '꺾은선 그래프' | '히트맵', string> = {
  CBPF: '풍향과 풍속에 따른 오염물질 농도 분포를 시각화한 그래프입니다.',
  'Binned Box': '시간에 따른 오염물질 농도의 변화를 박스플롯으로 나타낸 그래프입니다.',
  '꺾은선 그래프': '시간에 따른 오염물질 농도의 변화를 선으로 나타낸 그래프입니다.',
  히트맵: '피어슨 상관계수를 이용한 히트맵입니다.',
};

const visualizationTypes = ['CBPF', 'Binned Box', '꺾은선 그래프', '히트맵'] as const;

export default function ChartFilter() {
  const setChart = useFileStore((state) => state.setChart);
  const setStep = useStepStore((state) => state.setStep);
  const step = useStepStore((state) => state.step);
  const [isClicked, setIsClicked] = useState<string>('');
  const onClick = (type: string) => {
    setChart(type);
    setIsClicked(type);
  };
  return (
    <WhiteBox title="분석 도구" className="flex flex-col justify-between">
      <div className="grid grid-cols-4 gap-4">
        {visualizationTypes.map((type) => (
          <VisualizationCard
            key={type}
            title={type}
            className="rounded-md border p-4 text-center shadow-md"
            isGraph
            logoSrc={logo}
            isClicked={isClicked === type}
            onClick={() => onClick(type)}
            description={description[type]}
          />
        ))}
      </div>
      <button
        onClick={() => setStep(step + 1)}
        className="mt-4 w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        다음
      </button>
    </WhiteBox>
  );
}
