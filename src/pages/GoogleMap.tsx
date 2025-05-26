import { APIProvider, InfoWindow, Map, useMap } from '@vis.gl/react-google-maps';
import { useEffect, useState } from 'react';
import SideLeftPanel from '@/features/map/components/panel/SideLeftPanel';
import SideRightPanel from '@/features/map/components/panel/SideRightPanel';
import useMapStore from '@/features/map/store/useMapStore';
import useDataVisualTypeStore from '@/features/map/store/useDataVisualTypeStore';
import InfoWindowContent from '@/features/map/components/InfoWindow';
import ClusteredMarkers from '@/features/map/components/ClusteredMarkers';
import useGetStations from '@/features/map/query/station.query';
import useInfoWindowStore from '@/features/map/store/useInfoWindowStore';
import SeoulCircle from '@/features/map/components/SeoulCenter';
import ChatBot from '@/features/map/components/chat/ChatBot';
import HeatMapContent from '@/features/map/HeatMapContent';
import MapMode3D from '@/features/map/components/3d/MapMode3D';
import SEO from '@/components/SEO';

export function MapController({ onReady }: { onReady: (map: google.maps.Map) => void }) {
  const map = useMap();

  useEffect(() => {
    if (map) {
      onReady(map);
    }
  }, [map, onReady]);

  return null;
}

function GoogleMap() {
  const dataVisualType = useDataVisualTypeStore((state) => state.dataVisualType);
  const setMapInstance = useMapStore((state) => state.setMapInstance);
  const { data } = useGetStations();

  const [, setNumClusters] = useState(0);
  const setInfowindowData = useInfoWindowStore((state) => state.setInfowindowData);
  const infowindowData = useInfoWindowStore((state) => state.infowindowData);

  const nonAlphaVersionLoaded = Boolean(
    globalThis &&
      globalThis.google?.maps?.version &&
      !globalThis.google?.maps?.version.endsWith('-alpha'),
  );

  if (nonAlphaVersionLoaded) {
    // eslint-disable-next-line no-restricted-globals
    location.reload();
  }

  return (
    <>
      <SEO
        title="onAir 지도"
        description="onAir"
        keywords="onAir, 대기 환경 분석, 대기오염, 대기오염 지도"
      />
      <div className="relative h-full w-full">
        {dataVisualType === '3d' && (
          <APIProvider apiKey={import.meta.env.VITE_MAP_API} libraries={['places']} version="alpha">
            <MapMode3D />
          </APIProvider>
        )}
        <APIProvider apiKey={import.meta.env.VITE_MAP_API} libraries={['places']} version="alpha">
          <Map
            style={{
              ...(dataVisualType === '3d'
                ? {
                    width: '300px',
                    height: '300px',
                    position: 'absolute',
                    zIndex: 50,
                    right: 0,
                    bottom: 0,
                  }
                : { width: '100%', height: '100%', zIndex: 0 }),
            }}
            defaultCenter={{ lat: 37.5665, lng: 126.978 }}
            defaultZoom={7}
            gestureHandling="greedy"
            disableDefaultUI
            mapId="104e02e9fce23a43cf95caf9"
          >
            <MapController onReady={setMapInstance} />
            {dataVisualType === 'heatmap' && <HeatMapContent radius={25} opacity={0.8} />}

            {(dataVisualType === 'marker' || dataVisualType === '3d') && data.isSuccess && (
              <ClusteredMarkers geojson={data.result} setNumClusters={setNumClusters} />
            )}

            {infowindowData && (
              <InfoWindow
                className="h-auto w-[150px]"
                onCloseClick={() => setInfowindowData(null)}
                position={infowindowData.anchor.position}
              >
                <InfoWindowContent />
              </InfoWindow>
            )}
            <SeoulCircle />
          </Map>
        </APIProvider>

        <SideLeftPanel />
        <SideRightPanel />
        <ChatBot />
      </div>
    </>
  );
}

export default GoogleMap;
