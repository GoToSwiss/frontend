import { useSuspenseQuery } from '@tanstack/react-query';
import getData from '@/api/getData';
import { ApiResponse } from '@/types/globalTypes';
import { AirQualityType } from '../types/AirSelectType';
import useStationStore from '../store/useStationStore';
import useDateRangeStore from '../store/useDateRangeStore';

const usePredGetAir = () => {
  const { dateRange, timeRange } = useDateRangeStore();
  const [start, end] = dateRange;
  const isSameDay = start.toDateString() === end.toDateString();
  const stationName = useStationStore((state) => state.stationName);
  const startStr = start.toISOString().slice(0, 10);
  const endStr = end.toISOString().slice(0, 10);

  const queryKey = isSameDay
    ? ['pred', 'hour', stationName, startStr, timeRange[0]]
    : ['pred', 'day', stationName, startStr, endStr];

  const queryFn = async (): Promise<ApiResponse<AirQualityType[]>> => {
    if (isSameDay) {
      return getData(
        `/pred/data/get/hour/range?nation=${stationName}&startDateTime=${startStr}T${timeRange[0]}&endDateTime=${endStr}T${timeRange[1]}`,
      );
    }

    return getData(
      `/pred/data/get/day/range?nation=${stationName}&startDate=${startStr}&endDate=${endStr}`,
    );
  };

  return useSuspenseQuery<ApiResponse<AirQualityType[]>>({
    queryKey,
    queryFn,
  });
};

export default usePredGetAir;
