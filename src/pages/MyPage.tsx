import profileImg from '@/assets/layout/kwon.jpg';
import UploadLogTable from '@/features/mypage/components/UploadLogTable';

export default function MyPage() {
  return (
    <div className="flex flex-col gap-8 p-10">
      <div className="flex gap-6 rounded-md bg-white px-6 py-8 shadow-md">
        <img src={profileImg} alt="프로필 이미지" className="size-32 rounded-full" />
        <div className="flex flex-col justify-center gap-2">
          <div className="flex flex-col">
            <span className="mt-2 text-2xl font-semibold">권기학</span>
            <span className="text-sm text-theme_tertiary">권기학 교수님@사랑합니다❤️</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-theme_tertiary">세종대학교 교수</span>
            <span className="text-sm text-theme_tertiary">서울시 광진구</span>
          </div>
        </div>
      </div>
      <div className="bg-white px-6 py-8 shadow-md">
        <h2 className="text-xl font-bold">파일 업로드 이력</h2>
        <div className="mb-4 flex w-full justify-end gap-4">
          <input
            type="text"
            placeholder="파일명 검색"
            className="border border-gray-300 px-2 py-1"
          />
          <select className="rounded border border-gray-300 px-2 py-1">
            <option>최신순</option>
            <option>이름순</option>
          </select>
        </div>
        <UploadLogTable />
      </div>
    </div>
  );
}
