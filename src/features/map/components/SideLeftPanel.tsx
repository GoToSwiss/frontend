import { useState } from 'react';
import { X, ChevronRight } from 'lucide-react';
import PlaceSearchInput from './PlaceSearchInput';
import DataVisualizationSelection from './DataVisualizationSelection';
import AirLegend from './AirLegend';
import DateSelection from './DateSelection';

function SideLeftPanel() {
  const [open, setOpen] = useState(true);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="absolute left-4 top-4 z-20 rounded bg-white p-1 shadow hover:bg-gray-100"
      >
        {open ? (
          <X size={12} className="text-gray-600" />
        ) : (
          <ChevronRight size={12} className="text-gray-600" />
        )}
      </button>

      {open && (
        <div className="absolute left-4 top-11 z-10 h-[90%] w-80 space-y-6 rounded-lg bg-white p-4 shadow-md">
          <PlaceSearchInput />
          <DataVisualizationSelection />
          <AirLegend />
          <DateSelection />
          <button className="w-full rounded border border-gray-300 px-3 py-2 text-xs shadow-sm transition hover:bg-gray-50">
            분석
          </button>
        </div>
      )}
    </>
  );
}

export default SideLeftPanel;
