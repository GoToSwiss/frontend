import { ReactNode } from 'react';

export interface WhiteBoxProps {
  children: ReactNode;
  title: string;
}

export interface VisualizationCardProps {
  title: string;
  description?: string | undefined;
  className?: string;
  isGraph?: boolean | undefined;
  logoSrc: string;
}
