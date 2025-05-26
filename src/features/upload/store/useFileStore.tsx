import { create } from 'zustand';
import { FinalResponseProps } from '../types/uploadType';

interface FileStore {
  file: File | null;
  uploadedData: FinalResponseProps[]; // TODO: 시각화용 데이터 타입 생성
  chart: string;
  setFile: (file: File) => void;
  setUploadedData: (data: FinalResponseProps[]) => void;
  setChart: (chart: string) => void;
}

const useFileStore = create<FileStore>((set) => ({
  file: null,
  uploadedData: [],
  chart: '',
  setFile: (file: File) => set({ file }),
  setUploadedData: (data: FinalResponseProps[]) => set({ uploadedData: data }),
  setChart: (chart: string) => set({ chart }),
}));

export default useFileStore;
