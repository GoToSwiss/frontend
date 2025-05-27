import fileImg from '@/assets/mypage/file.png';
import useFileStore from '@/features/upload/store/useFileStore';
import getData from '@/api/getData';
import { FinalResponseProps } from '@/features/upload/types/uploadType';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import useStepStore from '@/features/upload/store/useStepStore';
import { UserUploadHistory } from '../types/mypageType';

export default function UploadLogTable({ data }: { data: UserUploadHistory[] }) {
  const setUploadedData = useFileStore((state) => state.setUploadedData);
  const setStep = useStepStore((state) => state.setStep);
  const navigate = useNavigate();

  const handleSetFile = async (fileId: string) => {
    try {
      const response = await getData<FinalResponseProps[]>(`/file/read/${fileId}`);
      setUploadedData(response.result);
      setStep(0);
      navigate('/upload');
    } catch (error) {
      toast.error('불러오기 실패!');
    }
  };

  return (
    <table className="w-full table-auto text-center">
      <thead>
        <tr className="bg-web_bg text-theme_tertiary">
          <th className="px-4 py-2">파일명</th>
          <th className="px-4 py-2">업로드 날짜</th>
          <th className="px-4 py-2">크기</th>
          <th className="px-4 py-2">작업</th>
        </tr>
      </thead>
      <tbody className="font-light">
        {data ? (
          data.map((item) => (
            <tr key={item.fileId} className="border-b border-gray-200 last:border-b-0">
              <td className="flex items-center justify-center gap-4 px-4 py-2 font-normal">
                <img src={fileImg} alt="파일 이미지" className="w-4" />
                {item.filename}
              </td>
              <td className="px-4 py-2 text-theme_tertiary">
                {new Date(item.createdAt).toLocaleString('ko-KR', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                })}
              </td>
              <td className="px-4 py-2 text-theme_tertiary">{item.fileSize.toFixed(2)}kb</td>
              <td className="px-4 py-2">
                <button
                  onClick={() => handleSetFile(item.fileId)}
                  className="text-blue-500 hover:underline"
                >
                  다시 분석하러 가기
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td className="flex items-center px-4 py-2 text-theme_tertiary">데이터가 없습니다.</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
