import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import useHeatMapSelectionStore from '../../store/panel/useHeatMapSelectionStore';
import { AirHeatMapSelectType } from '../../types/AirSelectType';

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

export default function AirDataSelector() {
  const [calendarDate, setCalendarDate] = useState(new Date());
  const [hour, setHour] = useState(new Date().getHours());
  const { selectedType, setSelectedType, setSelectedDateTime } = useHeatMapSelectionStore();

  const updateDateTime = (date: Date, hourTime: number) => {
    const updatedDate = new Date(date);
    updatedDate.setHours(hourTime, 0, 0, 0);
    const yyyy = updatedDate.getFullYear();
    const mm = String(updatedDate.getMonth() + 1).padStart(2, '0');
    const dd = String(updatedDate.getDate()).padStart(2, '0');
    const HH = String(hourTime).padStart(2, '0');
    const formatted = `${yyyy}-${mm}-${dd}T${HH}:00:00`;
    setSelectedDateTime(formatted);
  };

  const handleDateChange = (date: Date) => {
    setCalendarDate(date);
    updateDateTime(date, hour);
  };

  const handleHourChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedHour = parseInt(e.target.value, 10);
    setHour(selectedHour);
    updateDateTime(calendarDate, selectedHour);
  };

  return (
    <div className="space-y-4">
      <div>
        <h1 className="mb-2 text-sm font-semibold">측정 항목 선택</h1>
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value as AirHeatMapSelectType)}
          className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-xs shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          {airOptions.map((option) => (
            <option key={option.key} value={option.key}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <h1 className="mb-2 text-sm font-semibold">날짜 선택</h1>
        <Calendar
          value={calendarDate}
          onChange={(value) => handleDateChange(value as Date)}
          defaultActiveStartDate={new Date('2023-03-01')}
        />
      </div>

      <div>
        <h1 className="text-sm font-semibold">시간 선택 (시)</h1>
        <p className="mb-2 text-xs text-gray-500">히트 맵 데이터는 24년 이전부터 존재합니다.</p>
        <div className="mt-1 flex items-center gap-2">
          <select
            value={hour}
            onChange={handleHourChange}
            className="rounded border border-gray-300 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            {Array.from({ length: 24 }, (_, i) => (
              <option key={i} value={i}>
                {i.toString().padStart(2, '0')}시
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
