import { useSuspenseQuery } from '@tanstack/react-query';
import getData from '@/api/getData';
import { ApiResponse } from '@/types/globalTypes';
import { MarkerGeojson } from '../types/CoordType';

const useGetAir = (stationName: string, dateRange: [Date, Date], timeRange: [string, string]) => {
  const [start, end] = dateRange;
  const isSameDay = start.toDateString() === end.toDateString();

  const startStr = start.toISOString().slice(0, 10);
  const endStr = end.toISOString().slice(0, 10);

  const queryKey = isSameDay
    ? ['air', 'hour', stationName, startStr, timeRange[0]]
    : ['air', 'day', stationName, startStr, endStr];

  const queryFn = async (): Promise<ApiResponse<MarkerGeojson>> => {
    if (isSameDay) {
      return getData(
        `/observatory/data/get/hour/range?nation=${stationName}&startDateTime=${startStr}T${timeRange[0]}&endDateTime=${endStr}T${timeRange[1]}`,
      );
    }

    return getData(
      `/observatory/data/get/day/range?nation=${stationName}&startDate=${startStr}&endDate=${endStr}`,
    );
  };

  return useSuspenseQuery<ApiResponse<MarkerGeojson>>({
    queryKey,
    queryFn,
  });
};

export default useGetAir;
