import PlotFigure from '@/features/upload/components/PlotFigure';
import { WhiteBox, PreviewDataTable } from '@/features/upload';
import VisualizationCard from '@/features/upload/components/VisualizationCard';

import * as Plot from '@observablehq/plot';
import Step from '@/features/upload/components/Step';
import useFileStore from '@/features/upload/store/useFileStore';
import UploadComponent from '@/features/upload/components/UploadComponent';
import { useLineChartFilterStore } from '@/features/upload/store/useFilterStore';

export default function Upload() {
  const { uploadedData } = useFileStore();
  const { x, y, isComplete } = useLineChartFilterStore();

  return (
    <main className="flex flex-col gap-8 px-10 py-12">
      <section className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">데이터 분석 도구</h1>
        <p className="text-sm text-gray-500">환경 데이터를 업로드하고 분석을 시작하세요.</p>
      </section>

      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <WhiteBox title="데이터 업로드">
          <UploadComponent />
          <PreviewDataTable />
        </WhiteBox>

        {/* TODO: 여기서 단계별 컴포넌트 렌더링 */}

        <Step />
      </section>

      <WhiteBox title="분석 결과">
        {/* TODO: uploadedData를 이용해 시각화, 그래프별 조건부 렌더링 */}
        {isComplete ? (
          <PlotFigure
            options={{
              marks: [Plot.lineY(uploadedData, { x, y, stroke: 'blue' })],
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
