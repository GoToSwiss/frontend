import { useEffect, useState } from 'react';
import useFileStore from '@/features/upload/store/useFileStore';
import { FinalResponseProps } from '@/features/upload/types/uploadType';
import { useBinnedBoxStore } from '../../store/useFilterStore';

export default function BinnedChartFilter() {
  const uploadedData = useFileStore((state) => state.uploadedData);
  const { name, data, x, setName, setData, setX } = useBinnedBoxStore();
  const [chartObservationNames, setChartObservationNames] = useState<string[]>([]);
  const [yOptions, setYOptions] = useState<string[]>([]);

  useEffect(() => {
    if (uploadedData.length > 0) {
      const observationNames = uploadedData.map((item) => item.observatoryName);
      setChartObservationNames(Array.from(new Set(observationNames)));

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
        <label htmlFor="x" className="text-sm font-medium text-gray-700">
          시간 구간
        </label>
        <div className="flex gap-2">
          {(['day', 'month', 'year'] as const).map((value) => (
            <button
              key={value}
              onClick={() => setX(value)}
              className={`rounded-md border px-4 py-2 text-sm ${
                x === value
                  ? 'border-blue-500 bg-blue-500 text-white'
                  : 'border-gray-300 bg-white text-gray-700'
              } hover:border-blue-400`}
            >
              {value === 'day' && '일'}
              {value === 'month' && '월'}
              {value === 'year' && '연'}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="y" className="text-sm font-medium text-gray-700">
          관측소 위치
        </label>
        <select
          id="y"
          className="rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none"
          value={name}
          onChange={(e) => setName(e.target.value)}
        >
          <option value="">관측소를 선택하세요.</option>
          {chartObservationNames.map((observationName) => (
            <option key={observationName} value={observationName}>
              {observationName}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="y2" className="text-sm font-medium text-gray-700">
          데이터 선택
        </label>
        <select
          id="y2"
          className="rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none"
          value={data}
          onChange={(e) => setData(e.target.value)}
        >
          <option value="">데이터를 선택하세요.</option>
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
