import { useEffect, useState, useCallback } from 'react';
import Slider from '@mui/material/Slider';
import useFileStore from '@/features/upload/store/useFileStore';
import { FinalResponseProps } from '@/features/upload/types/uploadType';
import { useLineChartFilterStore } from '../../store/useFilterStore';

export default function LineChartFilter() {
  const uploadedData = useFileStore((state) => state.uploadedData);
  const {
    startTime,
    endTime,
    addY,
    observationName,
    setStartTime,
    setEndTime,
    setAddY,
    setObservationName,
  } = useLineChartFilterStore();
  const [xOptions, setXOptions] = useState<string[]>([]);
  const [yOptions, setYOptions] = useState<string[]>([]);
  const [sliderValue, setSliderValue] = useState<[number, number]>([0, 0]);
  const [observationNames, setObservationNames] = useState<string[]>([]);

  // TODO: 로직 시간복잡도 최적화 필요
  useEffect(() => {
    if (uploadedData.length > 0) {
      const times = uploadedData.map((item) => item.time);
      const uniqueTimes = Array.from(new Set(times));
      setXOptions(uniqueTimes);
      const observatoryNames = Array.from(
        new Set(uploadedData.map((item) => item.observatoryName)),
      );
      setObservationNames(observatoryNames);
      setObservationName(observatoryNames[0]);

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
      if (Array.isArray(newValue) && xOptions.length > 0) {
        const [startIdx, endIdx] = newValue;
        setSliderValue([startIdx, endIdx]);
        setStartTime(xOptions[startIdx]);
        setEndTime(xOptions[endIdx]);
      }
    },
    [xOptions, setStartTime, setEndTime],
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
        <label htmlFor="observationName" className="text-sm font-medium text-gray-700">
          관측소 이름
        </label>
        <select
          id="observationName"
          value={observationName}
          onChange={(e) => setObservationName(e.target.value)}
          className="rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none"
        >
          {observationNames.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="addY" className="text-sm font-medium text-gray-700">
          데이터 선택(추가)
        </label>
        <div className="grid grid-cols-2 gap-2">
          {yOptions.map((key) => (
            <label key={key} className="flex items-center gap-2 text-sm text-gray-700">
              <input
                id="addY"
                type="checkbox"
                value={key}
                checked={addY.includes(key)}
                onChange={(e) => {
                  const { checked } = e.target;
                  if (checked) {
                    setAddY([...addY, key]);
                  } else {
                    setAddY(addY.filter((item) => item !== key));
                  }
                }}
              />
              {key}
            </label>
          ))}
        </div>
      </div>
      <button
        className="mt-4 w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        onClick={() => setAddY([])}
      >
        초기화
      </button>
    </div>
  );
}
