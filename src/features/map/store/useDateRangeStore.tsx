import { create } from 'zustand';

const now = new Date();
const nowStr = now.toTimeString().slice(0, 8); // "HH:mm:ss"

type DateRangeState = {
  dateRange: [Date, Date];
  timeRange: [string, string];
  setDateRange: (range: [Date, Date]) => void;
  setTimeRange: (range: [string, string]) => void;
};

const useDateRangeStore = create<DateRangeState>((set) => ({
  dateRange: [now, now],
  timeRange: ['00:00:00', nowStr],
  setDateRange: (range) => set({ dateRange: range }),
  setTimeRange: (range) => set({ timeRange: range }),
}));

export default useDateRangeStore;
