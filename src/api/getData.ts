import { ApiResponse } from '@/types/globalTypes';
import { AxiosError, AxiosRequestConfig } from 'axios';
import api from '.';

/**
 *
 * @param url
 * @param config
 * @returns
 */

const getData = async <T>(
  url: string,
  config?: AxiosRequestConfig, // config를 추가하여 params 등 설정 가능
): Promise<ApiResponse<T>> => {
  try {
    const { data } = await api.get<ApiResponse<T>>(url, config);
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || 'API 요청 실패');
    }

    throw new Error('Unknown error occurred');
  }
};
export default getData;
