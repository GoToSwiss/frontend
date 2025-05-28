import { useState, useEffect } from 'react';
import HomeBanner from '@/features/home/HomeBanner';
import SEO from '@/components/SEO';
import { useLocation } from 'react-router-dom';
import useAuthStore from '@/store/useAuthStore';
import useIsMobile from '@/features/map/hooks/use-mobile';

export default function Home() {
  const location = useLocation();
  const setIsLoggedIn = useAuthStore((state) => state.setIsLoggedIn);

  useEffect(() => {
    if (location.state?.fromLogout) {
      setIsLoggedIn(false);
    }
  }, [location.state]);

  const isMobile = useIsMobile();
  const [isClosed, setIsClosed] = useState(false);

  return (
    <>
      <SEO title="onAir 메인 화면" description="onAir" keywords="onAir, onAir 메인 화면" />

      {isMobile && !isClosed && (
        <div className="bottom-50 fixed left-1/2 z-50 w-[90%] max-w-sm -translate-x-1/2 rounded bg-yellow-100 p-3 text-center text-sm text-yellow-800 shadow-md">
          본 사이트는 데스크톱 화면에 최적화되어 있습니다. <br />
          최상의 환경을 위해 PC로 접속해 주세요.
          <button
            onClick={() => setIsClosed(true)}
            className="ml-5 mt-2 rounded bg-yellow-300 px-3 py-1 text-xs text-yellow-900"
          >
            닫기
          </button>
        </div>
      )}

      <HomeBanner />
    </>
  );
}
