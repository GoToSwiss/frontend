import { Link } from 'react-router-dom';
import logo from '@/assets/logo.png';
import kwon from '@/assets/layout/kwon.jpg';

export default function Header() {
  return (
    <header className="relative flex justify-between bg-white px-10 py-2 shadow-md">
      <div className="flex items-center gap-8">
        <Link to="/">
          <img src={logo} alt="로고" className="size-16" />
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
        <img src={kwon} alt="권기학" className="size-14 rounded-full" />
      </div>
    </header>
  );
}
