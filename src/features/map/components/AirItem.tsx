function AirItem({
  label,
  value,
  unit,
  type,
}: {
  label: string;
  value: number;
  unit?: string;
  type: 'pm10' | 'pm25' | 'o3' | 'no2' | 'co' | 'so2' | 'khai';
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
      case 'co':
        return getCOGrade(value);
      case 'so2':
        return getSO2Grade(value);
      case 'khai':
        return getKHAIGrade(value);
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
export default AirItem;
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

function getCOGrade(value: number): number {
  if (value <= 2) return 1;
  if (value <= 9) return 2;
  if (value <= 15) return 3;
  return 4;
}

function getSO2Grade(value: number): number {
  if (value <= 0.02) return 1;
  if (value <= 0.05) return 2;
  if (value <= 0.15) return 3;
  return 4;
}

function getKHAIGrade(value: number): number {
  if (value <= 50) return 1;
  if (value <= 100) return 2;
  if (value <= 250) return 3;
  return 4;
}
