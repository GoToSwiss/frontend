import * as React from 'react';
import { useMapConfigStore, MAP_CONFIGS } from '../../store/panel/useMapConfigStore';

function StyleControlPanel() {
  const mapConfig = useMapConfigStore((state) => state.mapConfig);
  const setMapConfig = useMapConfigStore((state) => state.setMapConfig);

  return (
    <div className="control-panel">
      <div>
        <h1 className="mb-2 text-sm font-semibold">맵 스타일 선택</h1>
        <select
          className="w-full rounded border border-gray-300 px-3 py-2 text-xs shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
          value={mapConfig.id}
          onChange={(ev) => setMapConfig(MAP_CONFIGS.find((s) => s.id === ev.target.value)!)}
        >
          {MAP_CONFIGS.map(({ id, label }) => (
            <option key={id} value={id}>
              {label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default React.memo(StyleControlPanel);
