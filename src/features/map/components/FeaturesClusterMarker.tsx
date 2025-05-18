import React, { useCallback } from 'react';
import {
  AdvancedMarker,
  AdvancedMarkerAnchorPoint,
  useAdvancedMarkerRef,
} from '@vis.gl/react-google-maps';
import MarkerSvg from './marker-svg';

type TreeClusterMarkerProps = {
  clusterId: number;
  onMarkerClick?: (marker: google.maps.marker.AdvancedMarkerElement, clusterId: number) => void;
  position: google.maps.LatLngLiteral;
  size: number;
  sizeAsText: string;
};

function FeaturesClusterMarker({
  position,
  size,
  sizeAsText,
  onMarkerClick,
  clusterId,
}: TreeClusterMarkerProps) {
  const [markerRef, marker] = useAdvancedMarkerRef();
  const handleClick = useCallback(
    () => onMarkerClick && onMarkerClick(marker!, clusterId),
    [onMarkerClick, marker, clusterId],
  );
  const markerSize = Math.floor(48 + Math.sqrt(size) * 2);

  return (
    <AdvancedMarker
      ref={markerRef}
      position={position}
      zIndex={size}
      onClick={handleClick}
      className="cluster-marker animate-pulse"
      style={{ width: markerSize, height: markerSize }}
      anchorPoint={AdvancedMarkerAnchorPoint.CENTER}
    >
      <div className="cluster-content">
        <MarkerSvg />
        <span className="cluster-text">{sizeAsText}</span>
      </div>
    </AdvancedMarker>
  );
}

export default FeaturesClusterMarker;
