import WhiteBox from '@/features/upload/components/WhiteBox';
import uploadLogo from '@/assets/upload.png';
import VisualizationCard from '@/features/upload/components/VisualizationCard';
import PreviewDataTable from '@/features/upload/components/PreviewDataTable';

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
    <main className="px-10 py-12">
      <div className="mb-12 flex flex-col gap-2">
        <h1 className="text-2xl font-bold">데이터 분석 도구</h1>
        <p className="text-sm font-light">환경 데이터를 업로드하고 전문적인 분석을 시작하세요.</p>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <WhiteBox title="데이터 업로드">
          <div className="mb-6 w-full rounded-md border-2 border-dotted border-gray-300 py-10">
            <div className="flex flex-col items-center gap-4">
              <img src={uploadLogo} alt="업로드" className="h-auto w-12" />
              <p>파일을 드래그하여 업로드하거나</p>
              <button className="rounded bg-black px-4 py-2 text-white">파일 선택</button>
              <p className="">지원형식 : CSV, XLSX, TXT(최대 100MB)</p>
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
              />
            ))}
          </div>
          <button className="rounded bg-black px-4 py-2 text-white">분석하기</button>
        </WhiteBox>
      </div>
    </main>
  );
}
