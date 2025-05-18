import { useEffect, useState } from 'react';
import useFileStore from '@/features/upload/store/useFileStore';
import { useLineChartFilterStore } from '../store/useFilterStore';

export default function LineChartFilter() {
  const uploadedData = useFileStore((state) => state.uploadedData);
  const { x, y, setX, setY } = useLineChartFilterStore();
  const [options, setOptions] = useState<string[]>([]);

  useEffect(() => {
    if (uploadedData.length > 0) {
      const keys = Object.keys(uploadedData[0]);
      setOptions(keys);
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
          {options.map((key) => (
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
          {options.map((key) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
