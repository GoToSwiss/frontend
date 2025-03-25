import Header from '@/components/Header';
import { Outlet } from 'react-router-dom';

export default function CommonLayout() {
  return (
    <div>
      <Header />
      <div className="h-full bg-web_bg">
        <Outlet />
      </div>
    </div>
  );
}
