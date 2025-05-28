import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import logo from '@/assets/logo.png';

function NotFound() {
  return (
    <>
      <SEO title="Not Found" description="모꼬지 notFoundPage" keywords="index, notfound" />
      <div className="box-border flex min-h-screen flex-col items-center justify-center bg-gray-50 px-5 py-10 md:mt-1.5">
        <h1 className="m-0 text-[96px] font-bold text-blue-500">404</h1>
        <p className="mb-2 mt-4 text-center text-2xl font-semibold text-gray-800">
          페이지를 찾을 수 없습니다
        </p>
        <p className="mb-8 text-center text-base text-gray-500">
          요청하신 페이지가 삭제되었거나 일시적으로 사용할 수 없습니다.
        </p>

        <Link
          to="/"
          className="rounded-lg bg-blue-500 px-6 py-3 text-center font-semibold text-white shadow-md hover:bg-blue-600"
        >
          홈 화면으로 이동
        </Link>
        <img src={logo} alt="로고" className="h-16 w-16 text-blue-500" />
      </div>
    </>
  );
}

export default NotFound;
