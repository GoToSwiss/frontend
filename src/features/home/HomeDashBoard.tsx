import { APIProvider, Map } from '@vis.gl/react-google-maps';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Bar, Radar } from 'react-chartjs-2';
import { MapController } from '@/pages/GoogleMap';
import useMapStore from '../map/store/useMapStore';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
);

// 더미 대기질 데이터 (최근 7일치 PM2.5, PM10, O3, NO2)
const dummyAirData = [
  { dataTime: '2025-05-01', pm25Value: 15, pm10Value: 35, o3Value: 0.03, no2Value: 0.02 },
  { dataTime: '2025-05-02', pm25Value: 18, pm10Value: 40, o3Value: 0.035, no2Value: 0.025 },
  { dataTime: '2025-05-03', pm25Value: 22, pm10Value: 42, o3Value: 0.04, no2Value: 0.03 },
  { dataTime: '2025-05-04', pm25Value: 20, pm10Value: 38, o3Value: 0.038, no2Value: 0.028 },
  { dataTime: '2025-05-05', pm25Value: 16, pm10Value: 33, o3Value: 0.032, no2Value: 0.021 },
  { dataTime: '2025-05-06', pm25Value: 19, pm10Value: 36, o3Value: 0.031, no2Value: 0.02 },
  { dataTime: '2025-05-07', pm25Value: 17, pm10Value: 34, o3Value: 0.033, no2Value: 0.022 },
];

const lineData = {
  labels: dummyAirData.map((d) => d.dataTime.slice(5)),
  datasets: [
    {
      label: 'PM2.5 (㎍/㎥)',
      data: dummyAirData.map((d) => d.pm25Value),
      borderColor: '#6366f1',
      backgroundColor: 'rgba(99, 102, 241, 0.3)',
      tension: 0.4,
    },
    {
      label: 'PM10 (㎍/㎥)',
      data: dummyAirData.map((d) => d.pm10Value),
      borderColor: '#10b981',
      backgroundColor: 'rgba(16, 185, 129, 0.3)',
      tension: 0.4,
    },
    {
      label: 'O₃ (ppm)',
      data: dummyAirData.map((d) => d.o3Value),
      borderColor: '#f97316',
      backgroundColor: 'rgba(251, 146, 60, 0.3)',
      tension: 0.4,
    },
    {
      label: 'NO₂ (ppm)',
      data: dummyAirData.map((d) => d.no2Value),
      borderColor: '#a855f7',
      backgroundColor: 'rgba(168, 85, 247, 0.3)',
      tension: 0.4,
    },
  ],
};

const barData = {
  labels: ['서울', '부산', '대구', '광주', '대전'],
  datasets: [
    {
      label: 'PM10',
      data: [40, 55, 33, 47, 39],
      backgroundColor: '#34d399',
    },
  ],
};

const radarData = {
  labels: ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'],
  datasets: [
    {
      label: '풍향 강도',
      data: [10, 15, 12, 8, 10, 14, 7, 9],
      backgroundColor: 'rgba(251, 191, 36, 0.2)',
      borderColor: '#fbbf24',
    },
  ],
};

const lineOptions = { responsive: true, plugins: { legend: { display: true } } };
const barOptions = { responsive: true, plugins: { legend: { display: false } } };
const radarOptions = { responsive: true, plugins: { legend: { display: false } } };

export default function DashboardPage() {
  const setMapInstance = useMapStore((state) => state.setMapInstance);
  return (
    <div className="p-8">
      <h2 className="mb-8 text-center text-2xl font-bold">퀵 액세스 대시보드</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* 최근 분석 결과 */}
        <div className="rounded-lg bg-white shadow">
          <h3 className="rounded-t bg-blue-600 px-4 py-5 font-semibold text-white">
            최근 분석 결과
          </h3>
          <div className="p-4">
            <Line data={lineData} options={lineOptions} />
          </div>
        </div>

        {/* 자주 사용하는 분석 도구 */}
        <div className="rounded-lg bg-white shadow">
          <h3 className="rounded-t bg-green-600 px-4 py-5 font-semibold text-white">
            자주 사용하는 분석 도구
          </h3>
          <div className="grid h-40 grid-cols-2 gap-3 p-4 text-sm text-black">
            <button className="rounded bg-green-100 px-4 py-2 text-left">📊 기본 통계 분석</button>
            <button className="rounded bg-blue-100 px-4 py-2 text-left">📈 시계열 분석</button>
            <button className="rounded bg-purple-100 px-4 py-2 text-left">📋 상관관계 분석</button>
            <button className="rounded bg-orange-100 px-4 py-2 text-left">🗺️ 지리적 분석</button>
          </div>
        </div>

        {/* 데이터 시각화 템플릿 */}
        <div className="rounded-lg bg-white shadow">
          <h3 className="rounded-t bg-purple-600 px-4 py-5 font-semibold text-white">
            데이터 시각화 템플릿
          </h3>
          <div className="grid grid-cols-2 gap-4 p-4 md:grid-cols-2">
            <div className="h-48 rounded bg-white p-2 shadow-sm">
              <Line data={lineData} options={lineOptions} />
            </div>
            <div className="h-48 rounded bg-white p-2 shadow-sm">
              <Bar data={barData} options={barOptions} />
            </div>
            <div className="h-48 rounded bg-white p-2 shadow-sm">
              <Radar data={radarData} options={radarOptions} />
            </div>
            <div className="flex h-48 items-center justify-center rounded bg-white p-2 text-sm text-gray-400 shadow-sm">
              <APIProvider apiKey={import.meta.env.VITE_MAP_API} libraries={['places']}>
                <Map
                  style={{ width: '100%', height: '100%', zIndex: 0 }}
                  defaultCenter={{ lat: 37.5665, lng: 126.978 }}
                  defaultZoom={7}
                  gestureHandling="greedy"
                  disableDefaultUI
                  mapId="104e02e9fce23a43cf95caf9"
                >
                  <MapController onReady={setMapInstance} />
                </Map>
              </APIProvider>
            </div>
          </div>
        </div>

        {/* 최근 리포트 */}
        <div className="rounded-lg bg-white shadow">
          <h3 className="rounded-t bg-orange-600 px-4 py-5 font-semibold text-white">
            최근 리포트
          </h3>
          <ul className="space-y-6 p-4 text-sm">
            <li>
              <p className="text-lg font-medium text-black">2025년 5월 대기질 월간 보고서</p>
              <p className="text-gray-500">서울 지역 미세먼지 및 오존 농도 분석</p>
            </li>
            <li>
              <p className="text-lg font-medium text-black">대기오염과 기상 조건 상관관계 분석</p>
              <p className="text-gray-500">2025년 1분기 데이터 기반</p>
            </li>
            <li>
              <p className="text-lg font-medium text-black">지역별 오존 농도 비교 분석</p>
              <p className="text-gray-500">주요 도시 5개 지역 데이터</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
