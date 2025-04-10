import axios from 'axios';
import { useEffect } from 'react';
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
        await axios.post(`${import.meta.env.VITE_BACK_URL}/login/google/2`, {
          code,
          redirectUrl: import.meta.env.VITE_APP_GOOGLE_AUTH_REDIRECT_URI,
        });

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
