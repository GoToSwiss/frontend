import WhiteBox from '@/features/upload/components/WhiteBox';
import useFileStore from '../../store/useFileStore';
import LineChartFilter from './LineChartFilter';
import useStepStore from '../../store/useStepStore';
import WindroseFilter from './CBPFFilter';

const filterComponent: Record<string, React.FC> = {
  '꺾은선 그래프': LineChartFilter,
  CBPF: WindroseFilter,
};

export default function DataFilter() {
  const chart = useFileStore((state) => state.chart);
  const setStep = useStepStore((state) => state.setStep);
  const step = useStepStore((state) => state.step);

  const SelectedFilterComponent = filterComponent[chart];

  return (
    <WhiteBox title="데이터 필터" className="flex-col">
      <div>
        {SelectedFilterComponent ? (
          <SelectedFilterComponent />
        ) : (
          <p>해당 차트에 대한 필터가 없습니다.</p>
        )}
        {step === 1 && (
          <button
            onClick={() => {
              setStep(step + 1);
            }}
            className="mt-4 w-full rounded-lg bg-theme_secondary px-6 py-3 text-white transition-colors hover:bg-theme_secondary/90"
          >
            완료
          </button>
        )}
      </div>
    </WhiteBox>
  );
}
