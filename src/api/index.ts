import axios from 'axios';
import useAuthStore from '@/store/useAuthStore';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACK_URL,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (error.response?.status === 401) {
      try {
        const refreshRes = await axios.post(
          `${import.meta.env.VITE_BACK_URL}/member/refresh`,
          {},
          { withCredentials: true },
        );

        const newAccessToken = refreshRes.data.accessToken;

        const { setIsLoggedIn } = useAuthStore.getState();
        setIsLoggedIn(true);

        // eslint-disable-next-line no-param-reassign
        error.config.headers.Authorization = `Bearer ${newAccessToken}`;
        return await axiosInstance(error.config);
      } catch (refreshError) {
        const { setIsLoggedIn } = useAuthStore.getState();
        setIsLoggedIn(false);
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
