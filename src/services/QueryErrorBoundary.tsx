import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import { Link } from 'react-router-dom';
import ErrorIcon from '@/assets/Error.svg?react';

function QueryErrorFallback({ resetErrorBoundary }: FallbackProps) {
  return (
    <div className="flex h-full flex-col items-center justify-center bg-gray-100 px-4 py-6 text-center">
      <ErrorIcon className="mb-5 h-auto w-16" />
      <h2 className="mb-4 text-lg font-bold">오류 발생!</h2>
      <div className="flex gap-3">
        <button
          onClick={resetErrorBoundary}
          className="rounded-md bg-black px-5 py-2 text-base text-white transition hover:bg-gray-800"
        >
          ↻ 다시 시도
        </button>
        <Link
          to="/"
          className="rounded-md bg-gray-500 px-5 py-2 text-base text-white transition hover:bg-gray-700"
        >
          홈으로 가기
        </Link>
      </div>
    </div>
  );
}

export default function QueryErrorBoundary({ children }: { children: ReactNode }) {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary onReset={reset} FallbackComponent={QueryErrorFallback}>
      {children}
    </ErrorBoundary>
  );
}
