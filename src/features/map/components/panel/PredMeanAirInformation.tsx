import { useMemo } from 'react';
import usePredGetAir from '../../query/previousAir.query';
import PredAirItem from './PredAirItem';

function PredMeanAirInformation() {
  const { data, isLoading } = usePredGetAir();

  const averages = useMemo(() => {
    if (!data || data.result.length === 0) return null;

    const sum = data.result.reduce(
      (acc, item) => {
        acc.so2 += item.so2;
        acc.pm25 += item.pm25;
        acc.pm10 += item.pm10;
        acc.o3 += item.o3;
        acc.no2 += item.no2;
        acc.noAvg += item.noAvg;
        acc.co += item.co;
        acc.co2 += item.co2;
        acc.ch4 += item.ch4;
        return acc;
      },
      {
        so2: 0,
        pm25: 0,
        pm10: 0,
        o3: 0,
        no2: 0,
        noAvg: 0,
        co: 0,
        co2: 0,
        ch4: 0,
      },
    );

    const getAverage = (v: number) => Math.round((v / data.result.length) * 100) / 100;

    return {
      so2: getAverage(sum.so2),
      pm25: getAverage(sum.pm25),
      pm10: getAverage(sum.pm10),
      o3: getAverage(sum.o3),
      no2: getAverage(sum.no2),
      noAvg: getAverage(sum.noAvg),
      co: getAverage(sum.co),
      co2: getAverage(sum.co2),
      ch4: getAverage(sum.ch4),
    };
  }, [data]);

  return (
    <div>
      {isLoading ? (
        <div className="flex h-full items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-gray-900" />
        </div>
      ) : (
        <div>
          {averages && (
            <div className="space-y-2 text-sm">
              <div className="font-semibold text-gray-700">평균 대기질 정보</div>
              <ul className="space-y-1">
                <PredAirItem label="아황산가스 (SO₂)" value={averages.so2} unit="ppm" type="so2" />
                <PredAirItem
                  label="초미세먼지 (PM2.5)"
                  value={averages.pm25}
                  unit="㎍/㎥"
                  type="pm25"
                />
                <PredAirItem
                  label="미세먼지 (PM10)"
                  value={averages.pm10}
                  unit="㎍/㎥"
                  type="pm10"
                />
                <PredAirItem label="오존 (O₃)" value={averages.o3} unit="ppm" type="o3" />
                <PredAirItem label="이산화질소 (NO₂)" value={averages.no2} unit="ppm" type="no2" />
                <PredAirItem
                  label="질소산화물 평균"
                  value={averages.noAvg}
                  unit="ppm"
                  type="noAvg"
                />
                <PredAirItem label="일산화탄소 (CO)" value={averages.co} unit="ppm" type="co" />
                <PredAirItem label="이산화탄소 (CO₂)" value={averages.co2} unit="ppm" type="co2" />
                <PredAirItem label="메탄 (CH₄)" value={averages.ch4} unit="ppm" type="ch4" />
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default PredMeanAirInformation;
