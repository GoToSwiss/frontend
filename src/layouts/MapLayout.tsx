import Header from '@/layouts/components/Header';
import QueryErrorBoundary from '@/services/QueryErrorBoundary';

export default function MapLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      <div className="z-10 h-[calc(100vh-60px)] bg-[#F9FAFB]">
        <QueryErrorBoundary>{children}</QueryErrorBoundary>
      </div>
    </div>
  );
}
