import { useState } from 'react';
import { X, ChevronRight } from 'lucide-react';
import PlaceSearchInput from './PlaceSearchInput';
import AirSelection from './AirSelection';
import DataVisualizationSelection from './DataVisualizationSelection';
import AirLegend from './AirLegend';

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
        <div className="w-70 absolute left-4 top-11 z-10 h-[90%] space-y-6 rounded-lg bg-white p-4 shadow-md">
          <PlaceSearchInput />
          <AirSelection />
          <DataVisualizationSelection />
          <AirLegend />
        </div>
      )}
    </>
  );
}

export default SideLeftPanel;
