import { Link } from 'react-router-dom';
import logo from '@/assets/logo.png';

export default function Header() {
  return (
    <header className="relative flex h-[60px] items-center justify-between bg-white px-10 py-2 shadow-md">
      <div className="flex items-center gap-8">
        <Link to="/">
          <img src={logo} alt="로고" className="h-14 w-auto" />
        </Link>
        <ul className="text-md flex gap-8">
          <li>
            <Link to="/map" className="transition-colors hover:text-blue-600">
              지도
            </Link>
          </li>
          <li>
            <Link to="/upload" className="transition-colors hover:text-blue-600">
              업로드
            </Link>
          </li>
        </ul>
      </div>
      <div className="flex items-center gap-6">
        <Link to="/mypage" className="text-md transition-colors hover:text-blue-600">
          마이 페이지
        </Link>
        <button
          type="button"
          className="rounded-md bg-red-500 px-4 py-1 text-white transition-colors hover:bg-red-600"
        >
          로그아웃
        </button>
      </div>
    </header>
  );
}
