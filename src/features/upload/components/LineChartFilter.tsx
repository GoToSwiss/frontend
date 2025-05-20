import { useEffect, useState } from 'react';
import useFileStore, { UploadData } from '@/features/upload/store/useFileStore';
import { useLineChartFilterStore } from '../store/useFilterStore';

export default function LineChartFilter() {
  const uploadedData = useFileStore((state) => state.uploadedData);
  const { x, y, setX, setY } = useLineChartFilterStore();
  const [xOptions, setXOptions] = useState<string[]>([]);
  const [yOptions, setYOptions] = useState<string[]>([]);
  // TODO: 원하는 값에 따른 라인 추가 기능

  useEffect(() => {
    if (uploadedData.length > 0) {
      const times = uploadedData.map((item) => item.time);
      const uniqueTimes = Array.from(new Set(times));
      setXOptions(uniqueTimes);

      const keys = Object.keys(uploadedData[0]) as (keyof UploadData)[];

      setYOptions(keys.filter((key) => key !== 'time' && typeof uploadedData[0][key] === 'number'));
    }
  }, [uploadedData]);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <label htmlFor="x" className="mb-1 block text-sm font-semibold">
          X축 필드 선택
        </label>
        <select
          id="x"
          className="w-full rounded border px-3 py-2"
          value={x}
          onChange={(e) => setX(e.target.value)}
        >
          <option value="">선택하세요</option>
          {xOptions.map((key) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="y" className="mb-1 block text-sm font-semibold">
          Y축 필드 선택
        </label>
        <select
          id="y"
          className="w-full rounded border px-3 py-2"
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
    </div>
  );
}
