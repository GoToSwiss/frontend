import { useSuspenseQuery } from '@tanstack/react-query';
import getData from '@/api/getData';
import { ApiResponse } from '@/types/globalTypes';
import { AirPreviousResponseType } from '../types/AirSelectType';
import useStationStore from '../store/panel/useStationStore';
import useDateRangeStore from '../store/panel/useDateRangeStore';

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

  const queryFn = async (): Promise<ApiResponse<AirPreviousResponseType[]>> => {
    if (isSameDay) {
      return getData(
        `/pred/get/hour/range?nation=${stationName}&startDateTime=${startStr}T${timeRange[0]}&endDateTime=${endStr}T${timeRange[1]}`,
      );
    }

    return getData(
      `/pred/get/day/range?nation=${stationName}&startDate=${startStr}&endDate=${endStr}`,
    );
  };

  return useSuspenseQuery<ApiResponse<AirPreviousResponseType[]>>({
    queryKey,
    queryFn,
  });
};

export default usePredGetAir;
