import { ReactNode } from 'react';

export interface ButtonProps {
  children: ReactNode;
  className?: string;
  onClick: () => void;
}

export interface ApiResponse<T> {
  isSuccess: boolean;
  code: string;
  message: string | undefined;
  result: T;
}
