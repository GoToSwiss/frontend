import useDateRangeStore from '../store/useDateRangeStore';

function TimeSelection() {
  const { timeRange, setTimeRange, dateRange } = useDateRangeStore();
  const [startTime, endTime] = timeRange;

  const handleStartTimeChange = (value: string) => {
    const full = `${value}:00`;
    if (full > endTime) {
      setTimeRange([full, full]);
    } else {
      setTimeRange([full, endTime]);
    }
  };

  const handleEndTimeChange = (value: string) => {
    const full = `${value}:00`;
    if (full < startTime) {
      setTimeRange([full, full]);
    } else {
      setTimeRange([startTime, full]);
    }
  };

  const shouldShowTime = () => {
    const [start, end] = dateRange;
    return start.toDateString() === end.toDateString();
  };

  return (
    <div className="mt-4 flex flex-col gap-2 text-xs">
      {shouldShowTime() && (
        <>
          <label>
            시작 시간:
            <input
              type="time"
              value={startTime.slice(0, 5)}
              onChange={(e) => handleStartTimeChange(e.target.value)}
              className="mt-1 w-full rounded border px-2 py-1 text-xs"
            />
          </label>

          <label>
            종료 시간:
            <input
              type="time"
              value={endTime.slice(0, 5)}
              onChange={(e) => handleEndTimeChange(e.target.value)}
              className="mt-1 w-full rounded border px-2 py-1 text-xs"
            />
          </label>
        </>
      )}
    </div>
  );
}

export default TimeSelection;
