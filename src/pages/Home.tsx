import HomeBanner from '@/features/home/HomeBanner';
import SEO from '@/components/SEO';

export default function Home() {
  return (
    <>
      <SEO title="onAir 메인 화면" description="onAir" keywords="onAir, onAir 메인 화면" />
      <HomeBanner />
    </>
  );
}
