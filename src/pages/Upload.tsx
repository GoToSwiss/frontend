import React, { useRef } from 'react';
import uploadLogo from '@/assets/upload/upload.png';
import Button from '@/components/Button';
import PlotFigure from '@/features/upload/components/PlotFigure';
import { WhiteBox, PreviewDataTable } from '@/features/upload';
import VisualizationCard from '@/features/upload/components/VisualizationCard';
import useFileStore from '@/features/upload/store/useFileStore';
import sendData from '@/api/sendData';
import mapping from '@/features/upload/mapping';
import { UploadProps } from '@/features/upload/types/uploadType';
import * as Plot from '@observablehq/plot';
import Step from '@/features/upload/components/Step';

export default function Upload() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { file, setFile, uploadedData, setUploadedData } = useFileStore();

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
      const uploadResponse = await sendData<UploadProps>('post', '/file/upload', formData);

      const mappingData = {
        headers: uploadResponse.result.headers.map((header: string) => mapping.indexOf(header) + 1),
        fileId: uploadResponse.result.fileId,
      };

      await sendData('post', '/file/mapping', mappingData);

      const dummy = [
        { Date: new Date('2023-01-01'), Close: 150 },
        { Date: new Date('2023-01-02'), Close: 152 },
        { Date: new Date('2023-01-03'), Close: 149 },
      ];
      setUploadedData(dummy);

      alert('성공');
    } catch (error) {
      console.error(error);
      alert('업로드에 실패했습니다.');
    }
  };

  return (
    <main className="flex flex-col gap-8 px-10 py-12">
      <section className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">데이터 분석 도구</h1>
        <p className="text-sm text-gray-500">환경 데이터를 업로드하고 분석을 시작하세요.</p>
      </section>

      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <WhiteBox title="데이터 업로드">
          <div
            className="mb-6 w-full rounded-md border-2 border-dotted border-border_color py-10"
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

          <Button onClick={handleUpload} className="w-full bg-theme_secondary text-white">
            업로드 및 분석 시작
          </Button>

          <PreviewDataTable />
        </WhiteBox>

        {/* TODO: 여기서 단계별 컴포넌트 렌더링 */}

        <Step />
      </section>

      <WhiteBox title="분석 결과">
        {/* TODO: uploadedData를 이용해 시각화, 그래프별 options 초기 fix로 세팅 */}
        {uploadedData.length > 0 ? (
          <PlotFigure
            options={{
              width: 800,
              height: 400,
              marks: [Plot.lineY(uploadedData, { x: 'Date', y: 'Close', stroke: 'blue' })],
            }}
          />
        ) : (
          <p className="text-center text-gray-400">업로드된 데이터가 없습니다.</p>
        )}
      </WhiteBox>

      <WhiteBox title="도움말 및 가이드">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <VisualizationCard
            title="사용자 매뉴얼"
            description="상세한 기능 설명과 사용법을 확인하세요"
            logoSrc="/src/assets/upload/book.png"
          />
          <VisualizationCard
            title="비디오 튜토리얼"
            description="단계별 가이드 영상을 시청하세요"
            logoSrc="/src/assets/upload/video.png"
          />
          <VisualizationCard
            title="고객 지원"
            description="문의사항이 있으시면 연락주세요"
            logoSrc="/src/assets/upload/help.png"
          />
        </div>
      </WhiteBox>
    </main>
  );
}
