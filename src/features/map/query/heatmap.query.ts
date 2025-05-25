import { useSuspenseQuery } from '@tanstack/react-query';
import getData from '@/api/getData';
import { ApiResponse } from '@/types/globalTypes';
import useHeatMapSelectionStore from '../store/useHeatMapSelectionStore';
import { HeatMapCoordType } from '../types/HeatMapCoordType';

const useGetHeatMap = () => {
  const { selectedType, selectedDateTime } = useHeatMapSelectionStore();

  return useSuspenseQuery<ApiResponse<HeatMapCoordType[]>>({
    queryKey: ['air', 'heat', selectedType, selectedDateTime],
    queryFn: () => getData(`pred/get?dateTime=${selectedDateTime}&airType=${selectedType}`),
  });
};

export default useGetHeatMap;
