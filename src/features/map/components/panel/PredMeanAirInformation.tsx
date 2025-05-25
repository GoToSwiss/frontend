import { useMemo } from 'react';
import useGetAir from '../../query/air.query';
import PredAirItem from './PredAirItem';

function PredMeanAirInformation() {
  const { data, isLoading } = useGetAir();

  const averages = useMemo(() => {
    if (!data || data.result.length === 0) return null;

    const sum = data.result.reduce(
      (acc, item) => {
        acc.pm10Value += item.pm10Value;
        acc.pm25Value += item.pm25Value;
        acc.o3Value += item.o3Value;
        acc.no2Value += item.no2Value;
        acc.coValue += item.coValue;
        acc.so2Value += item.so2Value;
        acc.khaiValue += item.khaiValue;
        return acc;
      },
      {
        pm10Value: 0,
        pm25Value: 0,
        o3Value: 0,
        no2Value: 0,
        coValue: 0,
        so2Value: 0,
        khaiValue: 0,
      },
    );

    const getAverage = (v: number) => Math.round((v / data.result.length) * 100) / 100;

    return {
      pm10Value: getAverage(sum.pm10Value),
      pm25Value: getAverage(sum.pm25Value),
      o3Value: getAverage(sum.o3Value),
      no2Value: getAverage(sum.no2Value),
      coValue: getAverage(sum.coValue),
      so2Value: getAverage(sum.so2Value),
      khaiValue: getAverage(sum.khaiValue),
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
                <PredAirItem
                  label="미세먼지 (PM10)"
                  value={averages.pm10Value}
                  unit="㎍/㎥"
                  type="pm10"
                />
                <PredAirItem
                  label="초미세먼지 (PM2.5)"
                  value={averages.pm25Value}
                  unit="㎍/㎥"
                  type="pm25"
                />
                <PredAirItem label="오존 (O₃)" value={averages.o3Value} unit="ppm" type="o3" />
                <PredAirItem
                  label="이산화질소 (NO₂)"
                  value={averages.no2Value}
                  unit="ppm"
                  type="no2"
                />
                <PredAirItem
                  label="일산화탄소 (CO)"
                  value={averages.coValue}
                  unit="ppm"
                  type="co"
                />
                <PredAirItem
                  label="아황산가스 (SO₂)"
                  value={averages.so2Value}
                  unit="ppm"
                  type="so2"
                />
                <PredAirItem
                  label="통합대기환경지수 (KHAI)"
                  value={averages.khaiValue}
                  type="khai"
                />
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default PredMeanAirInformation;
