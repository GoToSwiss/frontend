import { WhiteBox } from '@/features/upload';
import VisualizationCard from '@/features/upload/components/VisualizationCard';
import Step from '@/features/upload/components/Step';
import useStepStore from '@/features/upload/store/useStepStore';
import UploadComponent from '@/features/upload/components/UploadComponent';
import DataFilter from '@/features/upload/components/filter/DataFilter';
import useFileStore from '@/features/upload/store/useFileStore';
import LineChart from '@/features/upload/components/chart/LineChart';
import CBPF from '@/features/upload/components/chart/CBPF';
import BinnedChart from '@/features/upload/components/chart/BinnedChart';
import CorrelationHeatmap from '@/features/upload/components/chart/HeatMap';
import SEO from '@/components/SEO';
import book from '@/assets/upload/book.png';
import video from '@/assets/upload/video.png';
import help from '@/assets/upload/help.png';
import { useState } from 'react';
import UploadGuide from '@/features/upload/components/UploadGuide';

export default function Upload() {
  const [open, setOpen] = useState(false);
  const step = useStepStore((state) => state.step);
  const kind = useFileStore((state) => state.chart);
  const selectChartComponent: Record<string, React.FC> = {
    CBPF,
    '꺾은선 그래프': LineChart,
    'Binned Box': BinnedChart,
    히트맵: CorrelationHeatmap,
  };

  const ChartComponent = selectChartComponent[kind];

  return (
    <>
      <SEO title="onAir 업로드" description="onAir" keywords="onAir, onAir 업로드" />
      <main className="flex flex-col gap-8 px-10 py-12">
        <section className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">데이터 분석 도구</h1>
          <p className="text-sm text-gray-500">
            환경 데이터를 업로드하고 분석을 시작하세요.{' '}
            <button
              className="text-blue-500 hover:underline"
              onClick={() => setOpen((prev) => !prev)}
            >
              &gt;업로드 방법
            </button>
            <UploadGuide open={open} />
          </p>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-2">
          <WhiteBox title="데이터 업로드" className="flex flex-col justify-between">
            <UploadComponent />
          </WhiteBox>
          <Step />
        </section>

        <WhiteBox title="분석 결과" className="flex flex-col">
          {step === 2 ? (
            <div className="grid grid-cols-2">
              {ChartComponent ? <ChartComponent /> : <p>해당 차트가 없습니다.</p>}
              <DataFilter />
            </div>
          ) : (
            <p className="text-center text-gray-400">분석 결과를 확인할 수 없습니다.</p>
          )}
        </WhiteBox>

        <WhiteBox title="도움말 및 가이드" className="flex flex-col">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <VisualizationCard
              title="사용자 매뉴얼"
              description="상세한 기능 설명과 사용법을 확인하세요"
              logoSrc={book}
            />
            <VisualizationCard
              title="비디오 튜토리얼"
              description="단계별 가이드 영상을 시청하세요"
              logoSrc={video}
            />
            <VisualizationCard
              title="고객 지원"
              description="문의사항이 있으시면 연락주세요"
              logoSrc={help}
            />
          </div>
        </WhiteBox>
      </main>
    </>
  );
}
