import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useMemo } from 'react';
import useGetAir from '../../query/air.query';
import useSelectedAirTypeStore from '../../store/useSelectedAirTypeStore';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const airLabelMap: Record<string, string> = {
  pm10: '미세먼지 (PM10)',
  pm25: '초미세먼지 (PM2.5)',
  o3: '오존 (O₃)',
  no2: '이산화질소 (NO₂)',
  co: '일산화탄소 (CO)',
  so2: '아황산가스 (SO₂)',
  khai: '통합대기환경지수 (KHAI)',
};

function AirLineChart() {
  const { selectedType } = useSelectedAirTypeStore();
  const { data, isLoading } = useGetAir();

  const chartData = useMemo(() => {
    if (!data || data.result.length === 0) return null;

    return {
      labels: data.result.map((entry) => entry.dataTime),
      datasets: [
        {
          label: airLabelMap[selectedType],
          data: data.result.map(
            (entry) => entry[`${selectedType}Value` as keyof typeof entry] as number,
          ),
          borderColor: 'rgba(59, 130, 246, 1)',
          backgroundColor: 'rgba(59, 130, 246, 0.2)',
          tension: 0.3,
        },
      ],
    };
  }, [data, selectedType]);

  if (isLoading) {
    return <div className="text-sm">그래프 데이터를 불러오는 중...</div>;
  }

  if (!chartData) {
    return <div className="text-sm text-gray-500">데이터가 없습니다.</div>;
  }

  return (
    <div className="mt-4">
      <Line
        className="h-60"
        options={{
          responsive: true,
          plugins: {
            legend: { display: true },
            title: { display: false },
          },
        }}
        data={chartData}
      />
    </div>
  );
}

export default AirLineChart;
