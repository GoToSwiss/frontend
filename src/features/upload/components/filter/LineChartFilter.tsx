import { useEffect, useState } from 'react';
import useFileStore from '@/features/upload/store/useFileStore';
import { FinalResponseProps } from '@/features/upload/types/uploadType';
import { useLineChartFilterStore } from '../../store/useFilterStore';

export default function LineChartFilter() {
  const uploadedData = useFileStore((state) => state.uploadedData);
  const { x, x2, y, y2, setX, setX2, setY, setY2 } = useLineChartFilterStore(); // y2 상태 포함
  const [xOptions, setXOptions] = useState<string[]>([]);
  const [yOptions, setYOptions] = useState<string[]>([]);

  useEffect(() => {
    if (uploadedData.length > 0) {
      const times = uploadedData.map((item) => item.time);
      const uniqueTimes = Array.from(new Set(times));
      setXOptions(uniqueTimes);

      const keys = Object.keys(uploadedData[0]) as (keyof FinalResponseProps)[];
      const numericKeys = keys.filter(
        (key) => key !== 'time' && typeof uploadedData[0][key] === 'number',
      );
      setYOptions(numericKeys);
    }
  }, [uploadedData]);

  return (
    <div className="flex flex-col gap-6 rounded-md bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-2">
        {/* TODO: 시간 선택은 slider를 이용해 구현 */}
        <label htmlFor="x" className="text-sm font-medium text-gray-700">
          시작 시간 선택
        </label>
        <select
          id="x"
          className="rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none"
          value={x}
          onChange={(e) => setX(e.target.value)}
        >
          <option value="">선택하세요</option>
          {xOptions.map((key) => (
            <option key={key} value={key}>
              {new Intl.DateTimeFormat('ko-KR', {
                timeZone: 'Asia/Seoul',
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
              }).format(new Date(key))}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="x2" className="text-sm font-medium text-gray-700">
          종료 시간 선택
        </label>
        <select
          id="x2"
          className="rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none"
          value={x2}
          onChange={(e) => setX2(e.target.value)}
        >
          <option value="">선택하세요</option>
          {xOptions.map((key) => (
            <option key={key} value={key}>
              {new Intl.DateTimeFormat('ko-KR', {
                timeZone: 'Asia/Seoul',
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
              }).format(new Date(key))}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="y" className="text-sm font-medium text-gray-700">
          데이터 선택
        </label>
        <select
          id="y"
          className="rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none"
          value={y}
          onChange={(e) => setY(e.target.value)}
        >
          <option value="">선택하세요</option>
          {yOptions.map((key) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="y2" className="text-sm font-medium text-gray-700">
          데이터 선택(추가)
        </label>
        <select
          id="y2"
          className="rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-red-500 focus:outline-none"
          value={y2}
          onChange={(e) => setY2(e.target.value)}
        >
          <option value="">선택 안 함</option>
          {yOptions.map((key) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
