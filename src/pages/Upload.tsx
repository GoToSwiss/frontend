import { WhiteBox } from '@/features/upload';
import VisualizationCard from '@/features/upload/components/VisualizationCard';
import Step from '@/features/upload/components/Step';
import useStepStore from '@/features/upload/store/useStepStore';
import UploadComponent from '@/features/upload/components/UploadComponent';
import DataFilter from '@/features/upload/components/filter/DataFilter';
import useFileStore from '@/features/upload/store/useFileStore';
import LineChart from '@/features/upload/components/chart/LineChart';
import CBPF from '@/features/upload/components/chart/CBPF';

export default function Upload() {
  const step = useStepStore((state) => state.step);
  const kind = useFileStore((state) => state.chart);

  return (
    <main className="flex flex-col gap-8 px-10 py-12">
      <section className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">데이터 분석 도구</h1>
        <p className="text-sm text-gray-500">환경 데이터를 업로드하고 분석을 시작하세요.</p>
      </section>

      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <WhiteBox title="데이터 업로드" className="flex flex-col justify-between">
          <UploadComponent />
        </WhiteBox>
        <Step />
      </section>

      <WhiteBox title="분석 결과" className="flex flex-col">
        {/* TODO: uploadedData를 이용해 시각화, 그래프별 조건부 렌더링 */}
        {/* TODO: 날짜 KST로 변경, uploadedData의 time 자체를 Date로 변환 */}

        {step === 2 ? (
          <div className="grid grid-cols-2">
            {kind === 'CBPF' ? <CBPF /> : <LineChart />}

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
