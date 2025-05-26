// AirItem.tsx

import { AirPreviousSelectType } from '../../types/AirSelectType';

function PredAirItem({
  label,
  value,
  unit,
  type,
}: {
  label: string;
  value: number;
  unit?: string;
  type: AirPreviousSelectType;
}) {
  const getGradeColor = (grade: number) => {
    switch (grade) {
      case 1:
        return 'text-green-600';
      case 2:
        return 'text-yellow-500';
      case 3:
        return 'text-orange-500';
      case 4:
        return 'text-red-600';
      default:
        return 'text-gray-500';
    }
  };

  const getGradeLabel = (grade: number) => {
    switch (grade) {
      case 1:
        return '좋음';
      case 2:
        return '보통';
      case 3:
        return '나쁨';
      case 4:
        return '매우나쁨';
      default:
        return '정보 없음';
    }
  };

  const getGrade = () => {
    switch (type) {
      case 'pm10':
        return getPM10Grade(value);
      case 'pm25':
        return getPM25Grade(value);
      case 'o3':
        return getO3Grade(value);
      case 'no2':
        return getNO2Grade(value);
      case 'noAvg':
        return getNoAvgGrade(value);
      case 'co':
        return getCOGrade(value);
      case 'co2':
        return getCO2Grade(value);
      case 'ch4':
        return getCH4Grade(value);
      case 'so2':
        return getSO2Grade(value);
      default:
        return 0;
    }
  };

  const grade = getGrade();

  return (
    <li className="flex justify-between">
      <span>{label}</span>
      <span className={`font-semibold ${getGradeColor(grade)}`}>
        {value} {unit ?? ''} ({getGradeLabel(grade)})
      </span>
    </li>
  );
}

export default PredAirItem;

// 등급 함수 (에어코리아 기준 및 사용자 기준 포함)
function getPM10Grade(value: number): number {
  if (value <= 30) return 1;
  if (value <= 80) return 2;
  if (value <= 150) return 3;
  return 4;
}

function getPM25Grade(value: number): number {
  if (value <= 15) return 1;
  if (value <= 35) return 2;
  if (value <= 75) return 3;
  return 4;
}

function getO3Grade(value: number): number {
  if (value <= 0.03) return 1;
  if (value <= 0.09) return 2;
  if (value <= 0.15) return 3;
  return 4;
}

function getNO2Grade(value: number): number {
  if (value <= 0.03) return 1;
  if (value <= 0.06) return 2;
  if (value <= 0.2) return 3;
  return 4;
}

function getNoAvgGrade(value: number): number {
  if (value <= 0.03) return 1;
  if (value <= 0.06) return 2;
  if (value <= 0.2) return 3;
  return 4;
}

function getCOGrade(value: number): number {
  if (value <= 2) return 1;
  if (value <= 9) return 2;
  if (value <= 15) return 3;
  return 4;
}

function getCO2Grade(value: number): number {
  if (value <= 450) return 1;
  if (value <= 1000) return 2;
  if (value <= 2000) return 3;
  return 4;
}

function getCH4Grade(value: number): number {
  if (value <= 2000) return 1;
  if (value <= 3000) return 2;
  if (value <= 4000) return 3;
  return 4;
}

function getSO2Grade(value: number): number {
  if (value <= 0.02) return 1;
  if (value <= 0.05) return 2;
  if (value <= 0.15) return 3;
  return 4;
}
