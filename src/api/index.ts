import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACK_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (error.response.status === 401) {
      // refresh 요청
      const refreshRes = await axios.post('/member/refresh', {}, { withCredentials: true });
      const newAccessToken = refreshRes.data.accessToken;

      // 기존 요청에 토큰 추가해서 재시도
      // eslint-disable-next-line no-param-reassign
      error.config.headers.Authorization = `Bearer ${newAccessToken}`;
      return axios(error.config);
    }
    return Promise.reject(error);
  },
);
export default axiosInstance;
