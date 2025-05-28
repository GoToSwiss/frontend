import { Navigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import Loading from './Loading';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  if (isLoggedIn === null) {
    return <Loading title="인증 상태 확인 중..." description="잠시만 기다려주세요." />;
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <div>{children}</div>;
}
