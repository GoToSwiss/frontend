import { create } from 'zustand';

export interface UploadData {
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

interface FileStore {
  file: File | null;
  uploadedData: UploadData[]; // TODO: 시각화용 데이터 타입 생성
  chart: string;
  setFile: (file: File) => void;
  setUploadedData: (data: UploadData[]) => void;
  setChart: (chart: string) => void;
}

const useFileStore = create<FileStore>((set) => ({
  file: null,
  uploadedData: [],
  chart: '',
  setFile: (file: File) => set({ file }),
  setUploadedData: (data: UploadData[]) => set({ uploadedData: data }),
  setChart: (chart: string) => set({ chart }),
}));

export default useFileStore;
