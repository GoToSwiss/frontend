import Header from '@/components/Header';
import { Outlet } from 'react-router-dom';

export default function CommonLayout() {
  return (
    <div>
      <Header />
      <div className="h-screen bg-[#F9FAFB]">
        <Outlet />
      </div>
    </div>
  );
}
