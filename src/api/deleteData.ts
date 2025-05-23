import axios, { AxiosRequestConfig } from 'axios';
import { ApiResponse } from '@/types/globalTypes';
import axiosInstance from '.';

/**
 *
 * @param url
 * @param config
 * @returns
 */

const deleteData = async <T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
  try {
    const { data } = await axiosInstance.delete<ApiResponse<T>>(url, config);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    }

    throw new Error('Unknown error occurred');
  }
};
export default deleteData;
