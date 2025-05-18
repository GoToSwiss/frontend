import { create } from 'zustand';

interface UploadData {
  Time: string;
  'CO2(ppm)': number;
  'CH4(ppb)': number;
  'CH4(ppm)': number;
  TYPE: string;
  시도: string;
  도시: string;
  시군구: string;
  측정소명: string;
  측정소코드: string;
  'SO₂(ppm)(Avg)': number;
  'NO₂(ppm)(Avg)': number;
  'O₃(ppm)(Avg)': number;
  'CO(ppm)(Avg)': number;
  'PM10(㎍/㎥)(Avg)': number;
  'PM2.5(㎍/㎥)(Avg)': number;
  'NOx(ppm)(Avg)': number;
  'NO(ppm)(Avg)': number;
  '풍향(도)(Avg)': number;
  '풍속(m/s)(Avg)': number;
  '온도(℃)(Avg)': number;
  '습도(%)(Avg)': number;
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
