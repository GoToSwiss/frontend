import { useRef, useTransition } from 'react';
import Button from '@/components/Button';
import uploadLogo from '@/assets/upload/upload.png';
import sendData from '@/api/sendData';
import { toast } from 'react-toastify';
import useFileStore from '../store/useFileStore';
import { FinalResponseProps, UploadProps } from '../types/uploadType';
import mapping from '../mapping';
import useStepStore from '../store/useStepStore';

export default function UploadComponent() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { file, setFile, setUploadedData } = useFileStore();
  const setStep = useStepStore((state) => state.setStep);
  const [isLoading, startTransition] = useTransition();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected = event.target.files?.[0];
    if (!selected) return;

    const allowedExtensions = ['.xlsx', '.xls', '.csv'];
    const fileExtension = selected.name.slice(selected.name.lastIndexOf('.')).toLowerCase();

    if (!allowedExtensions.includes(fileExtension)) {
      alert('지원하지 않는 파일 형식입니다. CSV, XLSX, XLS 파일만 업로드 가능합니다.');
      return;
    }

    setFile(selected);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const dropped = e.dataTransfer.files?.[0];
    if (!dropped) return;

    const allowedExtensions = ['.xlsx', '.xls', '.csv'];
    const fileExtension = dropped.name.slice(dropped.name.lastIndexOf('.')).toLowerCase();

    if (!allowedExtensions.includes(fileExtension)) {
      alert('지원하지 않는 파일 형식입니다. CSV, XLSX, XLS 파일만 업로드 가능합니다.');
      return;
    }

    setFile(dropped);
  };

  const handleDragOver = (e: React.DragEvent) => e.preventDefault();
  const triggerFileInput = () => fileInputRef.current?.click();

  const handleUpload = async (): Promise<void> => {
    if (!file) {
      alert('파일을 먼저 업로드하세요.');
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
    <>
      <div
        className="mb-6 h-auto w-full rounded-md border-2 border-dotted border-border_color py-10"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center gap-4">
          <img src={uploadLogo} alt="업로드" className="h-auto w-12" />
          <p className="text-theme_secondary">파일을 드래그하거나 아래 버튼 클릭</p>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".xlsx,.xls,.csv"
            className="hidden"
          />
          <Button
            className="rounded bg-theme_black px-4 py-2 text-white"
            onClick={triggerFileInput}
          >
            파일 선택
          </Button>
          {file && <p className="text-theme_tertiary">선택된 파일: {file.name}</p>}
          <p className="text-theme_tertiary">지원형식 : CSV, XLSX, TXT(최대 100MB)</p>
        </div>
      </div>

      <button
        className="mt-4 w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:bg-gray-400"
        onClick={handleUpload}
        disabled={isLoading}
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
    </>
  );
}
