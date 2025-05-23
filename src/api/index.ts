import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import { toast } from 'react-toastify';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACK_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const accessToken = getCookie('ACCESS_TOKEN');
    const customConfig = Object.assign(config);
    if (accessToken) {
      customConfig.headers.Authorization = `Bearer ${accessToken}`;
    }
    return customConfig;
  },
  (error) => Promise.reject(error),
);

const getRefreshToken = async () => {
  const refreshToken = getCookie('REFRESH_TOKEN');

  if (!refreshToken) {
    throw new Error('리프레시 토큰이 없습니다.');
  }

  try {
    await axiosInstance.post(
      '/member/refresh',
      {},
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      },
    );

    const accessToken = getCookie('ACCESS_TOKEN');
    const newRefreshToken = getCookie('REFRESH_TOKEN');

    // 새로운 토큰 저장
    setCookie('accessToken', accessToken);
    setCookie('refreshToken', newRefreshToken);

    axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

    return await accessToken;
  } catch (error) {
    deleteCookie('accessToken');
    deleteCookie('refreshToken');
    if (typeof window !== 'undefined') {
      toast.warn('다시 로그인해주세요.');
      window.location.href = '/login';
    }
    throw error;
  }
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig;

    if (error.response?.status === 401) {
      try {
        const accessToken = await getRefreshToken();

        // 새로운 액세스 토큰으로 헤더 업데이트 및 원래 요청 재시도
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        return await axiosInstance(originalRequest);
      } catch (errorRetry: unknown) {
        return Promise.reject(errorRetry);
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
