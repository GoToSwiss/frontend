import fileImg from '@/assets/mypage/file.png';

// TODO: 추후 실제 데이터로 교체 및 페이지네이션 적용
const uploadHistory = [
  { fileName: 'document1.pdf', uploadDate: '2025-04-01' },
  { fileName: 'image2.png', uploadDate: '2025-04-02' },
  { fileName: 'presentation3.pptx', uploadDate: '2025-04-03' },
];

export default function UploadLogTable() {
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
        {uploadHistory.map((item) => (
          <tr key={item.fileName} className="border-b border-gray-200 last:border-b-0">
            <td className="flex items-center gap-4 px-4 py-2 font-normal">
              <img src={fileImg} alt="파일 이미지" className="w-4" />
              {item.fileName}
            </td>
            <td className="px-4 py-2 text-theme_tertiary">{item.uploadDate}</td>
            <td className="px-4 py-2 text-theme_tertiary">3gb</td>
            <td className="px-4 py-2">⚙️</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
