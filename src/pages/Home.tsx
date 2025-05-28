import HomeBanner from '@/features/home/HomeBanner';
import SEO from '@/components/SEO';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useAuthStore from '@/store/useAuthStore';

export default function Home() {
  const location = useLocation();
  const setIsLoggedIn = useAuthStore((state) => state.setIsLoggedIn);

  useEffect(() => {
    if (location.state?.fromLogout) {
      setIsLoggedIn(false);
    }
  }, [location.state]);

  return (
    <>
      <SEO title="onAir 메인 화면" description="onAir" keywords="onAir, onAir 메인 화면" />
      <HomeBanner />
    </>
  );
}
