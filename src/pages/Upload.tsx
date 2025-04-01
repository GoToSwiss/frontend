import uploadLogo from '@/assets/upload/upload.png';
import Button from '@/components/Button';
import { PreviewDataTable, VisualizationCard, WhiteBox } from '@/features/upload';

// TODO: 그래프 모양 정해지면 services로 옮길 예정
const visualizationTypes = [
  '막대 그래프',
  '원형 그래프',
  '꺾은선 그래프',
  '산점도',
  '히트맵',
  '윈드로즈',
];

export default function Upload() {
  return (
    <main className="flex flex-col gap-8 px-10 py-12">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">데이터 분석 도구</h1>
        <p className="text-sm font-light">환경 데이터를 업로드하고 전문적인 분석을 시작하세요.</p>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <WhiteBox title="데이터 업로드">
          <div className="mb-6 w-full rounded-md border-2 border-dotted border-border_color py-10">
            <div className="flex flex-col items-center gap-4">
              <img src={uploadLogo} alt="업로드" className="h-auto w-12" />
              <p className="text-theme_secondary">파일을 드래그하여 업로드하거나</p>
              <Button className="rounded bg-theme_black px-4 py-2 text-white" onClick={() => null}>
                파일 선택
              </Button>
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
          <Button className="rounded bg-theme_black px-4 py-2 text-white" onClick={() => null}>
            분석하기
          </Button>
        </WhiteBox>
      </div>
      <WhiteBox title="분석 결과">그래프</WhiteBox>
      {/* TODO: 그래프에 따른 라이브러리 선택예정(D3.js, Chart.js등) */}
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
