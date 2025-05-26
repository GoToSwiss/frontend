import Header from '@/layouts/components/Header';
import Loading from '@/components/Loading';
import QueryErrorBoundary from '@/services/QueryErrorBoundary';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import ChatBot from '@/features/map/components/chat/ChatBot';

export default function CommonLayout() {
  return (
    <div>
      <Header />
      <div className="z-10 h-[calc(100vh-60px)] bg-[#F9FAFB]">
        <QueryErrorBoundary>
          <Suspense
            fallback={
              <Loading
                title="데이터를 불러오는 중.."
                description="열심히 데이터를 가져오고 있어요"
              />
            }
          >
            <Outlet />
            <ChatBot />
          </Suspense>
        </QueryErrorBoundary>
      </div>
    </div>
  );
}
