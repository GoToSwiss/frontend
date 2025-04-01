import Header from '@/layouts/components/Header';
import Loading from '@/components/Loading';
import QueryErrorBoundary from '@/services/QueryErrorBoundary';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

export default function CommonLayout() {
  return (
    <div>
      <Header />
      <div className="h-screen bg-[#F9FAFB]">
        <QueryErrorBoundary>
          <Suspense fallback={<Loading />}>
            <Outlet />
          </Suspense>
        </QueryErrorBoundary>
      </div>
    </div>
  );
}
