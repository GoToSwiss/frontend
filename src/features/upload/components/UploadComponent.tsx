import { useRef, useState, useTransition } from 'react';
import uploadLogo from '@/assets/upload/upload.png';
import sendData from '@/api/sendData';
import Button from '@/components/Button';
import { toast } from 'react-toastify';
import useFileStore from '../store/useFileStore';
import { FinalResponseProps, UploadProps } from '../types/uploadType';
import mapping from '../mapping';
import useStepStore from '../store/useStepStore';

export default function UploadComponent() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { file, setFile, setUploadedData } = useFileStore();
  const setStep = useStepStore((state) => state.setStep);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isLoading, startTransition] = useTransition();

  const allowedExtensions = ['.xlsx', '.xls', '.csv'];

  const validateFile = (selectedFile: File) => {
    const ext = selectedFile.name.slice(selectedFile.name.lastIndexOf('.')).toLowerCase();
    if (!allowedExtensions.includes(ext)) {
      toast.error('지원하지 않는 파일 형식입니다. CSV, XLSX, XLS 파일만 업로드 가능합니다.');
      return false;
    }
    return true;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected && validateFile(selected)) setFile(selected);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const dropped = e.dataTransfer.files?.[0];
    if (dropped && validateFile(dropped)) setFile(dropped);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const triggerFileInput = () => fileInputRef.current?.click();

  const handleUpload = async () => {
    if (!file) {
      toast.error('파일을 먼저 업로드하세요.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      startTransition(async () => {
        const uploadResponse = await sendData<UploadProps>('post', '/file/upload', formData);
        const mappingData = {
          headers: uploadResponse.result.headers.map(
            (header: string) => mapping.indexOf(header) + 1,
          ),
          fileId: uploadResponse.result.fileId,
        };

        const response = await sendData<FinalResponseProps[]>('post', '/file/mapping', mappingData);
        setUploadedData(response.result);
        setStep(0);
        toast.success('업로드 성공!');
      });
    } catch (error) {
      toast.error('업로드 실패!');
    }
  };

  return (
    <div className="w-full">
      <div
        className={`mb-6 h-auto w-full rounded-xl border-4 border-dashed p-10 text-center transition-all duration-300 ${
          isDragOver ? 'border-blue-400 bg-blue-50 shadow-lg' : 'border-gray-300 bg-white'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center gap-4 transition-all duration-300">
          <img
            src={uploadLogo}
            alt="upload icon"
            className={`w-14 transition-transform duration-300 ${
              isDragOver ? 'scale-110 opacity-90' : 'opacity-70'
            }`}
          />
          <p
            className={`text-base transition-colors duration-300 ${
              isDragOver ? 'font-semibold text-blue-500' : 'text-gray-500'
            }`}
          >
            {isDragOver ? '여기에 파일을 놓으세요!' : '파일을 드래그하거나 아래 버튼 클릭'}
          </p>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".xlsx,.xls,.csv"
            className="hidden"
          />
          <Button onClick={triggerFileInput} className="bg-theme_black px-4 py-2 text-white">
            파일 선택
          </Button>
          {file && (
            <p className="animate-rainbow-text break-all text-center font-semibold">
              선택된 파일: {file.name}
            </p>
          )}
          <p className="text-sm text-gray-400">지원 형식: CSV, XLSX, XLS</p>
        </div>
      </div>

      <button
        onClick={handleUpload}
        disabled={isLoading}
        className="w-full rounded bg-blue-600 px-4 py-3 text-white transition hover:bg-blue-700 disabled:bg-gray-400"
      >
        {isLoading ? (
          <div className="flex items-center justify-center gap-2">
            <svg
              className="h-5 w-5 animate-spin text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
              />
            </svg>
            업로드 중...
          </div>
        ) : (
          '업로드 및 분석 시작'
        )}
      </button>
    </div>
  );
}
