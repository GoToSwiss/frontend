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

export interface FinalResponseProps {
  time: string;
  co2: number;
  ch4_ppb: number;
  ch4_ppm: number;
  type: string;
  province: string;
  city: string;
  district: string;
  observatoryName: string;
  code: string;
  so2_ppm: number;
  no2_ppm: number;
  o3_ppm: number;
  co_ppm: number;
  pm10: number;
  pm2_5: number;
  nox_ppm: number;
  no_ppm: number;
  windDirection: number;
  windSpeed: number;
  temperature: number;
  humidity: number;
}
