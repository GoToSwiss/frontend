import WhiteBox from '@/features/upload/components/WhiteBox';
import VisualizationCard from '@/features/upload/components/VisualizationCard';
import useFileStore from '../store/useFileStore';
import useStepStore from '../store/useStepStore';

const visualizationTypes = [
  '막대 그래프',
  '원형 그래프',
  '꺾은선 그래프',
  '산점도',
  '히트맵',
  '윈드로즈',
];
export default function ChartFilter() {
  const setChart = useFileStore((state) => state.setChart);
  const setStep = useStepStore((state) => state.setStep);
  const step = useStepStore((state) => state.step);
  const onClick = (type: string) => {
    setChart(type);
  };
  return (
    <WhiteBox title="분석 도구" className="flex-col">
      <div className="grid grid-cols-3 gap-4">
        {visualizationTypes.map((type) => (
          <VisualizationCard
            key={type}
            title={type}
            className="rounded-lg border p-4 text-center shadow-md"
            isGraph
            logoSrc="/src/assets/logo.png"
            onClick={() => onClick(type)}
          />
        ))}
      </div>
      <button
        onClick={() => setStep(step + 1)}
        className="mt-4 w-full rounded-lg bg-theme_secondary px-6 py-3 text-white transition-colors hover:bg-theme_secondary/90"
      >
        Next
      </button>
    </WhiteBox>
  );
}
