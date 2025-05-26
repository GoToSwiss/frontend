import { getErrorDataByCode } from '@/api/getErrorDataByCode';
import { QueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 1000 * 60,
      gcTime: 30 * 1000 * 60,
      throwOnError: true,
      notifyOnChangeProps: ['data'],
    },
    mutations: {
      throwOnError: false,
      onError: (error) => {
        if (axios.isAxiosError(error)) {
          const errorData = getErrorDataByCode(error);
          toast.error(`[${errorData.code}] ${errorData.message}`);
        } else {
          toast.error('알 수 없는 에러가 발생했습니다.');
        }
      },
    },
  },
});

export default queryClient;
