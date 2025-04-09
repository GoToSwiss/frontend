import { ReactNode } from 'react';

export interface ButtonProps {
  children: ReactNode;
  className?: string;
  onClick: () => void;
}

export interface ApiResponse<T> {
  status: number;
  message: string | undefined;
  result: T;
  error: string | undefined;
}
