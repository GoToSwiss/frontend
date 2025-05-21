import { useEffect, useState, useCallback } from 'react';
import Slider from '@mui/material/Slider';
import useFileStore from '@/features/upload/store/useFileStore';
import { FinalResponseProps } from '@/features/upload/types/uploadType';
import { useCBPFStore } from '../../store/useFilterStore';

export default function CBPFFilter() {
  const uploadedData = useFileStore((state) => state.uploadedData);
  const { startTime, endTime, name, data, setStartTime, setEndTime, setName, setData } =
    useCBPFStore();
  const [timeOptions, setTimeOptions] = useState<string[]>([]);
  const [xOptions, setXOptions] = useState<string[]>([]);
  const [yOptions, setYOptions] = useState<string[]>([]);
  const [sliderValue, setSliderValue] = useState<[number, number]>([0, 0]);

  // TODO: 로직 시간복잡도 최적화 필요
  useEffect(() => {
    if (uploadedData.length > 0) {
      const times = uploadedData.map((item) => item.time);
      const observationNames = uploadedData.map((item) => item.observatoryName);
      setTimeOptions(Array.from(new Set(times)));
      setXOptions(Array.from(new Set(observationNames)));
      const uniqueTimes = Array.from(new Set(times));

      if (uniqueTimes.length > 0) {
        if (startTime && endTime) {
          setSliderValue([uniqueTimes.indexOf(startTime), uniqueTimes.indexOf(endTime)]);
          setStartTime(uniqueTimes[uniqueTimes.indexOf(startTime)]);
          setEndTime(uniqueTimes[uniqueTimes.indexOf(endTime)]);
        } else {
          setSliderValue([
            uniqueTimes.indexOf(uniqueTimes[0]),
            uniqueTimes.indexOf(uniqueTimes[uniqueTimes.length - 1]),
          ]);
          setStartTime(uniqueTimes[uniqueTimes.indexOf(uniqueTimes[0])]);
          setEndTime(uniqueTimes[uniqueTimes.indexOf(uniqueTimes[uniqueTimes.length - 1])]);
        }
      }

      const keys = Object.keys(uploadedData[0]) as (keyof FinalResponseProps)[];
      const numericKeys = keys.filter(
        (key) => key !== 'time' && typeof uploadedData[0][key] === 'number',
      );
      setYOptions(numericKeys);
    }
  }, [uploadedData, setStartTime, setEndTime]);

  const handleSliderChange = useCallback(
    (_: Event, newValue: number | number[]) => {
      if (Array.isArray(newValue) && timeOptions.length > 0) {
        const [startIdx, endIdx] = newValue;
        setSliderValue([startIdx, endIdx]);
        setStartTime(timeOptions[startIdx]);
        setEndTime(timeOptions[endIdx]);
      }
    },
    [timeOptions, setStartTime, setEndTime],
  );

  return (
    <div className="flex flex-col gap-6 rounded-md bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <span className="text-sm font-medium text-gray-700">시간 범위 선택</span>
          <div className="text-sm text-gray-600">
            {startTime && endTime && (
              <span>
                {new Date(startTime).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })} ~{' '}
                {new Date(endTime).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })}
              </span>
            )}
          </div>
        </div>
        {timeOptions.length > 0 && (
          <div className="px-2">
            <Slider
              value={sliderValue}
              onChange={handleSliderChange}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={timeOptions.length - 1}
              valueLabelFormat={(value) => {
                const date = new Date(timeOptions[value]);
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
          관측소 위치
        </label>
        <select
          id="y"
          className="rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none"
          value={name}
          onChange={(e) => setName(e.target.value)}
        >
          <option value="">선택하세요</option>
          {xOptions.map((key) => (
            <option key={key} value={key}>
              {key}
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
