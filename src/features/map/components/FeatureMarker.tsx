import React, { useCallback } from 'react';
import {
  AdvancedMarker,
  AdvancedMarkerAnchorPoint,
  useAdvancedMarkerRef,
} from '@vis.gl/react-google-maps';
import MarkerPinSvg from './marker-pin-svg';

type TreeMarkerProps = {
  position: google.maps.LatLngLiteral;
  featureId: string;
  onMarkerClick?: (marker: google.maps.marker.AdvancedMarkerElement, featureId: string) => void;
};

function FeatureMarker({ position, featureId, onMarkerClick }: TreeMarkerProps) {
  const [markerRef, marker] = useAdvancedMarkerRef();
  const handleClick = useCallback(
    () => onMarkerClick && onMarkerClick(marker!, featureId),
    [onMarkerClick, marker, featureId],
  );

  return (
    <AdvancedMarker
      ref={markerRef}
      position={position}
      onClick={handleClick}
      anchorPoint={AdvancedMarkerAnchorPoint.CENTER}
    >
      <div className="relative flex h-8 w-8 items-center justify-center">
        <div className="ripple absolute" />
        <div className="z-10">
          <MarkerPinSvg />
        </div>
      </div>
    </AdvancedMarker>
  );
}

export default FeatureMarker;
