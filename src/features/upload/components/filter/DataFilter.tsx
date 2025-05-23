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
      <button
        onClick={() => {
          setStep(0);
        }}
        className="mb-4 flex w-full items-center gap-1 text-sm text-blue-500 hover:text-blue-700 hover:underline"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
            clipRule="evenodd"
          />
        </svg>
        차트 설정으로 돌아가기
      </button>
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
            className="mt-4 w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            완료
          </button>
        )}
      </div>
    </WhiteBox>
  );
}
