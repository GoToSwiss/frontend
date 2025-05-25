import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import getUserInfo from '../features/mypage/api/getUserInfo';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [isAuth, setIsAuth] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await getUserInfo();
        setIsAuth(response.isSuccess);
      } catch (error) {
        setIsAuth(false);
      }
    };

    checkAuth();
  }, []);

  if (isAuth === null) {
    return <div>인증 상태 확인 중...</div>; // 로딩 중
  }

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  return <div>{children}</div>;
}
