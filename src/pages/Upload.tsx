import WhiteBox from '@/features/upload/components/WhiteBox';
import uploadLogo from '@/assets/upload.png';

export default function Upload() {
  return (
    <main className="px-10 py-12">
      <div className="mb-12 flex flex-col gap-2">
        <h1 className="text-2xl font-bold">데이터 분석 도구</h1>
        <p className="text-sm font-light">환경 데이터를 업로드하고 전문적인 분석을 시작하세요.</p>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <WhiteBox title="데이터 업로드">
          <div className="my-6 w-full rounded-md border-2 border-dotted border-gray-300 py-10">
            <div className="flex flex-col items-center gap-4">
              <img src={uploadLogo} alt="업로드" className="h-auto w-12" />
              <p>파일을 드래그하여 업로드하거나</p>
              <button className="rounded bg-black px-4 py-2 text-white">파일 선택</button>
              <p className="">지원형식 : CSV, XLSX, TXT(최대 100MB)</p>
            </div>
          </div>
          <div>
            <h3 className="mb-2 text-sm font-semibold">데이터 미리보기</h3>
            <table className="w-full table-auto border-collapse border-b border-t border-gray-100 text-center">
              <thead>
                <tr className="bg-gray-300">
                  <th className="border-b border-t border-gray-300 p-2">날짜</th>
                  <th className="border-b border-t border-gray-300 p-2">온도 (°C)</th>
                  <th className="border-b border-t border-gray-300 p-2">습도 (%)</th>
                  <th className="border-b border-t border-gray-300 p-2">미세먼지</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border-b border-t border-gray-300 p-2">2024-02-20</td>
                  <td className="border-b border-t border-gray-300 p-2">23.5</td>
                  <td className="border-b border-t border-gray-300 p-2">65</td>
                  <td className="border-b border-t border-gray-300 p-2">45</td>
                </tr>
                <tr>
                  <td className="border-b border-t border-gray-300 p-2">2024-02-21</td>
                  <td className="border-b border-t border-gray-300 p-2">23.5</td>
                  <td className="border-b border-t border-gray-300 p-2">65</td>
                  <td className="border-b border-t border-gray-300 p-2">45</td>
                </tr>
              </tbody>
            </table>
          </div>
        </WhiteBox>
        <WhiteBox title="데이터 업로드">
          <div className="flex h-full items-center justify-center">box</div>
        </WhiteBox>
      </div>
    </main>
  );
}
