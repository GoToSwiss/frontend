import useSelectedAirTypeStore from '../store/useSelectedAirTypeStore';
import { AirSelectType } from '../types/AirSelectType';

const airOptions = [
  { key: 'pm10', label: '미세먼지 (PM10)' },
  { key: 'pm25', label: '초미세먼지 (PM2.5)' },
  { key: 'o3', label: '오존 (O₃)' },
  { key: 'no2', label: '이산화질소 (NO₂)' },
  { key: 'co', label: '일산화탄소 (CO)' },
  { key: 'so2', label: '아황산가스 (SO₂)' },
  { key: 'khai', label: '통합대기환경지수 (KHAI)' },
];

function AirSelection() {
  const { selectedType, setSelectedType } = useSelectedAirTypeStore();

  return (
    <div>
      <h1 className="mb-2 text-sm font-semibold">데이터 유형</h1>
      <select
        value={selectedType}
        onChange={(e) => setSelectedType(e.target.value as AirSelectType)}
        className="w-full rounded border border-gray-300 px-3 py-2 text-xs shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
      >
        {airOptions.map((option) => (
          <option key={option.key} value={option.key}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default AirSelection;
