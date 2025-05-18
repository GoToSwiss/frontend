import { ReactNode } from 'react';
import * as Plot from '@observablehq/plot';

export interface WhiteBoxProps {
  children: ReactNode;
  title: string;
  className?: string;
}

export interface VisualizationCardProps {
  title: string;
  description?: string | undefined;
  className?: string;
  isGraph?: boolean | undefined;
  logoSrc: string;
  onClick?: () => void;
}

export interface PlotFigureProps {
  options: Parameters<typeof Plot.plot>[0];
}

export interface UploadProps {
  headers: string[];
  fileId: string;
}
