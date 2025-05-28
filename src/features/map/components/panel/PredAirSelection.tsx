import usePredAirSelectionStore from '../../store/panel/usePredAirSelectionStore';
import { AirPreviousSelectType } from '../../types/AirSelectType';

const airOptions = [
  { key: 'so2', label: '아황산가스 (SO₂)' },
  { key: 'pm25', label: '초미세먼지 (PM2.5)' },
  { key: 'pm10', label: '미세먼지 (PM10)' },
  { key: 'o3', label: '오존 (O₃)' },
  { key: 'no2', label: '이산화질소 (NO₂)' },
  { key: 'noAvg', label: '질소 평균 (NOAvg)' },
  { key: 'co', label: '일산화탄소 (CO)' },
  { key: 'co2', label: '이산화탄소 (CO₂)' },
  { key: 'ch4', label: '메탄 (CH₄)' },
];

function PredAirSelection() {
  const { selectedType, setSelectedType } = usePredAirSelectionStore();

  return (
    <div>
      <h1 className="mb-2 text-sm font-semibold">데이터 유형</h1>
      <select
        value={selectedType}
        onChange={(e) => setSelectedType(e.target.value as AirPreviousSelectType)}
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

export default PredAirSelection;
