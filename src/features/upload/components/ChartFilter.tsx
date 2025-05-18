import Button from '@/components/Button';
import WhiteBox from '@/features/upload/components/WhiteBox';
import VisualizationCard from '@/features/upload/components/VisualizationCard';

const visualizationTypes = [
  '막대 그래프',
  '원형 그래프',
  '꺾은선 그래프',
  '산점도',
  '히트맵',
  '윈드로즈',
];
export default function ChartFilter() {
  // TODO: 시각화 유형 선택하고 zustand에 저장
  const onClick = () => {};
  return (
    <WhiteBox title="분석 도구">
      <h3 className="text-sm font-semibold">시각화 유형</h3>
      <div className="grid grid-cols-3 gap-4">
        {visualizationTypes.map((type) => (
          <VisualizationCard
            key={type}
            title={type}
            className="rounded-lg border p-4 text-center shadow-md"
            isGraph
            logoSrc="/src/assets/logo.png"
          />
        ))}
      </div>
      <Button className="rounded bg-theme_black px-4 py-2 text-white" onClick={onClick}>
        분석하기
      </Button>
    </WhiteBox>
  );
}
