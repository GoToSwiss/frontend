import WhiteBox from '@/features/upload/components/WhiteBox';
import useFileStore from '../store/useFileStore';
import LineChartFilter from './LineChartFilter';
import { useLineChartFilterStore } from '../store/useFilterStore';

export default function DataFilter() {
  const chart = useFileStore((state) => state.chart);
  const { setIsComplete } = useLineChartFilterStore();

  return (
    <WhiteBox title="데이터 필터">
      {chart === '꺾은선 그래프' ? (
        <div>
          <LineChartFilter />
          <button onClick={() => setIsComplete(true)}>완료</button>
        </div>
      ) : (
        <p className="text-gray-400">지원되지 않는 차트 유형입니다.</p>
      )}
    </WhiteBox>
  );
}
