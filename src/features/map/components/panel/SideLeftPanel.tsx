import { X, ChevronRight } from 'lucide-react';
import PlaceSearchInput from './PlaceSearchInput';
import DataVisualizationSelection from './DataVisualizationSelection';
import AirLegend from './AirLegend';
import DateSelection from './DateSelection';
import usePanelStore from '../../store/panel/usePanelStore';
import useDataVisualTypeStore from '../../store/panel/useDataVisualTypeStore';
import HeatMapSelection from './HeatMapSelection';
import StyleControlPanel from './StyleControlPanel';

function SideLeftPanel() {
  const { leftPanelOpen, toggleLeftPanel } = usePanelStore();
  const dataVisualType = useDataVisualTypeStore((state) => state.dataVisualType);

  return (
    <>
      <button
        type="button"
        onClick={() => toggleLeftPanel()}
        className="0 absolute left-4 top-4 z-50 rounded bg-white p-1 shadow hover:bg-gray-100"
      >
        {leftPanelOpen ? (
          <X size={12} className="text-gray-600" />
        ) : (
          <ChevronRight size={12} className="text-gray-600" />
        )}
      </button>

      {leftPanelOpen && (
        <div className="w-90 absolute left-4 top-11 z-50 h-[90%] space-y-6 overflow-auto rounded-lg bg-white p-4 shadow-md">
          <PlaceSearchInput />
          <StyleControlPanel />
          <DataVisualizationSelection />
          {dataVisualType === 'marker' || dataVisualType === '3d' ? (
            <>
              <AirLegend /> <DateSelection />
            </>
          ) : (
            <HeatMapSelection />
          )}
          <p className="text-black-500 text-xs">
            데이터는 실시간 과측된 자료이며 측정소 연기 시점이나 <br />
            데이터의 수신상태에 따라 미수신될 수 있음
            <br />
            <span className="text-blue-500">
              <a
                className="underline"
                href="https://www.keco.or.kr/web/index.do;jsessionid=5F69FA77CA13C386B37E73D4EB718D23.hfkeco"
              >
                출처: 환경부/한국환경공단
              </a>
            </span>
          </p>
        </div>
      )}
    </>
  );
}

export default SideLeftPanel;
