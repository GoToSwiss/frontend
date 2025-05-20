import { useSuspenseQuery } from '@tanstack/react-query';
import getData from '@/api/getData';
import { ApiResponse } from '@/types/globalTypes';
import { MarkerGeojson } from '../types/CoordType';

const useGetStations = () =>
  useSuspenseQuery<ApiResponse<MarkerGeojson>>({
    queryKey: ['stations'],
    queryFn: () => getData(`/observatory/get/loc`),
  });
export default useGetStations;
