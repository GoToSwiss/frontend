import { create } from 'zustand';

interface FileStore {
  file: File | null;
  uploadedData: any[]; // TODO: 시각화용 데이터 타입 생성
  setFile: (file: File) => void;
  setUploadedData: (data: any[]) => void;
}

const useFileStore = create<FileStore>((set) => ({
  file: null,
  uploadedData: [],
  setFile: (file) => set({ file }),
  setUploadedData: (data) => set({ uploadedData: data }),
}));

export default useFileStore;
