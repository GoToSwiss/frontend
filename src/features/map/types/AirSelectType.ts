export interface AirQualityType {
  coGrade: number; // 일산화탄소 등급
  coValue: number; // 일산화탄소 수치 (ppm)

  dataTime: string; // 측정 시각 (ISO 형식)

  khaiGrade: number; // 통합대기환경지수 등급
  khaiValue: number; // 통합대기환경지수 수치

  no2Grade: number; // 이산화질소 등급
  no2Value: number; // 이산화질소 수치 (ppm)

  o3Grade: number; // 오존 등급
  o3Value: number; // 오존 수치 (ppm)

  pm10Grade: number; // 미세먼지(PM10) 등급
  pm10Value: number; // 미세먼지(PM10) 수치 (㎍/m³)

  pm25Grade: number; // 초미세먼지(PM2.5) 등급
  pm25Value: number; // 초미세먼지(PM2.5) 수치 (㎍/m³)

  so2Grade: number; // 아황산가스 등급
  so2Value: number; // 아황산가스 수치 (ppm)

  stationName: string; // 측정소 이름
}

export type AirSelectType = 'pm10' | 'pm25' | 'o3' | 'no2' | 'co' | 'so2' | 'khai';
