import React from 'react';

const airGrades = [
  { label: '좋음', color: 'bg-green-400' },
  { label: '보통', color: 'bg-yellow-400' },
  { label: '나쁨', color: 'bg-orange-500' },
  { label: '매우나쁨', color: 'bg-red-500' },
];

const gradeRanges: Record<string, string[]> = {
  pm10: ['0-30', '31-80', '81-150', '151+'],
  pm25: ['0-15', '16-35', '36-75', '76+'],
  o3: ['0~0.03', '0.031~0.09', '0.091~0.15', '0.151+'],
  no2: ['0~0.03', '0.031~0.06', '0.061~0.2', '0.201+'],
  co: ['0~2', '2.01~9', '9.01~15', '15.01+'],
  so2: ['0~0.02', '0.021~0.05', '0.051~0.15', '0.151+'],
  khai: ['0~50', '51~100', '101~250', '251+'],
  noAvg: ['0~0.03', '0.031~0.06', '0.061~0.2', '0.201+'],
  co2: ['0~400', '401~1000', '1001~2000', '2001+'],
  ch4: ['0~2000', '2001~3000', '3001~4000', '4001+'],
};

export default function AirLegend() {
  return (
    <div className="space-y-2 text-xs">
      <h2 className="text-sm font-semibold">대기질 등급 기준</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-xs">
          <thead>
            <tr>
              <th className="border-b p-2 font-semibold text-gray-600">항목</th>
              {airGrades.map((grade) => (
                <th
                  key={grade.label}
                  className="border-b p-2 text-center font-semibold text-gray-600"
                >
                  <div className={`mr-1 inline-block h-3 w-3 rounded-sm ${grade.color}`} />
                  {grade.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Object.entries(gradeRanges).map(([key, ranges]) => (
              <tr key={key}>
                <td className="border-b p-2 font-medium text-gray-700">{getLabel(key)}</td>
                {ranges.map((range) => (
                  <td key={range} className="border-b p-2 text-center text-gray-700">
                    {range}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function getLabel(key: string) {
  switch (key) {
    case 'pm10':
      return '미세먼지 (PM10)';
    case 'pm25':
      return '초미세먼지 (PM2.5)';
    case 'o3':
      return '오존 (O₃)';
    case 'no2':
      return '이산화질소 (NO₂)';
    case 'co':
      return '일산화탄소 (CO)';
    case 'so2':
      return '아황산가스 (SO₂)';
    case 'khai':
      return '통합대기환경지수 (KHAI)';
    case 'noAvg':
      return '질소산화물 평균 (NOx)';
    case 'co2':
      return '이산화탄소 (CO₂)';
    case 'ch4':
      return '메탄 (CH₄)';
    default:
      return key.toUpperCase();
  }
}
