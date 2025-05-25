import { Link } from 'react-router-dom';
import logo from '@/assets/logo.png';

export default function Header() {
  return (
    <header className="relative flex h-[60px] items-center justify-between bg-white px-10 py-2 shadow-md">
      <div className="flex items-center gap-8">
        <Link to="/">
          <img src={logo} alt="로고" className="size-14" />
        </Link>
        <ul className="text-md flex gap-8">
          <li>
            <Link to="/map">지도</Link>
          </li>
          <li>
            <Link to="/upload">업로드</Link>
          </li>
        </ul>
      </div>
      <div>
        <Link to="/mypage">마이 페이지</Link>
      </div>
    </header>
  );
}
