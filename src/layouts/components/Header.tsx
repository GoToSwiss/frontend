import { Link, useNavigate } from 'react-router-dom';
import logo from '@/assets/logo.png';
import useAuthStore from '@/store/useAuthStore';
import defaultImg from '@/assets/layout/kwon.jpg';
import sendData from '@/api/sendData';
import { toast } from 'react-toastify';

export default function Header() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const userImg = useAuthStore((state) => state.userImg);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await sendData('post', '/member/logout', {}, { withCredentials: true });
      navigate('/', { state: { fromLogout: true } });
    } catch (error) {
      toast.error('로그아웃 실패');
    }
  };

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

      {isLoggedIn ? (
        <div className="flex items-center gap-6">
          <Link to="/mypage" className="text-md transition-colors hover:text-blue-600">
            <img
              src={userImg || defaultImg}
              alt="유저 이미지"
              onError={(e) => {
                e.currentTarget.src = defaultImg;
              }}
              className="h-8 w-8 rounded-full"
              referrerPolicy="no-referrer"
            />
          </Link>
          <button
            type="button"
            className="rounded-md bg-red-500 px-4 py-1 text-white transition-colors hover:bg-red-600"
            onClick={handleLogout}
          >
            로그아웃
          </button>
        </div>
      ) : (
        <Link
          to="/login"
          className="rounded-md bg-blue-500 px-4 py-1 text-white transition-colors hover:bg-blue-600"
        >
          로그인
        </Link>
      )}
    </header>
  );
}
