import profileImg from '@/assets/layout/kwon.jpg';
import UploadLogTable from '@/features/mypage/components/UploadLogTable';
import { useSuspenseQuery } from '@tanstack/react-query';
import { ApiResponse } from '@/types/globalTypes';
import getUserInfo from '@/features/mypage/api/getUserInfo';
import { UserInfoProps } from '@/features/mypage/types/mypageType';
import { useState } from 'react';
import SEO from '@/components/SEO';

export default function MyPage() {
  const { data } = useSuspenseQuery<ApiResponse<UserInfoProps>>({
    queryKey: ['uploadHistory'],
    queryFn: getUserInfo,
  });

  const [sort, setSort] = useState<'latest' | 'name'>('latest');

  const sortedData = data?.result?.fileLogs
    ? data.result.fileLogs.sort((a, b) => {
        if (sort === 'latest') {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
        return a.filename.localeCompare(b.filename);
      })
    : null;

  return (
    <>
      <SEO title="onAir 마이페이지" description="onAir" keywords="onAir, onAir 마이페이지" />
      <div className="flex flex-col gap-8 p-10">
        <div className="flex gap-6 rounded-md bg-white px-6 py-8 shadow-md">
          <img
            src={data.result.imgUrl || profileImg}
            alt="프로필 이미지"
            className="size-32 rounded-full"
          />
          <div className="flex flex-col justify-center gap-2">
            <div className="flex flex-col">
              <span className="mt-2 text-2xl font-semibold">{data.result.name}</span>
              <span className="text-sm text-theme_tertiary">{data.result.email}</span>
            </div>
          </div>
        </div>
        <div className="bg-white px-6 py-8 shadow-md">
          <h2 className="text-xl font-bold">파일 업로드 이력</h2>
          <div className="mb-4 flex w-full justify-end gap-4">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as 'latest' | 'name')}
              className="rounded border border-gray-300 px-2 py-1"
            >
              <option value="latest">최신순</option>
              <option value="name">이름순</option>
            </select>
          </div>
          <UploadLogTable data={sortedData} />
        </div>
      </div>
    </>
  );
}
