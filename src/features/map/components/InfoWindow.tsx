import React from 'react';
import useInfoWindowStore from '../store/useInfoWindowStore';
import useStationStore from '../store/panel/useStationStore';
import focusOnLocation from '../utils/focusOnLocation';
import usePanelStore from '../store/panel/usePanelStore';

const numFmt = new Intl.NumberFormat();

function InfoWindowContent() {
  const { infowindowData } = useInfoWindowStore();
  const { openRightPanel } = usePanelStore();
  const setStationName = useStationStore((state) => state.setStationName);

  if (infowindowData?.features.length === 1) {
    const f = infowindowData.features[0];
    const props = f.properties;

    return (
      <div className="flex flex-col gap-2 p-3">
        <h1 className="text-lg font-bold text-gray-800">관측소</h1>
        <div>
          <button
            onClick={() => {
              setStationName(props.stationName);
            }}
            className="text-lg font-medium text-blue-600 hover:underline"
          >
            {props.stationName}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 p-3">
      <h1 className="text-lg font-bold text-gray-800">관측소 목록</h1>

      <ul className="list-none space-y-1">
        {infowindowData?.features.slice(0, 5).map((feature) => {
          const props = feature.properties!;

          return (
            <li key={feature.id}>
              <button
                onClick={() => {
                  openRightPanel();
                  setStationName(props.stationName);
                  focusOnLocation(feature.geometry.coordinates[1], feature.geometry.coordinates[0]);
                }}
                className="w-full truncate text-start text-lg text-blue-600 hover:underline"
              >
                {props.stationName}
              </button>
            </li>
          );
        })}

        {infowindowData?.features.length && infowindowData.features.length > 5 && (
          <li className="text-sm font-medium text-gray-500">
            외 {numFmt.format(infowindowData.features.length - 5)}개 더 있음
          </li>
        )}
      </ul>
    </div>
  );
}

export default InfoWindowContent;
