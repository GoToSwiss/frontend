import axiosInstance from '@/api';
import { useEffect } from 'react';
import useAuthStore from '@/store/useAuthStore';
import useToastNavigate from './useToastNavigate';

function useHandleLoginPost() {
  const { toastAndGo } = useToastNavigate();
  useEffect(() => {
    const login = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get('code');

      if (!code) {
        toastAndGo(false, '코드가 없습니다. 다시 로그인 해주세요.', '/', {
          autoClose: 1500,
        });
        return;
      }

      try {
        await axiosInstance.post(`/member/login/google`, {
          code,
          redirectUrl: import.meta.env.VITE_APP_GOOGLE_AUTH_REDIRECT_URI,
        });
        const { setIsLoggedIn } = useAuthStore.getState();
        setIsLoggedIn(true);

        toastAndGo(true, '로그인 성공', '/', {
          autoClose: 1500,
        });
      } catch (error) {
        toastAndGo(false, '로그인 실패', '/login', {
          autoClose: 1500,
        });
      }
    };

    login();
  }, []);
}

export default useHandleLoginPost;
