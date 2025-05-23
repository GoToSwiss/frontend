import React from 'react';
import { MarkerFeatureProps } from '../types/CoordType';
import useInfoWindowStore from '../store/useInfoWindowStore';

const numFmt = new Intl.NumberFormat();

function InfoWindowContent() {
  const { infowindowData } = useInfoWindowStore();

  if (infowindowData?.features.length === 1) {
    const f = infowindowData.features[0];
    const props = f.properties;

    return (
      <div className="flex flex-col gap-2 p-3">
        <h1 className="text-sm font-bold text-gray-800">관측소</h1>
        <a
          href={getDetailsUrl(props)}
          target="_blank"
          rel="noreferrer"
          className="text-sm font-medium text-blue-600 hover:underline"
        >
          {props.stationName}
        </a>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 p-3">
      <h1 className="text-sm font-bold text-gray-800">관측소 목록</h1>

      <ul className="list-none space-y-1">
        {infowindowData?.features.slice(0, 5).map((feature) => {
          const props = feature.properties!;

          return (
            <li key={feature.id}>
              <a
                href={getDetailsUrl(props)}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-blue-600 hover:underline"
              >
                {props.stationName}
              </a>
            </li>
          );
        })}

        {features.length > 5 && (
          <li className="text-sm font-medium text-gray-500">
            외 {numFmt.format(features.length - 5)}개 더 있음
          </li>
        )}
      </ul>
    </div>
  );
}

export default InfoWindowContent;

function getDetailsUrl(props: MarkerFeatureProps) {
  return `https://www.airkorea.or.kr/web/search?query=${props.stationName}`;
}
