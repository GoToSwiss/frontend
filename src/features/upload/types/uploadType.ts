import { ReactNode } from 'react';

export interface WhiteBoxProps {
  children: ReactNode;
  title: string;
}

export interface VisualizationCardProps {
  title: string;
  description?: string;
  className?: string;
  isGraph?: boolean;
  logoSrc: string;
}
