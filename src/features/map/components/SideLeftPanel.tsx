import { X, ChevronRight } from 'lucide-react';
import PlaceSearchInput from './PlaceSearchInput';
import DataVisualizationSelection from './DataVisualizationSelection';
import AirLegend from './AirLegend';
import DateSelection from './DateSelection';
import usePanelStore from '../store/usePanelStore';
import useDataVisualTypeStore from '../store/useDataVisualTypeStore';

function SideLeftPanel() {
  const { leftPanelOpen, toggleLeftPanel } = usePanelStore();
  const dataVisualType = useDataVisualTypeStore((state) => state.dataVisualType);
  return (
    <>
      <button
        type="button"
        onClick={() => toggleLeftPanel()}
        className="absolute left-4 top-4 z-20 rounded bg-white p-1 shadow hover:bg-gray-100"
      >
        {leftPanelOpen ? (
          <X size={12} className="text-gray-600" />
        ) : (
          <ChevronRight size={12} className="text-gray-600" />
        )}
      </button>

      {leftPanelOpen && (
        <div className="w-90 absolute left-4 top-11 z-10 h-[90%] space-y-6 rounded-lg bg-white p-4 shadow-md">
          <PlaceSearchInput />
          <DataVisualizationSelection />
          {dataVisualType === 'marker' && (
            <>
              <AirLegend /> <DateSelection />
            </>
          )}
        </div>
      )}
    </>
  );
}

export default SideLeftPanel;
