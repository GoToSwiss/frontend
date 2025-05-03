import uploadLogo from '@/assets/upload/upload.png';
import Button from '@/components/Button';
import { PreviewDataTable, VisualizationCard, WhiteBox } from '@/features/upload';
import * as Plot from '@observablehq/plot';
import PlotFigure from '@/features/upload/components/PlotFigure';
import sendData from '@/api/sendData';
import React, { useState, useRef } from 'react';
import mapping from '@/features/upload/mapping';
import { UploadProps } from '@/features/upload/types/uploadType';

// TODO : 테스트 목적, 제거 예정
const aapl = [
  {
    Date: new Date('2013-05-13'),
    Open: 64.501427,
    High: 65.414284,
    Low: 64.5,
    Close: 64.96286,
    Volume: 79237200,
  },
  {
    Date: new Date('2013-05-14'),
    Open: 64.835716,
    High: 65.028572,
    Low: 63.164288,
    Close: 63.408573,
    Volume: 111779500,
  },
  {
    Date: new Date('2013-05-15'),
    Open: 62.737144,
    High: 63.0,
    Low: 60.337143,
    Close: 61.264286,
    Volume: 185403400,
  },
  {
    Date: new Date('2013-05-16'),
    Open: 60.462856,
    High: 62.549999,
    Low: 59.842857,
    Close: 62.082859,
    Volume: 150801000,
  },
  {
    Date: new Date('2013-05-17'),
    Open: 62.721428,
    High: 62.869999,
    Low: 61.572857,
    Close: 61.894287,
    Volume: 106976100,
  },
];

const visualizationTypes = [
  '막대 그래프',
  '원형 그래프',
  '꺾은선 그래프',
  '산점도',
  '히트맵',
  '윈드로즈',
];

export default function Upload() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const onClick = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const uploadResponse = await sendData<UploadProps>('post', '/file/upload', formData);

      const mappingData = {
        headers: uploadResponse.result.headers.map((header: string) => mapping.indexOf(header) + 1),
        fileId: uploadResponse.result.fileId,
      };

      await sendData('post', '/file/mapping', mappingData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="flex flex-col gap-8 px-10 py-12">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">데이터 분석 도구</h1>
        <p className="text-sm font-light">환경 데이터를 업로드하고 전문적인 분석을 시작하세요.</p>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <WhiteBox title="데이터 업로드">
          <div
            className="mb-6 w-full rounded-md border-2 border-dotted border-border_color py-10"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center gap-4">
              <img src={uploadLogo} alt="업로드" className="h-auto w-12" />
              <p className="text-theme_secondary">파일을 드래그하여 업로드하거나</p>
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
              {selectedFile && (
                <p className="text-theme_tertiary">선택된 파일: {selectedFile.name}</p>
              )}
              <p className="text-theme_tertiary">지원형식 : CSV, XLSX, TXT(최대 100MB)</p>
            </div>
          </div>
          <PreviewDataTable />
        </WhiteBox>
        <WhiteBox title="분석 도구">
          <h3 className="text-sm font-semibold">시각화 유형</h3>
          <div className="grid grid-cols-3 gap-4">
            {visualizationTypes.map((type) => (
              <VisualizationCard
                key={type}
                title={type}
                className="rounded-lg border p-4 text-center shadow-md"
                isGraph
                logoSrc="/src/assets/logo.png"
              />
            ))}
          </div>
          <Button className="rounded bg-theme_black px-4 py-2 text-white" onClick={onClick}>
            분석하기
          </Button>
        </WhiteBox>
      </div>
      <WhiteBox title="분석 결과">
        그래프
        <PlotFigure
          options={{
            width: 1000,
            marks: [Plot.lineY(aapl, { x: 'Date', y: 'Close' })],
          }}
        />
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
