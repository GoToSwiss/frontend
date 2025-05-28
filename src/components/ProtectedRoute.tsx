import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import getUserInfo from '../features/mypage/api/getUserInfo';
import Loading from './Loading';

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
    return <Loading title="인증 상태 확인 중..." description="인증 상태를 확인하고 있습니다." />;
  }

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  return <div>{children}</div>;
}
