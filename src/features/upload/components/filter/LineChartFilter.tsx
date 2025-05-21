import { useEffect, useState, useCallback } from 'react';
import Slider from '@mui/material/Slider';
import useFileStore from '@/features/upload/store/useFileStore';
import { FinalResponseProps } from '@/features/upload/types/uploadType';
import { useLineChartFilterStore } from '../../store/useFilterStore';

export default function LineChartFilter() {
  const uploadedData = useFileStore((state) => state.uploadedData);
  const { x, x2, y, y2, setX, setX2, setY, setY2 } = useLineChartFilterStore();
  const [xOptions, setXOptions] = useState<string[]>([]);
  const [yOptions, setYOptions] = useState<string[]>([]);
  const [sliderValue, setSliderValue] = useState<[number, number]>([0, 0]);

  // TODO: 로직 시간복잡도 최적화 필요
  useEffect(() => {
    if (uploadedData.length > 0) {
      const times = uploadedData.map((item) => item.time);
      const uniqueTimes = Array.from(new Set(times));
      setXOptions(uniqueTimes);

      if (uniqueTimes.length > 0) {
        if (x && x2) {
          setSliderValue([uniqueTimes.indexOf(x), uniqueTimes.indexOf(x2)]);
          setX(uniqueTimes[uniqueTimes.indexOf(x)]);
          setX2(uniqueTimes[uniqueTimes.indexOf(x2)]);
        } else {
          setSliderValue([
            uniqueTimes.indexOf(uniqueTimes[0]),
            uniqueTimes.indexOf(uniqueTimes[uniqueTimes.length - 1]),
          ]);
          setX(uniqueTimes[uniqueTimes.indexOf(uniqueTimes[0])]);
          setX2(uniqueTimes[uniqueTimes.indexOf(uniqueTimes[uniqueTimes.length - 1])]);
        }
      }

      const keys = Object.keys(uploadedData[0]) as (keyof FinalResponseProps)[];
      const numericKeys = keys.filter(
        (key) => key !== 'time' && typeof uploadedData[0][key] === 'number',
      );
      setYOptions(numericKeys);
    }
  }, [uploadedData, setX, setX2, setY, setY2]);

  const handleSliderChange = useCallback(
    (_: Event, newValue: number | number[]) => {
      if (Array.isArray(newValue) && xOptions.length > 0) {
        const [startIdx, endIdx] = newValue;
        setSliderValue([startIdx, endIdx]);
        setX(xOptions[startIdx]);
        setX2(xOptions[endIdx]);
      }
    },
    [xOptions, setX, setX2],
  );

  return (
    <div className="flex flex-col gap-6 rounded-md bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <span className="text-sm font-medium text-gray-700">시간 범위 선택</span>
          <div className="text-sm text-gray-600">
            {x && x2 && (
              <span>
                {new Date(x).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })} ~{' '}
                {new Date(x2).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })}
              </span>
            )}
          </div>
        </div>
        {xOptions.length > 0 && (
          <div className="px-2">
            <Slider
              value={sliderValue}
              onChange={handleSliderChange}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={xOptions.length - 1}
              valueLabelFormat={(value) => {
                const date = new Date(xOptions[value]);
                return date.toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });
              }}
              sx={{
                color: '#3b82f6',
                '& .MuiSlider-thumb': {
                  '&:hover, &.Mui-focusVisible': {
                    boxShadow: '0 0 0 8px rgba(59, 130, 246, 0.16)',
                  },
                  '&.Mui-active': {
                    boxShadow: '0 0 0 14px rgba(59, 130, 246, 0.16)',
                  },
                },
              }}
            />
          </div>
        )}
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
