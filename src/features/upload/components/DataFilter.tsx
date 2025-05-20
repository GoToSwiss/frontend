import WhiteBox from '@/features/upload/components/WhiteBox';
import useFileStore from '../store/useFileStore';
import LineChartFilter from './LineChartFilter';
import useStepStore from '../store/useStepStore';

export default function DataFilter() {
  const chart = useFileStore((state) => state.chart);
  const setStep = useStepStore((state) => state.setStep);

  return (
    <WhiteBox title="데이터 필터" className="flex-col">
      {chart === '꺾은선 그래프' ? (
        <div>
          <LineChartFilter />
          <button
            onClick={() => {
              setStep(3);
            }}
            className="mt-4 w-full rounded-lg bg-theme_secondary px-6 py-3 text-white transition-colors hover:bg-theme_secondary/90"
          >
            완료
          </button>
        </div>
      ) : (
        <p className="text-gray-400">지원되지 않는 차트 유형입니다.</p>
      )}
    </WhiteBox>
  );
}
