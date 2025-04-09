import Loading from '@/components/Loading';
import useHandleLoginPost from '@/features/login/hook/useHandleLoginPost';

function LoadingAuth() {
  useHandleLoginPost();
  return <Loading title="로그인 중.." description="로그인 하고 있어요!" />;
}

export default LoadingAuth;
