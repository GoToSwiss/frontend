import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import TimeSelection from '../TimeSelection';
import useDateRangeStore from '../../store/panel/useDateRangeStore';

function DateSelection() {
  const [isOpen, setIsOpen] = useState(false);
  const { dateRange, timeRange, setDateRange } = useDateRangeStore();
  const [startTime, endTime] = timeRange;

  const isSameDay = dateRange[0].toDateString() === dateRange[1].toDateString();
  const isSameTime = startTime === endTime;

  const handleDateChange = (value: [Date, Date] | null) => {
    if (value !== null) {
      setDateRange(value);
    }
  };

  const closeModal = () => setIsOpen(false);

  const getLabel = () => {
    const [start, end] = dateRange;

    return isSameDay
      ? `${start.toLocaleDateString()} ${startTime} ~ ${endTime}`
      : `${start.toLocaleDateString()} ~ ${end.toLocaleDateString()}`;
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <div className="relative">
      <h1 className="text-sm font-semibold">날짜 선택</h1>
      <p className="mb-3 text-xs text-gray-500">
        2024년 이전 데이터는 ch4, noAvg, co2가 추가적으로 보여집니다.
      </p>
      <button
        onClick={() => setIsOpen(true)}
        className="mb-0.5 w-full rounded border border-gray-300 px-3 py-2 text-xs shadow-sm transition hover:bg-gray-50"
      >
        {getLabel()}
      </button>
      {isSameDay && isSameTime && (
        <span className="text-xs text-red-500">시간 범위가 있어야 데이터가 보입니다.</span>
      )}

      {isOpen && (
        <div
          role="button"
          tabIndex={0}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30"
          onClick={closeModal}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              closeModal();
            }
          }}
        >
          <div
            role="button"
            tabIndex={0}
            className="w-[340px] rounded-md bg-white p-4 shadow-lg"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={closeModal}
          >
            <div className="mb-2 flex items-center justify-between">
              <h2 className="text-sm font-semibold">날짜 및 시간 선택</h2>
              <button onClick={closeModal} className="text-sm text-gray-500 hover:text-gray-700">
                ✕
              </button>
            </div>

            <Calendar
              onChange={(value) => handleDateChange(value as [Date, Date] | null)}
              value={dateRange}
              selectRange
              calendarType="gregory"
              locale="ko-KR"
              className="text-xs"
              maxDate={today}
            />

            <TimeSelection />
            {isSameDay && isSameTime && (
              <span className="text-xs text-red-500">시간 범위가 있어야 데이터가 보입니다.</span>
            )}
            <button
              onClick={closeModal}
              className="mt-4 w-full rounded bg-blue-600 px-3 py-2 text-xs text-white hover:bg-blue-700"
            >
              확인
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DateSelection;
